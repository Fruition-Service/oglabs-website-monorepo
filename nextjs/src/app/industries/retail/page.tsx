import type { Metadata } from "next";
import Page from "@/components/shell/Page";
import Hero from "@/components/landing/Hero";
import CardSection from "@/components/landing/CardSection";
import FaqSection from "@/components/landing/FaqSection";
import PillLinks from "@/components/landing/PillLinks";
import CtaBand from "@/components/landing/CtaBand";
import type { Card, FaqItem } from "@/components/landing/types";

export const metadata: Metadata = {
  title: "Retail CRM & Automation Partner APAC | OG Labs",
  description:
    "OG Labs helps retailers and ecommerce brands across Australia, New Zealand and Southeast Asia connect store, online and customer data with HubSpot, ClickUp and automation.",
  alternates: { canonical: "/industries/retail" },
};

// Not a Framer page: added after the migration on the industry template (same sections and
// components as /industries/construction).
const theRetailChallenge: Card[] = [
  { num: { text: "01", w: "auto" }, title: "Disconnected channels", text: "Store, online and marketplace sales each live in their own system, so customer, stock and sales data never line up without manual exports." },
  { num: { text: "02", w: "auto" }, title: "Generic marketing", text: "Customer data sits in the POS and ecommerce platform, but campaigns still go out to everyone because nothing connects purchases to marketing." },
  { num: { text: "03", w: "auto" }, title: "Operational busywork", text: "Store openings, promotions, supplier follow-ups and range changes run on spreadsheets and email threads that nobody can see at a glance." },
];

const whatWeDeliver: Card[] = [
  { title: "Customer data & marketing", text: "HubSpot connected to your ecommerce and POS data, so segments, campaigns and lifecycle emails are driven by what customers actually buy." },
  { title: "Retail operations in ClickUp", text: "Workspaces for store operations, promotions, launches and supplier management, with templates that make every rollout repeatable." },
  { title: "Commerce integrations", text: "Make and n8n integrations between your ecommerce platform, POS, inventory, accounting and CRM, so orders, stock and customer records stay in sync." },
  { title: "AI for customer service", text: "AI workflows that answer order and returns questions, draft product content and route complex enquiries to your team, so customers get faster answers." },
];

const whereWeHelp: Card[] = [
  { title: { text: "Single customer view", w: "auto" }, text: "Bring online and in-store purchases together on one customer record, so your team and your marketing see the full relationship." },
  { title: { text: "Lifecycle marketing", w: "auto" }, text: "Welcome, post-purchase, win-back and abandoned-cart journeys that run automatically and are measured against real revenue." },
  { title: "Loyalty and repeat purchase", text: "Track loyalty, reviews and referrals in the CRM and trigger the right offer at the right time, without manual list pulls." },
  { title: { text: "Store and promotion rollouts", w: "auto" }, text: "Standardised ClickUp workflows for store openings, seasonal campaigns and range changes, so every team knows what is due." },
  { title: "Supplier and wholesale management", text: "Keep supplier contacts, orders and follow-ups in one place, with automated reminders instead of chasing by email." },
  { title: { text: "Sales and stock reporting", w: "auto" }, text: "Dashboards that combine channel sales, customer metrics and campaign results without exporting reports from every system each week." },
];

const retailFaqs: FaqItem[] = [
  { q: { text: "Can you connect HubSpot to Shopify or our POS?", w: "auto" }, a: { text: "Yes. We connect HubSpot to common ecommerce and POS platforms through native integrations, Make or n8n, mapping orders, products and customers properly.", w: "auto" } },
  { q: { text: "Do you work with both ecommerce brands and physical stores?", w: "auto" }, a: { text: "Yes. We work with online-only brands, store networks and businesses that sell across both, and design the setup around your channels.", w: "auto" } },
  { q: { text: "Will this replace our inventory or accounting system?", w: "auto" }, a: { text: "No. We keep the systems that run your stock and finances and add a connected CRM and workflow layer around them.", w: "auto" } },
  { q: { text: "How quickly can we see results from marketing automation?", w: "auto" }, a: { text: "Core journeys such as welcome, post-purchase and win-back can usually go live early in a project, so you start learning from real customer behaviour quickly.", w: "auto" } },
];

export default function IndustriesRetailPage() {
  return (
    <Page footer="full">
      <Hero
        layout="industry"
        badge="For retail"
        title="Connected customers, stores and channels"
        text="Retailers sell across stores, ecommerce and marketplaces, but the data and the work behind those channels rarely connect. OG Labs helps retail and ecommerce businesses across Australia, New Zealand and Southeast Asia unify customer data, automate marketing and run operations smoothly, using HubSpot, ClickUp and tailored automation."
        leftWidth="58%"
        clip
      />
      <CardSection
        title="The retail operations challenge"
        gap={36}
        clip
        grid={{ cols: 3, min: 200 }}
        cards={theRetailChallenge}
        card={{ tone: "gray", pad: 24 }}
      />
      <CardSection
        title="What we deliver for retail"
        gap={36}
        alignStart
        clip
        grid={{ cols: 2, min: 280 }}
        cards={whatWeDeliver}
        card={{ tone: "gray", pad: 32 }}
      />
      <CardSection
        title="Where we help retailers"
        grouped
        gap={48}
        grid={{ cols: 3, min: 220 }}
        cards={whereWeHelp}
        card={{ tone: "white", pad: 32 }}
      />
      <FaqSection title="Retail digitalisation FAQs" items={retailFaqs} fullBleed />
      <PillLinks groups={[["/services/hubspot", "/services/clickup", "/services/advanced-integrations"]]} />
      <CtaBand
        title="Ready to connect your retail operations?"
        text="Book a 30-minute discovery call. We will map your channels and tech stack and propose a tailored roadmap for your business."
        clip
      />
    </Page>
  );
}
