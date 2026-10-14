import type { Metadata } from "next";
import Page from "@/components/shell/Page";
import ServiceTemplate from "@/components/services/ServiceTemplate";
import type { ServiceContent } from "@/components/services/types";

export const metadata: Metadata = {
  title: "Advanced System Integrations APAC | Make & n8n | OG Labs",
  description:
    "OG Labs connects your entire stack using Make, n8n and custom APIs. CRM to ERP, project management to finance, with reliable two-way data flow across APAC businesses.",
  alternates: { canonical: "/services/advanced-integrations" },
};

// Framer route /services/advanced-integrations (copy verbatim from the Framer publish, quirks included).
const content: ServiceContent = {
  hero: {
    badge: "INTEGRATIONS",
    title: "Connect your entire stack, cleanly",
    intro: "Disconnected tools mean duplicate data entry, errors and blind spots. OG Labs builds sophisticated integrations that move data reliably between your platforms so every system shows the same accurate picture. We use Make, n8n and custom APIs to handle logic that off-the-shelf connectors cannot.",
  },
  sections: [
    {
      kind: "grid",
      bg: "white",
      padX: 24,
      gap: 36,
      maxWidth: 1440,
      heading: { text: "What we deliver" },
      grid: {
        type: "auto",
        cols: 3,
        min: 200,
        bg: "white",
        tone: "gray",
        items: [
          {
            title: "HubSpot ↔ ClickUp Integration",
            body: "Seamlessly sync deals, contacts, and tasks between HubSpot CRM and ClickUp workspaces for a unified view across sales and operations.",
          },
          {
            title: "Make & n8n Automation Flows",
            body: "Build complex, multi-step automation workflows using Make (Integromat) and n8n that connect your apps and eliminate manual handoffs.",
          },
          {
            title: "Custom API Development",
            body: "Where off-the-shelf connectors fall short, we build custom API integrations to link proprietary systems, ERPs, and industry-specific platforms.",
          },
        ],
      },
    },
    {
      kind: "grid",
      bg: "white",
      padX: 24,
      gap: 48,
      maxWidth: 1440,
      heading: { text: "What we connect", grouped: true },
      grid: {
        type: "masonry",
        bg: "none",
        tone: "white",
        columns: [
          [
            {
              title: "CRM and ERP",
              body: "Two-way sync between HubSpot and your ERP or finance system so sales, orders and invoices stay consistent without anyone rekeying data.",
              fitTitle: true,
            },
            {
              title: "Custom and legacy apps",
              body: "Connecting internal tools, legacy systems and custom applications via their APIs, even when no native connector exists.",
              fitTitle: true,
            },
          ],
          [
            {
              title: "CRM and project management",
              body: "HubSpot to ClickUp so sales handoffs flow straight into delivery, with status and updates visible on both sides.",
              fitTitle: true,
            },
            {
              title: "Document and e-signature tools",
              body: "Triggering proposals, contracts and sign-offs from CRM events and writing the outcome back automatically.",
              fitTitle: true,
            },
          ],
          [
            {
              title: "Data warehouses",
              body: "Pushing CRM, operational and financial data into your data warehouse or BI tool for consolidated reporting.",
              fitTitle: true,
            },
            {
              title: "Communication platforms",
              body: "Connecting Slack, email and SMS to your CRM so notifications, alerts and follow-ups happen without manual intervention.",
              fitTitle: true,
            },
          ],
        ],
      },
    },
    {
      kind: "list",
      bg: "gray",
      padX: 48,
      gap: 40,
      maxWidth: 1440,
      heading: { text: "Integration FAQs" },
      rows: [
        {
          title: "Can you integrate a tool that has no native connector?",
          body: "Usually yes, through its API using Make or n8n, or a custom-built connector. If a tool exposes any API endpoint we can generally integrate it.",
          fitTitle: true,
          fitBody: true,
        },
        {
          title: "What about data quality during integration?",
          body: "We audit, map, deduplicate and validate data before connecting systems, and add conflict-handling logic so both sides stay clean after go-live.",
          fitTitle: true,
          fitBody: true,
        },
        {
          title: "Do you monitor integrations after launch?",
          body: "Yes. We add alerting and offer ongoing maintenance so you know immediately if something breaks rather than discovering it days later through a data discrepancy.",
          fitTitle: true,
        },
        {
          title: "How do you handle integrations for multi-country APAC teams?",
          body: "We account for timezone differences, currency handling and data residency requirements in the integration design, which is particularly relevant for clients operating across multiple APAC markets.",
          fitTitle: true,
        },
      ],
    },
  ],
  industries: ["/industries/construction", "/industries/manufacturing"],
  cta: {
    title: "Build a connected business",
    body: "Stop switching tabs and re-entering data. Let OG Labs build the integrations that make your tech stack work as one.",
  },
};

export default function ServicesAdvancedIntegrationsPage() {
  return (
    <Page footer="full">
      <ServiceTemplate content={content} />
    </Page>
  );
}
