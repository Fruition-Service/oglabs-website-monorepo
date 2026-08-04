import type { Metadata } from "next"
import Link from "next/link"
import { Check } from "lucide-react"

export const metadata: Metadata = {
  title: "Manufacturing",
  description: "Digital transformation and automation solutions for the Manufacturing industry.",
}

export default function Page() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <Link href="/" className="text-sm text-brand hover:underline">← Back</Link>
      <p className="mt-8 text-sm font-semibold uppercase tracking-wider text-brand">Industries</p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Manufacturing</h1>
      <p className="mt-4 text-lg text-muted">
        Specialised digital transformation solutions built for the unique challenges of the Manufacturing industry.
      </p>
      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Solutions for Manufacturing</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-2"><Check size={18} className="mt-0.5 shrink-0 text-brand" /><span className="text-sm">HubSpot CRM configured for Manufacturing workflows</span></li>
            <li className="flex items-start gap-2"><Check size={18} className="mt-0.5 shrink-0 text-brand" /><span className="text-sm">ClickUp workspace templates for Manufacturing projects</span></li>
            <li className="flex items-start gap-2"><Check size={18} className="mt-0.5 shrink-0 text-brand" /><span className="text-sm">AI automation for Manufacturing operations</span></li>
            <li className="flex items-start gap-2"><Check size={18} className="mt-0.5 shrink-0 text-brand" /><span className="text-sm">Integration with industry-specific tools</span></li>
          </ul>
          <Link href="/contact" className="mt-4 inline-flex rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-dark transition-colors">
            Book a consultation
          </Link>
        </div>
        <div className="rounded-2xl border border-ui bg-surface-subtle p-8">
          <h2 className="text-xl font-semibold">Why OG Labs?</h2>
          <p className="mt-3 text-sm text-muted">
            Deep industry knowledge combined with HubSpot, ClickUp, and AI expertise gives you a partner who understands both your technology and your business.
          </p>
        </div>
      </div>
    </div>
  )
}
