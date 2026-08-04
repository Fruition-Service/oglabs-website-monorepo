import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Partnerships",
  description: "OG Labs partners with leading platforms including HubSpot, ClickUp, Make, and n8n.",
}

const PARTNERS = [
  { name: "HubSpot", description: "CRM, marketing, sales, and service platform" },
  { name: "ClickUp", description: "All-in-one work management platform" },
  { name: "Make", description: "Visual automation and integration platform" },
  { name: "n8n", description: "Open-source workflow automation" },
]

export default function Page() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Partnerships</h1>
      <p className="mt-4 text-lg text-muted">
        OG Labs partners with the best platforms to deliver comprehensive digital transformation for APAC SMBs.
      </p>
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {PARTNERS.map((p) => (
          <div key={p.name} className="rounded-2xl border border-ui bg-white p-6 shadow-card">
            <h3 className="text-lg font-semibold">{p.name}</h3>
            <p className="mt-2 text-sm text-muted">{p.description}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link href="/contact" className="inline-flex rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-dark transition-colors">
          Become a partner
        </Link>
      </div>
    </div>
  )
}
