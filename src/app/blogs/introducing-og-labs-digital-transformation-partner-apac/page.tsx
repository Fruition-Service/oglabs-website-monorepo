import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Introducing OG Labs: Your Digital Transformation Partner in APAC",
  description: "OG Labs launches as the go-to digital transformation partner for SMBs across APAC.",
}

export default function Post() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <Link href="/blogs" className="text-sm text-brand hover:underline">← Back to blogs</Link>
      <span className="mt-4 inline-block rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">News</span>
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
        Introducing OG Labs: Your Digital Transformation Partner in APAC
      </h1>
      <p className="mt-4 text-sm text-muted">Edward Zhang · Principal Engineer · 2026</p>
      <div className="mt-8 prose prose-lg max-w-none text-body">
        <p>
          OG Labs is the go-to digital transformation partner for SMBs across Australia, New Zealand, and Southeast Asia.
          We blend HubSpot and ClickUp expertise with AI-driven agentic workflows to help your business scale.
        </p>
        <h2>Why OG Labs Exists</h2>
        <p>
          APAC SMBs face unique challenges: diverse markets, rapid growth, and the need to do more with less. Traditional
          consulting firms are either too expensive, too slow, or too focused on North American and European markets.
          OG Labs was founded to fill this gap — providing right-sized, practical digital transformation for growing
          businesses across APAC.
        </p>
        <h2>What We Offer</h2>
        <ul>
          <li><strong>HubSpot implementation & optimisation</strong> — Complete CRM deployment configured around your business processes</li>
          <li><strong>ClickUp workspace setup</strong> — Work management that scales with your team</li>
          <li><strong>AI-driven agentic workflows</strong> — Automation that eliminates manual tasks</li>
          <li><strong>Advanced integrations</strong> — Make, n8n, and deep custom integrations</li>
        </ul>
        <h2>Our Approach</h2>
        <p>
          We believe in practical transformation. No bloated project plans, no enterprise price tags, no "set up and exit."
          Every engagement includes strategic advisory, deep industry knowledge, and ongoing support from a local APAC team.
        </p>
        <div className="mt-8 rounded-2xl bg-surface-subtle p-6">
          <p className="font-semibold">Ready to transform your operations?</p>
          <Link href="/contact" className="mt-3 inline-flex rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white hover:bg-brand-dark transition-colors">
            Book a consultation
          </Link>
        </div>
      </div>
    </article>
  )
}
