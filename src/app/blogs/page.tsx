import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Blogs & Insights",
  description: "Insights on HubSpot, ClickUp, AI automation, and digital transformation across APAC.",
}

const POSTS = [
  {
    slug: "introducing-og-labs-digital-transformation-partner-apac",
    title: "Introducing OG Labs: Your Digital Transformation Partner in APAC",
    tag: "News",
    date: "2026",
    author: "Edward Zhang",
    role: "Principal Engineer",
    excerpt: "OG Labs launches as the go-to digital transformation partner for SMBs across Australia, New Zealand, and Southeast Asia, combining HubSpot and ClickUp expertise with AI-driven agentic workflows.",
  },
  {
    slug: "how-hubspot-and-clickup-help-teams-work-smarter-not-harder",
    title: "How HubSpot and ClickUp Help Teams Work Smarter, Not Harder",
    tag: "News",
    date: "2026",
    author: "Edward Zhang",
    role: "Principal Engineer",
    excerpt: "Discover how combining HubSpot's CRM capabilities with ClickUp's work management platform creates a powerful productivity engine for growing SMBs.",
  },
  {
    slug: "why-integrated-systems-beat-disconnected-tool-stacks",
    title: "Why Integrated Systems Beat Disconnected Tool Stacks",
    tag: "SaaS",
    date: "2026",
    author: "Edward Zhang",
    role: "Principal Engineer",
    excerpt: "Connected workflows outperform tool stacks where data doesn't flow. Learn why integration is the key to scalable operations.",
  },
]

export default function Blogs() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-wider text-brand">News</p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Insights & updates</h1>
      <p className="mt-4 text-lg text-muted">
        Thoughts on HubSpot, ClickUp, AI automation, and digital transformation for APAC SMBs.
      </p>

      <div className="mt-12 space-y-8">
        {POSTS.map((post) => (
          <Link
            key={post.slug}
            href={`/blogs/${post.slug}`}
            className="group block rounded-2xl border border-ui bg-white p-6 shadow-card hover:border-brand transition-colors"
          >
            <span className="inline-block rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">
              {post.tag}
            </span>
            <h2 className="mt-4 text-xl font-semibold group-hover:text-brand transition-colors">
              {post.title}
            </h2>
            <p className="mt-2 text-muted">{post.excerpt}</p>
            <p className="mt-4 text-sm text-muted">
              {post.author} · {post.role} · {post.date}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
