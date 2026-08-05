import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Why APAC Revenue Teams Are Standardising on HubSpot",
  description: "Growing revenue teams need one source of truth, not five disconnected tools. Here's why HubSpot, set up right, becomes the backbone.",
}

export default function Post() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <Link href="/blogs" className="text-sm text-brand hover:underline">← Back to blogs</Link>
      <span className="mt-4 inline-block rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">Growth</span>
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
        Why APAC Revenue Teams Are Standardising on HubSpot
      </h1>
      <p className="mt-4 text-sm text-muted">Edward Zhang · Principal Engineer · Jan 1, 2026</p>
      <div className="mt-8 prose prose-lg max-w-none text-body">
        <h2>Revenue Has Changed, Many Stacks Haven't</h2>
        <p>
          Revenue teams today juggle pipelines, forecasts, follow-ups, handoffs, and reporting, often across tools that don't share data. Strategy has moved on, but the systems underneath are still built for a slower era.
        </p>
        <blockquote className="border-l-4 border-brand pl-4 italic text-muted">
          The problem usually isn't effort. It's fragmentation.
        </blockquote>
        <h2>The Cost of Manual Revenue Operations</h2>
        <p>
          Every manual step adds friction. A missed update means an unclear forecast. A delayed follow-up loses a deal. A broken handoff between sales and delivery creates confusion that customers feel.
        </p>
        <p>
          Individually these seem small. Together, they quietly cap growth.
        </p>
        <h2>Why HubSpot Becomes the Backbone</h2>
        <p>
          HubSpot brings contacts, deals, marketing, and service into one platform. For a growing revenue team, that means:
        </p>
        <ul>
          <li>One timeline for every customer interaction</li>
          <li>Automated lead capture, scoring, and routing</li>
          <li>Forecasts built on live data, not month-old spreadsheets</li>
          <li>Marketing and sales working from the same record</li>
        </ul>
        <h2>Setup Is Everything</h2>
        <p>
          HubSpot only becomes the backbone when it is configured around your real sales motion. A generic install gives you another database. An implementation shaped to your process gives you leverage.
        </p>
        <p>
          OG Labs implements and optimises HubSpot for SMBs across APAC, then connects it to ClickUp and finance through Make and n8n, so revenue, delivery, and reporting all run from one source of truth.
        </p>
        <div className="mt-8 rounded-2xl bg-surface-subtle p-6">
          <p className="font-semibold">Ready to standardise your revenue operations?</p>
          <Link href="/contact" className="mt-3 inline-flex rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white hover:bg-brand-dark transition-colors">
            Book a consultation
          </Link>
        </div>
      </div>
    </article>
  )
}
