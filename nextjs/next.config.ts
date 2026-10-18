import type { NextConfig } from "next";

// The OG Labs content portal: the oglabs build of Kelin-Studio/kelin-content (Vercel project
// oglabs-content, Kelin Studio team). Its pages, sign-in API, uploaded images and assets are
// served under oglabs.io by the rewrites below, the same way groovesheet.net/internal works.
const PORTAL = (process.env.CONTENT_PORTAL_ORIGIN || "https://oglabs-content-kelin-studio.vercel.app").replace(/\/+$/, "");

const nextConfig: NextConfig = {
  trailingSlash: false,
  images: { unoptimized: true },
  // The static Framer mirror this replaces served flat files (about.html, services/hubspot.html)
  // behind Vercel cleanUrls; keep any old .html links landing on the clean route.
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/:path*.html", destination: "/:path*", permanent: true },
    ];
  },
  async rewrites() {
    return [
      { source: "/internal", destination: `${PORTAL}/internal` },
      { source: "/internal/:path*", destination: `${PORTAL}/internal/:path*` },
      { source: "/api/internal/:path*", destination: `${PORTAL}/api/internal/:path*` },
      // The portal is built with assetPrefix /content-assets, so its chunks never collide with ours.
      { source: "/content-assets/:path*", destination: `${PORTAL}/content-assets/:path*` },
      // Covers and inline images uploaded in the portal; post HTML and og:image point here.
      { source: "/blog-media/:path*", destination: `${PORTAL}/blog-media/:path*` },
    ];
  },
};

export default nextConfig;
