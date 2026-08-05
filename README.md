# orangegrowth.io — static Framer export

Source: https://oglabs.framer.website
Mode: full-site static mirror

Page HTML is mirrored from the published Framer site; all CSS/JS/fonts/media
load from Framer's public CDNs (framerusercontent.com, app.framerstatic.com).

## Hosting

Fully static — serve the directory as-is (Vercel static, Netlify, Cloudflare
Pages, nginx, etc.). No build step, no rewrites needed.

## Updating

Re-run the mirror against https://oglabs.framer.website after republishing in
Framer.
