// Shared shape of a blog post, whatever its source (legacy Framer CMS post kept in the repo, or a
// HubSpot post fetched at request time). Mirrors the Framer "Newrsoom" collection fields.
export type PostSummary = {
  slug: string;
  title: string;
  description: string;
  /** Absolute URL or /framer/<file> path. */
  cover?: string;
  coverAlt?: string;
  category: "News" | "Productivity" | "Revenue" | "SaaS" | string;
  featured: boolean;
  /** ISO date. */
  publishedAt: string;
  authorName: string;
  authorPosition?: string;
  authorPicture?: string;
  authorPictureAlt?: string;
};

export type Post = PostSummary & {
  /** Body HTML (plain semantic tags, no classes), rendered through the rich-text styles. */
  html: string;
  source: "framer" | "hubspot";
};
