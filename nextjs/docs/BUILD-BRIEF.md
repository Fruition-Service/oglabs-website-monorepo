# Build brief: 1:1 Next.js rebuild of oglabs.io

oglabs.io is today a static mirror of the Framer site `https://oglabs.framer.website` (the repo root
of `oglabs-website-monorepo`). This folder rebuilds that Framer site in Next.js 16 (App Router) +
React 19 so it looks and behaves **identically**: same layout at every width, same copy, same images,
same hover / press / appear animations. No redesigns, no "improvements", no copy fixes (copy quirks
such as "Why Cypher" or placeholder FAQ answers stay exactly as Framer has them).

The source of truth is the **Framer publish of 13 Oct 2026** (`oglabs.framer.website`), not the
older mirror on oglabs.io.

## Stack and conventions

- Next.js 16 App Router, React 19, TypeScript, **CSS Modules** (one `X.module.css` next to `X.tsx`).
  No Tailwind. Read `src/app/globals.css` and `src/app/presets.css` first.
- Animation: the `motion` package (`import { motion } from "motion/react"`). Framer springs map
  directly: `{ type: "spring", bounce, duration }` or `{ type: "spring", stiffness, damping, mass }`.
- Breakpoints are Framer's three: desktop `>= 1200px`, tablet `810px..1199.98px`, phone `<= 809.98px`.
  Use `@media (max-width: 1199.98px)` and `@media (max-width: 809.98px)` (desktop-first, like Framer).
- **Colours:** use the `--token-<id>` variables in `globals.css`. They carry Framer's token ids, so
  `var(--token-xxx, #fallback)` from the Framer CSS can be pasted as-is. Fixed one-off colours can
  be literal.
- **Text styles:** Framer's text presets are generated as classes in `presets.css`:
  `.framer-styles-preset-1cvbhx` in the Framer HTML == `className="p-1cvbhx"` here, including the
  tablet/phone overrides. Inline overrides on the Framer element (`--framer-text-color`,
  `--framer-text-alignment`, ...) still have to be applied on top.
- **Images** are already in `public/framer/<file>` (same filename as on framerusercontent.com, capped
  at 2048px). Reference as `/framer/<file>`. Plain `<img>` (next/image optimisation is off). Copy
  `alt`, `srcset`-equivalent sizing and `object-fit`/`object-position` from the Framer markup. If an
  image is missing, download it:
  `curl -o public/framer/<file> "https://framerusercontent.com/images/<file>?scale-down-to=2048"`.
- **Fonts** are self-hosted (`src/app/fonts.css`): Inter, Inter Display, IBM Plex Mono, Geist. Body
  copy uses the Inter feature set in `--ffs-inter`.
- Server components by default; `"use client"` only for interactive parts. Keep copy and data in the
  component or a small typed array at the top of the file.
- Every section root gets `data-section="<Framer layer name>"` (e.g. `data-section="Hero"`) so
  `qa/compare.mjs` can find it. Unnamed Framer wrappers: compare with `@page` instead.
- Links: Framer writes relative hrefs (`./about`, `../services/hubspot`). Use absolute paths
  (`/about`). External links keep `target="_blank"` / `rel` exactly as Framer has them.

## The page frame (already wired)

Every route renders inside `<Page footer="full|compact">` (`src/components/shell/Page.tsx`):
the fixed **Navigation** (overlays the top of the page, `position: fixed`, z-index 10), your
sections, the **Footer**, and the **Grain** texture overlay. Do not add any of those yourself.
Pages that use the compact footer (no big CTA band): `/blogs`, every `/blogs/<slug>`, `/legal/*`.

Shared components (import, do not copy):

| Component | Path | Owner |
|---|---|---|
| `Button` ("Buttons/Primary": Base / Light / Dark / Transparent, Small, Mobile variants) | `src/components/ui/Button.tsx` | shell builder |
| `Badge` ("Elements/Badge": pill + dot + mono label) | `src/components/ui/Badge.tsx` | shell builder |
| `BlogCard` ("Blog/Blog Card") and post data (`getPosts`, `getPost`) | `src/components/blog/BlogCard.tsx`, `src/lib/blog.ts` | blog builder |

They start as stubs with a fixed props contract: build against the props, the owner fills in the
visuals while you work. If you need a prop that is missing, say so in your report instead of
editing another builder's file.

## Reference material (read, do not guess)

| What | Where |
|---|---|
| Live page | `https://oglabs.framer.website<path>` (open it in Playwright, not oglabs.io) |
| Framer SSR HTML for every route, with all Framer CSS (per breakpoint, hover variants) | `qa/framer/<path>.html` (`qa/framer/index.html` = home) |
| Computed style + box dump of every visible element | `qa/ref/<slug>-{1440,1000,390}.json` (slug: `home`, `services-hubspot`, `blogs-<post>`, ...) |
| Readable outline of a dump | `python3 qa/outline.py qa/ref/<slug>-1440.json ["<LayerName>"] [depth]` |
| Framer component source (prettified) | `qa/framer-src/*.js`; which modules a route loads: `qa/framer/route-modules.txt` |

Page modules: home `YBCchfXrqN-…`, about `ZhZ_Eev3…`, contact `isc8sCDM…`, blogs `u0a27kNP…`,
blog post `BT0taiG7…`, legal `LxbXcNVo…`, partnerships `UBtPi9Fz…`, careers `hHxzSqJO…`, regions
`7ifv1YFS…` (au) / `ONzjJpFG…` (nz) / `bf4qdeYk…` (sg) / `8sY7BX5K…` (us), case studies `WXQ0UOEz…`,
industries `jrtNvrnX…` / `Vto6FSYP…` / `XueHGNmt…`, services `08amuyH5…` (ai-automation)
`de2LC7sJ…` (clickup) `ZhgoYQkh…` (hubspot) `2KAHRMUD…` (crm) `3HKsaW48…` (work-mgmt) `nZeLDJmf…`
(integrations) `oGQd9eED…` (ai-workflows) `qQi5eJW3…` (process). Shared shell: `script_main.js`
(Navigation, Footer, Grain, Lenis is present but **off**). Grep `displayName = \`` to find components.
Animation values (`whileHover`, `variants`, `transition`, appear effects such as
`__framer__animate`, `__framer__styleAppearEffectEnabled`, `__framer__presenceInitial`,
`data-framer-appear-id` + the `appear` animation JSON in the HTML) are in these files: port them exactly.

The dumps were taken at 1440/1000/390 wide, 900 tall, after scrolling the whole page (appear
animations finished). The `<a Light>` "Made in Framer" badge in the dumps is Framer's, not the site's:
never rebuild it.

Tips for reading the Framer HTML: each element has a hashed class (`framer-1abc23`); its CSS lives
in the `<style>` blocks of the same file, desktop first, then
`@media (min-width: 810px) and (max-width: 1199.98px)` and `@media (max-width: 809.98px)` overrides
(selectors there are prefixed with a page hash like `.framer-5kPG4`). Inline `style=""` attributes
on the element hold border/radius/background values. `hidden-<id>` classes hide an element at a
breakpoint: each breakpoint's variant of a component exists in the SSR HTML side by side
(`ssr-variant` wrappers). Python + regex over the HTML is the fastest way to pull a rule:
`python3 -c "import re;h=open('qa/framer/index.html').read();print(set(re.findall(r'\.framer-1abc23\{[^}]*\}',h)))"`.

## Verifying (required before you report done)

The dev server runs at http://localhost:3300 (already running; do not start another. If it is down,
run `npm run dev` in this folder in the background). Then:

```bash
node qa/compare.mjs <path> @page 1440,1000,390        # whole page, 900px bands, live left / ours right
node qa/compare.mjs <path> "<LayerName>" 1440,1000,390 # one named section
```

Look at the `qa/out/*-side.png` images with the Read tool. Iterate until page heights match exactly
at all three widths and the bands are indistinguishable: text wraps at the same words, same spacing,
same colours, same image crops. Report the final page heights (live vs ours) per width.

Also check interactions in a Playwright script: hover states, menus, accordions, tabs, carousels,
form focus states. Compare against the live site doing the same thing.

**Forms:** never submit a real form on the live site or to a real endpoint with test data. Every
submission to a live HubSpot or Framer form is a real lead and a real email to the team. Test form
behaviour with Playwright `page.route()` interception only.

Finally `npm run typecheck` and `npm run lint` must pass for your files.

## Ownership rules (several builders work in parallel)

- Edit only the files your task names, plus new files under the folders it names. Never touch
  `src/app/layout.tsx`, `globals.css`, `presets.css`, `fonts.css`, `src/components/shell/Page.tsx`,
  `src/components/shell/Grain.tsx` or another builder's files. If you need a global change, say so in
  your report.
- Put components for your pages under `src/components/<your-folder>/`.
- Do not commit, do not push, do not touch git branches. The lead commits.
