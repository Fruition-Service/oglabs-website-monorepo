import type { NextConfig } from "next";

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
};

export default nextConfig;
