#!/usr/bin/env python3
"""Derive the source change signal from a fetched Framer source tree.

Pure function over a directory, so it is testable offline against fixtures.
Input layout is what scripts/framer-source-state.sh writes:

    routes.txt          one route path per line, sorted
    raw/<flat>.html     raw source HTML per route

Emits JSON on stdout describing the current source state:

    build_marker        Framer generator build id, e.g. "eb3d845"
    publish_time        publish stamp normalized to ISO 8601 UTC
    content_fingerprint sha256 over every route's normalized content

The fingerprint deliberately excludes the publish stamp and the generator meta
tag. Framer rewrites the publish stamp on every republish even when nothing
changed, and it has been observed to keep the same generator build id across
builds whose output genuinely differs. Neither marker is trustworthy alone, so
the fingerprint is what decides whether an export runs.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

PUBLISHED = re.compile(r"^<!-- Published (.+?) -->\s*$", re.MULTILINE)
GENERATOR = re.compile(r'<meta name="generator" content="Framer ([^"]*)">')
STAMP_FORMAT = "%b %d, %Y, %I:%M %p UTC"


def route_to_raw(route: str) -> str:
    return "index.html" if route == "/" else route.lstrip("/") + ".html"


def normalize(html: str) -> str:
    """Strip the two volatile markers, keep everything else."""
    html = PUBLISHED.sub("", html)
    return GENERATOR.sub("", html)


def parse_publish_time(stamp: str) -> str:
    return (
        datetime.strptime(stamp.strip(), STAMP_FORMAT)
        .replace(tzinfo=timezone.utc)
        .strftime("%Y-%m-%dT%H:%M:%SZ")
    )


def collect(source_dir: Path) -> dict:
    routes = [r.strip() for r in (source_dir / "routes.txt").read_text().split("\n") if r.strip()]
    if not routes:
        raise SystemExit("no routes found in routes.txt")

    per_route = []
    builds: set[str] = set()
    stamps: set[str] = set()
    digest = hashlib.sha256()

    for route in sorted(routes):
        path = source_dir / "raw" / route_to_raw(route)
        html = path.read_text(encoding="utf-8")

        build = GENERATOR.search(html)
        stamp = PUBLISHED.search(html)
        if build:
            builds.add(build.group(1))
        if stamp:
            stamps.add(stamp.group(1))

        route_hash = hashlib.sha256(normalize(html).encode("utf-8")).hexdigest()
        digest.update(route.encode("utf-8") + b"\0" + route_hash.encode("ascii") + b"\n")
        per_route.append({"route": route, "sha256": route_hash, "bytes": len(html)})

    if len(builds) > 1:
        raise SystemExit(f"inconsistent build markers across routes: {sorted(builds)}")
    if len(stamps) > 1:
        raise SystemExit(f"inconsistent publish stamps across routes: {sorted(stamps)}")

    stamp_raw = next(iter(stamps), "")
    return {
        "build_marker": next(iter(builds), ""),
        "publish_stamp_raw": stamp_raw,
        "publish_time": parse_publish_time(stamp_raw) if stamp_raw else "",
        "route_count": len(routes),
        "routes": sorted(routes),
        "content_fingerprint": digest.hexdigest(),
        "per_route": per_route,
    }


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--source-dir", required=True)
    ap.add_argument("--summary", action="store_true", help="omit the per route detail")
    args = ap.parse_args()

    state = collect(Path(args.source_dir))
    if args.summary:
        state.pop("per_route", None)
    json.dump(state, sys.stdout, indent=2)
    sys.stdout.write("\n")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
