// Posts written in the OG Labs content portal (oglabs.io/internal, the oglabs build of
// Kelin-Studio/kelin-content, Vercel project oglabs-content). Its /api/public/posts lists every
// approved post; approving, editing or taking a post down calls our /api/revalidate, and the cache
// below expires on its own after five minutes anyway. Without CONTENT_FEED_TOKEN (local dev,
// previews) the blog shows only the Framer-era and HubSpot posts.
//
// A feed failure never breaks a page: this instance's last good copy is used, and with none (a cold
// instance, `next build`) the portal's posts are simply absent until the next regeneration finds the
// feed again. Throwing instead would turn every page that lists posts (home included) into a 500 once
// /api/revalidate had expired the cached feed (seen on the Kelin Studio site, 18 Oct 2026).
import type { Post } from "./blog-types";
import { sanitizeBody } from "./hubspot";

export const PORTAL_ORIGIN = (process.env.CONTENT_PORTAL_ORIGIN || "https://oglabs-content-kelin-studio.vercel.app").replace(/\/+$/, "");
const FEED_URL = process.env.CONTENT_FEED_URL || `${PORTAL_ORIGIN}/api/public/posts`;

type FeedPost = {
  slug: string;
  title: string;
  date: string;
  description: string;
  summary: string;
  seoTitle: string;
  category: string;
  author: string;
  image: string;
  imageAlt: string;
  html: string;
};

async function feed(token: string): Promise<FeedPost[]> {
  const res = await fetch(FEED_URL, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    next: { revalidate: 300, tags: ["blog"] },
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`content feed answered ${res.status}`);
  const { posts } = (await res.json()) as { posts: FeedPost[] };
  if (!Array.isArray(posts)) throw new Error("content feed sent no posts array");
  return posts;
}

let lastGood: FeedPost[] | null = null;

/** Approved portal posts in the blog's Post shape. Author picture and position are filled in by blog.ts. */
export async function fetchPipelinePosts(): Promise<Post[]> {
  const token = process.env.CONTENT_FEED_TOKEN;
  if (!token) return [];
  let posts: FeedPost[];
  try {
    posts = lastGood = await feed(token);
  } catch (err) {
    console.error(`[blog] content feed failed, ${lastGood ? "using this instance's last good copy" : "showing the Framer and HubSpot posts only"}: ${err instanceof Error ? err.message : err}`);
    posts = lastGood ?? [];
  }
  return posts
    .filter((p) => /^[a-z0-9-]+$/.test(p.slug) && p.title && p.html)
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      description: p.description || p.summary,
      cover: p.image || undefined,
      coverAlt: p.imageAlt || p.title,
      category: p.category || "News",
      featured: false,
      publishedAt: `${p.date.slice(0, 10)}T00:00:00.000Z`,
      authorName: p.author,
      // The portal writes plain marked HTML; the same allowlist as HubSpot bodies applies.
      html: sanitizeBody(p.html.replace(/https:\/\/oglabs\.io(\/[^"]*)?"/g, (_, path = "/") => `${path}"`)),
      source: "pipeline" as const,
    }));
}
