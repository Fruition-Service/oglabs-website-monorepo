import type { Metadata } from "next";
import Page from "@/components/shell/Page";
import ServiceTemplate from "@/components/services/ServiceTemplate";
import type { ServiceContent } from "@/components/services/types";

export const metadata: Metadata = {
  title: "HubSpot Implementation Partner Australia | OG Labs",
  description:
    "Certified HubSpot Solutions Partner for Australian, NZ and SEA SMBs. CRM implementation, migration, automation and training. Free consultation.",
  alternates: { canonical: "/services/hubspot" },
};

// Framer route /services/hubspot (copy verbatim from the Framer publish, quirks included).
const content: ServiceContent = {
  hero: {
    badge: "HUBSPOT",
    title: "HubSpot implementation that fits how you actually work",
    intro: "OG Labs is a certified HubSpot Solutions Partner helping SMBs across Australia, New Zealand and Southeast Asia get real value from HubSpot. We configure the CRM around your sales and service processes, migrate your data cleanly, and connect HubSpot to the rest of your stack so your team has one trusted source of truth.",
    image: { src: "nnIZaw2zYsNr8TUydSM7EN12cM.png", position: "center", width: 1800, height: 942 },
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
        type: "masonry",
        bg: "white",
        tone: "gray",
        columns: [
          [
            {
              title: "CRM Implementation",
              body: "Full HubSpot setup including Sales Hub, Marketing Hub, and Service Hub. Custom pipelines, automations, and integrations tailored to your business.",
            },
          ],
          [
            {
              title: "Sales & Marketing Automation",
              body: "Lead generation workflows, email campaigns, and reporting dashboards built in HubSpot to drive revenue and track marketing ROI.",
            },
          ],
          [
            {
              title: "HubSpot Training & Support",
              body: "Onboarding, team training, and ongoing HubSpot support to ensure your team gets the most out of every feature.",
            },
          ],
        ],
      },
    },
    {
      kind: "grid",
      bg: "white",
      padX: 24,
      gap: 48,
      maxWidth: 1440,
      heading: { text: "What we do with HubSpot", grouped: true },
      grid: {
        type: "masonry",
        bg: "none",
        tone: "white",
        columns: [
          [
            {
              title: "Onboarding and implementation",
              body: "A structured build across Sales Hub, Marketing Hub, Service Hub, Operations Hub, Content Hub and Commerce Hub, configured to your pipeline, lifecycle stages and reporting from day one.",
              fitTitle: true,
            },
            {
              title: "RevOps and reporting",
              body: "Custom objects, properties, dashboards and attribution so leadership sees the numbers that matter, not vanity metrics.",
              fitTitle: true,
            },
          ],
          [
            {
              title: "Migration to HubSpot",
              body: "Moving from Salesforce, Pipedrive, Zoho or spreadsheets. We map objects, clean and deduplicate data, preserve history, and cut over with minimal disruption to your team.",
              fitTitle: true,
            },
            {
              title: "Integrations",
              body: "Connecting HubSpot to ERP, finance, ClickUp and custom apps using Make and n8n, with clean two-way data flow and conflict handling.",
              fitTitle: true,
            },
          ],
          [
            {
              title: "CRM audits and optimisation",
              body: "Already on HubSpot but it feels messy? We audit data quality, automation, lifecycle logic, permissions and reporting, then fix the gaps so your team can trust what they see.",
              fitTitle: true,
            },
            {
              title: "Training and enablement",
              body: "Role-based training and documentation tailored to your HubSpot setup, so adoption sticks and your team is self-sufficient after go-live.",
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
      gap: 48,
      maxWidth: null,
      heading: { text: "Our HubSpot implementation process" },
      rows: [
        {
          title: "1. Discovery",
          body: "We map your sales process, customer journey and current tools before touching any configuration.",
          fitTitle: true,
          fitBody: true,
        },
        {
          title: "2. Architecture",
          body: "We design your object model, properties, pipelines, lifecycle stages and permissions. Getting this right before building avoids expensive rework.",
          fitTitle: true,
          fitBody: true,
        },
        {
          title: "3. Build",
          body: "We configure HubSpot, set up automation, and import clean data using your approved architecture.",
          fitTitle: true,
          fitBody: true,
        },
        {
          title: "4. Enablement",
          body: "We train your team with documentation tailored to your exact setup so adoption holds after we leave.",
          fitTitle: true,
          fitBody: true,
        },
        {
          title: "5. Optimise",
          body: "Regular reviews to refine workflows, improve reporting, and add capability as your business grows.",
          fitTitle: true,
          fitBody: true,
        },
      ],
    },
    {
      kind: "list",
      bg: "white",
      padX: 48,
      gap: 40,
      maxWidth: 1441,
      heading: { text: "HubSpot implementation FAQs" },
      rows: [
        {
          title: "Can you migrate us from Salesforce or another CRM to HubSpot?",
          body: "Yes. We map your data, processes and historical reporting, then migrate with minimal disruption to your go-to-market teams. We have moved clients from Salesforce, Pipedrive, Zoho and spreadsheets.",
          fitTitle: true,
        },
        {
          title: "Do we still pay HubSpot onboarding fees?",
          body: "As a Solutions Partner we can often handle onboarding directly, so HubSpot’s mandatory onboarding fee may be waived. You pay for your licence and our implementation work.",
          fitTitle: true,
        },
        {
          title: "Which HubSpot tiers do you work with?",
          body: "All of them, from Starter through Enterprise. We will tell you honestly which tier and add-ons you actually need rather than overselling.",
          fitTitle: true,
          fitBody: true,
        },
        {
          title: "How long does a HubSpot implementation take?",
          body: "Most SMB implementations run four to eight weeks depending on data complexity and the number of Hubs involved.",
          fitTitle: true,
          fitBody: true,
        },
        {
          title: "Do you offer support after launch?",
          body: "Yes, through optimisation retainers and managed services so your HubSpot keeps improving as you grow.",
          fitTitle: true,
          fitBody: true,
        },
      ],
    },
  ],
  industries: ["/industries/construction", "/industries/manufacturing", "/industries/financial-services"],
  cta: {
    title: "HubSpot certified partner for the Asia-Pacific region",
    body: "From initial setup to full-scale optimisation, OG Labs supports your HubSpot journey every step of the way.",
  },
};

export default function ServicesHubspotPage() {
  return (
    <Page footer="full">
      <ServiceTemplate content={content} />
    </Page>
  );
}
