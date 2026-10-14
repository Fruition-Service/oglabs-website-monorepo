import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { SITE_URL, DEFAULT_TITLE, DEFAULT_DESCRIPTION, OG_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  icons: { icon: "/framer/MTVxNEO89ITk79ZO2KCHjc5fibA.png", apple: "/framer/MTVxNEO89ITk79ZO2KCHjc5fibA.png" },
  openGraph: { type: "website", title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION, images: [OG_IMAGE] },
  twitter: { card: "summary_large_image", title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION, images: [OG_IMAGE] },
  // Preview deployments (anything that is not oglabs.io) set SITE_NOINDEX=1 so they never compete
  // with the real site in search.
  robots: process.env.SITE_NOINDEX === "1" ? { index: false, follow: false } : { "max-image-preview": "large" },
};

export const viewport: Viewport = { width: "device-width" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <body>
        {children}
        {/* HubSpot tracking (Framer "bodyEnd" snippet mA7QqaneL, same src). It sets the hutk cookie the
            Solution Finder sends and captures non-HubSpot forms. Skipped on preview hosts so test
            visits never land in HubSpot. */}
        {process.env.SITE_NOINDEX !== "1" && (
          <Script id="hs-script-loader" src="https://js-eu1.hs-scripts.com/442278519.js" strategy="afterInteractive" />
        )}
      </body>
    </html>
  );
}
