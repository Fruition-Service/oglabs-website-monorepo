import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Case Studies",
  description: "See how OG Labs has helped APAC SMBs transform with HubSpot, ClickUp, and AI automation.",
}

export default function Page() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Case Studies</h1>
      <p className="mt-4 text-lg text-muted">
        Real results from real APAC SMBs. See how OG Labs transforms operations with HubSpot, ClickUp, and AI.
      </p>
      <div className="mt-12 rounded-2xl border border-ui bg-surface-subtle p-12 text-center">
        <h2 className="text-xl font-semibold">Case studies coming soon</h2>
        <p className="mt-2 text-muted">
          We're documenting our client success stories. Check back soon for detailed case studies across construction, manufacturing, and financial services.
        </p>
        <Link href="/contact" className="mt-4 inline-flex rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-dark transition-colors">
          Book a consultation
        </Link>
      </div>
    </div>
  )
}
