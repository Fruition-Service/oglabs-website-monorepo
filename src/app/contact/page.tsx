import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact OG Labs",
  description: "Get in touch with OG Labs for HubSpot, ClickUp, and AI automation consulting across APAC.",
}

export default function Contact() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-wider text-brand">Get in touch</p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Contact OG Labs</h1>
      <p className="mt-4 text-lg text-muted">
        Ready to transform your operations? Book a consultation with our team.
      </p>

      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold">Book a consultation</h2>
            <p className="mt-2 text-muted">
              Schedule a 30-minute call to discuss your digital transformation needs.
            </p>
            <a
              href="https://meetings-ap1.hubspot.com/thana"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-dark transition-colors"
            >
              Book a consultation
            </a>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Our locations</h2>
            <ul className="mt-2 space-y-2 text-muted">
              <li>🇦🇺 Australia</li>
              <li>🇳🇿 New Zealand</li>
              <li>🇸🇬 Singapore</li>
            </ul>
          </div>
        </div>

        <div className="rounded-2xl border border-ui bg-surface-subtle p-8">
          <h2 className="text-xl font-semibold">Send us a message</h2>
          <form className="mt-6 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-body">Name</label>
              <input
                type="text"
                id="name"
                className="mt-1 block w-full rounded-xl border border-ui bg-white px-4 py-2.5 text-sm focus:border-brand focus:ring-1 focus:ring-brand outline-none"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-body">Email</label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full rounded-xl border border-ui bg-white px-4 py-2.5 text-sm focus:border-brand focus:ring-1 focus:ring-brand outline-none"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-body">Message</label>
              <textarea
                id="message"
                rows={4}
                className="mt-1 block w-full rounded-xl border border-ui bg-white px-4 py-2.5 text-sm focus:border-brand focus:ring-1 focus:ring-brand outline-none"
                placeholder="Tell us about your project..."
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-dark transition-colors"
            >
              Send message
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
