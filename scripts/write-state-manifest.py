#!/usr/bin/env python3
"""Write sync-state.json, the small non secret manifest for the mirror.

Everything it records is derivable from public sources: the published Framer
site, this repository and the public deployment. No credentials, tokens,
project identifiers or account details are written.

Usage:
  write-state-manifest.py --out sync-state.json \\
    --source-state DIR_OR_JSON --parity parity.json --production prod.json \\
    --commit SHA --deployment-id ID --deployment-url URL \\
    --trigger schedule --run-url URL --mirror-dir .
"""

from __future__ import annotations

import argparse
import json
import subprocess
from datetime import datetime, timezone
from pathlib import Path

SCHEMA = 1


def utcnow() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def count_tracked_assets(mirror_dir: str) -> int:
    try:
        out = subprocess.run(
            ["git", "-C", mirror_dir, "ls-files", "assets", "sites"],
            capture_output=True, text=True, check=True,
        ).stdout
        return len([l for l in out.split("\n") if l.strip()])
    except Exception:
        return -1


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", required=True)
    ap.add_argument("--source-state", required=True, help="JSON file from source-fingerprint.py")
    ap.add_argument("--parity", required=True)
    ap.add_argument("--production")
    ap.add_argument("--mirror-dir", default=".")
    ap.add_argument("--commit", default="")
    ap.add_argument("--deployment-id", default="")
    ap.add_argument("--deployment-url", default="")
    ap.add_argument("--trigger", default="")
    ap.add_argument("--run-url", default="")
    ap.add_argument("--change", default="changed", choices=["changed", "no-change"])
    args = ap.parse_args()

    source = json.loads(Path(args.source_state).read_text())
    parity = json.loads(Path(args.parity).read_text())
    production = json.loads(Path(args.production).read_text()) if args.production else {}

    manifest = {
        "schema": SCHEMA,
        "generated_at": utcnow(),
        "source": {
            "url": "https://oglabs.framer.website",
            "build_marker": source.get("build_marker", ""),
            "publish_time": source.get("publish_time", ""),
            "publish_stamp_raw": source.get("publish_stamp_raw", ""),
            "content_fingerprint": source.get("content_fingerprint", ""),
        },
        "sync": {
            "synced_at": utcnow(),
            "result": args.change,
            "trigger": args.trigger,
            "run_url": args.run_url,
            "commit": args.commit,
        },
        "mirror": {
            "route_count": source.get("route_count", 0),
            "local_asset_references": parity.get("local_asset_refs", 0),
            "tracked_asset_files": count_tracked_assets(args.mirror_dir),
        },
        "verification": {
            "parity_checks": parity.get("checks", 0),
            "parity_ok": bool(parity.get("ok")),
            "production_checks": production.get("checks", 0),
            "production_ok": bool(production.get("ok")) if production else False,
            "deployment_status": (
                "verified" if production.get("ok") else ("failed" if production else "not-run")
            ),
            "deployment_id": args.deployment_id,
            "deployment_url": args.deployment_url,
            "hosts": production.get("hosts", []),
        },
    }

    Path(args.out).write_text(json.dumps(manifest, indent=2) + "\n")
    print(json.dumps(manifest, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
