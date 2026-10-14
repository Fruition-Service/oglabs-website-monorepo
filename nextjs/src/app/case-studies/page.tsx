import type { Metadata } from "next";
import Page from "@/components/shell/Page";
import Hero from "@/components/landing/Hero";
import CardSection from "@/components/landing/CardSection";
import CtaBand from "@/components/landing/CtaBand";
import type { Card } from "@/components/landing/types";

export const metadata: Metadata = {
  title: "OG Labs | Case Studies | Digital Transformation Success Stories",
  description:
    "Real results from real businesses. Explore how OG Labs has helped SMBs across Australia, New Zealand, and Southeast Asia streamline operations, adopt HubSpot and ClickUp, and unlock growth through AI automation.",
  alternates: { canonical: "/case-studies" },
};

// Framer route /case-studies. Desktop-only Framer page (no tablet/phone layouts): narrower screens
// show the desktop layout squeezed, overflowing where Framer overflows.
const resultsByIndustry: Card[][] = [
  [
    { title: "Manufacturing Transformation", text: "How a Sydney-based manufacturer reduced order processing time by 60% using HubSpot CRM and custom pipeline automation built by OG Labs." },
  ],
  [
    { title: "Financial Services Modernisation", text: "How a Melbourne financial services firm streamlined client onboarding and compliance tracking with ClickUp and integrated HubSpot workflows." },
  ],
  [
    { title: "Professional Services Automation", text: "How a Brisbane professional services firm automated proposal generation and client reporting using n8n and AI workflows, saving 15 hours per week." },
  ],
];

const resultsWeDeliver: Card[] = [
  { title: "40 to 60% reduction in manual tasks", text: "Automating data entry, handoffs and reporting frees your team to focus on work that actually needs a human." },
  { title: "25 to 35% lower operational costs", text: "Fewer errors, faster processes and less time on admin translate directly to cost savings within the first quarter." },
  { title: "90% team adoption within 3 months", text: "Structured onboarding, role-based training and documentation built into every engagement." },
];

const industriesWeHave: Card[][] = [
  [
    { title: { text: "Construction", w: "auto" }, text: "From tender management and compliance tracking to project visibility and client CRM, helping construction firms replace spreadsheets with systems that scale." },
  ],
  [
    { title: { text: "Manufacturing", w: "auto" }, text: "Connecting shop floor to business systems, automating inventory and order workflows, and giving production teams real-time visibility." },
  ],
  [
    { title: { text: "Financial services", w: "auto" }, text: "Client onboarding, compliance tracking and relationship management built for firms that need both a great client experience and an airtight audit trail." },
  ],
];

export default function CaseStudiesPage() {
  return (
    <Page footer="full">
      <Hero
        layout="fixed"
        badge="CASE STUDIES"
        badgeLight
        title="Real results for real APAC businesses"
        text="We measure our work by the value it creates. Browse how OG Labs has helped construction, manufacturing and financial services firms across APAC turn messy processes into systems that scale, with measurable results in time saved, costs reduced and revenue unlocked."
        leftWidth="60%"
        image={{ src: "/framer/VotUd3ghVAoXEkEbEACviJcp3w.webp", width: 612, height: 344, position: "center" }}
      />
      <CardSection
        title="Results by industry"
        gap={36}
        masonry={resultsByIndustry}
        card={{ tone: "gray", pad: 24 }}
      />
      <CardSection
        title="Results we deliver"
        intro="While we prepare detailed case studies, here are the kinds of outcomes our clients typically see."
        grouped
        tone="gray"
        gap={48}
        grid={{ cols: 3, min: 220 }}
        cards={resultsWeDeliver}
        card={{ tone: "white", pad: 32 }}
      />
      <CardSection
        title="Industries we have worked in"
        grouped
        gap={48}
        masonry={industriesWeHave}
        card={{ tone: "white", pad: 32 }}
      />
      <CtaBand
        title="Transforming businesses across Australia, New Zealand, and Southeast Asia"
        text="Every engagement starts with a discovery session. Book a consultation to see how OG Labs can help your business achieve measurable results."
      />
    </Page>
  );
}
