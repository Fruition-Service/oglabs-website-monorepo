import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About OG Labs",
  description: "OG Labs is the go-to digital transformation partner for SMBs across Australia, New Zealand, and Southeast Asia.",
}

export default function About() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-wider text-brand">Your APAC digital transformation partner</p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">About OG Labs</h1>
      <div className="mt-8 prose prose-lg max-w-none text-body">
        <p>
          OG Labs is the go-to digital transformation partner for SMBs across Australia, New Zealand, and Southeast Asia.
          We blend HubSpot and ClickUp expertise with AI-driven agentic workflows to help your business scale.
        </p>
        <h2>Our Mission</h2>
        <p>
          We help APAC SMBs automate work without adding complexity or technical overhead. From CRM implementation to
          AI-powered automation, OG Labs delivers end-to-end transformation tailored to your industry, processes, and
          growth goals.
        </p>
        <h2>Why OG Labs</h2>
        <ul>
          <li>Dual-platform expertise: HubSpot + ClickUp</li>
          <li>Agentic AI workflows with Make & n8n</li>
          <li>Industry specialisation: Construction, Manufacturing, Financial Services</li>
          <li>APAC-based team with local presence</li>
          <li>Right-sized solutions for growing SMBs</li>
          <li>Strategic advisory included with every engagement</li>
        </ul>
        <div className="mt-8">
          <Link href="/contact" className="inline-flex rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-dark transition-colors">
            Book a consultation
          </Link>
        </div>
      </div>
    </div>
  )
}
