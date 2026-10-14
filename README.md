# oglabs-website-monorepo

The website for **OG Labs**, live at **https://oglabs.io**.

Since 14 Oct 2026 the site is the **Next.js 16 app in [`nextjs/`](nextjs/)** (App Router, React 19,
CSS Modules). It started as a 1:1 rebuild of the OG Labs Framer site and replaced the static Framer
mirror that used to live at the repo root.

| Doc | Read it for |
|---|---|
| [nextjs/README.md](nextjs/README.md) | The app: layout of the code, blog data, env vars, parity tools |
| [CLAUDE.md](CLAUDE.md) | Rules and gotchas for anyone (human or AI agent) changing this repo |
| [nextjs/docs/BUILD-BRIEF.md](nextjs/docs/BUILD-BRIEF.md) | How the pages were matched to Framer, and the conventions they follow |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | History: the retired Framer mirror pipeline and its satellite services |

**This repository is public.** Never commit secret values, tokens or `.env*` files.

## Quick start

```bash
cd nextjs
npm install
npm run dev                          # http://localhost:3300
npm run typecheck && npm run lint    # must pass before a change is done
npm run build
```

For the blog to load HubSpot posts locally, put `HUBSPOT_TOKEN` in `nextjs/.env.local` (without it the
site falls back to the posts stored in the repo).

## How the site is served

```
oglabs.io ─▶ Cloudflare Worker "oglabs.io" ─▶ Vercel project "oglabs-website" (Kelin Studio team)
              HTTPS, orangegrowth.io 301s       Root Directory: nextjs, framework: Next.js
```

- **Every push to `main` deploys to production.** Pull requests get a Vercel preview deployment
  (behind Vercel login; check it with `vercel curl / --deployment <url> --scope kelin-studio`).
- `nextjs/vercel.json` pins `"framework": "nextjs"`. Keep it: without it the old repo-root
  `vercel.json` (the mirror's static config) wins and every page 404s.
- HTTPS, the `orangegrowth.io` → `oglabs.io` redirects and `www` live in the Cloudflare Worker, not in
  Vercel. Its source is not in this repo.

## Changing the site

| To change | Where |
|---|---|
| Page copy and layout | `nextjs/src/app/<route>/page.tsx` and `nextjs/src/components/` (services and industry pages keep their copy in typed arrays at the top of each `page.tsx`) |
| Navigation and footer links | `nextjs/src/components/shell/Navigation.tsx`, `Footer.tsx` |
| Blog posts | Publish in **HubSpot** (portal 442278519). New posts appear within 5 minutes, no deploy needed |
| A new industry or service page | Copy an existing `page.tsx` in `nextjs/src/app/industries/` or `services/`, then add it to the nav, footer and `nextjs/src/app/sitemap.ts` |
| Site title, description, share image | `nextjs/src/lib/site.ts`; per-page `metadata` exports override them |

Forms (`/contact` and the home Solution Finder) post to HubSpot form `8b0a9d02`. **Never submit them
with test data**: every submission is a real lead and an email to the team. Test with Playwright
`page.route()` interception.

## Checking a change

The QA scripts in `nextjs/qa/` compare against the original Framer site and crawl ours:

```bash
cd nextjs
node qa/links.mjs                                    # every page: internal links, console errors, images
node qa/heights.mjs                                  # page heights vs Framer at 1440/1000/390
node qa/compare.mjs /services/hubspot @page 1440,390 # side-by-side screenshots in qa/out/
OURS_URL=https://oglabs.io node qa/links.mjs         # the same crawl against production
```

They need the dev server running (or `OURS_URL`) and load Playwright from the
`fruition-website-monorepo` checkout.

## Rollback

In Vercel, project `oglabs-website` → Deployments, promote the last good production deployment
(`vercel rollback <url> --scope kelin-studio`). To go back to the static Framer mirror entirely,
set Root Directory to empty and framework to "Other", then redeploy `main`: the mirror files are
still at the repo root for that.

## Repo layout

| Path | What |
|---|---|
| `nextjs/` | **The live site** |
| `*.html`, `blogs/`, `services/`, `industries/`, `legal/`, `assets/`, `sites/` | Retired static Framer export, kept only as a rollback target. Not served |
| `export.sh`, `scripts/`, `sync-state.json`, `.github/workflows/framer-sync.yml` | Retired mirror pipeline (the workflow is disabled) |
| `vercel.json`, `.vercelignore` | Config for the retired mirror deployment; `.vercelignore` must never list `nextjs/` |

## Related services (not in this repo)

| Service | Status |
|---|---|
| Cloudflare Worker on `oglabs.io` | **In use**: proxies to Vercel, enforces HTTPS, 301s `orangegrowth.io` |
| HubSpot portal 442278519 (AP1) | **In use**: blog posts, form 8b0a9d02 leads, site tracking |
| Vercel project `oglabs-next` (Edward's personal scope) | Preview copy used during the rebuild (noindex); can be deleted |
| `framer-hubspot-sync` (Cloudflare Worker) | No longer needed: copied HubSpot posts into Framer for the mirror |
| `oglabs-framer-poller` (Cloudflare Worker) | No longer needed: triggered the mirror sync after a Framer publish |
| `oglabs-solution-hero` | Framer version of the Solution Finder; the site now uses its own port in `nextjs/src/components/home/finder/` |
