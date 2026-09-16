#!/usr/bin/env bash
# Mirror the published OG Labs Framer site as a static export.
# Usage: ./export.sh   then: git add -A && git commit && git push
#
# Procedure: Kelin-Studio/klein-workflows/skills/framer-to-vercel
# (SKILL.md + reference/export.sh + reference/remove-framer-badge.py)
# This is the OG Labs variant of that pipeline. It differs from the reference
# in two documented ways, both matching how this repo has always been built:
#   1. Flat output (about.html, services/hubspot.html) rather than
#      about/index.html, because vercel.json sets cleanUrls + trailingSlash false.
#   2. Framer font and JS bundle assets are mirrored locally under assets/ and
#      sites/; only framerusercontent.com/images/* stays on the CDN. The
#      reference script's blanket rewrite of framerusercontent.com/assets/*
#      to a social preview image is NOT applied here: on this site those URLs
#      are woff2 fonts, and rewriting them would destroy every webfont.
set -euo pipefail
export PATH=/usr/bin:/bin:/usr/local/bin:/opt/homebrew/bin:${PATH:-}

# In place sed differs between BSD (macOS) and GNU (Linux CI runners). Wrap it
# so the same pipeline runs unchanged in both places.
if sed --version >/dev/null 2>&1 </dev/null; then
  sedi() { sed -i "$@"; }
else
  sedi() { sed -i '' "$@"; }
fi

# PARAMETERS
# The three endpoints are overridable so the test suite can run this exact
# pipeline against a local fixture site. Defaults are the real ones.
SRC="${SRC:-https://oglabs.framer.website}"   # published Framer site (source of truth)
DST="${DST:-https://orangegrowth.io}"         # canonical domain written into the mirror
# shellcheck disable=SC2034  # documented pipeline parameter, intentionally empty
GA_ID=""                                      # no GA4 tag on this property
CDN="${CDN:-https://framerusercontent.com}"
# Optional ssh target used only to fetch $SRC when this host cannot resolve
# *.framer.website. Example: FRAMER_FETCH_SSH=user@host ./export.sh
FRAMER_FETCH_SSH="${FRAMER_FETCH_SSH:-}"

cd "$(dirname "$0")"
echo "Source: $SRC"
echo "Canonical: $DST"

fetch() { # fetch <url> <outfile>
  if [ -n "$FRAMER_FETCH_SSH" ]; then
    ssh -n -o BatchMode=yes "$FRAMER_FETCH_SSH" "curl -sS -m 60 -A 'Mozilla/5.0' '$1'" > "$2"
  else
    curl -sS -m 60 -A 'Mozilla/5.0' "$1" -o "$2"
  fi
}

# 1. Discover every page from the sitemap.
fetch "$SRC/sitemap.xml" /tmp/og_export_sitemap.xml
paths=$(tr '>' '>\n' < /tmp/og_export_sitemap.xml \
  | grep -oE "${SRC}[^<]*" | tr -d '\r' | sed "s#^$SRC##" | sort -u)

# 2. Mirror each page to its flat path, retrying past Framer's rate-limit shell.
count=0
: > /tmp/og_export_pages.txt
while read -r p; do
  [ -z "$p" ] && p="/"
  if [ "$p" = "/" ]; then out="index.html"; else out="${p#/}.html"; fi
  mkdir -p "$(dirname "$out")"
  for attempt in 1 2 3 4 5; do
    fetch "$SRC$p" "$out"
    # Framer serves a byte-identical homepage shell when it throttles. A real
    # page always carries its own canonical path, so verify that before use.
    want="$SRC$p"; [ "$p" = "/" ] && want="$SRC/"
    if grep -qF "rel=\"canonical\" href=\"$want\"" "$out"; then break; fi
    [ "$attempt" = 5 ] && { echo "FAILED (throttled) $p"; exit 1; }
    sleep 4
  done
  echo "$out" >> /tmp/og_export_pages.txt
  printf '  %8sB  %s\n' "$(wc -c <"$out" | tr -d ' ')" "$out"
  count=$((count+1))
done <<< "$paths"

# 2b. Drop the route files the source no longer publishes.
#
# Step 2 only ever writes the routes named in the current sitemap, so a page
# deleted or unpublished in Framer used to linger in the mirror forever. That
# is not cosmetic. verify-parity.py fails the run on an only-in-mirror route,
# so one deletion in Framer deadlocked the entire pipeline: every later publish
# was detected, exported, and then refused at the parity gate until somebody
# removed the orphan by hand.
#
# Scope: html outside assets/, sites/ and scripts/ is exactly the mirror's own
# route set. scripts/ is excluded because the test fixtures live under it and
# are not routes. The caller stages with `git add -A -- '*.html'`, which picks
# up these deletions.
#
# A truncated sitemap fetch would look exactly like a mass deletion, so refuse
# to prune an implausible share of the site and make a human look instead.
# Both conditions have to hold: a handful of pages is always a plausible
# editorial deletion however small the site is, and a large share is only
# plausible when it is also a small count.
sort -u /tmp/og_export_pages.txt > /tmp/og_export_written.txt
find . -name '*.html' \
  -not -path './assets/*' -not -path './sites/*' \
  -not -path './scripts/*' -not -path './.git/*' \
  | sed 's#^\./##' | sort -u > /tmp/og_export_existing.txt
comm -13 /tmp/og_export_written.txt /tmp/og_export_existing.txt > /tmp/og_export_orphans.txt

orphans=$(grep -c . /tmp/og_export_orphans.txt || true)
existing=$(grep -c . /tmp/og_export_existing.txt || true)
if [ "$orphans" -gt 0 ]; then
  if [ "$orphans" -gt 3 ] && [ $((orphans * 5)) -gt "$existing" ]; then
    echo "REFUSING to prune $orphans of $existing route files:"
    sed 's/^/    /' /tmp/og_export_orphans.txt
    echo "That is too large a share to be an editorial deletion and looks like a"
    echo "truncated sitemap fetch. Nothing was removed."
    exit 1
  fi
  while read -r orphan; do
    [ -z "$orphan" ] && continue
    rm -f "$orphan"
    echo "  - removed $orphan (no longer published by the source)"
  done < /tmp/og_export_orphans.txt
fi

# 3. Strip Framer editor/branding markup and point the mirror at $DST.
while read -r f; do
  sedi \
    -e '/framer-search-index/d' \
    -e '/__framer_force_showing_editorbar_since/d' \
    -e 's|<!-- Made in Framer · framer\.com ✨ -->||' \
    -e 's|<meta name="generator" content="Framer [^"]*">||' \
    -e "s#$SRC#$DST#g" \
    -e "s#$CDN/assets/#/assets/#g" \
    -e "s#$CDN/sites/#/sites/#g" \
    "$f"
done < /tmp/og_export_pages.txt

# 4. Remove Framer's exported branding badge from every mirrored page.
xargs python3 scripts/remove-framer-badge.py < /tmp/og_export_pages.txt

# 5. Mirror any newly referenced font/JS assets that are not yet vendored.
# The loop body runs in a subshell when fed by a pipe, so failures are recorded
# in a file rather than a variable. A failed vendor is fatal: shipping a page
# that references an asset we do not have would break the live site.
xargs grep -hoE '/(assets|sites)/[A-Za-z0-9._/-]+' < /tmp/og_export_pages.txt \
  | sort -u > /tmp/og_export_assets.txt
: > /tmp/og_export_missing.txt
while read -r rel; do
  [ -f ".${rel}" ] && continue
  mkdir -p "$(dirname ".${rel}")"
  if curl -fsS -m 60 "$CDN$rel" -o ".${rel}"; then
    echo "  + vendored $rel"
  else
    rm -f ".${rel}"; echo "  ! FAILED to vendor $rel"; echo "$rel" >> /tmp/og_export_missing.txt
  fi
done < /tmp/og_export_assets.txt
if [ -s /tmp/og_export_missing.txt ]; then
  echo "ERROR: $(wc -l < /tmp/og_export_missing.txt | tr -d ' ') asset(s) failed to vendor" >&2
  exit 1
fi

echo "Done. Mirrored $count pages."
echo "Next: git add -A && git commit -m 'Re-export from Framer' && git push"
