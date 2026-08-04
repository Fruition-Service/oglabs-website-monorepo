import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"

export const metadata: Metadata = {
  title: "AI Automation",
  description: "End-to-end AI automation — eliminate manual tasks with intelligent workflows.",
}

export default function Page() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <Link href="/" className="text-sm text-brand hover:underline inline-flex items-center gap-1">
        ← Back <ArrowRight size={14} className="rotate-180" />
      </Link>
      <p className="mt-8 text-sm font-semibold uppercase tracking-wider text-brand">Services</p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">AI Automation</h1>
      <p className="mt-4 text-lg text-muted">End-to-end AI automation — eliminate manual tasks with intelligent workflows.</p>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">What we offer</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <Check size={18} className="mt-0.5 shrink-0 text-brand" />
              <span className="text-sm">Expert configuration tailored to your business</span>
            </li>
            <li className="flex items-start gap-2">
              <Check size={18} className="mt-0.5 shrink-0 text-brand" />
              <span className="text-sm">Team training and onboarding included</span>
            </li>
            <li className="flex items-start gap-2">
              <Check size={18} className="mt-0.5 shrink-0 text-brand" />
              <span className="text-sm">Ongoing support and optimisation</span>
            </li>
            <li className="flex items-start gap-2">
              <Check size={18} className="mt-0.5 shrink-0 text-brand" />
              <span className="text-sm">Industry-specific customisation</span>
            </li>
          </ul>
          <Link
            href="/contact"
            className="mt-4 inline-flex rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-dark transition-colors"
          >
            Book a consultation
          </Link>
        </div>
        <div className="rounded-2xl border border-ui bg-surface-subtle p-8">
          <h2 className="text-xl font-semibold">Why OG Labs for AI Automation?</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li>✓ Local APAC team with deep industry knowledge</li>
            <li>✓ Right-sized solutions for growing SMBs</li>
            <li>✓ 6-8 weeks typical implementation</li>
            <li>✓ Strategic advisory included with every engagement</li>
            <li>✓ Deep custom integrations capability</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
