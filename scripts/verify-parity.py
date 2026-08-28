#!/usr/bin/env python3
"""Validate the static mirror against the live Framer source before committing.

Companion to export.sh (skill: framer-to-vercel, OG Labs variant).

Two independent axes are checked:

  1. Byte parity. The exact transformations export.sh applies to a source page
     are replayed here on the freshly fetched source HTML. The result must be
     byte identical to the mirrored file. This catches any drift between what
     the pipeline produced and what the source actually says.
  2. Semantic parity. Title, description, canonical, Open Graph and Twitter
     metadata, normalized visible text, link set and image set are extracted
     from both sides and compared. This catches a byte match that is somehow
     semantically wrong, and gives readable output when byte parity fails.

Plus structural checks: route set equality, every local /assets and /sites
reference resolves to a file on disk, no source hostname leaks into the mirror,
and the Framer badge is gone.

Usage:
  verify-parity.py --source-dir DIR --mirror-dir DIR [--json OUT]

--source-dir is the layout produced by scripts/framer-source-state.sh:
  routes.txt and raw/<flat path>.html

Exit status is 0 only when every check passes. Any failure exits 1 so callers
can fail closed.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
from html.parser import HTMLParser
from pathlib import Path

# Same override convention as export.sh, so the test suite can point this at a
# local fixture site. Defaults are the real endpoints.
SRC = os.environ.get("SRC", "https://oglabs.framer.website")
DST = os.environ.get("DST", "https://orangegrowth.io")
CDN = os.environ.get("CDN", "https://framerusercontent.com")

# Reuse the badge remover the export pipeline itself uses, loaded by path
# because its filename is not a valid module name.
def _load_remove_badge_module():
    import importlib.util

    path = Path(__file__).resolve().parent / "remove-framer-badge.py"
    spec = importlib.util.spec_from_file_location("remove_framer_badge", path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


_badge_module = _load_remove_badge_module()
remove_badge = _badge_module.remove_badge
BADGE_DIV = _badge_module.BADGE_OPEN

LOCAL_REF = re.compile(r'/(?:assets|sites)/[A-Za-z0-9._/-]+')
META_KEYS = (
    "description", "og:title", "og:description", "og:image", "og:url", "og:type",
    "twitter:title", "twitter:description", "twitter:image", "twitter:card",
)


def apply_export_transforms(html: str) -> str:
    """Replay export.sh steps 3 and 4 on raw source HTML."""
    out = []
    for line in html.split("\n"):
        if "framer-search-index" in line:
            continue
        if "__framer_force_showing_editorbar_since" in line:
            continue
        line = line.replace("<!-- Made in Framer · framer.com ✨ -->", "")
        line = re.sub(r'<meta name="generator" content="Framer [^"]*">', "", line)
        line = line.replace(SRC, DST)
        line = line.replace(CDN + "/assets/", "/assets/")
        line = line.replace(CDN + "/sites/", "/sites/")
        out.append(line)
    cleaned, _ = remove_badge("\n".join(out))
    return cleaned


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
        elif tag == "link" and (a.get("rel") or "").lower() in ("canonical", "['canonical']"):
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


def canon(value: str) -> str:
    """Fold the source hostname onto the mirror hostname for comparison."""
    return value.replace(SRC, DST).replace(CDN + "/assets/", "/assets/").replace(
        CDN + "/sites/", "/sites/")


def route_to_file(route: str) -> str:
    return "index.html" if route == "/" else route.lstrip("/") + ".html"


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--source-dir", required=True)
    ap.add_argument("--mirror-dir", required=True)
    ap.add_argument("--json", dest="json_out")
    args = ap.parse_args()

    src_dir = Path(args.source_dir)
    mirror = Path(args.mirror_dir)
    routes = [r.strip() for r in (src_dir / "routes.txt").read_text().split("\n") if r.strip()]

    failures: list[str] = []
    checks = 0
    asset_refs: set[str] = set()

    # Directories that live beside the mirror but are not part of it.
    not_mirror = {
        "node_modules", ".next", "sync-diagnostics", "framer-source",
        ".git", ".github", "scripts",
    }

    mirror_routes = set()
    for html_path in mirror.rglob("*.html"):
        rel = html_path.relative_to(mirror).as_posix()
        if rel.split("/")[0] in not_mirror or rel.startswith("."):
            continue
        mirror_routes.add("/" if rel == "index.html" else "/" + rel[: -len(".html")])

    checks += 1
    if mirror_routes != set(routes):
        failures.append(
            f"route set mismatch: only-in-source={sorted(set(routes) - mirror_routes)} "
            f"only-in-mirror={sorted(mirror_routes - set(routes))}"
        )

    for route in routes:
        rel = route_to_file(route)
        raw = src_dir / "raw" / ("index.html" if route == "/" else route.lstrip("/") + ".html")
        got_path = mirror / rel

        checks += 1
        if not got_path.is_file():
            failures.append(f"{route}: mirror file missing ({rel})")
            continue

        source_html = raw.read_text(encoding="utf-8")
        mirror_html = got_path.read_text(encoding="utf-8")

        # Axis 1: byte parity against replayed transforms.
        checks += 1
        expected = apply_export_transforms(source_html)
        if expected != mirror_html:
            failures.append(f"{route}: byte parity failed against replayed export transforms")

        # Compare semantics against the source with only the badge removed. The
        # badge is the single intended difference between source and mirror, so
        # folding it out here keeps this axis independent of the byte replay
        # while still checking the domain and CDN rewrites through canon().
        source_semantic, _ = remove_badge(source_html)
        s = Extract(); s.feed(source_semantic)
        m = Extract(); m.feed(mirror_html)

        # Axis 2: semantic parity.
        checks += 1
        if s.title.strip() != m.title.strip():
            failures.append(f"{route}: title mismatch {s.title.strip()!r} vs {m.title.strip()!r}")

        for key in META_KEYS:
            checks += 1
            if canon(s.meta.get(key, "")) != m.meta.get(key, ""):
                failures.append(
                    f"{route}: meta {key} mismatch "
                    f"{canon(s.meta.get(key, ''))!r} vs {m.meta.get(key, '')!r}"
                )

        checks += 1
        if canon(s.canonical) != m.canonical:
            failures.append(f"{route}: canonical mismatch {canon(s.canonical)!r} vs {m.canonical!r}")

        checks += 1
        if {canon(x) for x in s.links} != m.links:
            failures.append(f"{route}: link set mismatch")

        checks += 1
        if {canon(x) for x in s.images} != m.images:
            failures.append(f"{route}: image set mismatch")

        checks += 1
        if s.text != m.text:
            failures.append(f"{route}: normalized visible text mismatch")

        # Structural checks.
        checks += 1
        if SRC in mirror_html or "framer.website" in mirror_html:
            failures.append(f"{route}: source hostname leaked into mirror")

        checks += 1
        if BADGE_DIV.search(mirror_html):
            failures.append(f"{route}: Framer badge container still present")

        checks += 1
        if 'name="generator" content="Framer' in mirror_html:
            failures.append(f"{route}: Framer generator meta still present")

        asset_refs.update(LOCAL_REF.findall(mirror_html))

    missing_assets = sorted(r for r in asset_refs if not (mirror / r.lstrip("/")).is_file())
    checks += len(asset_refs)
    if missing_assets:
        failures.append(f"{len(missing_assets)} referenced local assets missing: {missing_assets[:5]}")

    result = {
        "routes": len(routes),
        "local_asset_refs": len(asset_refs),
        "checks": checks,
        "failures": failures,
        "ok": not failures,
    }
    if args.json_out:
        Path(args.json_out).write_text(json.dumps(result, indent=2) + "\n")

    print(f"routes={len(routes)} local_asset_refs={len(asset_refs)} checks={checks}")
    for f in failures:
        print("FAIL " + f)
    print("PARITY OK" if not failures else f"PARITY FAILED ({len(failures)} failures)")
    return 0 if not failures else 1


if __name__ == "__main__":
    raise SystemExit(main())
