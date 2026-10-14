# oglabs-website-monorepo

The website for **OG Labs**, live at **https://oglabs.io**.

The site is in the middle of a platform change. Read this first so you work on the right thing:

| | Today (production) | Next (in progress) |
|---|---|---|
| What it is | A **static mirror** of the Framer site `oglabs.framer.website` | A **Next.js 16** rebuild of that same Framer site, 1:1 |
| Where the code is | The repo root of `main`: exported HTML, vendored Framer JS and fonts | `nextjs/` on the `nextjs-rebuild` branch (not merged yet) |
| How content changes | Edit in **Framer**, publish; a GitHub Action re-exports and Vercel deploys | Edit the repo (pages) and **HubSpot** (blog posts) |
| Hosting | Vercel static deploy, behind a Cloudflare Worker on `oglabs.io` | Planned: Cloudflare Workers via OpenNext, like the Senzo and Fruition sites |

When the rebuild ships, this repo will look like
[`senzo-website-monorepo`](https://github.com/Fruition-Service/senzo-website-monorepo) and
[`fruition-website-monorepo`](https://github.com/Fruition-Service/fruition-website-monorepo), and the
Framer export pipeline described below will be retired.

| Doc | Read it for |
|---|---|
| [CLAUDE.md](CLAUDE.md) | Rules and gotchas for anyone (human or AI agent) changing this repo |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | The mirror pipeline end to end, the satellite services, the rebuild and the cut-over plan |

## Do not hand-edit the HTML

Everything at the repo root except `export.sh`, `scripts/`, `.github/`, `vercel.json` and the docs is
**generated**. The next sync overwrites any manual edit to `*.html`, `assets/` or `sites/`. To
change the live site today, change it in Framer and publish.

## Working on the mirror pipeline

Requirements: bash, curl, Python 3, and (for the tests) shellcheck.

```bash
bash scripts/tests/run-tests.sh                 # offline end-to-end tests of export + parity
SKIP_NETWORK_TESTS=1 bash scripts/tests/run-tests.sh   # skip the live redirect check
./export.sh                                     # re-export from Framer into the working tree
```

To force a sync without waiting for the schedule: GitHub → Actions → **Framer source sync** →
Run workflow (`mode: sync`, optionally `force_export: true`), or

```bash
gh workflow run framer-sync.yml -f mode=sync
```

## Working on the Next.js rebuild

```bash
git switch nextjs-rebuild
cd nextjs
npm install
npm run dev          # http://localhost:3300
npm run typecheck && npm run lint
```

The build rules (1:1 parity, Framer tokens and text presets, three Framer breakpoints, never submit a
real form) are in `nextjs/docs/BUILD-BRIEF.md` on that branch.

## Branches

- **`main`** is the production branch for the mirror. The sync workflow pushes generated commits to
  it as `github-actions[bot]`, so always pull before you branch.
- Every push to `main` deploys to oglabs.io through the Vercel GitHub integration.
- **`nextjs-rebuild`** holds the Next.js work. Do not merge it into `main` until the cut-over plan in
  [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md#6-cut-over-plan) is followed: merging it as-is breaks
  the mirror sync.

## Related services (not in this repo)

| Service | What it does |
|---|---|
| `framer-hubspot-sync` (Cloudflare Worker) | Copies HubSpot blog posts into the Framer CMS hourly, republishes Framer, runs a 5-minute blog watchdog |
| `oglabs-framer-poller` (Cloudflare Worker) | Polls Framer every minute and triggers the sync workflow after a publish |
| `oglabs-solution-hero` (Framer code component) | Source for the homepage Solution Finder, pasted into Framer by hand |
| Cloudflare Worker on `oglabs.io` | Proxies to Vercel, enforces HTTPS, 301s `orangegrowth.io`, rewrites canonicals |

See [docs/ARCHITECTURE.md §4](docs/ARCHITECTURE.md#4-satellite-services) for status and ownership.
