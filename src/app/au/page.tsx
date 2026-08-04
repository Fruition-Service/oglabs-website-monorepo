import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "OG Labs Australia",
  description: "OG Labs digital transformation services in Australia — HubSpot, ClickUp & AI automation.",
}

export default function Page() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <Link href="/" className="text-sm text-brand hover:underline">← Back</Link>
      <p className="mt-8 text-sm font-semibold uppercase tracking-wider text-brand">Australia</p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">OG Labs in Australia</h1>
      <p className="mt-4 text-lg text-muted">
        OG Labs provides HubSpot, ClickUp, and AI automation services to SMBs across Australia. Local expertise, global standards.
      </p>
      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold">Services in Australia</h2>
          <ul className="mt-4 space-y-2 text-muted">
            <li>HubSpot implementation & optimisation</li>
            <li>ClickUp workspace setup</li>
            <li>AI-driven agentic workflows</li>
            <li>Advanced integrations with Make & n8n</li>
            <li>CRM consultation & strategy</li>
          </ul>
          <Link href="/contact" className="mt-6 inline-flex rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-dark transition-colors">
            Book a consultation
          </Link>
        </div>
        <div className="rounded-2xl border border-ui bg-surface-subtle p-8">
          <h2 className="text-xl font-semibold">Local presence</h2>
          <p className="mt-3 text-sm text-muted">
            Our APAC-based team understands the Australia market — regulations, business culture, and growth patterns.
            We deliver right-sized solutions that respect local context.
          </p>
        </div>
      </div>
    </div>
  )
}
