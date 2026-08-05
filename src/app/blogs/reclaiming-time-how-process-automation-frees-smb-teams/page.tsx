import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Reclaiming Time: How Process Automation Frees SMB Teams",
  description: "Time is the resource you can't buy back. Process automation gives it back to your team by removing the repetitive work that fills the day.",
}

export default function Post() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <Link href="/blogs" className="text-sm text-brand hover:underline">← Back to blogs</Link>
      <span className="mt-4 inline-block rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">Growth</span>
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
        Reclaiming Time: How Process Automation Frees SMB Teams
      </h1>
      <p className="mt-4 text-sm text-muted">Edward Zhang · Principal Engineer · Dec 18, 2025</p>
      <div className="mt-8 prose prose-lg max-w-none text-body">
        <h2>Time Is the Most Undervalued Resource</h2>
        <p>
          Teams talk about efficiency, but the real bottleneck is usually time. Hours go to repetitive tasks — updating data, managing handoffs, chasing approvals, formatting reports — and over a month those hours add up to weeks of lost capacity.
        </p>
        <blockquote className="border-l-4 border-brand pl-4 italic text-muted">
          Busywork isn't always visible, but its cost is real.
        </blockquote>
        <h2>Process Automation Removes the Friction</h2>
        <p>
          Process automation takes the predictable, rules-based steps off your team's plate. Done well, it doesn't just save a few minutes here and there, it removes whole categories of manual work.
        </p>
        <p>
          With ClickUp automations and integrations built on Make and n8n, OG Labs sets up systems that:
        </p>
        <ul>
          <li>Move work forward automatically as each step completes</li>
          <li>Keep records updated across tools without manual entry</li>
          <li>Surface the right task to the right person at the right time</li>
        </ul>
        <h2>What Teams Do With the Time Back</h2>
        <p>
          When routine work disappears, people get their focus back. Decisions improve because there is room to think. Collaboration gets easier because no one is buried in admin.
        </p>
        <h2>The Bottom Line</h2>
        <p>
          Time is finite, and busywork is expensive. By automating the repetitive layer of your operations, OG Labs helps APAC SMBs turn hours lost into hours invested in growth.
        </p>
        <div className="mt-8 rounded-2xl bg-surface-subtle p-6">
          <p className="font-semibold">Ready to give your team their time back?</p>
          <Link href="/contact" className="mt-3 inline-flex rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white hover:bg-brand-dark transition-colors">
            Book a consultation
          </Link>
        </div>
      </div>
    </article>
  )
}
