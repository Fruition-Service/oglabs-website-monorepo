import type { Metadata } from "next";
import Page from "@/components/shell/Page";
import Hero from "@/components/landing/Hero";
import CardSection from "@/components/landing/CardSection";
import FaqSection from "@/components/landing/FaqSection";
import PillLinks from "@/components/landing/PillLinks";
import CtaBand from "@/components/landing/CtaBand";
import type { Card, FaqItem } from "@/components/landing/types";

export const metadata: Metadata = {
  alternates: { canonical: "/industries/financial-services" },
};

// Framer route /industries/financial-services. Desktop-only Framer page (no tablet/phone layouts): narrower screens
// show the desktop layout squeezed, overflowing where Framer overflows.
const theFinancialServices: Card[] = [
  { num: { text: "01", w: "auto" }, title: "Manual onboarding", text: "KYC, document collection, and client setup spread across email, spreadsheets, and disconnected tools. Days lost on every new client." },
  { num: { text: "02", w: "auto" }, title: "Compliance overhead", text: "Audit trails reconstructed from memory and email threads. Renewals, reviews, and reporting all done manually under regulatory pressure." },
  { num: { text: "03", w: "auto" }, title: "Fragmented client view", text: "Advisors juggling multiple systems to see one client. There is no single source of truth for relationships, portfolio, or service history." },
];

const whatWeDeliver: Card[] = [
  { title: "Client relationship management", text: "HubSpot tuned for financial services. A single view of every client relationship including portfolio, service history, and household connections." },
  { title: "Onboarding & KYC workflows", text: "ClickUp workflows for new client onboarding. Automated document requests, KYC tracking, and approval chains that cut onboarding time in half." },
  { title: "Compliance automation", text: "AI workflows that track renewals, reviews, suitability assessments, and regulatory reporting deadlines automatically. Never miss a compliance trigger." },
  { title: "Custodian & platform integrations", text: "Make and n8n integrations connecting your CRM to custodian platforms, planning tools, and back-office systems. Real-time data, no rekeying." },
];

const whereWeHelp: Card[][] = [
  [
    { title: { text: "Client onboarding", w: "auto" }, text: "Structured, compliant onboarding with KYC and AML steps built into the workflow, reducing time to active client while keeping every record where it needs to be." },
    { title: { text: "Secure automation", w: "auto" }, text: "Self-hosted n8n options so sensitive client data stays inside your own infrastructure rather than passing through third-party cloud services." },
  ],
  [
    { title: { text: "Compliance tracking", w: "auto" }, text: "Workflows and records that keep you audit-ready, with automated reminders for renewals, reviews and regulatory deadlines." },
    { title: { text: "Reporting and oversight", w: "auto" }, text: "Clear visibility for partners, compliance officers and leadership without asking staff to compile spreadsheets manually every month." },
  ],
  [
    { title: { text: "Relationship management", w: "auto" }, text: "A CRM that captures every client interaction, surfaces upcoming reviews, and gives advisers a complete picture of each relationship without manual note-hunting." },
    { title: { text: "Document management", w: "auto" }, text: "Automated document generation, e-signature triggers and version control built into your CRM workflows." },
  ],
];

const financialServicesDigitalisation: FaqItem[] = [
  { q: { text: "Is automation safe for regulated financial data?", w: "auto" }, a: "Yes, when built correctly. We use self-hosted options for sensitive data, apply validation and audit trails, and keep humans in the loop on key decisions." },
  { q: { text: "Can you build KYC and AML workflows?", w: "auto" }, a: "Yes. We build onboarding and monitoring workflows with the compliance steps your regulatory obligations require, working with your compliance team on the specifics." },
  { q: { text: "Do we need to change our core systems?", w: "auto" }, a: "Not necessarily. We connect and automate around the systems you already have, adding a CRM and workflow layer rather than replacing core infrastructure." },
  { q: { text: "How do you handle data residency for APAC clients?", w: "auto" }, a: "We account for data residency requirements in the architecture and use self-hosted options where data must remain in a specific jurisdiction." },
];

export default function IndustriesFinancialServicesPage() {
  return (
    <Page footer="full">
      <Hero
        layout="industry"
        badge="For financial services"
        title="Client experience and compliance, working together"
        text="Financial services firms have to deliver a great client experience while meeting strict compliance obligations. OG Labs builds systems that do both: streamlined client onboarding, dependable compliance tracking, and relationship management that scales, with privacy-first automation suited to regulated work."
        leftWidth="58%"
      />
      <CardSection
        title="The financial services operations bottleneck"
        gap={36}
        grid={{ cols: 3, min: 200 }}
        cards={theFinancialServices}
        card={{ tone: "gray", pad: 24 }}
      />
      <CardSection
        title="What we deliver for financial services"
        gap={36}
        alignStart
        grid={{ cols: 2, min: 280 }}
        cards={whatWeDeliver}
        card={{ tone: "gray", pad: 32 }}
      />
      <CardSection
        title="Where we help financial services firms"
        grouped
        gap={48}
        masonry={whereWeHelp}
        card={{ tone: "white", pad: 32 }}
      />
      <FaqSection title="Financial services digitalisation FAQs" items={financialServicesDigitalisation} />
      <PillLinks groups={[[null, null], ["/services/hubspot", "/services/ai-automation"]]} />
      <CtaBand
        title="Ready to streamline your advisory practice?"
        text="Book a discovery call. We will map your current onboarding, compliance, and CRM processes, then propose a tailored transformation plan."
      />
    </Page>
  );
}
