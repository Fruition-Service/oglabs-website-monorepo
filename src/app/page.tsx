import type { Metadata } from "next"
import Link from "next/link"
import { Check, ArrowRight, Star } from "lucide-react"

export const metadata: Metadata = {
  title: "OG Labs | HubSpot & ClickUp Partners | AI Automation",
  description:
    "OG Labs is the go-to digital transformation partner for SMBs across Australia, New Zealand, and Southeast Asia. We blend HubSpot and ClickUp expertise with AI-driven agentic workflows to help your business scale.",
  alternates: { canonical: "/" },
}

const PILLARS = [
  {
    title: "AI-powered automation",
    description:
      "Eliminate manual tasks with agentic AI workflows built on Make, n8n, and cutting-edge automation tools.",
  },
  {
    title: "HubSpot expertise",
    description:
      "Complete HubSpot deployment from CRM setup to marketing automation, configured around your business processes.",
  },
  {
    title: "ClickUp implementation",
    description:
      "Streamline work management with expertly configured ClickUp workspaces that scale with your team's growth.",
  },
]

const COMPARISON_ROWS = [
  { label: "AI agentic workflows", og: "Agentic AI with Make & n8n", generic: "Generic automation tools", trad: "Limited AI capability" },
  { label: "Platform expertise", og: "HubSpot + ClickUp expert", generic: "Rules-based only", trad: "HubSpot OR ClickUp" },
  { label: "Industry specialisation", og: "Constr., Mfg. Finance", generic: "One platform focus", trad: "Generic playbooks" },
  { label: "Implementation speed", og: "6 to 8 weeks typical", generic: "Generic, no sector", trad: "Slow waterfall projects" },
  { label: "Scalability for SMBs", og: "Right-sized for SMBs", generic: "Months of DIY work", trad: "Enterprise-priced" },
  { label: "Integration depth", og: "Deep custom integrations", generic: "Hard to scale", trad: "Basic native integrations" },
  { label: "APAC presence", og: "Local APAC team", generic: "Remote only", trad: "North America focus" },
  { label: "Ongoing support", og: "Strategic advisory included", generic: "Self-serve", trad: "Setup then exit" },
]

const STATS = [
  { value: "33%", label: "more qualified leads through HubSpot automation" },
  { value: "42%", label: "higher sales productivity across connected workflows" },
  { value: "200K+", label: "businesses grow with HubSpot and ClickUp" },
  { value: "1,500+", label: "integrations connect your sales and operations stack" },
  { value: "89%", label: "of teams see faster, more productive workflows" },
  { value: "1 Day", label: "saved every week through automated handoffs and updates" },
]

const PRICING_TIERS = [
  {
    name: "Guided",
    description: "Flexible plans built to match and maximise your team's digital growth.",
    price: "$4,000+",
    rate: "$449/20hrs",
    features: [
      "HubSpot or ClickUp implementation",
      "Process mapping & workflow design",
      "Standard integrations included",
      "Onboarding & team training",
      "Email support during setup",
    ],
    cta: "Start with guided",
    href: "/contact",
  },
  {
    name: "Lock-Step",
    description: "Digital transformation support tailored to your goals, tools, and stage.",
    price: "$8,000+",
    rate: "$899/40hrs",
    popular: true,
    features: [
      "Everything in Guided",
      "AI-powered workflow automation",
      "HubSpot + ClickUp integration",
      "Industry-specific customisation",
      "Priority support & optimisation",
    ],
    cta: "Choose Lock-Step",
    href: "/contact",
  },
  {
    name: "Bespoke",
    description: "Choose the right level of strategy, automation, and execution for you.",
    price: "Custom",
    rate: "$1,749/80hrs",
    features: [
      "Everything in Lock-Step",
      "Agentic AI workflows with Make & n8n",
      "Unlimited custom integrations",
      "Real-time data sync across tools",
      "Dedicated support & advisory",
    ],
    cta: "Choose Bespoke",
    href: "/contact",
  },
]

const FAQS = [
  { q: "How long does a typical HubSpot implementation take?", a: "OG Labs is a digital transformation partner specialising in HubSpot, ClickUp, and AI-driven automation for SMBs across APAC." },
  { q: "What training options are available for HubSpot?", a: "OG Labs is a digital transformation partner specialising in HubSpot, ClickUp, and AI-driven automation for SMBs across APAC." },
  { q: "Can HubSpot replace all our current tools?", a: "OG Labs is a digital transformation partner specialising in HubSpot, ClickUp, and AI-driven automation for SMBs across APAC." },
  { q: "Do you offer post-implementation support for HubSpot?", a: "OG Labs is a digital transformation partner specialising in HubSpot, ClickUp, and AI-driven automation for SMBs across APAC." },
  { q: "Is HubSpot secure enough for enterprise use?", a: "OG Labs is a digital transformation partner specialising in HubSpot, ClickUp, and AI-driven automation for SMBs across APAC." },
  { q: "How do you ensure successful HubSpot adoption?", a: "OG Labs is a digital transformation partner specialising in HubSpot, ClickUp, and AI-driven automation for SMBs across APAC." },
]

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-surface-dark py-20 sm:py-28 lg:py-36">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-black to-black" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-sm text-orange-300 backdrop-blur"
            >
              Updates <ArrowRight size={14} /> Your APAC digital transformation partner
            </Link>
            <h1 className="mt-8 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              HubSpot, ClickUp & AI automation that drives growth
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-neutral-400">
              OG Labs is the go-to digital transformation partner for SMBs across Australia, New Zealand, and
              Southeast Asia. We blend HubSpot and ClickUp expertise with AI-driven agentic workflows to help your
              business scale.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-light transition-colors"
              >
                Book a consultation
              </Link>
              <Link
                href="/#features"
                className="rounded-full border border-neutral-700 px-6 py-3 text-sm font-semibold text-white hover:border-neutral-500 transition-colors"
              >
                Explore services
              </Link>
            </div>
          </div>

          {/* Services marquee */}
          <div className="mt-16 flex flex-wrap justify-center gap-3 text-sm">
            {["HubSpot implementation & optimisation", "ClickUp workspace setup", "AI-driven agentic workflows", "Advanced integrations with Make & n8n", "Process automation that scales"].map((s) => (
              <span key={s} className="rounded-full border border-neutral-700 bg-neutral-900/50 px-4 py-2 text-neutral-300">
                {s}
              </span>
            ))}
          </div>

          <p className="mt-12 text-center text-sm text-neutral-500">
            100+ growing SMBs across APAC trust OG Labs to transform their operations.
          </p>
        </div>
      </section>

      {/* Three Pillars */}
      <section id="features" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand">Features</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Three pillars of digital transformation
            </h2>
            <p className="mt-4 text-lg text-muted">
              From CRM implementation to AI-powered automation, OG Labs delivers end-to-end transformation tailored
              to your industry, processes, and growth goals.
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((p) => (
              <div key={p.title} className="rounded-2xl border border-ui bg-white p-8 shadow-card">
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <p className="mt-3 text-muted">{p.description}</p>
              </div>
            ))}
            <div className="rounded-2xl border border-ui bg-white p-8 shadow-card sm:col-span-2 lg:col-span-1">
              <h3 className="text-lg font-semibold">Built for the tools APAC teams trust</h3>
              <p className="mt-3 text-muted">Tailored for fast-growing APAC SMBs</p>
            </div>
            <div className="rounded-2xl border border-ui bg-white p-8 shadow-card sm:col-span-2 lg:col-span-1">
              <h3 className="text-lg font-semibold">Industry expertise</h3>
              <p className="mt-3 text-muted">
                Deep knowledge of construction, manufacturing, and financial services. Specialised solutions for your sector.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="bg-surface-subtle py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand">What sets us apart</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              OG Labs delivers results beyond traditional partners
            </h2>
          </div>
          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-ui">
                  <th className="pb-4 pr-4 font-semibold">Capability</th>
                  <th className="pb-4 pr-4 font-semibold text-brand">OG Labs</th>
                  <th className="pb-4 pr-4 font-semibold text-muted">Generic</th>
                  <th className="pb-4 font-semibold text-muted">Traditional</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.label} className="border-b border-ui/50">
                    <td className="py-3 pr-4 font-medium text-body">{row.label}</td>
                    <td className="py-3 pr-4 text-brand">{row.og}</td>
                    <td className="py-3 pr-4 text-muted">{row.generic}</td>
                    <td className="py-3 text-muted">{row.trad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/contact"
              className="inline-flex rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-dark transition-colors"
            >
              Book a consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand">Why OG Labs</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              We power digital transformation beyond implementation
            </h2>
            <p className="mt-4 text-lg text-muted">
              From CRM to operations to finance, OG Labs helps APAC SMBs automate work without adding complexity or technical overhead.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {STATS.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-ui bg-white p-8 text-center shadow-card">
                <p className="text-3xl font-bold text-brand">{stat.value}</p>
                <p className="mt-2 text-sm text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-sm text-muted">
              See how your team can achieve the same results with OG Labs.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-dark transition-colors"
            >
              Book a consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-surface-subtle py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand">Pricing</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Tailored plans for every stage of transformation
            </h2>
          </div>
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {PRICING_TIERS.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-2xl border bg-white p-8 shadow-card ${
                  tier.popular ? "border-brand ring-2 ring-brand" : "border-ui"
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white">
                    Popular
                  </span>
                )}
                <h3 className="text-xl font-bold">{tier.name}</h3>
                <p className="mt-2 text-sm text-muted">{tier.description}</p>
                <p className="mt-4 text-xs text-muted">For reference only</p>
                <div className="mt-1">
                  <span className="text-3xl font-bold">{tier.price}</span>
                  <span className="ml-1 text-sm text-muted">/ {tier.rate}</span>
                </div>
                <Link
                  href={tier.href}
                  className="mt-6 block w-full rounded-full bg-brand px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-brand-dark transition-colors"
                >
                  {tier.cta}
                </Link>
                <ul className="mt-6 space-y-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-body">
                      <Check size={16} className="mt-0.5 shrink-0 text-brand" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog preview */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-brand">News</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Insights & updates.</h2>
            </div>
            <Link
              href="/blogs"
              className="rounded-full border border-ui px-4 py-2 text-sm font-medium hover:bg-surface-subtle transition-colors"
            >
              View all
            </Link>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { tag: "News", title: "Introducing OG Labs: Your Digital Transformation Partner in APAC", href: "/blogs/introducing-og-labs-digital-transformation-partner-apac" },
              { tag: "News", title: "How HubSpot and ClickUp Help Teams Work Smarter, Not Harder", href: "/blogs/how-hubspot-and-clickup-help-teams-work-smarter-not-harder" },
              { tag: "SaaS", title: "Why Integrated Systems Beat Disconnected Tool Stacks", href: "/blogs/why-integrated-systems-beat-disconnected-tool-stacks" },
            ].map((post) => (
              <Link key={post.href} href={post.href} className="group rounded-2xl border border-ui bg-white p-6 shadow-card hover:border-brand transition-colors">
                <span className="inline-block rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">
                  {post.tag}
                </span>
                <h3 className="mt-4 text-lg font-semibold group-hover:text-brand transition-colors">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-muted">Edward Zhang · Principal Engineer</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-surface-subtle py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Frequently asked questions</h2>
            <Link
              href="/contact"
              className="rounded-full border border-ui px-4 py-2 text-sm font-medium hover:bg-white transition-colors"
            >
              Ask a question
            </Link>
          </div>
          <div className="mt-12 space-y-4">
            {FAQS.map((faq, i) => (
              <details key={i} className="group rounded-xl border border-ui bg-white">
                <summary className="flex cursor-pointer items-center justify-between px-6 py-4 text-sm font-medium">
                  {faq.q}
                  <span className="ml-2 shrink-0 text-muted group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="border-t border-ui px-6 pb-4 pt-3 text-sm text-muted">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
