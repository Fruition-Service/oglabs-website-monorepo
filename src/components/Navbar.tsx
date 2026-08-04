"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"

const SERVICES = [
  { label: "HubSpot", href: "/services/hubspot" },
  { label: "ClickUp", href: "/services/clickup" },
  { label: "AI Workflows", href: "/services/ai-workflows" },
  { label: "AI Automation", href: "/services/ai-automation" },
  { label: "Work Management", href: "/services/work-management" },
  { label: "Advanced Integrations", href: "/services/advanced-integrations" },
  { label: "CRM Consultation", href: "/services/crm-consultation" },
  { label: "Process Optimisation", href: "/services/process-optimisation" },
]

const INDUSTRIES = [
  { label: "Construction", href: "/industries/construction" },
  { label: "Manufacturing", href: "/industries/manufacturing" },
  { label: "Financial Services", href: "/industries/financial-services" },
]

const GEO = [
  { label: "Australia", href: "/au" },
  { label: "New Zealand", href: "/nz" },
  { label: "Singapore", href: "/sg" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [dropdown, setDropdown] = useState<string | null>(null)

  return (
    <nav className="sticky top-0 z-50 border-b border-ui bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-brand">
          <span className="text-2xl">◈</span>
          <span>OG Labs</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 lg:flex">
          <Link href="/" className="text-sm font-medium text-body hover:text-brand transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-sm font-medium text-body hover:text-brand transition-colors">
            About
          </Link>

          {/* Industries dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setDropdown("industries")}
            onMouseLeave={() => setDropdown(null)}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-body hover:text-brand transition-colors">
              Industries <ChevronDown size={14} />
            </button>
            {dropdown === "industries" && (
              <div className="absolute left-0 top-full mt-2 w-52 rounded-xl border border-ui bg-white p-2 shadow-lg">
                {INDUSTRIES.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-lg px-3 py-2 text-sm text-body hover:bg-surface-subtle hover:text-brand transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Services dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setDropdown("services")}
            onMouseLeave={() => setDropdown(null)}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-body hover:text-brand transition-colors">
              Services <ChevronDown size={14} />
            </button>
            {dropdown === "services" && (
              <div className="absolute left-0 top-full mt-2 w-56 rounded-xl border border-ui bg-white p-2 shadow-lg">
                {SERVICES.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-lg px-3 py-2 text-sm text-body hover:bg-surface-subtle hover:text-brand transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/blogs" className="text-sm font-medium text-body hover:text-brand transition-colors">
            Blogs
          </Link>
          <Link href="/case-studies" className="text-sm font-medium text-body hover:text-brand transition-colors">
            Case Studies
          </Link>
          <Link href="/partnerships" className="text-sm font-medium text-body hover:text-brand transition-colors">
            Partners
          </Link>
        </div>

        {/* CTAs */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/contact" className="text-sm font-medium text-body hover:text-brand transition-colors">
            Contact
          </Link>
          <Link
            href="/contact"
            className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark transition-colors"
          >
            Book a consultation
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="rounded-lg p-2 text-body hover:bg-surface-subtle lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-ui bg-white px-4 pb-6 pt-2 lg:hidden">
          <div className="flex flex-col gap-2">
            <Link href="/" className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-surface-subtle" onClick={() => setOpen(false)}>Home</Link>
            <Link href="/about" className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-surface-subtle" onClick={() => setOpen(false)}>About</Link>
            <div className="px-3 py-1 text-xs font-semibold uppercase text-muted">Industries</div>
            {INDUSTRIES.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-lg px-6 py-2 text-sm hover:bg-surface-subtle" onClick={() => setOpen(false)}>{item.label}</Link>
            ))}
            <div className="px-3 py-1 text-xs font-semibold uppercase text-muted">Services</div>
            {SERVICES.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-lg px-6 py-2 text-sm hover:bg-surface-subtle" onClick={() => setOpen(false)}>{item.label}</Link>
            ))}
            <div className="px-3 py-1 text-xs font-semibold uppercase text-muted">Regions</div>
            {GEO.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-lg px-6 py-2 text-sm hover:bg-surface-subtle" onClick={() => setOpen(false)}>{item.label}</Link>
            ))}
            <Link href="/blogs" className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-surface-subtle" onClick={() => setOpen(false)}>Blogs</Link>
            <Link href="/case-studies" className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-surface-subtle" onClick={() => setOpen(false)}>Case Studies</Link>
            <Link href="/partnerships" className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-surface-subtle" onClick={() => setOpen(false)}>Partners</Link>
            <hr className="my-2 border-ui" />
            <Link href="/contact" className="rounded-full bg-brand px-4 py-2 text-center text-sm font-semibold text-white" onClick={() => setOpen(false)}>Book a consultation</Link>
          </div>
        </div>
      )}
    </nav>
  )
}
