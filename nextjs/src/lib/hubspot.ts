// Read-only HubSpot CMS client for the blog (portal 442278519, AP1 data centre).
//
// Ports the field mapping (and its traps) from framer-hubspot-sync/src/{hubspot,mapping}.ts, which
// used to copy these posts into Framer:
// - the title is `name`, not `title`;
// - the slug is the last segment of `slug` ("fruition-services-blog/<slug>");
// - the cover is `featuredImage` (when `useFeaturedImage` is not false), else the first body <img>
//   that is not a 1x1 tracking pixel;
// - the byline comes from `blogAuthorId` via /cms/v3/blogs/authors. `authorName` is whoever last
//   MODIFIED the post ("App 51621052 (Framer Blog Sync) for Portal ...") and must never be shown;
// - `publishDate` can be the literal epoch "1970-01-01T00:00:00Z", so anything before 1971 falls
//   back to `created` / `updated`;
// - the description is `metaDescription`, else `postSummary` as plain text.
//
// The sync never mapped Category, Featured, Author Picture or Author Position (HubSpot has no such
// fields); an editor set them by hand in Framer. Those come from the Framer copy of the same post
// (src/content/posts) when there is one, else from defaults derived below.
//
// Every request is cached by Next for 5 minutes under the "blog" tag, so a newly published HubSpot
// post appears within 5 minutes without a redeploy (`revalidateTag("blog")` forces it sooner).
// Nothing here ever writes to HubSpot.
import type { Post } from "./blog-types";

const API = "https://api.hubapi.com/cms/v3/blogs";
const REVALIDATE = 300;
const TIMEOUT_MS = 10_000;

/** Fields requested from HubSpot; keeps each cached page small (Next's fetch cache caps at 2 MB). */
const PROPERTIES = [
  "id", "name", "slug", "state", "currentlyPublished", "postBody", "postSummary", "metaDescription",
  "featuredImage", "featuredImageAltText", "useFeaturedImage", "blogAuthorId", "publishDate", "created",
  "updated", "contentGroupId",
];

type HubSpotPost = {
  id: string;
  name?: string;
  slug?: string;
  state?: string;
  currentlyPublished?: boolean;
  postBody?: string;
  postSummary?: string;
  metaDescription?: string;
  featuredImage?: string;
  featuredImageAltText?: string;
  useFeaturedImage?: boolean;
  blogAuthorId?: string;
  publishDate?: string;
  created?: string;
  updated?: string;
  contentGroupId?: string;
};

type HubSpotAuthor = { id?: string; name?: string; fullName?: string; bio?: string };

/** What HubSpot knows about a post, mapped onto our shape. Framer-only fields are filled later. */
export type HubSpotBlogPost = Omit<Post, "category" | "featured" | "authorPosition" | "authorPicture"> & {
  /** HubSpot author bio, used as the position when no Framer copy says otherwise. */
  authorBio?: string;
};

/**
 * Posts that must never appear, whatever HubSpot says (same backstop as the sync's BLOCKED_SLUGS).
 * Override with BLOG_BLOCKED_SLUGS (comma separated).
 */
export function blockedSlugs(): string[] {
  const raw = process.env.BLOG_BLOCKED_SLUGS ?? "three-hubspot-habits-that-keep-your-crm-trustworthy";
  return raw.split(",").map((s) => s.split("/").filter(Boolean).pop()?.trim().toLowerCase() ?? "").filter(Boolean);
}

async function hubspotGet<T>(url: URL, token: string): Promise<T> {
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    next: { revalidate: REVALIDATE, tags: ["blog"] },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`HubSpot ${res.status} ${res.statusText} for ${url.pathname}`);
  return (await res.json()) as T;
}

async function listPublished(token: string): Promise<HubSpotPost[]> {
  const posts: HubSpotPost[] = [];
  let after: string | undefined;
  for (let page = 0; page < 20; page++) {
    const url = new URL(`${API}/posts`);
    url.searchParams.set("state", "PUBLISHED");
    url.searchParams.set("limit", "100");
    url.searchParams.set("sort", "-publishDate");
    url.searchParams.set("property", PROPERTIES.join(","));
    if (process.env.HUBSPOT_BLOG_ID) url.searchParams.set("contentGroupId", process.env.HUBSPOT_BLOG_ID);
    if (after) url.searchParams.set("after", after);
    const data = await hubspotGet<{ results?: HubSpotPost[]; paging?: { next?: { after?: string } } }>(url, token);
    posts.push(...(data.results ?? []));
    after = data.paging?.next?.after;
    if (!after) break;
  }
  return posts;
}

async function listAuthors(token: string): Promise<Map<string, HubSpotAuthor>> {
  const url = new URL(`${API}/authors`);
  url.searchParams.set("limit", "100");
  try {
    const data = await hubspotGet<{ results?: HubSpotAuthor[] }>(url, token);
    return new Map((data.results ?? []).filter((a) => a.id).map((a) => [a.id as string, a]));
  } catch {
    // Not fatal: bylines fall back to the Framer copy.
    return new Map();
  }
}

/** Last path segment, normalised the way the sync did it. */
export function normalizeSlug(raw: string | undefined, id: string): string {
  const last = (raw ?? "").split("/").filter(Boolean).pop() ?? "";
  const slug = last
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 100);
  return slug || `hubspot-${id}`;
}

const EPOCH_CUTOFF = Date.parse("1971-01-01T00:00:00Z");

function publishDateOf(post: HubSpotPost): string | null {
  for (const candidate of [post.publishDate, post.created, post.updated]) {
    if (!candidate) continue;
    const t = Date.parse(candidate);
    if (Number.isFinite(t) && t > EPOCH_CUTOFF) return new Date(t).toISOString();
  }
  return null;
}

function attr(tag: string, name: string): string | undefined {
  const m = new RegExp(`\\s${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, "i").exec(tag);
  return m ? (m[2] ?? m[3] ?? m[4]) : undefined;
}

/** First usable body image: http(s) only, skipping 1x1 tracking pixels. */
export function firstBodyImage(html: string): { src: string; alt?: string } | null {
  for (const m of html.matchAll(/<img\b[^>]*>/gi)) {
    const src = attr(m[0], "src");
    if (!src || !/^https?:\/\//i.test(src)) continue;
    if (attr(m[0], "width") === "1" || attr(m[0], "height") === "1") continue;
    return { src: decodeEntities(src), alt: attr(m[0], "alt") };
  }
  return null;
}

function decodeEntities(s: string): string {
  return s
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&amp;/g, "&");
}

function toPlainText(html: string, limit = 300): string {
  const text = decodeEntities(html.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
  return text.length > limit ? `${text.slice(0, limit - 1).trimEnd()}…` : text;
}

// Tags kept in a post body; everything else is unwrapped (its text stays) or, for the DROP list,
// removed with its content. Mirrors what Framer's formattedText import kept: semantic tags only, no
// inline styles or HubSpot classes, tables wrapped in <figure>.
const KEEP = new Set([
  "p", "h1", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "li", "strong", "b", "em", "i", "u", "s", "a", "br",
  "blockquote", "table", "thead", "tbody", "tfoot", "tr", "th", "td", "figure", "figcaption", "img", "code",
  "pre", "hr", "sup", "sub", "mark",
]);
const BLOCK = "p|h[1-6]|ul|ol|li|blockquote|table|thead|tbody|tfoot|tr|th|td|figure|figcaption|pre|hr";
const DROP = /<(script|style|iframe|object|embed|form|noscript|svg|video|audio|template)\b[\s\S]*?<\/\1\s*>/gi;
const ATTRS: Record<string, string[]> = {
  a: ["href", "target", "rel"],
  img: ["src", "alt", "width", "height"],
  td: ["colspan", "rowspan"],
  th: ["colspan", "rowspan"],
  ol: ["start"],
};

/** Reduce HubSpot's post HTML to the plain semantic HTML the rich-text styles expect. */
export function sanitizeBody(html: string): string {
  // Source formatting next to block tags is not content (spaces inside inline tags are, and stay).
  let out = html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(DROP, "")
    .replace(new RegExp(`\\s*(</?(?:${BLOCK}|div)\\b[^>]*>)\\s*`, "gi"), "$1");
  // HubSpot's editor writes bold/italic as styled spans; Framer's import turned those into
  // <strong>/<em>. Track what each open <span> became so its </span> closes the same thing.
  const spans: string[] = [];
  out = out.replace(/<\/?([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>/g, (tag, rawName: string) => {
    const name = rawName.toLowerCase();
    if (name === "span") {
      if (tag.startsWith("</")) return spans.pop() ?? "";
      const style = (attr(tag, "style") ?? "").toLowerCase();
      const bold = /font-weight\s*:\s*(bold|[6-9]00)/.test(style);
      const italic = /font-style\s*:\s*italic/.test(style);
      spans.push(`${italic ? "</em>" : ""}${bold ? "</strong>" : ""}`);
      return `${bold ? "<strong>" : ""}${italic ? "<em>" : ""}`;
    }
    if (!KEEP.has(name)) return "";
    if (tag.startsWith("</")) return `</${name}>`;
    const keep: string[] = [];
    for (const a of ATTRS[name] ?? []) {
      const v = attr(tag, a);
      if (v === undefined) continue;
      if ((a === "href" || a === "src") && /^\s*(javascript|data|vbscript):/i.test(decodeEntities(v))) continue;
      keep.push(`${a}="${v.replace(/"/g, "&quot;")}"`);
    }
    if (name === "a" && /^https?:/i.test(attr(tag, "href") ?? "") && !keep.some((k) => k.startsWith("rel="))) {
      if (keep.some((k) => k === 'target="_blank"')) keep.push('rel="noopener"');
    }
    return `<${name}${keep.length ? " " + keep.join(" ") : ""}>`;
  });
  // Framer puts each cell's text in a <p> (the cell itself keeps the page's 12px font, which sizes
  // its 16ch min-width), and wraps every table in a <figure> (its table wrapper).
  out = out.replace(/<(td|th)((?: [^>]*)?)>(?!\s*<(?:p|ul|ol|h[1-6]|blockquote|figure|table)\b)([\s\S]*?)<\/\1>/g, (m, tag, attrs, inner: string) =>
    inner.trim() ? `<${tag}${attrs}><p>${inner}</p></${tag}>` : m,
  );

  out = out.replace(/<table>/g, "<figure><table>").replace(/<\/table>/g, "</table></figure>");
  // The body renders under `white-space: pre-wrap` (as Framer's rich text does), so collapse
  // whitespace runs like a browser would (outside <pre>).
  out = out
    .split(/(<pre>[\s\S]*?<\/pre>)/)
    .map((part) => (part.startsWith("<pre>") ? part : part.replace(/[ \t\r\n\f]+/g, " ")))
    .join("");
  // A block ending in <br> shows that empty line on Framer (its "trailing-break"); a browser would
  // swallow a lone trailing <br>, so add the second one Framer adds.
  out = out.replace(/<br>((?:<\/(?:strong|b|em|i|u|s|a|mark|sup|sub|code)>)*)<\/(p|h[1-6]|li|td|th|blockquote)>/g, "<br>$1<br></$2>");
  return out.trim();
}

/**
 * Published HubSpot posts, mapped. Returns null when HubSpot is not configured or not reachable, so
 * the caller can fall back to the repo copies. Never throws.
 */
export async function fetchHubSpotPosts(): Promise<HubSpotBlogPost[] | null> {
  const token = process.env.HUBSPOT_TOKEN;
  if (!token) return null;
  try {
    const [posts, authors] = await Promise.all([listPublished(token), listAuthors(token)]);
    const blocked = blockedSlugs();
    const now = Date.now();
    const out: HubSpotBlogPost[] = [];
    for (const p of posts) {
      if (p.state && p.state !== "PUBLISHED") continue;
      if (p.currentlyPublished === false) continue;
      const slug = normalizeSlug(p.slug, p.id);
      if (blocked.includes(slug)) continue;
      const publishedAt = publishDateOf(p);
      if (!publishedAt || Date.parse(publishedAt) > now) continue;
      const body = p.postBody ?? "";
      const featured = p.useFeaturedImage === false ? null : p.featuredImage || null;
      const cover = featured ? { src: featured, alt: p.featuredImageAltText } : firstBodyImage(body);
      const author = p.blogAuthorId ? authors.get(p.blogAuthorId) : undefined;
      out.push({
        slug,
        title: (p.name ?? "").trim(),
        description: p.metaDescription?.trim() ? p.metaDescription.trim() : toPlainText(p.postSummary ?? ""),
        cover: cover?.src,
        coverAlt: cover?.alt || undefined,
        publishedAt,
        authorName: (author?.name || author?.fullName || "").trim(),
        authorBio: author?.bio?.trim() || undefined,
        html: sanitizeBody(body),
        source: "hubspot",
      });
    }
    return out;
  } catch (err) {
    console.warn(`[blog] HubSpot unavailable, using the repo copies: ${(err as Error).message}`);
    return null;
  }
}
