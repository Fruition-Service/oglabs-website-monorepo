import Link from "next/link"

const FOOTER_LINKS = {
  Company: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Blogs", href: "/blogs" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "/careers" },
  ],
  Resources: [
    { label: "Pricing", href: "/#pricing" },
    { label: "FAQ", href: "/#faq" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Partnerships", href: "/partnerships" },
  ],
  Regions: [
    { label: "Australia", href: "/au" },
    { label: "New Zealand", href: "/nz" },
    { label: "Singapore", href: "/sg" },
  ],
  Industries: [
    { label: "Construction", href: "/industries/construction" },
    { label: "Manufacturing", href: "/industries/manufacturing" },
    { label: "Financial Services", href: "/industries/financial-services" },
  ],
  Services: [
    { label: "HubSpot", href: "/services/hubspot" },
    { label: "ClickUp", href: "/services/clickup" },
    { label: "AI Workflows", href: "/services/ai-workflows" },
    { label: "AI Automation", href: "/services/ai-automation" },
    { label: "Work Management", href: "/services/work-management" },
    { label: "Advanced Integrations", href: "/services/advanced-integrations" },
    { label: "CRM Consultation", href: "/services/crm-consultation" },
    { label: "Process Optimisation", href: "/services/process-optimisation" },
  ],
}

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/oglabs/" },
  { label: "YouTube", href: "https://www.youtube.com/" },
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "X", href: "https://x.com" },
]

export default function Footer() {
  return (
    <footer className="bg-surface-dark text-white">
      {/* CTA section */}
      <div className="border-b border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Turn workflows into systems that scale
              </h2>
              <p className="mt-3 max-w-xl text-lg text-neutral-400">
                Let OG Labs handle the implementation so your team focuses on high-impact work that drives real growth.
              </p>
            </div>
            <Link
              href="/contact"
              className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-light transition-colors"
            >
              Get started
            </Link>
          </div>
        </div>
      </div>

      {/* Link columns */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
          {/* Brand + newsletter */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-brand">
              <span className="text-2xl">◈</span>
              <span>OG Labs</span>
            </Link>
            <p className="mt-3 text-sm text-neutral-400">Stay in the loop.</p>
            <p className="mt-1 text-xs text-neutral-500">
              Get insights on HubSpot, ClickUp, AI automation, and digital transformation across APAC.
            </p>
            <div className="mt-4 flex gap-4">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-neutral-400 hover:text-brand transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                {title}
              </h3>
              <ul className="mt-3 space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-800 pt-8 sm:flex-row">
          <p className="text-xs text-neutral-500">
            © {new Date().getFullYear()} OG Labs. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/legal/terms-of-service" className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors">
              Terms of Service
            </Link>
            <Link href="/legal/privacy-policy" className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/legal/cookies-policy" className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors">
              Cookies Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
