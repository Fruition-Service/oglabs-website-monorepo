import type { Metadata } from "next";
import Page from "@/components/shell/Page";
import Hero from "@/components/landing/Hero";
import CardSection from "@/components/landing/CardSection";
import FaqSection from "@/components/landing/FaqSection";
import PillLinks from "@/components/landing/PillLinks";
import CtaBand from "@/components/landing/CtaBand";
import type { Card, FaqItem } from "@/components/landing/types";

export const metadata: Metadata = {
  alternates: { canonical: "/industries/construction" },
};

// Framer route /industries/construction. Desktop-only Framer page (no tablet/phone layouts): narrower screens
// show the desktop layout squeezed, overflowing where Framer overflows.
const theConstructionOperations: Card[] = [
  { num: { text: "01", w: "auto" }, title: "Fragmented systems", text: "Estimating, project management, and accounting tools that do not talk to each other, forcing teams to rekey data and chase information." },
  { num: { text: "02", w: "auto" }, title: "Manual data entry", text: "Project managers spending hours every week copying information between systems, leaving less time for delivery and client relationships." },
  { num: { text: "03", w: "auto" }, title: "No real-time visibility", text: "Leadership flying blind between tender and handover, with no consolidated view of pipeline, project health, or resource allocation." },
];

const whatWeDeliver: Card[] = [
  { title: "Tender & lead management", text: "HubSpot configured around your sales pipeline. Track opportunities from initial enquiry through tender response, with AI-driven follow-ups and pipeline analytics." },
  { title: "Project tracking in ClickUp", text: "Custom workspaces matching your project phases, from pre-construction to handover. Resource scheduling, milestone tracking, and team collaboration in one place." },
  { title: "Field-to-office integration", text: "Connect site apps, accounting platforms, and CRM through Make and n8n. Real-time data flow eliminates manual rekeying and gives leadership full visibility." },
  { title: "Compliance automation", text: "AI workflows that monitor safety records, quality checks, and regulatory deadlines automatically. Stay ahead of audits without the manual overhead." },
];

const whereWeHelp: Card[] = [
  { title: { text: "Tender and bid management", w: "auto" }, text: "Track opportunities, deadlines, documents and bid team tasks in one place so no tender slips through and bid coordinators always know what is due." },
  { title: { text: "Project tracking", w: "auto" }, text: "Stage gates, tasks, RFIs and variations visible to both office and site, updated in real time without duplicate reporting." },
  { title: "Subcontractor and resource management", text: "Know who is allocated, what is confirmed and what is still to be arranged, without the spreadsheet juggling." },
  { title: { text: "Compliance and safety workflows", w: "auto" }, text: "Capture, store and audit the safety records, inductions, certificates and sign-offs you are required to keep, built into the daily workflow rather than treated as extra admin." },
  { title: "Client and prospect management", text: "A CRM that follows the job from first enquiry through to handover, so every client touchpoint is recorded and nothing is lost when staff change." },
  { title: { text: "Document generation", w: "auto" }, text: "Auto-generate variation orders, site instructions, weekly reports and invoices from project data, reducing the admin hours spent on paperwork." },
];

const constructionDigitalisationFaqs: FaqItem[] = [
  { q: { text: "Can you handle the document volume in construction?", w: "auto" }, a: { text: "Yes. We automate document generation and storage, and connect to your existing file systems and document management tools.", w: "auto" } },
  { q: { text: "Will this work for site teams who are not office-based?", w: "auto" }, a: { text: "Yes. We design mobile-friendly workflows so site teams can update status, submit safety records and flag issues from the field without paperwork.", w: "auto" } },
  { q: { text: "How do you handle compliance and audit requirements?", w: "auto" }, a: { text: "We build compliance and safety record-keeping into the daily workflow so audits are a report pull rather than a paper chase.", w: "auto" } },
  { q: { text: "Can you integrate with our estimating or accounting software?", w: "auto" }, a: { text: "Usually yes. We connect CRM, project management and finance tools using Make and n8n so data flows cleanly across the business.", w: "auto" } },
];

export default function IndustriesConstructionPage() {
  return (
    <Page footer="full">
      <Hero
        layout="industry"
        badge="For construction"
        title="Systems built for how construction actually runs"
        text="Construction runs on tight margins, complex coordination and strict compliance. OG Labs helps construction firms across Australia, New Zealand and Southeast Asia digitise the work that holds projects together, from tender and estimating through to site operations, using HubSpot, ClickUp and tailored automation."
        leftWidth="61%"
        clip
      />
      <CardSection
        title="The construction operations challenge"
        gap={36}
        clip
        grid={{ cols: 3, min: 200 }}
        cards={theConstructionOperations}
        card={{ tone: "gray", pad: 24 }}
      />
      <CardSection
        title="What we deliver for construction"
        gap={36}
        alignStart
        clip
        grid={{ cols: 2, min: 280 }}
        cards={whatWeDeliver}
        card={{ tone: "gray", pad: 32 }}
      />
      <CardSection
        title="Where we help construction firms"
        grouped
        gap={48}
        grid={{ cols: 3, min: 220 }}
        cards={whereWeHelp}
        card={{ tone: "white", pad: 32 }}
      />
      <FaqSection title="Construction digitalisation FAQs" items={constructionDigitalisationFaqs} fullBleed />
      <PillLinks groups={[["/services/hubspot", "/services/clickup", "/services/advanced-integrations"]]} />
      <CtaBand
        title="Ready to transform your construction operations?"
        text="Book a 30-minute discovery call. We will map your current tech stack and propose a tailored roadmap for your firm."
        clip
      />
    </Page>
  );
}
