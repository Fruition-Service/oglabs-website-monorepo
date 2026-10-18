import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Preview hosts (SITE_NOINDEX=1) shut crawlers out entirely; oglabs.io allows everything but the
  // content portal (rewritten to oglabs-content, see next.config.ts), which also sends noindex itself.
  if (process.env.SITE_NOINDEX === "1") return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/internal", "/api/"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
