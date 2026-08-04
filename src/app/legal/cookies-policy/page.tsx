import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cookies Policy",
  description: "Cookies Policy for OG Labs — digital transformation partner for APAC SMBs.",
  robots: { index: false },
}

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight">Cookies Policy</h1>
      <p className="mt-2 text-sm text-muted">Last updated: 2026</p>
      <div className="mt-8 prose prose-lg max-w-none text-body">
        <p>
          This Cookies Policy governs your use of the OG Labs website and services.
          OG Labs is a digital transformation partner specialising in HubSpot, ClickUp, and AI-driven automation for SMBs across APAC.
        </p>
        <h2>1. Overview</h2>
        <p>
          By accessing or using OG Labs services, you agree to be bound by this Cookies Policy. If you do not agree, please do not use our services.
        </p>
        <h2>2. Contact</h2>
        <p>
          For questions about this Cookies Policy, please contact us through our website or book a consultation.
        </p>
        <p>
          © {new Date().getFullYear()} OG Labs. All rights reserved.
        </p>
      </div>
    </div>
  )
}
