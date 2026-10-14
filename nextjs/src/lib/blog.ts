// The blog's data layer. Two sources, merged:
//
//   1. Legacy posts written directly in Framer, now kept in the repo (src/content/posts, LEGACY_POSTS).
//   2. Published HubSpot posts (portal 442278519), fetched live and cached for 5 minutes under the
//      "blog" tag (src/lib/hubspot.ts), so a new HubSpot post shows up without a redeploy.
//
// HubSpot wins on a slug collision. If HubSpot is not configured or unreachable, the Framer copies
// of the HubSpot posts (HUBSPOT_FALLBACK_POSTS) stand in, so a build or render never breaks.
//
// Ordering matches Framer's CMS queries: every list is newest "Published Date" first. The /blogs
// listing shows the newest featured post in the featured card and every non-featured post in the
// grid; home and about show the 3 newest posts; a post page's "More Articles" shows the 3 newest
// posts other than itself (see getMorePosts).
import { cache } from "react";
import type { Post, PostSummary } from "./blog-types";
import { fetchHubSpotPosts, blockedSlugs, type HubSpotBlogPost } from "./hubspot";
import { LEGACY_POSTS, HUBSPOT_FALLBACK_POSTS } from "@/content/posts";

const FRAMER_COPIES: Post[] = [...LEGACY_POSTS, ...HUBSPOT_FALLBACK_POSTS];

/**
 * Author picture and position per author, from the newest Framer item that names them. HubSpot has
 * neither (its author `avatar` is a login-gated app.hubspot.com URL), so a new HubSpot post by a
 * known author reuses what Framer showed for them.
 */
const AUTHORS = (() => {
  const map = new Map<string, Pick<Post, "authorPicture" | "authorPictureAlt" | "authorPosition">>();
  for (const p of [...FRAMER_COPIES].sort(byDateDesc)) {
    const key = p.authorName.trim().toLowerCase();
    if (!map.has(key)) map.set(key, { authorPicture: p.authorPicture, authorPictureAlt: p.authorPictureAlt, authorPosition: p.authorPosition });
  }
  return map;
})();

/**
 * Category for a HubSpot post Framer never saw. On Framer an editor picked it by hand; these are the
 * values they used for HubSpot posts, chosen from the title.
 */
function inferCategory(title: string): string {
  if (/clickup/i.test(title)) return "ClickUp";
  if (/hubspot/i.test(title)) return "HubSpot";
  if (/\bai\b|agent/i.test(title)) return "AI";
  return "News";
}

function fromHubSpot(h: HubSpotBlogPost): Post {
  const framer = FRAMER_COPIES.find((p) => p.slug === h.slug);
  const author = AUTHORS.get(h.authorName.trim().toLowerCase());
  const { authorBio, ...rest } = h;
  return {
    ...rest,
    title: h.title || framer?.title || h.slug,
    description: h.description || framer?.description || "",
    cover: h.cover ?? framer?.cover,
    coverAlt: h.cover ? h.coverAlt : framer?.coverAlt,
    authorName: h.authorName || framer?.authorName || "",
    category: framer?.category ?? inferCategory(h.title),
    featured: framer?.featured ?? false,
    authorPicture: framer?.authorPicture ?? author?.authorPicture,
    authorPictureAlt: framer?.authorPictureAlt ?? author?.authorPictureAlt,
    authorPosition: framer?.authorPosition ?? author?.authorPosition ?? authorBio,
  };
}

function byDateDesc(a: { publishedAt: string }, b: { publishedAt: string }): number {
  return Date.parse(b.publishedAt) - Date.parse(a.publishedAt);
}

/** Every live post with its body, newest first. Deduplicated per request. */
const getAllPosts = cache(async (): Promise<Post[]> => {
  const hubspot = await fetchHubSpotPosts();
  const blocked = blockedSlugs();
  const live = hubspot ? hubspot.map(fromHubSpot) : HUBSPOT_FALLBACK_POSTS;
  const liveSlugs = new Set(live.map((p) => p.slug));
  const legacy = LEGACY_POSTS.filter((p) => !liveSlugs.has(p.slug));
  return [...live, ...legacy].filter((p) => !blocked.includes(p.slug)).sort(byDateDesc);
});

function summary(p: Post): PostSummary {
  // Strip the body so lists stay small when handed to client components.
  const { html, source, ...rest } = p;
  void html;
  void source;
  return rest;
}

/** All posts, newest first, without bodies. */
export async function getPosts(): Promise<PostSummary[]> {
  return (await getAllPosts()).map(summary);
}

/** One post with its body, or null. */
export async function getPost(slug: string): Promise<Post | null> {
  return (await getAllPosts()).find((p) => p.slug === slug) ?? null;
}

/** "More Articles" on a post page: the 3 newest posts whose title differs from this one (Framer's query). */
export async function getMorePosts(post: Pick<PostSummary, "title">, limit = 3): Promise<PostSummary[]> {
  return (await getPosts()).filter((p) => p.title !== post.title).slice(0, limit);
}

/** /blogs: the newest featured post (featured card) and every non-featured post (grid). */
export async function getListing(): Promise<{ featured: PostSummary | null; rest: PostSummary[] }> {
  const posts = await getPosts();
  return { featured: posts.find((p) => p.featured) ?? null, rest: posts.filter((p) => !p.featured) };
}
