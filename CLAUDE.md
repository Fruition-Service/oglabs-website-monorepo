# OG Labs website

oglabs.io is served by the **Next.js 16 app in `nextjs/`** (cut over 14 Oct 2026): Cloudflare
Worker `oglabs.io` → Vercel project `oglabs-website` (Kelin Studio team, Root Directory `nextjs`,
framework Next.js) → `oglabs-website.vercel.app`. Every push to `main` builds and deploys it.

The static Framer mirror at the repo root (`*.html`, `assets/`, `sites/`, `export.sh`, `scripts/`)
is **retired**: the `framer-sync.yml` workflow is disabled and nothing at the root is served any
more. It stays in the repo only as a rollback target. Content changes no longer happen in Framer.

Start with [nextjs/README.md](nextjs/README.md). Background on the old pipeline:
[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

**This repository is public.** Never commit secret values, tokens, `.env*` files or private account
ids. Name env vars; do not paste them.

## Working on the site

```bash
cd nextjs && npm install
npm run dev                          # http://localhost:3300
npm run typecheck && npm run lint    # must pass before a change is done
npm run build
```
- CSS Modules (no Tailwind). Colours from the `--token-<id>` variables in `globals.css`; text styles
  from the `.p-<id>` presets in `presets.css`. Framer's breakpoints: 1200 / 810, desktop-first.
- Pages were built 1:1 against the Framer publish of 14 Oct 2026 (`nextjs/docs/BUILD-BRIEF.md`).
  `node qa/heights.mjs`, `qa/compare.mjs` and `qa/links.mjs` check parity, links and console errors.
  Intended differences from Framer: the FAQ toggle pill fix, the Company field on `/contact`, and the
  Education and Retail industry pages (+ their nav/footer links).
- Blog: published HubSpot posts (portal 442278519, `src/lib/hubspot.ts`, ISR 5 min) merged with the
  Framer-only posts in `src/content/posts/`. Keep the field-mapping rules in `hubspot.ts` (title is
  `name`, author from `blogAuthorId`, never `authorName`; images via the `/hub/<portal>/hubfs/?width=`
  resize). Env on Vercel: `HUBSPOT_TOKEN`.
- Blog, third source: the content portal at `/internal` (rewritten to Vercel project `oglabs-content`,
  the `oglabs` build of `Kelin-Studio/kelin-content`). Its posts come from `src/lib/pipeline.ts`; a feed
  failure must never throw. `/internal`, `/api/internal`, `/blog-media` and `/content-assets` belong to it.
- Forms post to HubSpot form 8b0a9d02 (fields: firstname, lastname, email, company (required), phone,
  website_form_submission). The footer newsletter still posts to the Framer forms endpoint.

## Gotchas

- **`nextjs/vercel.json` must keep `"framework": "nextjs"`.** Without it the repo-root `vercel.json`
  (the mirror's `framework: null`, `outputDirectory: "."`) wins and the deployment serves `nextjs/`
  as plain files: every page 404s (this took oglabs.io down for ~10 min on 14 Oct).
- **The root `.vercelignore` must never list `nextjs/`**, or uploads lose the app's source.
- **Never submit a real form**, in tests or by hand: every POST to HubSpot is a real lead and an
  email to the founder. Intercept with Playwright `page.route()`.
- **HTTPS, `orangegrowth.io` → oglabs.io redirects live in the Cloudflare Worker** in front of
  Vercel, not in Vercel config. The Worker is `oglabs-vercel-proxy` in the Fruition Services
  Cloudflare account; its source is `cloudflare/oglabs-vercel-proxy/worker.js` (deployed by hand,
  not by CI). `www.oglabs.io` is served too; canonicals point at `https://oglabs.io`.
- **The Worker must never rewrite HTML bodies.** Until 18 Oct 2026 it string-replaced
  `www.oglabs.io` in every page. That shortened a length-prefixed React Server Components chunk
  (`2:T551,...` holding the measurement snippet), so React refused to hydrate and every animated
  heading stayed at opacity 0: the site looked blank. Bodies now stream through untouched; only
  redirect `Location` headers are canonicalized.
- `nextjs/qa/*.mjs` loads Playwright from the Fruition website checkout by absolute path.

## Rollback

In Vercel (`oglabs-website`), promote the last static-mirror production deployment, or set Root
Directory back to empty with framework "Other" and redeploy `main`.
