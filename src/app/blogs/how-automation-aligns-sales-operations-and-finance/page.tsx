import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "How Automation Aligns Sales, Operations, and Finance",
  description: "When sales, delivery, and finance work from different systems, alignment becomes manual labour. Integration fixes it.",
}

export default function Post() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <Link href="/blogs" className="text-sm text-brand hover:underline">← Back to blogs</Link>
      <span className="mt-4 inline-block rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">Growth</span>
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
        How Automation Aligns Sales, Operations, and Finance
      </h1>
      <p className="mt-4 text-sm text-muted">Edward Zhang · Principal Engineer · Dec 25, 2025</p>
      <div className="mt-8 prose prose-lg max-w-none text-body">
        <h2>The Hidden Cost of Misalignment</h2>
        <p>
          Most operational problems don't start with bad strategy. They start when teams stop sharing the same reality. Sales works from the CRM, delivery from the project tool, finance from the accounting system, and none of them quite agree.
        </p>
        <blockquote className="border-l-4 border-brand pl-4 italic text-muted">
          When teams don't see the same data, they don't make the same decisions.
        </blockquote>
        <h2>Why Alignment Breaks as You Grow</h2>
        <p>
          Small teams stay aligned naturally. As volume increases, alignment turns into work. Updates fall behind, ownership blurs, and processes quietly become workarounds.
        </p>
        <h2>Integration as the Coordination Layer</h2>
        <p>
          Automation is the connective tissue between teams. With Make and n8n, OG Labs links HubSpot, ClickUp, and your finance system so information flows automatically:
        </p>
        <ul>
          <li>A won deal in HubSpot opens the delivery project in ClickUp</li>
          <li>Project milestones trigger invoicing in your finance tool</li>
          <li>Status flows back to sales without anyone asking</li>
        </ul>
        <h2>Cleaner Data, Better Decisions</h2>
        <p>
          When systems stay in sync, teams stop arguing over numbers and start acting on them. Forecasts get sharper, planning gets realistic, and leadership trusts the dashboard.
        </p>
        <p>
          For growing SMBs in construction, manufacturing, and financial services, that alignment is the difference between scaling smoothly and scaling into chaos.
        </p>
        <div className="mt-8 rounded-2xl bg-surface-subtle p-6">
          <p className="font-semibold">Ready to align your teams through automation?</p>
          <Link href="/contact" className="mt-3 inline-flex rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white hover:bg-brand-dark transition-colors">
            Book a consultation
          </Link>
        </div>
      </div>
    </article>
  )
}
