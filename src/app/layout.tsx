import type { Metadata, Viewport } from "next"
import { Poppins, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
})

export const viewport: Viewport = {
  colorScheme: "light",
}

export const revalidate = 60

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://oglabs.io"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "OG Labs | HubSpot & ClickUp Partners | AI Automation",
    template: "%s | OG Labs",
  },
  description:
    "OG Labs is the go-to digital transformation partner for SMBs across Australia, New Zealand, and Southeast Asia. We blend HubSpot and ClickUp expertise with AI-driven agentic workflows to help your business scale.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: "OG Labs",
    title: "OG Labs | HubSpot & ClickUp Partners | AI Automation",
    description:
      "OG Labs is the go-to digital transformation partner for SMBs across Australia, New Zealand, and Southeast Asia.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "OG Labs | HubSpot & ClickUp Partners | AI Automation",
    description:
      "Digital transformation partner for APAC SMBs — HubSpot, ClickUp & AI automation.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "OG Labs",
        url: SITE_URL,
        description:
          "OG Labs is a digital transformation partner specialising in HubSpot, ClickUp, and AI-driven automation for SMBs across APAC.",
        knowsAbout: [
          "HubSpot",
          "ClickUp",
          "AI automation",
          "Make",
          "n8n",
          "Digital transformation",
          "CRM implementation",
          "Work management",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Consulting services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: "HubSpot implementation & optimisation", url: `${SITE_URL}/services/hubspot` },
            },
            {
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: "ClickUp workspace setup", url: `${SITE_URL}/services/clickup` },
            },
            {
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: "AI-driven agentic workflows", url: `${SITE_URL}/services/ai-workflows` },
            },
            {
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: "Advanced integrations", url: `${SITE_URL}/services/advanced-integrations` },
            },
          ],
        },
        sameAs: [
          "https://www.linkedin.com/company/oglabs/",
          "https://www.youtube.com/",
          "https://www.instagram.com/",
          "https://x.com",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: "OG Labs",
        url: SITE_URL,
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${poppins.variable} ${jetbrainsMono.variable} antialiased`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
