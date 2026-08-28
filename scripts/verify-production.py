#!/usr/bin/env python3
"""Verify the deployed OG Labs site against the Framer source.

Runs after a push has been deployed by the existing GitHub to Vercel
integration. Everything here is read only over HTTPS.

Checks:
  1. Propagation. Poll the apex until it serves the expected publish stamp,
     with exponential backoff, before asserting anything else.
  2. Routes. Every source route returns 200 on both the apex and www, and a
     negative control returns 404 so a 200 catch all cannot pass as success.
  3. Assets. Every local /assets and /sites reference returns 200 on both
     hostnames, plus a representative sample of remote images and fonts.
  4. Content. Title, description, Open Graph and Twitter metadata, canonical,
     normalized visible text, link set and image set match the source on every
     route, on both hostnames.
  5. TLS. Both hostnames present a valid, in date certificate that matches.
  6. Redirects. The Orange Growth domains still 301 to the same path on the
     live host with path and query preserved byte for byte.

Exit status is 0 only when every check passes.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import socket
import ssl
import sys
import time
import urllib.error
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path

SRC = os.environ.get("SRC", "https://oglabs.framer.website")
MIRROR_CANONICAL = os.environ.get("DST", "https://orangegrowth.io")
CDN = os.environ.get("CDN", "https://framerusercontent.com")
UA = "Mozilla/5.0 (compatible; oglabs-sync-verify/1.0)"
LOCAL_REF = re.compile(r'/(?:assets|sites)/[A-Za-z0-9._/-]+')
PUBLISHED = re.compile(r"^<!-- Published (.+?) -->\s*$", re.MULTILINE)
META_KEYS = (
    "description", "og:title", "og:description", "og:image", "og:url", "og:type",
    "twitter:title", "twitter:description", "twitter:image", "twitter:card",
)
NEGATIVE_CONTROLS = ("/definitely-not-real-xyz123", "/services/not-real-xyz", "/blogs/nope-xyz")
REDIRECT_PATHS = (
    "/",
    "/services/hubspot",
    "/blogs?utm_source=test&utm_medium=probe",
    "/contact?q=a%20b",
    "/au?empty=",
    "/case-studies?a=1&a=2",
    "/legal/privacy-policy?utm_campaign=x%2By",
)

_badge_module = None


def load_remove_badge():
    global _badge_module
    if _badge_module is None:
        import importlib.util

        path = Path(__file__).resolve().parent / "remove-framer-badge.py"
        spec = importlib.util.spec_from_file_location("remove_framer_badge", path)
        _badge_module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(_badge_module)
    return _badge_module.remove_badge


class Extract(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.title = ""
        self.meta: dict[str, str] = {}
        self.canonical = ""
        self.links: set[str] = set()
        self.images: set[str] = set()
        self._text: list[str] = []
        self._skip = 0
        self._in_title = False

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag in ("script", "style", "noscript", "template"):
            self._skip += 1
        elif tag == "title":
            self._in_title = True
        elif tag == "meta":
            key = a.get("name") or a.get("property")
            if key in META_KEYS and a.get("content"):
                self.meta[key] = a["content"].strip()
        elif tag == "link" and (a.get("rel") or "").lower() == "canonical":
            self.canonical = a.get("href", "")
        elif tag == "a" and a.get("href"):
            self.links.add(a["href"].strip())
        elif tag == "img" and a.get("src"):
            self.images.add(a["src"].strip())

    def handle_endtag(self, tag):
        if tag in ("script", "style", "noscript", "template"):
            self._skip = max(0, self._skip - 1)
        elif tag == "title":
            self._in_title = False

    def handle_data(self, data):
        if self._in_title:
            self.title += data
        elif not self._skip:
            self._text.append(data)

    @property
    def text(self) -> str:
        return re.sub(r"\s+", " ", " ".join(self._text)).strip()


def get(url: str, method: str = "GET", timeout: int = 45, redirect: bool = True):
    """Return (status, headers, body_bytes). Never raises on HTTP status."""
    class NoRedirect(urllib.request.HTTPRedirectHandler):
        def redirect_request(self, *a, **k):
            return None

    opener = urllib.request.build_opener(*( [] if redirect else [NoRedirect] ))
    req = urllib.request.Request(url, method=method, headers={"User-Agent": UA})
    try:
        with opener.open(req, timeout=timeout) as r:
            return r.status, dict(r.headers), r.read()
    except urllib.error.HTTPError as e:
        return e.code, dict(e.headers), e.read()
    except Exception as e:  # network level failure
        return 0, {"x-error": str(e)}, b""


def canon_for(value: str, host_base: str) -> str:
    """Fold source and mirror hostnames onto the host actually being served."""
    return (
        value.replace(SRC, host_base)
        .replace(MIRROR_CANONICAL, host_base)
        .replace(CDN + "/assets/", "/assets/")
        .replace(CDN + "/sites/", "/sites/")
    )


def route_to_raw(route: str) -> str:
    return "index.html" if route == "/" else route.lstrip("/") + ".html"


def wait_for_propagation(base: str, expected_stamp: str, attempts: int, log) -> bool:
    delay = 10
    for i in range(1, attempts + 1):
        status, _, body = get(base + "/")
        got = PUBLISHED.search(body.decode("utf-8", "replace"))
        got_stamp = got.group(1) if got else "<none>"
        if status == 200 and got_stamp == expected_stamp:
            log(f"propagation: matched publish stamp {expected_stamp!r} on attempt {i}")
            return True
        log(f"propagation attempt {i}/{attempts}: status={status} stamp={got_stamp!r}, waiting {delay}s")
        if i < attempts:
            time.sleep(delay)
            delay = min(delay * 2, 120)
    return False


def check_tls(host: str, log) -> list[str]:
    fails = []
    ctx = ssl.create_default_context()
    try:
        with socket.create_connection((host, 443), timeout=30) as sock:
            with ctx.wrap_socket(sock, server_hostname=host) as tls:
                cert = tls.getpeercert()
                not_after = datetime.strptime(cert["notAfter"], "%b %d %H:%M:%S %Y %Z").replace(
                    tzinfo=timezone.utc)
                not_before = datetime.strptime(cert["notBefore"], "%b %d %H:%M:%S %Y %Z").replace(
                    tzinfo=timezone.utc)
                now = datetime.now(timezone.utc)
                subject = dict(x[0] for x in cert["subject"]).get("commonName", "")
                sans = [v for k, v in cert.get("subjectAltName", ()) if k == "DNS"]
                log(f"TLS {host}: CN={subject} SAN={sans} valid "
                    f"{not_before:%Y-%m-%d} to {not_after:%Y-%m-%d} protocol={tls.version()}")
                if not (not_before <= now <= not_after):
                    fails.append(f"TLS {host}: certificate not currently valid")
    except Exception as e:
        fails.append(f"TLS {host}: handshake failed: {e}")
    return fails


def check_redirects(live_host: str, log) -> tuple[list[str], int]:
    fails, checks = [], 0
    for host in ("orangegrowth.io", "www.orangegrowth.io"):
        for scheme in ("http", "https"):
            for path in REDIRECT_PATHS:
                checks += 1
                url = f"{scheme}://{host}{path}"
                status, headers, _ = get(url, redirect=False)
                loc = headers.get("Location") or headers.get("location") or ""
                want = f"https://{live_host}{path}"
                if status != 301:
                    fails.append(f"redirect {url}: expected 301, got {status}")
                elif loc != want:
                    fails.append(f"redirect {url}: Location {loc!r} != {want!r}")
    log(f"redirects: {checks} probes across 2 Orange Growth hosts, 2 schemes, "
        f"{len(REDIRECT_PATHS)} path and query shapes")
    return fails, checks


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--source-dir", required=True)
    ap.add_argument("--hosts", default="oglabs.io,www.oglabs.io")
    ap.add_argument("--primary-host", default="oglabs.io")
    ap.add_argument("--attempts", type=int, default=8)
    ap.add_argument("--json", dest="json_out")
    ap.add_argument("--log", dest="log_out")
    args = ap.parse_args()

    lines: list[str] = []

    def log(msg: str) -> None:
        print(msg, flush=True)
        lines.append(msg)

    src_dir = Path(args.source_dir)
    hosts = [h.strip() for h in args.hosts.split(",") if h.strip()]
    # canonical and og:url must always name the primary host, on every hostname
    # served. The Cloudflare layer in front of the mirror rewrites the mirror's
    # own canonical domain to the apex regardless of which host was requested,
    # so www is expected to advertise the apex, not itself.
    primary_base = f"https://{args.primary_host}"
    routes = [r.strip() for r in (src_dir / "routes.txt").read_text().split("\n") if r.strip()]
    remove_badge = load_remove_badge()

    source_pages = {}
    for route in routes:
        html = (src_dir / "raw" / route_to_raw(route)).read_text(encoding="utf-8")
        source_pages[route] = html
    expected_stamp = PUBLISHED.search(source_pages["/"]).group(1)

    fails: list[str] = []
    checks = 0

    if not wait_for_propagation(f"https://{args.primary_host}", expected_stamp, args.attempts, log):
        fails.append(
            f"propagation: {args.primary_host} never served publish stamp {expected_stamp!r} "
            f"after {args.attempts} attempts"
        )
        # Everything downstream would be noise against a stale origin.
        summary = {"ok": False, "checks": checks, "failures": fails}
        if args.json_out:
            Path(args.json_out).write_text(json.dumps(summary, indent=2) + "\n")
        if args.log_out:
            Path(args.log_out).write_text("\n".join(lines) + "\n")
        for f in fails:
            print("FAIL " + f)
        return 1
    checks += 1

    # Routes and page content on every host.
    asset_refs: set[str] = set()
    for host in hosts:
        base = f"https://{host}"

        def fetch_route(route: str):
            return route, get(base + route)

        with ThreadPoolExecutor(max_workers=8) as pool:
            results = dict(pool.map(fetch_route, routes))

        for route in routes:
            status, _, body = results[route]
            checks += 1
            if status != 200:
                fails.append(f"{host}{route}: status {status}")
                continue
            live_html = body.decode("utf-8", "replace")
            asset_refs.update(LOCAL_REF.findall(live_html))

            source_semantic, _ = remove_badge(source_pages[route])
            s = Extract(); s.feed(source_semantic)
            m = Extract(); m.feed(live_html)

            checks += 1
            if s.title.strip() != m.title.strip():
                fails.append(f"{host}{route}: title mismatch {s.title.strip()!r} vs {m.title.strip()!r}")
            for key in META_KEYS:
                checks += 1
                want_base = primary_base if key == "og:url" else base
                if canon_for(s.meta.get(key, ""), want_base) != m.meta.get(key, ""):
                    fails.append(
                        f"{host}{route}: meta {key} mismatch "
                        f"{canon_for(s.meta.get(key, ''), want_base)!r} vs {m.meta.get(key, '')!r}"
                    )
            checks += 1
            if canon_for(s.canonical, primary_base) != m.canonical:
                fails.append(
                    f"{host}{route}: canonical {m.canonical!r} != "
                    f"{canon_for(s.canonical, primary_base)!r}"
                )
            checks += 1
            if MIRROR_CANONICAL in live_html:
                fails.append(f"{host}{route}: mirror canonical domain not rewritten at the edge")
            checks += 1
            if {canon_for(x, base) for x in s.links} != m.links:
                fails.append(f"{host}{route}: link set mismatch")
            checks += 1
            if {canon_for(x, base) for x in s.images} != m.images:
                fails.append(f"{host}{route}: image set mismatch")
            checks += 1
            if s.text != m.text:
                fails.append(f"{host}{route}: normalized visible text mismatch")

        for path in NEGATIVE_CONTROLS:
            checks += 1
            status, _, _ = get(base + path)
            if status != 404:
                fails.append(f"{host}{path}: expected 404 negative control, got {status}")

        log(f"{host}: {len(routes)} routes checked, {len(NEGATIVE_CONTROLS)} negative controls")

    # Local assets on every host.
    local = sorted(asset_refs)
    for host in hosts:
        base = f"https://{host}"

        def head_asset(ref: str):
            return ref, get(base + ref, method="HEAD")[0]

        with ThreadPoolExecutor(max_workers=12) as pool:
            for ref, status in pool.map(head_asset, local):
                checks += 1
                if status != 200:
                    fails.append(f"{host}{ref}: status {status}")
        log(f"{host}: {len(local)} local assets checked")

    # Representative remote assets referenced by the pages.
    remote: set[str] = set()
    for route in routes:
        for m in re.findall(r'https://framerusercontent\.com/images/[A-Za-z0-9._/-]+', source_pages[route]):
            remote.add(m)
        for m in re.findall(r'https://fonts\.gstatic\.com/[A-Za-z0-9._/-]+', source_pages[route]):
            remote.add(m)
    sample = sorted(remote)[:40]
    with ThreadPoolExecutor(max_workers=12) as pool:
        for url, status in pool.map(lambda u: (u, get(u, method="HEAD")[0]), sample):
            checks += 1
            if status != 200:
                fails.append(f"remote asset {url}: status {status}")
    log(f"remote assets: {len(sample)} of {len(remote)} referenced checked")

    for host in hosts:
        fails.extend(check_tls(host, log))
        checks += 1

    rfails, rchecks = check_redirects(args.primary_host, log)
    fails.extend(rfails)
    checks += rchecks

    summary = {
        "ok": not fails,
        "hosts": hosts,
        "routes": len(routes),
        "local_assets": len(local),
        "remote_assets_sampled": len(sample),
        "checks": checks,
        "failures": fails,
        "publish_stamp": expected_stamp,
    }
    if args.json_out:
        Path(args.json_out).write_text(json.dumps(summary, indent=2) + "\n")
    if args.log_out:
        Path(args.log_out).write_text("\n".join(lines) + "\n")

    print(f"checks={checks} failures={len(fails)}")
    for f in fails[:40]:
        print("FAIL " + f)
    print("PRODUCTION VERIFY OK" if not fails else "PRODUCTION VERIFY FAILED")
    return 0 if not fails else 1


if __name__ == "__main__":
    raise SystemExit(main())
