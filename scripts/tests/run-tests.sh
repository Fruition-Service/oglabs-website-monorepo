#!/usr/bin/env bash
# Test suite for the OG Labs Framer sync automation.
#
# Everything except the redirect regression runs offline against a local
# fixture site served on ephemeral ports, so the real export pipeline is
# exercised end to end without touching production or publishing fake content.
#
# Usage: scripts/tests/run-tests.sh
# Env:   SKIP_NETWORK_TESTS=1  skip the live Orange Growth redirect regression
set -uo pipefail
export PATH=/usr/bin:/bin:/usr/local/bin:/opt/homebrew/bin:${PATH:-}

REPO="$(cd "$(dirname "$0")/../.." && pwd)"
FIXTURES="$REPO/scripts/tests/fixtures"
WORK="$(mktemp -d "${TMPDIR:-/tmp}/oglabs-tests.XXXXXX")"
PASS=0
FAIL=0
declare -a FAILURES=()

cleanup() {
  exec 2>/dev/null
  for pid in "${SITE_PID:-}" "${CDN_PID:-}"; do
    [ -n "$pid" ] || continue
    kill "$pid"
    wait "$pid"
  done
  rm -rf "$WORK"
}
trap cleanup EXIT

ok()   { PASS=$((PASS+1)); printf '  ok   %s\n' "$1"; }
bad()  { FAIL=$((FAIL+1)); FAILURES+=("$1"); printf '  FAIL %s\n' "$1"; [ -n "${2:-}" ] && printf '       %s\n' "$2"; }
check(){ if [ "$2" = "$3" ]; then ok "$1"; else bad "$1" "expected [$3] got [$2]"; fi; }
section(){ printf '\n== %s\n' "$1"; }

fingerprint() { python3 "$REPO/scripts/source-fingerprint.py" --source-dir "$1" --summary; }
field()       { python3 -c 'import json,sys;print(json.load(sys.stdin).get(sys.argv[1],""))' "$1"; }

# ---------------------------------------------------------------------------
section 'static checks on the helper scripts'

for f in "$REPO/export.sh" "$REPO/scripts/framer-source-state.sh" "$REPO/scripts/tests/run-tests.sh"; do
  if bash -n "$f" 2>/dev/null; then ok "bash syntax $(basename "$f")"; else bad "bash syntax $(basename "$f")"; fi
done
for f in "$REPO"/scripts/*.py "$REPO"/scripts/tests/*.py; do
  if python3 -m py_compile "$f" 2>/dev/null; then ok "python syntax $(basename "$f")"; else bad "python syntax $(basename "$f")"; fi
done
# Workflow YAML. PyYAML is not in the macOS system python, so a missing parser
# is a skip rather than a failure. CI installs it and also runs actionlint,
# which is the authoritative check on workflow and action syntax.
if python3 -c 'import yaml' 2>/dev/null; then
  for f in "$REPO"/.github/workflows/*.yml; do
    if python3 -c "import yaml,sys;yaml.safe_load(open(sys.argv[1]))" "$f" 2>/dev/null; then
      ok "workflow yaml $(basename "$f")"
    else
      bad "workflow yaml $(basename "$f")" "$(python3 -c "import yaml,sys;yaml.safe_load(open(sys.argv[1]))" "$f" 2>&1 | tail -3)"
    fi
  done
else
  printf '  skip workflow yaml parse (pyyaml not installed)\n'
fi

# The pipeline must never introduce the source hostname into a shipped page,
# and the two scripts that rewrite it must agree on the target domain.
if grep -q 'DST:-https://orangegrowth.io' "$REPO/export.sh"; then
  ok 'export.sh canonical domain default unchanged'
else
  bad 'export.sh canonical domain default unchanged'
fi

# ---------------------------------------------------------------------------
section 'start the fixture site and cdn'

mkdir -p "$WORK/site"
cp -R "$FIXTURES/site-a/." "$WORK/site/"

CDN_PORT_FILE="$WORK/cdn.port"
python3 "$REPO/scripts/tests/fixture-server.py" --dir "$FIXTURES/cdn" --base '' --cdn '' > "$CDN_PORT_FILE" 2>/dev/null &
CDN_PID=$!
for _ in $(seq 1 50); do [ -s "$CDN_PORT_FILE" ] && break; sleep 0.1; done
CDN_PORT="$(cat "$CDN_PORT_FILE")"
CDN_URL="http://127.0.0.1:$CDN_PORT"

SITE_PORT_FILE="$WORK/site.port"
python3 "$REPO/scripts/tests/fixture-server.py" --dir "$WORK/site" --base "http://127.0.0.1:1" --cdn "$CDN_URL" > "$SITE_PORT_FILE" 2>/dev/null &
SITE_PID=$!
for _ in $(seq 1 50); do [ -s "$SITE_PORT_FILE" ] && break; sleep 0.1; done
SITE_PORT="$(cat "$SITE_PORT_FILE")"
SITE_URL="http://127.0.0.1:$SITE_PORT"
# The server needs to know its own base to substitute into canonical links,
# which it cannot know until it has bound a port. Restart it with the real base.
kill "$SITE_PID" 2>/dev/null; wait "$SITE_PID" 2>/dev/null
python3 "$REPO/scripts/tests/fixture-server.py" --dir "$WORK/site" --port "$SITE_PORT" --base "$SITE_URL" --cdn "$CDN_URL" > /dev/null 2>&1 &
SITE_PID=$!
for _ in $(seq 1 50); do curl -fsS -m 2 "$SITE_URL/sitemap.xml" >/dev/null 2>&1 && break; sleep 0.1; done

if curl -fsS -m 5 "$SITE_URL/about" | grep -q "canonical\" href=\"$SITE_URL/about\""; then
  ok 'fixture site serves extensionless routes with correct canonical'
else
  bad 'fixture site serves extensionless routes with correct canonical'
fi

export SRC="$SITE_URL"
export CDN="$CDN_URL"
export DST='https://orangegrowth.io'

# ---------------------------------------------------------------------------
section 'source detection'

"$REPO/scripts/framer-source-state.sh" --out "$WORK/src-a" >/dev/null 2>&1
STATE_A="$(fingerprint "$WORK/src-a")"
FP_A="$(printf '%s' "$STATE_A" | field content_fingerprint)"

check 'detection reads the build marker'  "$(printf '%s' "$STATE_A" | field build_marker)" 'aaa1111'
check 'detection normalizes publish time' "$(printf '%s' "$STATE_A" | field publish_time)" '2026-08-01T01:00:00Z'
check 'detection finds every sitemap route' "$(printf '%s' "$STATE_A" | field route_count)" '2'
if [ -n "$FP_A" ]; then ok 'detection produces a fingerprint'; else bad 'detection produces a fingerprint'; fi

# Republishing without editing anything moves the publish stamp only. That must
# not read as a change, which is the whole reason the stamp is excluded.
cp -R "$WORK/src-a" "$WORK/src-restamped"
find "$WORK/src-restamped/raw" -name '*.html' -exec \
  perl -pi -e 's/<!-- Published Aug 1, 2026, 1:00 AM UTC -->/<!-- Published Aug 2, 2026, 9:30 PM UTC -->/' {} +
STATE_RESTAMP="$(fingerprint "$WORK/src-restamped")"
check 'publish stamp alone is not a change' \
  "$(printf '%s' "$STATE_RESTAMP" | field content_fingerprint)" "$FP_A"
check 'restamped source still reports its new publish time' \
  "$(printf '%s' "$STATE_RESTAMP" | field publish_time)" '2026-08-02T21:30:00Z'

# A Framer platform bump moves the generator build id without changing output.
cp -R "$WORK/src-a" "$WORK/src-rebuild"
find "$WORK/src-rebuild/raw" -name '*.html' -exec \
  perl -pi -e 's/content="Framer aaa1111"/content="Framer zzz9999"/' {} +
STATE_REBUILD="$(fingerprint "$WORK/src-rebuild")"
check 'build marker alone is not a change' \
  "$(printf '%s' "$STATE_REBUILD" | field content_fingerprint)" "$FP_A"
check 'rebuilt source still reports its new build marker' \
  "$(printf '%s' "$STATE_REBUILD" | field build_marker)" 'zzz9999'

# Inconsistent markers across routes mean a partially published site. Refuse it.
cp -R "$WORK/src-a" "$WORK/src-split"
perl -pi -e 's/content="Framer aaa1111"/content="Framer bbb2222"/' "$WORK/src-split/raw/about.html"
if fingerprint "$WORK/src-split" >/dev/null 2>&1; then
  bad 'inconsistent build markers across routes are rejected'
else
  ok 'inconsistent build markers across routes are rejected'
fi

# ---------------------------------------------------------------------------
section 'export and parity on unchanged source'

MIRROR="$WORK/mirror"
mkdir -p "$MIRROR"
cp "$REPO/export.sh" "$MIRROR/export.sh"
cp -R "$REPO/scripts" "$MIRROR/scripts"
( cd "$MIRROR" && ./export.sh >"$WORK/export1.log" 2>&1 )
check 'export exits clean on the fixture site' "$?" '0'

if [ -f "$MIRROR/index.html" ] && [ -f "$MIRROR/about.html" ]; then
  ok 'export mirrors every route to a flat path'
else
  bad 'export mirrors every route to a flat path'
fi
if [ -f "$MIRROR/sites/fixture/app.AAAA1111.mjs" ] && [ -f "$MIRROR/assets/Fixture-Font.woff2" ]; then
  ok 'export vendors referenced assets locally'
else
  bad 'export vendors referenced assets locally'
fi
if grep -q '__framer-badge-container' "$MIRROR/index.html"; then
  bad 'export removes the Framer badge'
else
  ok 'export removes the Framer badge'
fi
if grep -q 'name="generator" content="Framer' "$MIRROR/index.html"; then
  bad 'export removes the Framer generator meta'
else
  ok 'export removes the Framer generator meta'
fi
if grep -q "$SITE_URL" "$MIRROR/index.html"; then
  bad 'export rewrites the source host to the canonical domain'
else
  ok 'export rewrites the source host to the canonical domain'
fi
if grep -q 'href="https://orangegrowth.io/"' "$MIRROR/index.html"; then
  ok 'export writes the canonical domain into links'
else
  bad 'export writes the canonical domain into links'
fi

python3 "$REPO/scripts/verify-parity.py" --source-dir "$WORK/src-a" --mirror-dir "$MIRROR" \
  --json "$WORK/parity-a.json" >"$WORK/parity-a.log" 2>&1
check 'parity passes on a freshly exported mirror' "$?" '0'

# ---------------------------------------------------------------------------
section 'no change idempotency'

find "$MIRROR" -name '*.html' -exec shasum -a 256 {} + | sed "s#$MIRROR##" | sort > "$WORK/mirror-1.sha"
( cd "$MIRROR" && ./export.sh >"$WORK/export2.log" 2>&1 )
check 'second export against unchanged source exits clean' "$?" '0'
find "$MIRROR" -name '*.html' -exec shasum -a 256 {} + | sed "s#$MIRROR##" | sort > "$WORK/mirror-2.sha"
if cmp -s "$WORK/mirror-1.sha" "$WORK/mirror-2.sha"; then
  ok 're-running the export against unchanged source produces no diff'
else
  bad 're-running the export against unchanged source produces no diff' "$(diff "$WORK/mirror-1.sha" "$WORK/mirror-2.sha" | head -5)"
fi

"$REPO/scripts/framer-source-state.sh" --out "$WORK/src-a2" >/dev/null 2>&1
check 'refetched unchanged source has the same fingerprint' \
  "$(fingerprint "$WORK/src-a2" | field content_fingerprint)" "$FP_A"

# ---------------------------------------------------------------------------
section 'generated diff handling on a real content change'

cp -R "$FIXTURES/site-b/." "$WORK/site/"
"$REPO/scripts/framer-source-state.sh" --out "$WORK/src-b" >/dev/null 2>&1
STATE_B="$(fingerprint "$WORK/src-b")"
FP_B="$(printf '%s' "$STATE_B" | field content_fingerprint)"

if [ "$FP_A" != "$FP_B" ]; then
  ok 'a real content change moves the fingerprint'
else
  bad 'a real content change moves the fingerprint'
fi
check 'the changed build kept the same build marker' "$(printf '%s' "$STATE_B" | field build_marker)" 'aaa1111'
check 'the changed build kept the same publish stamp' "$(printf '%s' "$STATE_B" | field publish_time)" '2026-08-01T01:00:00Z'

# The stale mirror must fail parity against the new source. This is the gate
# that stops a bad or partial export from ever being pushed.
python3 "$REPO/scripts/verify-parity.py" --source-dir "$WORK/src-b" --mirror-dir "$MIRROR" \
  --json "$WORK/parity-stale.json" >"$WORK/parity-stale.log" 2>&1
check 'parity fails when the mirror is stale against the source' "$?" '1'
if grep -q 'normalized visible text mismatch' "$WORK/parity-stale.log"; then
  ok 'stale mirror failure names the text mismatch'
else
  bad 'stale mirror failure names the text mismatch' "$(head -5 "$WORK/parity-stale.log")"
fi

( cd "$MIRROR" && ./export.sh >"$WORK/export3.log" 2>&1 )
check 'export against the changed source exits clean' "$?" '0'
if grep -q 'BBBB2222' "$MIRROR/index.html" && [ -f "$MIRROR/sites/fixture/app.BBBB2222.mjs" ]; then
  ok 'export picks up the new bundle and vendors it'
else
  bad 'export picks up the new bundle and vendors it'
fi
if grep -q 'The revised home copy' "$MIRROR/index.html"; then
  ok 'export picks up the changed page copy'
else
  bad 'export picks up the changed page copy'
fi
python3 "$REPO/scripts/verify-parity.py" --source-dir "$WORK/src-b" --mirror-dir "$MIRROR" \
  --json "$WORK/parity-b.json" >"$WORK/parity-b.log" 2>&1
check 'parity passes once the mirror is re-exported' "$?" '0'

# ---------------------------------------------------------------------------
section 'parity catches damaged mirrors'

cp "$MIRROR/index.html" "$WORK/index.keep"
rm -f "$MIRROR/sites/fixture/app.BBBB2222.mjs"
python3 "$REPO/scripts/verify-parity.py" --source-dir "$WORK/src-b" --mirror-dir "$MIRROR" \
  >"$WORK/parity-missing.log" 2>&1
check 'parity fails when a referenced local asset is missing' "$?" '1'
grep -q 'referenced local assets missing' "$WORK/parity-missing.log" \
  && ok 'missing asset failure is named' || bad 'missing asset failure is named'
cp "$FIXTURES/cdn/sites/fixture/app.BBBB2222.mjs" "$MIRROR/sites/fixture/app.BBBB2222.mjs"

perl -pi -e "s#https://orangegrowth\\.io/\"#$SITE_URL/\"#" "$MIRROR/index.html"
python3 "$REPO/scripts/verify-parity.py" --source-dir "$WORK/src-b" --mirror-dir "$MIRROR" \
  >"$WORK/parity-leak.log" 2>&1
check 'parity fails when the source host leaks into the mirror' "$?" '1'
grep -q 'source hostname leaked' "$WORK/parity-leak.log" \
  && ok 'host leak failure is named' || bad 'host leak failure is named'
cp "$WORK/index.keep" "$MIRROR/index.html"

rm -f "$MIRROR/about.html"
python3 "$REPO/scripts/verify-parity.py" --source-dir "$WORK/src-b" --mirror-dir "$MIRROR" \
  >"$WORK/parity-route.log" 2>&1
check 'parity fails when a route is missing from the mirror' "$?" '1'
grep -q 'route set mismatch' "$WORK/parity-route.log" \
  && ok 'route set failure is named' || bad 'route set failure is named'

# ---------------------------------------------------------------------------
section 'badge remover'

python3 "$REPO/scripts/remove-framer-badge.py" "$WORK/index.keep" >"$WORK/badge1.log" 2>&1
check 'badge remover is safe to re-run on an already cleaned page' \
  "$(grep -o 'Removed [0-9]*' "$WORK/badge1.log" | awk '{print $2}')" '0'
cp "$FIXTURES/site-a/index.html" "$WORK/badge-fixture.html"
python3 "$REPO/scripts/remove-framer-badge.py" "$WORK/badge-fixture.html" >"$WORK/badge2.log" 2>&1
check 'badge remover removes exactly one badge container' \
  "$(grep -o 'Removed [0-9]*' "$WORK/badge2.log" | awk '{print $2}')" '1'

# ---------------------------------------------------------------------------
section 'state manifest'

python3 "$REPO/scripts/write-state-manifest.py" --out "$WORK/state.json" \
  --source-state <(fingerprint "$WORK/src-b") --parity "$WORK/parity-b.json" \
  --mirror-dir "$MIRROR" --commit deadbeef --trigger workflow_dispatch \
  --run-url https://example.invalid/run --change changed >/dev/null 2>&1
check 'manifest writer exits clean' "$?" '0'
for key in '.source.build_marker' '.source.publish_time' '.source.content_fingerprint' \
           '.sync.synced_at' '.sync.commit' '.mirror.route_count' \
           '.mirror.local_asset_references' '.verification.parity_checks' \
           '.verification.deployment_status'; do
  v="$(python3 -c '
import json,sys
d=json.load(open(sys.argv[1]))
for part in sys.argv[2].strip(".").split("."): d=d.get(part, "")
print(d)' "$WORK/state.json" "$key")"
  if [ -n "$v" ]; then ok "manifest carries $key"; else bad "manifest carries $key"; fi
done
if grep -qiE 'token|secret|password|prj_|team_' "$WORK/state.json"; then
  bad 'manifest contains no credentials or project identifiers'
else
  ok 'manifest contains no credentials or project identifiers'
fi

# ---------------------------------------------------------------------------
section 'Orange Growth redirect regression'

if [ "${SKIP_NETWORK_TESTS:-0}" = '1' ]; then
  printf '  skip network redirect regression (SKIP_NETWORK_TESTS=1)\n'
else
  for probe in '/' '/services/hubspot' '/blogs?utm_source=test&utm_medium=probe' '/contact?q=a%20b' '/au?empty='; do
    for host in orangegrowth.io www.orangegrowth.io; do
      loc="$(curl -sS -m 25 -o /dev/null -D - "https://$host$probe" 2>/dev/null | tr -d '\r' | awk 'tolower($1)=="location:"{print $2}')"
      code="$(curl -sS -m 25 -o /dev/null -w '%{http_code}' "https://$host$probe" 2>/dev/null)"
      if [ "$code" = '301' ] && [ "$loc" = "https://oglabs.io$probe" ]; then
        ok "redirect $host$probe preserves path and query"
      else
        bad "redirect $host$probe preserves path and query" "code=$code location=$loc"
      fi
    done
  done
fi

# ---------------------------------------------------------------------------
printf '\n%s\n' '-----------------------------------------'
printf 'passed: %d  failed: %d\n' "$PASS" "$FAIL"
if [ "$FAIL" -gt 0 ]; then
  printf '\nfailures:\n'
  for f in "${FAILURES[@]}"; do printf '  - %s\n' "$f"; done
  exit 1
fi
exit 0
