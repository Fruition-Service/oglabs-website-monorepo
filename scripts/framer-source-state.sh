#!/usr/bin/env bash
# Read-only probe of the published OG Labs Framer site.
#
# Fetches the sitemap and every route, then writes a source tree that
# scripts/source-fingerprint.py and scripts/verify-parity.py both consume.
# This script never writes into the repository and never mutates the mirror.
#
# Usage: framer-source-state.sh --out DIR
# Env:
#   SRC               source site, defaults to the published OG Labs project
#   FRAMER_FETCH_SSH  optional ssh target used only to fetch $SRC, for hosts
#                     that cannot resolve *.framer.website. Same contract as
#                     export.sh.
set -euo pipefail
export PATH=/usr/bin:/bin:/usr/local/bin:/opt/homebrew/bin:${PATH:-}

SRC="${SRC:-https://oglabs.framer.website}"
FRAMER_FETCH_SSH="${FRAMER_FETCH_SSH:-}"
OUT=""

while [ $# -gt 0 ]; do
  case "$1" in
    --out) OUT="$2"; shift 2 ;;
    *) echo "unknown argument: $1" >&2; exit 2 ;;
  esac
done
[ -n "$OUT" ] || { echo "usage: framer-source-state.sh --out DIR" >&2; exit 2; }

fetch() { # fetch <url> <outfile>
  if [ -n "$FRAMER_FETCH_SSH" ]; then
    ssh -n -o BatchMode=yes "$FRAMER_FETCH_SSH" "curl -sS -m 60 -A 'Mozilla/5.0' '$1'" > "$2"
  else
    curl -sS -m 60 -A 'Mozilla/5.0' "$1" -o "$2"
  fi
}

mkdir -p "$OUT/raw"

fetch "$SRC/sitemap.xml" "$OUT/sitemap.xml"
tr '>' '>\n' < "$OUT/sitemap.xml" \
  | grep -oE "${SRC}[^<]*" | tr -d '\r' | sed "s#^$SRC##" \
  | sed 's#^$#/#' | sort -u > "$OUT/routes.txt"

routes=$(wc -l < "$OUT/routes.txt" | tr -d ' ')
[ "$routes" -gt 0 ] || { echo "sitemap yielded no routes" >&2; exit 1; }
echo "routes discovered: $routes"

while read -r p; do
  [ -z "$p" ] && p="/"
  if [ "$p" = "/" ]; then f="index"; else f="${p#/}"; fi
  mkdir -p "$OUT/raw/$(dirname "$f")"
  # Framer serves a byte identical homepage shell when it throttles. A real
  # page always carries its own canonical path, so verify that before use.
  for attempt in 1 2 3 4 5; do
    fetch "$SRC$p" "$OUT/raw/$f.html"
    want="$SRC$p"; [ "$p" = "/" ] && want="$SRC/"
    if grep -qF "rel=\"canonical\" href=\"$want\"" "$OUT/raw/$f.html"; then break; fi
    [ "$attempt" = 5 ] && { echo "FAILED (throttled) $p" >&2; exit 1; }
    sleep 4
  done
done < "$OUT/routes.txt"

echo "fetched $routes route(s) into $OUT/raw"
