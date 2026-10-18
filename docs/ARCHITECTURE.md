# OG Labs website: architecture

> **Superseded 14 Oct 2026.** oglabs.io now runs on the Next.js app in `nextjs/` (Vercel project
> `oglabs-website`, Root Directory `nextjs`); see [nextjs/README.md](../nextjs/README.md) and the root
> CLAUDE.md. The Framer mirror described below is retired and `framer-sync.yml` is disabled. This
> document is kept for the history of the old pipeline and the rollback path.

How oglabs.io is built and served today (a Framer mirror), the services around it, the Next.js
rebuild, and how to cut over. Start with the [README](../README.md) if you have not.

> **Accuracy contract.** Checked against `main` (39bbb58) and the live site on the date in the
> footer. Update this file in the same PR as any change it describes.
>
> **This repository is public.** Never put a secret value, token or private account id in this file
> or anywhere else in the repo. Name env vars and secrets; do not paste them.

---

## 1. Production today

```
 editors ──▶ Framer project (oglabs.framer.website) ◀── framer-hubspot-sync ◀── HubSpot blog
                     │ publish
                     ▼
           oglabs-framer-poller (every minute)  ──┐
           GitHub cron (*/15, best effort)  ──────┼──▶ framer-sync.yml (GitHub Actions)
           framer-hubspot-sync dispatch  ─────────┘        │ export.sh → parity gate → commit to main
                                                           ▼
                                               Vercel project "oglabs-website" (static, repo root)
                                                           ▲
 visitors ──▶ oglabs.io / www.oglabs.io ──▶ Cloudflare Worker (HTTPS, orangegrowth.io 301s,
                                            canonical rewrite) ──▶ oglabs-website.vercel.app
```

- **Framer is the source of truth.** Pages, copy and design are edited in Framer. This repo stores
  a byte-verified export of the published Framer site so it can be served from our own domain
  without Framer hosting.
- **36 routes**, one flat `.html` file each: `index.html`, `about.html`, region pages
  (`au`, `nz`, `sg`, `us`), `blogs.html` + `blogs/*.html` (11 posts), `careers`, `case-studies`,
  `contact`, `partnerships`, `industries/*` (3), `legal/*` (3), `services/*` (8).
- `assets/` holds vendored Framer webfonts, `sites/<site-id>/` vendored Framer JS bundles. Images
  stay on `framerusercontent.com`. `images/` is a leftover from the first export and appears
  unreferenced.
- `vercel.json`: `outputDirectory: "."`, `cleanUrls: true`, `trailingSlash: false`, no redirects or
  headers. `.vercelignore` keeps docs and pipeline files out of the deployment.

### 1.1 The Cloudflare Worker in front
`oglabs.io` and `www.oglabs.io` resolve to Cloudflare, where a Worker fetches
`oglabs-website.vercel.app` over HTTPS. It is responsible for:
- **HTTP → HTTPS.** This cannot be done in `vercel.json`: Vercel only ever sees HTTPS from the Worker
  (see PRs #3 to #5).
- **`orangegrowth.io` and `www.orangegrowth.io` → 301 to `https://oglabs.io`** (same path and query).
- **Canonical rewrite.** The exported HTML carries `rel="canonical"` and `og:url` on
  `https://orangegrowth.io/...` (`DST` in `export.sh`, pinned by a test). The Worker rewrites them
  to `oglabs.io` on the way out. `scripts/verify-production.py` asserts this.

**Its source code is not in any repository.** Before changing DNS or the Worker, export its script
from the Cloudflare dashboard and commit it somewhere.

## 2. The sync pipeline

### 2.1 Workflow: `.github/workflows/framer-sync.yml`
Triggers: `schedule` (`*/15 * * * *`) and `workflow_dispatch` (`mode: sync|check`,
`force_export`). One run at a time (`concurrency: framer-sync`, queued). Uses only the built-in
`GITHUB_TOKEN`; there is no Vercel token.

1. **Probe** (read only): `scripts/framer-source-state.sh` downloads the sitemap and every route to a
   temp dir; `scripts/source-fingerprint.py` computes a normalized content fingerprint (the publish
   stamp and generator tag are stripped, because Framer changes them on every republish).
2. **Decide**: export only if the fingerprint or route count differs from `sync-state.json`, or
   `force_export` is set. `check` mode stops here.
3. **Export**: `./export.sh` (§2.2).
4. **Parity gate**: `scripts/verify-parity.py` replays the export on the probed source and checks byte
   parity, semantic parity (title, meta, canonical, links, images, visible text) and structure
   (route set, every local asset present, no `framer.website` leak, no badge). Any failure aborts
   before a commit.
5. **Commit and push** to `main`: "Re-export from Framer (build X, published Y)". Staging is
   `git add -A -- '*.html'` plus `assets sites`.
6. **Wait for Vercel**: the Vercel GitHub App deploys the push; the job polls GitHub deployments for
   that sha and fails if none succeeds.
7. **Verify production**: `scripts/verify-production.py` checks every route on both hosts, 404
   controls, canonicals, every local asset, a sample of CDN images, TLS and the orangegrowth.io
   redirects.
8. **Record**: `scripts/write-state-manifest.py` rewrites `sync-state.json` and commits it ("Update
   Framer sync state manifest"). A real change therefore produces two commits.

On failure, diagnostics are uploaded as an artifact (`sync-diagnostics-<run>-<attempt>`, 14 days).

### 2.2 `export.sh`
Derived from Kelin Studio's `framer-to-vercel` skill, with two OG Labs differences: flat output
(`about.html`, not `about/index.html`) and vendored fonts and JS.
1. Fetch `$SRC/sitemap.xml` and every route, retrying up to 5 times. A page is only accepted if its
   canonical matches the requested path: when Framer throttles, it returns the homepage with
   status 200.
2. **Prune** `*.html` files that are no longer in the sitemap. Refuses if more than 3 files and more
   than 20% of routes would go (a truncated sitemap looks like a mass deletion).
3. Rewrite: drop Framer editor and search-index lines, the "Made in Framer" comment and generator
   meta; `$SRC` → `$DST`; CDN `assets/` and `sites/` → local paths.
4. Remove the Framer badge (`scripts/remove-framer-badge.py`).
5. Download any referenced `assets/` or `sites/` file that is missing. Any failure is fatal.

### 2.3 `sync-state.json`
Schema 1: `source` (URL, build marker, publish time, content fingerprint), `sync` (time, result,
trigger, run URL, commit), `mirror` (route and asset counts), `verification` (parity and production
check counts and results, deployment status). `write-state-manifest.py` refuses to write anything
that looks like a secret or project id.

### 2.4 Tests: `.github/workflows/tests.yml`
Runs on pushes and PRs that touch `export.sh`, `scripts/**` or `.github/workflows/**`: shellcheck,
actionlint, `python3 -m compileall scripts`, then `scripts/tests/run-tests.sh`, which runs the real
export and parity scripts offline against a fixture server (`scripts/tests/fixtures/`), covering
change detection, parity failures, the badge remover, pruning and its guard, and a live check of
the orangegrowth.io redirects.

## 3. Blog content
1. Posts are written in **HubSpot** (OG Labs portal, AP1 region).
2. `framer-hubspot-sync` upserts them hourly into the Framer CMS collection **"Newrsoom"** (sic,
   that is its real name), keyed on a "HubSpot ID" field, and republishes Framer when something
   changed.
3. The mirror pipeline picks up the publish and writes `blogs/<slug>.html`.

Some older posts were written directly in Framer and exist nowhere else. A blocked-slug list in
`framer-hubspot-sync` (`BLOCKED_SLUGS`) plus a 5-minute watchdog keeps withdrawn posts off both the
Framer site and oglabs.io.

## 4. Satellite services

The three folders below sit next to this repo on Edward's machine. **None of them is a git
repository yet.** Put each into its own GitHub repo before handing over.

| Service | Runs on | Schedule | Secrets (names) | Status 2026-10-14 |
|---|---|---|---|---|
| `framer-hubspot-sync` | Cloudflare Worker (Fruition account) | hourly full sync (cron `0 * * * *`, must stay first and unchanged), 5-minute watchdog | `HUBSPOT_TOKEN`, `FRAMER_API_KEY`, `FRAMER_PROJECT_URL`, `SYNC_SECRET`, optional `GITHUB_DISPATCH_TOKEN` | Healthy, watchdog OK. `PRUNE=true` and `AUTO_PUBLISH=true` (publishing republishes the whole Framer project, including unrelated unpublished edits) |
| `oglabs-framer-poller` | Cloudflare Worker (Fruition account) | every minute | `GITHUB_TOKEN` (fine-grained PAT, Actions read/write on this repo), optional `ADMIN_TOKEN` | **Not working**: `GITHUB_TOKEN` is not set, so it has never dispatched |
| `oglabs-solution-hero` | Nowhere: a Framer code component pasted into Framer | none | none | Source of the homepage Solution Finder; its "Get it scoped" form posts real leads to HubSpot |

Both Workers deploy with a wrangler login that can see the Fruition Cloudflare account (on Edward's
machine: `XDG_CONFIG_HOME=~/.wrangler-fruition npx wrangler deploy`).

**Why the poller matters:** GitHub does not honour the `*/15` schedule. Measured gaps were 2 to 6.5
hours, and there were no scheduled runs at all between 2026-09-30 and 2026-10-14. Until the poller
has its token, a Framer publish may not reach oglabs.io for hours. Workaround: run the workflow by
hand after publishing.

## 5. The Next.js rebuild (`nextjs/`, branch `nextjs-rebuild`)

### 5.1 Goal
A 1:1 clone of the Framer publish of 13 October 2026: same layout at every width, same copy, same
animations. No redesigns or copy fixes (Framer quirks such as "Why Cypher" stay). Full rules:
`nextjs/docs/BUILD-BRIEF.md`.

### 5.2 Stack
Next.js 16.2.9, React 19.2.4, TypeScript, **CSS Modules** (no Tailwind), `motion` for animation.
Dev server on port 3300. Scripts: `dev`, `build`, `start`, `lint`, `typecheck`. No tests yet.

### 5.3 Layout
- `src/app/`: one folder per Framer route; `layout.tsx` (metadata base `https://oglabs.io`, `noindex`
  when `SITE_NOINDEX=1`); `globals.css` (Framer colour tokens kept under their Framer ids,
  `--token-<id>`); `presets.css` (Framer text presets as `.p-<id>` classes, with tablet and phone
  overrides); `fonts.css`.
- `src/components/`: `shell/` (`Page`, `Navigation`, `Footer`, `Grain`), `ui/` (`Button`, `Badge`,
  `Logo`), and per-area components (`home/`, `landing/`, `services/`, `careers/`, `partnerships/`,
  `about/`, `blog/`).
- `src/lib/`: `site.ts`, `blog.ts`, `hubspot.ts`. `src/content/posts/`: repo copies of posts.
- `public/fonts/`, `public/framer/`: self-hosted Framer fonts and images.
- `qa/`: Framer reference material (SSR HTML for all 36 routes, prettified Framer component source,
  computed-style dumps at 1440 / 1000 / 390) and parity tools (`compare.mjs`, `dump.mjs`,
  `outline.py`).

Breakpoints are Framer's: desktop ≥ 1200px, tablet 810 to 1199.98px, phone ≤ 809.98px
(desktop-first).

### 5.4 Content model
- **Pages**: copy lives in the components (no CMS), like the Senzo site.
- **Blog**: read live from the HubSpot CMS API (`HUBSPOT_TOKEN`, optional `HUBSPOT_BLOG_ID`) with
  `revalidate: 300` and a `blog` fetch tag, merged with repo copies of the Framer-only posts. HubSpot
  wins on a slug collision. The field-mapping traps already solved in `framer-hubspot-sync` are
  ported (title is `name`; author comes from `blogAuthorId`, never `authorName`, which is the last
  editor; `publishDate` can be the 1970 epoch). `BLOG_BLOCKED_SLUGS` mirrors the sync Worker's
  block list. This removes Framer from the blog path entirely.
- **Blog, third source (18 Oct 2026)**: posts approved in the OG Labs content portal at
  `oglabs.io/internal` (`src/lib/pipeline.ts`, `CONTENT_FEED_TOKEN`, same `blog` tag). The portal is
  the `oglabs` build of `Kelin-Studio/kelin-content` (Vercel project `oglabs-content`), served here by
  the rewrites in `next.config.ts`; it calls `POST /api/revalidate` (`REVALIDATE_SECRET`) on approve,
  edit and unpublish. See `nextjs/README.md`, "Content portal".
- **Forms**: the Solution Finder posts to HubSpot Forms. The footer newsletter still posts to the
  Framer Forms API, which must be replaced before Framer is switched off.

### 5.5 Progress (working tree, 2026-10-14)
| Status | Routes |
|---|---|
| Built | `/blogs`, `/careers`, `/case-studies`, `/partnerships`, `/au`, `/nz`, `/sg`, `/industries/*` (3), `/services/*` (8) |
| Partial | `/` (clients, blog and FAQ sections still placeholders) |
| Stub | `/about`, `/contact`, `/us`, `/legal/*` (3) |
| Missing | `/blogs/[slug]` (the 11 post pages) |
| Shell | Navigation and Grain built, global Footer still a placeholder |

Not started: hosting config, `sitemap.ts`, `robots.ts`, `not-found.tsx`, middleware, redirects,
tests, CI.

### 5.6 Target architecture (to match Senzo and Fruition)
| Concern | Recommendation | Why |
|---|---|---|
| Hosting | OpenNext (`@opennextjs/cloudflare`) on a Cloudflare Worker, `wrangler.jsonc`, `deploy` / `preview` scripts | Same as Senzo and Fruition; lets the Worker that already fronts oglabs.io be replaced by the app itself |
| Cache | KV incremental cache + KV tag cache in `open-next.config.ts` (the Fruition pattern) | The blog uses ISR (`revalidate: 300`). Senzo's static-assets cache cannot serve ISR |
| Redirects | `src/middleware.ts`: www → apex, `orangegrowth.io` → `oglabs.io`; keep `middleware.ts`, not `proxy.ts` (OpenNext rejects the Node runtime) | Moves logic out of the unversioned Worker into the repo |
| SEO | `sitemap.ts`, `robots.ts`, canonicals on `oglabs.io`, unique titles | Fixes the mirror's 404 sitemap and robots, duplicate titles and "Cypher" suffixes |
| Quality | vitest, `tsconfig.ci.json`, `.github/workflows/ci.yml` with typecheck + test + lint, a `CLAUDE.md` like Senzo's | Same gates as the sister repos |
| QA tooling | Add `playwright` as a devDependency | `qa/*.mjs` currently loads it from the Fruition checkout by absolute path |

## 6. Cut-over plan

Merging `nextjs-rebuild` into `main` as it stands **breaks production syncs**:
`nextjs/qa/framer/` contains 36 `.html` reference files, so `export.sh` would treat them as orphan
routes (and refuse to prune, failing every sync) and `verify-parity.py` would report them as extra
routes. Do it in this order instead:

1. Finish the rebuild on `nextjs-rebuild`; pass the compare script at 1440 / 1000 / 390 for every
   route.
2. Add hosting (§5.6) and deploy the app as its own Worker on a preview hostname with `SITE_NOINDEX=1`.
3. Replace the Framer newsletter form; confirm HubSpot blog reads and the watchdog block list.
4. Freeze Framer edits. Point the `oglabs.io` and `www.oglabs.io` routes at the new Worker (keep the
   old Worker script exported so it can be restored in minutes).
5. Verify: every old route 200s, `orangegrowth.io` 301s, canonicals, sitemap, robots.
6. Retire the mirror: disable `framer-sync.yml`, delete `oglabs-framer-poller`, stop
   `framer-hubspot-sync` (keep its watchdog until the block list lives in the app), then replace the
   repo root with the Next.js app (move `nextjs/*` up) in one PR. Consider renaming the mainline to
   `production` to match the sister repos.

Rollback until step 6: point the routes back at the old Worker; the Framer mirror keeps working.

## 7. Known issues

1. `robots.txt` and `sitemap.xml` return 404 on oglabs.io (the mirror only copies sitemap routes).
2. 14 pages share one title; 11 blog posts and 3 legal pages end in "- Cypher - ..." (Framer template
   leftovers). Fix in Framer, or in the rebuild.
3. The raw Vercel origin `oglabs-website.vercel.app` is public and serves canonicals on
   `orangegrowth.io`.
4. Before 2026-10-14 the deployment served the whole repo root, including `export.sh`, `scripts/`
   and a test fixture page. `.vercelignore` now excludes them.

---

*Verified against `main` (39bbb58), the `nextjs-rebuild` working tree and the live site on
2026-10-14.*
