import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Careers at OG Labs",
  description: "Join OG Labs and help transform APAC SMBs with HubSpot, ClickUp, and AI automation.",
}

export default function Careers() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Careers at OG Labs</h1>
      <p className="mt-4 text-lg text-muted">
        Join a team that's transforming how APAC SMBs work. We're always looking for talented people who love HubSpot, ClickUp, and AI.
      </p>
      <div className="mt-12 rounded-2xl border border-ui bg-surface-subtle p-8 text-center">
        <h2 className="text-xl font-semibold">No open positions right now</h2>
        <p className="mt-2 text-muted">But we're growing fast. Check back soon or reach out to express interest.</p>
        <Link href="/contact" className="mt-4 inline-flex rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-dark transition-colors">
          Get in touch
        </Link>
      </div>
    </div>
  )
}
