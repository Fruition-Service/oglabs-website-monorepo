import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getPosts } from "@/lib/blog";

// Every static Framer route plus every live blog post (legacy + HubSpot). Absolute oglabs.io URLs,
// no trailing slashes. Regenerated with the blog data (5 minutes).
export const revalidate = 300;

const STATIC_ROUTES = [
  "/",
  "/about",
  "/contact",
  "/blogs",
  "/careers",
  "/case-studies",
  "/partnerships",
  "/au",
  "/nz",
  "/sg",
  "/us",
  "/industries/construction",
  "/industries/manufacturing",
  "/industries/financial-services",
  "/services/ai-automation",
  "/services/clickup",
  "/services/hubspot",
  "/services/crm-consultation",
  "/services/work-management",
  "/services/advanced-integrations",
  "/services/ai-workflows",
  "/services/process-optimisation",
  "/legal/terms-of-service",
  "/legal/privacy-policy",
  "/legal/cookies-policy",
];

function url(path: string): string {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  return [
    ...STATIC_ROUTES.map((path) => ({ url: url(path) })),
    ...posts.map((p) => ({ url: url(`/blogs/${p.slug}`), lastModified: p.publishedAt })),
  ];
}
