import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "How HubSpot and ClickUp Help Teams Work Smarter, Not Harder",
  description: "Combining HubSpot CRM with ClickUp work management for peak productivity.",
}

export default function Post() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <Link href="/blogs" className="text-sm text-brand hover:underline">← Back to blogs</Link>
      <span className="mt-4 inline-block rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">News</span>
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
        How HubSpot and ClickUp Help Teams Work Smarter, Not Harder
      </h1>
      <p className="mt-4 text-sm text-muted">Edward Zhang · Principal Engineer · 2026</p>
      <div className="mt-8 prose prose-lg max-w-none text-body">
        <p>
          In today's fast-paced business environment, the tools your team uses can make or break productivity. Two platforms
          stand out for APAC SMBs: HubSpot for customer relationship management and ClickUp for work management. When integrated
          properly, they create a productivity engine that drives real business results.
        </p>
        <h2>The Power of Integration</h2>
        <p>
          HubSpot excels at managing customer relationships — tracking deals, automating marketing, and providing customer
          service. ClickUp excels at managing work — projects, tasks, documentation, and team collaboration. Together, they
          eliminate the gap between "what we're selling" and "how we deliver it."
        </p>
        <h2>Key Benefits</h2>
        <ul>
          <li>33% more qualified leads through HubSpot automation</li>
          <li>42% higher sales productivity across connected workflows</li>
          <li>1 day saved every week through automated handoffs</li>
          <li>89% of teams see faster, more productive workflows</li>
        </ul>
        <p>
          The key is implementation that respects your existing processes while introducing automation where it adds the most
          value. That's where OG Labs comes in — we configure both platforms around your business, not the other way around.
        </p>
        <div className="mt-8 rounded-2xl bg-surface-subtle p-6">
          <p className="font-semibold">Want to see how HubSpot + ClickUp can transform your team?</p>
          <Link href="/contact" className="mt-3 inline-flex rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white hover:bg-brand-dark transition-colors">
            Book a consultation
          </Link>
        </div>
      </div>
    </article>
  )
}
