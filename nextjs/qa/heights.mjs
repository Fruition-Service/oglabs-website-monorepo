// Whole-site sweep: page height live vs ours for every route at each width.
//   node qa/heights.mjs [widths=1440,1000,390]      (needs the dev or prod server on OURS_URL)
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
const require = createRequire("/Users/edward/Github/Fruition-Service/fruition-website-monorepo/package.json");
const { chromium } = require("playwright");
const LIVE = process.env.LIVE_URL || "https://oglabs.framer.website";
const OURS = process.env.OURS_URL || "http://localhost:3300";
const ws = (process.argv[2] || "1440,1000,390").split(",").map(Number);
const routes = readFileSync("qa/framer/routes.txt", "utf8").split("\n").filter(Boolean).map((r) => r || "/");
const browser = await chromium.launch({ channel: "chromium" });
async function height(url, w) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
  const p = await ctx.newPage();
  const res = await p.goto(url, { waitUntil: "networkidle", timeout: 120000 });
  const H = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < H; y += 600) { await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(40); }
  await p.waitForTimeout(800);
  const h = await p.evaluate(() => document.documentElement.scrollHeight);
  await ctx.close();
  return [res.status(), h];
}
const jobs = routes.flatMap((r) => ws.map((w) => [r, w]));
const out = [];
let i = 0;
await Promise.all(Array.from({ length: 6 }, async () => { while (i < jobs.length) { const [r, w] = jobs[i++]; const [, a] = await height(LIVE + r, w); const [s, b] = await height(OURS + r, w); out.push([r, w, a, b, s]); } }));
out.sort((x, y) => (x[0] + x[1]).localeCompare(y[0] + y[1]));
let bad = 0;
for (const [r, w, a, b, s] of out) { const ok = a === b && s === 200; if (!ok) bad++; console.log(`${ok ? "ok  " : "DIFF"} ${String(w).padEnd(5)} ${r.padEnd(60)} live ${a}  ours ${b}  (${s})`); }
console.log(`${out.length - bad}/${out.length} match`);
await browser.close();
