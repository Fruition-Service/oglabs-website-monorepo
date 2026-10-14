# oglabs.io in Next.js

The live oglabs.io (since 14 Oct 2026). Built as a 1:1 rebuild of the OG Labs Framer site
(`oglabs.framer.website`, publish of 14 Oct 2026): same layout at every width, same copy, images and
animations. Deliberate additions since: the Education and Retail industry pages, a Company field on
`/contact`, and the FAQ toggle alignment fix. Next.js 16 (App Router), React 19, CSS Modules, `motion`
for animation.

```bash
npm install
npm run dev        # http://localhost:3300
npm run typecheck
npm run lint
npm run build
```

## Layout

| Path | What |
|---|---|
| `src/components/shell/` | `Page` frame, fixed `Navigation`, `Footer` (`full` / `compact`), `Grain` overlay |
| `src/components/ui/` | `Button` (Framer "Buttons/Primary", 16 variants), `Badge`, `Logo` |
| `src/components/home/` | Home sections, incl. the Solution Finder (`home/finder/`, HubSpot form 8b0a9d02) |
| `src/components/services/` | One template for the eight `/services/*` pages; copy lives in each `page.tsx` |
| `src/components/landing/` | Region (`/au /nz /sg`), industry (incl. education, retail) and case-study pages |
| `src/components/{about,contact,careers,partnerships}/` | Company pages; `/contact` embeds HubSpot form 8b0a9d02 |
| `src/components/blog/`, `src/lib/blog.ts`, `src/lib/hubspot.ts`, `src/content/posts/` | Blog (see below) |
| `src/app/globals.css`, `presets.css`, `fonts.css` | Framer colour tokens (by token id), the 27 Framer text presets as `.p-<id>`, self-hosted fonts |
| `public/framer/` | Every image from framerusercontent.com, same filenames |

Breakpoints are Framer's: desktop `>= 1200px`, tablet `810..1199.98px`, phone `<= 809.98px`.
Copy quirks from the Framer template are kept on purpose (e.g. "Why Cypher", placeholder FAQ
answers, the phone menu's template links). Many interior pages have no tablet/phone layout in Framer
and overflow on narrow screens there too; that is reproduced, not fixed.

## Blog

Posts come from two places, merged newest first:

- **HubSpot** (portal 442278519, AP1): every published post, fetched with ISR (`revalidate` 300s,
  tag `blog`). New posts show up within 5 minutes without a deploy. Read-only `HUBSPOT_TOKEN`.
- **The repo** (`src/content/posts/`): the 7 posts that were written directly in Framer, plus Framer
  copies of the 4 HubSpot posts used only when HubSpot is unreachable.

HubSpot wins when both have a slug. Field rules (title = `name`, author from `blogAuthorId`, 1970
publishDate fallback, cover = featured image else first body image) are ported from
`framer-hubspot-sync`. Optional env: `HUBSPOT_BLOG_ID`, `BLOG_BLOCKED_SLUGS`.

## Env

| Var | Where | Why |
|---|---|---|
| `HUBSPOT_TOKEN` | all | Blog posts from HubSpot (falls back to repo copies without it) |
| `SITE_NOINDEX=1` | preview hosts only | `noindex` meta, `robots.txt` disallow, no HubSpot tracking script |

## Hosting

- **oglabs.io (production, since 14 Oct 2026):** Cloudflare Worker `oglabs.io` → Vercel project
  `oglabs-website` (Kelin Studio team), Root Directory `nextjs`, framework Next.js, env
  `HUBSPOT_TOKEN`. Every push to `main` deploys. `nextjs/vercel.json` pins the framework: the
  repo-root `vercel.json` belongs to the retired static mirror and would otherwise win (all 404s).
- **Preview:** Vercel project `oglabs-next` (scope "edwardzehuazhang's projects"), deployed from this
  folder with `vercel deploy --prod`, `SITE_NOINDEX=1`.
- Rollback: promote the last static-mirror production deployment in Vercel, or set Root Directory
  back to empty with framework "Other" and redeploy `main`.
- Retired: `framer-sync.yml` (disabled). Still running but no longer needed: the
  `oglabs-framer-poller` and `framer-hubspot-sync` Workers.

## Parity checks

`docs/BUILD-BRIEF.md` describes how pages were matched.

```bash
node qa/heights.mjs                                   # every route, page height live vs ours
node qa/compare.mjs /services/hubspot @page 1440,1000,390   # whole page in 900px bands
node qa/compare.mjs / Hero 1440,390                   # one named Framer section
```

Output lands in `qa/out/` (live left, ours right). References: `qa/framer/` (Framer SSR HTML),
`qa/ref/` (computed-style dumps, refresh with `node qa/dump.mjs <route>`), `qa/framer-src/`
(prettified Framer components).
