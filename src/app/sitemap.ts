import type { MetadataRoute } from "next"

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://oglabs.io"

const PAGES = [
  "",
  "/about",
  "/blogs",
  "/contact",
  "/careers",
  "/case-studies",
  "/partnerships",
  "/au",
  "/nz",
  "/sg",
  "/industries/construction",
  "/industries/manufacturing",
  "/industries/financial-services",
  "/services/hubspot",
  "/services/clickup",
  "/services/ai-workflows",
  "/services/ai-automation",
  "/services/work-management",
  "/services/advanced-integrations",
  "/services/crm-consultation",
  "/services/process-optimisation",
  "/blogs/introducing-og-labs-digital-transformation-partner-apac",
  "/blogs/how-hubspot-and-clickup-help-teams-work-smarter-not-harder",
  "/blogs/why-integrated-systems-beat-disconnected-tool-stacks",
]

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }))
}
