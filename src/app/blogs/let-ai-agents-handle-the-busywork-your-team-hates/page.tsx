import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Let AI Agents Handle the Busywork Your Team Hates",
  description: "Agentic AI workflows built on Make and n8n take the repetitive, rules-based work off your team's plate, so people focus on what actually matters.",
}

export default function Post() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <Link href="/blogs" className="text-sm text-brand hover:underline">← Back to blogs</Link>
      <span className="mt-4 inline-block rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">Growth</span>
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
        Let AI Agents Handle the Busywork Your Team Hates
      </h1>
      <p className="mt-4 text-sm text-muted">Edward Zhang · Principal Engineer · Jan 8, 2026</p>
      <div className="mt-8 prose prose-lg max-w-none text-body">
        <h2>Busywork Is the Silent Productivity Killer</h2>
        <p>
          Every business has it. Updating records, chasing approvals, moving information between tools, formatting the same report every week. None of it creates value, yet it quietly consumes hours.
        </p>
        <p>
          Over time, this kind of work doesn't just slow teams down. It wears them out.
        </p>
        <h2>What Agentic AI Actually Does</h2>
        <p>
          Agentic AI workflows go beyond simple automation. Instead of triggering a single action, they can read context, make rules-based decisions, and carry a task through several steps across your tools.
        </p>
        <p>
          Built on Make and n8n, these workflows handle the repetitive work end to end:
        </p>
        <ul>
          <li>Qualifying and routing inbound leads</li>
          <li>Generating and sending routine documents</li>
          <li>Updating records across systems as work progresses</li>
          <li>Flagging exceptions to a human only when judgment is needed</li>
        </ul>
        <blockquote className="border-l-4 border-brand pl-4 italic text-muted">
          Automation is not about doing more work. It is about removing the work that never needed a person.
        </blockquote>
        <h2>People Stay in Control</h2>
        <p>
          Good automation doesn't replace your team's judgment, it protects it. The agent handles the predictable steps and hands off to a person the moment something needs a real decision.
        </p>
        <h2>Where It Pays Off</h2>
        <p>
          For SMBs in construction, manufacturing, and financial services, the back office is full of repeatable, rules-based work. That is exactly where agentic workflows free up the most time. OG Labs designs these workflows around your processes, so the busywork your team hates simply stops being their job.
        </p>
        <div className="mt-8 rounded-2xl bg-surface-subtle p-6">
          <p className="font-semibold">Ready to reclaim your team's time?</p>
          <Link href="/contact" className="mt-3 inline-flex rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white hover:bg-brand-dark transition-colors">
            Book a consultation
          </Link>
        </div>
      </div>
    </article>
  )
}
