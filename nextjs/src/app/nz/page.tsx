import type { Metadata } from "next";
import Page from "@/components/shell/Page";
import Hero from "@/components/landing/Hero";
import CardSection from "@/components/landing/CardSection";
import FaqSection from "@/components/landing/FaqSection";
import CtaBand from "@/components/landing/CtaBand";
import type { Card, FaqItem } from "@/components/landing/types";

export const metadata: Metadata = {
  alternates: { canonical: "/nz" },
};

// Framer route /nz. Desktop-only Framer page (no tablet/phone layouts): narrower screens
// show the desktop layout squeezed, overflowing where Framer overflows.
const localExpertiseRegional: Card[][] = [
  [
    { title: "HubSpot consultant NZ", text: "Full HubSpot setup, migration, and optimisation for New Zealand SMBs growing their sales and marketing operations." },
  ],
  [
    { title: "ClickUp implementation Auckland", text: "ClickUp workspace design, workflows, and team rollout for project-based businesses across the North and South Islands." },
  ],
  [
    { title: "CRM consultant Wellington", text: "Strategic CRM advisory, vendor selection, and end-to-end implementation tailored to NZ SMB operations and budgets." },
  ],
];

const servicesForNew: Card[][] = [
  [
    { title: { text: "HubSpot implementation", w: "auto" }, text: "Certified HubSpot Solutions Partner delivering CRM implementation, onboarding and optimisation for New Zealand SMBs in construction, manufacturing and professional services." },
    { title: { text: "CRM consulting", w: "auto" }, text: "Vendor-neutral advice and implementation. We help NZ businesses choose and roll out the right CRM for their growth stage." },
  ],
  [
    { title: { text: "ClickUp implementation", w: "auto" }, text: "Workspace architecture, automations and training for NZ teams who need their project management to work the way they do." },
    { title: { text: "Advanced integrations", w: "auto" }, text: "Connecting CRM, ERP, finance and project tools so your NZ operation has one clean, consistent view of your business." },
  ],
  [
    { title: { text: "AI automation", w: "auto" }, text: "Make and n8n workflows that cut manual work and sync your systems, built and maintained by specialists in your timezone." },
    { title: { text: "Process optimisation", w: "auto" }, text: "Analysing and redesigning the workflows that cost NZ businesses the most time, then automating the manual steps." },
  ],
];

const workingWithOg: FaqItem[] = [
  { q: { text: "Do you work outside Auckland and Wellington?", w: "auto" }, a: { text: "Yes, remotely across New Zealand including Christchurch, Hamilton, Tauranga and regional businesses.", w: "auto" } },
  { q: { text: "Is the service the same standard as your Australian operations?", w: "auto" }, a: { text: "Yes, same team, same processes, same certifications.", w: "auto" } },
  { q: { text: "Can you help us migrate from our current CRM?", w: "auto" }, a: { text: "Yes, including migrations from Salesforce, Pipedrive, Zoho and spreadsheets.", w: "auto" } },
  { q: { text: "Do you understand the NZ market?", w: "auto" }, a: { text: "Yes. We work with NZ businesses directly and understand the local context around business size, compliance and buying patterns.", w: "auto" } },
];

export default function NzPage() {
  return (
    <Page footer="full">
      <Hero
        layout="region"
        badge="New Zealand"
        badgeLight
        title="HubSpot, ClickUp and automation expertise for New Zealand"
        text="OG Labs supports New Zealand businesses across Auckland, Wellington and Christchurch with the same HubSpot implementation, ClickUp setup and AI automation we deliver in Australia, with full timezone alignment and local understanding of the NZ market."
        leftWidth="60%"
        image={{ src: "/framer/ndDC1A2WxdzGm0imCKFm3AHmJc.jpg", width: 6000, height: 4000, position: "49.3% 54.5%" }}
      />
      <CardSection
        title="Local expertise, regional reach"
        gap={36}
        masonry={localExpertiseRegional}
        card={{ tone: "gray", pad: 24 }}
      />
      <CardSection
        title="Services for New Zealand businesses"
        grouped
        gap={48}
        masonry={servicesForNew}
        card={{ tone: "white", pad: 32 }}
      />
      <FaqSection title="Working with OG Labs in New Zealand" items={workingWithOg} />
      <CtaBand
        title="Partnering with NZ businesses to grow smarter"
        text="Book a consultation. We work remotely with teams across Aotearoa and understand local business context."
      />
    </Page>
  );
}
