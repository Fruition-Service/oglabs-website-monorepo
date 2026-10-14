import type { Metadata } from "next";
import Page from "@/components/shell/Page";
import Hero from "@/components/landing/Hero";
import CardSection from "@/components/landing/CardSection";
import FaqSection from "@/components/landing/FaqSection";
import PillLinks from "@/components/landing/PillLinks";
import CtaBand from "@/components/landing/CtaBand";
import type { Card, FaqItem } from "@/components/landing/types";

export const metadata: Metadata = {
  alternates: { canonical: "/industries/manufacturing" },
};

// Framer route /industries/manufacturing. Desktop-only Framer page (no tablet/phone layouts): narrower screens
// show the desktop layout squeezed, overflowing where Framer overflows.
const theManufacturingOperations: Card[] = [
  { num: { text: "01", w: "auto" }, title: "Disconnected production data", text: "Shop floor data trapped in ERP or paper-based systems, never reaching sales, finance, or leadership in time to act." },
  { num: { text: "02", w: "auto" }, title: "Reactive quality control", text: "Quality issues spotted too late, after batches have shipped. No automated alerts when KPIs trend the wrong way." },
  { num: { text: "03", w: "auto" }, title: "Slow sales-to-fulfillment", text: "Manual handoffs between sales orders and production scheduling create delays, errors, and unhappy customers." },
];

const whatWeDeliver: Card[][] = [
  [
    { title: { text: "Sales pipeline in HubSpot", w: 500 }, text: { text: "CRM tailored for B2B manufacturing sales cycles. Track quotes, samples, and long-cycle deals with full visibility from first contact to PO.", w: 500 } },
    { title: { text: "ERP & shop floor integrations", w: 500 }, text: { text: "Make and n8n workflows that bridge your ERP, MES, and CRM. Real-time inventory, order status, and production data across all systems.", w: 500 } },
  ],
  [
    { title: { text: "Production scheduling in ClickUp", w: 500 }, text: { text: "Custom ClickUp workspaces for production planning, maintenance scheduling, and resource allocation that flex with demand.", w: 500 } },
    { title: { text: "Quality & KPI automation", w: 500 }, text: { text: "AI workflows that monitor quality data and KPIs in real time, alerting your team the moment something needs attention. Catch issues before they ship.", w: 500 } },
  ],
];

const whereWeHelp: Card[][] = [
  [
    { title: { text: "Production scheduling", w: "auto" }, text: "Clear, shared schedules that reflect current capacity, priorities and committed orders, visible to production leads and the commercial team simultaneously." },
    { title: { text: "Sales and quoting", w: "auto" }, text: "A CRM that ties customer demand to production capacity so sales quotes reflect realistic lead times and margins." },
  ],
  [
    { title: { text: "Inventory and order visibility", w: "auto" }, text: "Connect stock levels, purchase orders and customer orders so commitments are based on what is actually available rather than last week’s count." },
    { title: { text: "ERP and CRM integration", w: "auto" }, text: "Closing the gap between your ERP and customer-facing systems so order data, pricing and delivery status flow without rekeying." },
  ],
  [
    { title: { text: "Quality control workflows", w: "auto" }, text: "Capture, track and act on non-conformances, inspection results and corrective actions in a system that creates an auditable record automatically." },
    { title: { text: "Reporting and dashboards", w: "auto" }, text: "Real-time production, inventory and sales dashboards for operations managers and leadership, built from data that already exists in your systems." },
  ],
];

const manufacturingDigitalisationFaqs: FaqItem[] = [
  { q: { text: "Can you integrate with our ERP?", w: "auto" }, a: { text: "Yes. We connect ERP, CRM and project tools using Make, n8n and direct APIs, with clean two-way data flow and conflict handling.", w: "auto" } },
  { q: { text: "We have legacy systems. Is that a problem?", w: "auto" }, a: { text: "Usually not. If the system has an API, an export, or a database we can connect to, we can integrate it. We assess this during scoping.", w: "auto" } },
  { q: { text: "Where should we start if we want to digitalise?", w: "auto" }, a: { text: "We recommend starting with the integration or workflow that eliminates the most manual work or the most costly errors, then expanding from there.", w: "auto" } },
  { q: { text: "Can you connect shop floor data to our business systems?", w: "auto" }, a: { text: "Yes, where the shop floor tool has an API or data export. We connect production, quality and inventory data to CRM and reporting systems.", w: "auto" } },
];

export default function IndustriesManufacturingPage() {
  return (
    <Page footer="full">
      <Hero
        layout="industry"
        badge="For manufacturing"
        title="Connect the shop floor to the rest of the business"
        text="Manufacturers run on visibility: what is being made, what is in stock, and what is committed to customers. OG Labs helps manufacturing SMBs across APAC connect production data with their business systems so sales, operations and leadership work from the same real-time picture, using CRM, work management and automation."
        leftWidth="50%"
      />
      <CardSection
        title="The manufacturing operations gap"
        gap={36}
        grid={{ cols: 3, min: 200 }}
        cards={theManufacturingOperations}
        card={{ tone: "gray", pad: 24 }}
      />
      <CardSection
        title="What we deliver for manufacturing"
        gap={36}
        alignStart
        masonry={whatWeDeliver}
        card={{ tone: "gray", pad: 32, fit: true }}
      />
      <CardSection
        title="Where we help manufacturers"
        grouped
        gap={48}
        masonry={whereWeHelp}
        card={{ tone: "white", pad: 32 }}
      />
      <FaqSection title="Manufacturing digitalisation FAQs" items={manufacturingDigitalisationFaqs} />
      <PillLinks groups={[[null, null], ["/services/hubspot", "/services/advanced-integrations"]]} />
      <CtaBand
        title="Ready to connect your manufacturing operation?"
        text="Book a discovery call. We will assess your current systems and propose an integration roadmap tailored to your production model."
      />
    </Page>
  );
}
