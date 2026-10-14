import type { Metadata } from "next";
import Page from "@/components/shell/Page";
import Hero from "@/components/landing/Hero";
import CardSection from "@/components/landing/CardSection";
import FaqSection from "@/components/landing/FaqSection";
import CtaBand from "@/components/landing/CtaBand";
import type { Card, FaqItem } from "@/components/landing/types";

export const metadata: Metadata = {
  alternates: { canonical: "/sg" },
};

// Framer route /sg. Desktop-only Framer page (no tablet/phone layouts): narrower screens
// show the desktop layout squeezed, overflowing where Framer overflows.
const servicesAcrossSingapore: Card[][] = [
  [
    { title: { text: "HubSpot consultant Singapore", w: 320 }, text: { text: "Full-stack HubSpot implementation for Singapore-based SMBs scaling sales, marketing, and customer success across the region.", w: 320 } },
  ],
  [
    { title: { text: "CRM implementation Singapore", w: 320 }, text: { text: "Strategic CRM selection and implementation for SG firms in construction, manufacturing, and financial services.", w: 320 } },
  ],
  [
    { title: { text: "Digital transformation APAC", w: 320 }, text: { text: "End-to-end transformation programs combining HubSpot, ClickUp, AI workflows, and bespoke integrations for SEA businesses.", w: 320 } },
  ],
];

const servicesForSoutheast: Card[][] = [
  [
    { title: { text: "HubSpot implementation", w: "auto" }, text: "Certified HubSpot Solutions Partner delivering CRM implementation, migration and optimisation for Singapore and SEA businesses, in your timezone." },
    { title: { text: "CRM consulting", w: "auto" }, text: "Vendor-neutral CRM advice for SEA businesses navigating growth, multiple markets and diverse customer bases." },
  ],
  [
    { title: { text: "ClickUp implementation", w: "auto" }, text: "Workspace architecture, automations and cross-team dashboards for SEA businesses managing complex projects across multiple markets." },
    { title: { text: "Advanced integrations", w: "auto" }, text: "Connecting CRM, ERP, finance and project tools across multi-country teams so data stays consistent regardless of which market it originates in." },
  ],
  [
    { title: { text: "AI automation", w: "auto" }, text: "Make and n8n automation built for the SEA context, including privacy-first options for regulated industries." },
    { title: { text: "Process optimisation", w: "auto" }, text: "Identifying and removing the manual work that holds SEA teams back, using process redesign and automation." },
  ],
];

const workingWithOg: FaqItem[] = [
  { q: { text: "Which countries do you cover from Singapore?", w: "auto" }, a: { text: "Singapore and the broader SEA region including Malaysia, Indonesia, the Philippines, Thailand and Vietnam.", w: "auto" } },
  { q: { text: "Can you support multi-country teams?", w: "auto" }, a: { text: "Yes. We build systems that work consistently across markets, accounting for local requirements including data residency and compliance.", w: "auto" } },
  { q: { text: "Do you offer privacy-first automation for regulated industries?", w: "auto" }, a: { text: "Yes. We use self-hosted n8n for clients who need sensitive data to remain inside their own infrastructure.", w: "auto" } },
  { q: { text: "Do you understand the SEA market?", w: "auto" }, a: { text: "Yes. We have worked with businesses across the region and understand the diversity of market contexts, compliance requirements and business cultures.", w: "auto" } },
];

export default function SgPage() {
  return (
    <Page footer="full">
      <Hero
        layout="region"
        badge="Singapore & Southeast Asia"
        badgeLight
        title="Your digital transformation partner in Singapore and Southeast Asia"
        text="From our Singapore hub, OG Labs helps SMBs across Southeast Asia implement HubSpot and ClickUp and automate the manual work in between. A single partner for multi-country teams, with a growing presence across Malaysia, Indonesia, the Philippines and beyond."
        leftWidth="60%"
        image={{ src: "/framer/gC9cSz3Yycfm7BhnQnR0aqZkH3A.jpg", width: 5198, height: 2924, position: "50% 26.2%" }}
      />
      <CardSection
        title="Services across Singapore and SEA"
        gap={36}
        masonry={servicesAcrossSingapore}
        card={{ tone: "gray", pad: 24, fit: true }}
      />
      <CardSection
        title="Services for Southeast Asia businesses"
        grouped
        gap={48}
        masonry={servicesForSoutheast}
        card={{ tone: "white", pad: 32 }}
      />
      <FaqSection title="Working with OG Labs in Southeast Asia" items={workingWithOg} />
      <CtaBand
        title="Building digital transformation across Southeast Asia"
        text="Book a consultation. We work with SMBs across Singapore, Malaysia, Indonesia, Thailand, Vietnam, and the Philippines."
      />
    </Page>
  );
}
