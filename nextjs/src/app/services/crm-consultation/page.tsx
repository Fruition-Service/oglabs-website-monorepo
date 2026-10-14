import type { Metadata } from "next";
import Page from "@/components/shell/Page";
import ServiceTemplate from "@/components/services/ServiceTemplate";
import type { ServiceContent } from "@/components/services/types";

export const metadata: Metadata = {
  alternates: { canonical: "/services/crm-consultation" },
};

// Framer route /services/crm-consultation (copy verbatim from the Framer publish, quirks included).
const content: ServiceContent = {
  hero: {
    badge: "CRM CONSULTATION",
    title: "Choose and implement the right CRM with no guesswork",
    intro: "Picking and rolling out a CRM is a significant decision. OG Labs gives you strategic, vendor-aware guidance: we analyse your sales process, customer journey and growth objectives, recommend the right platform and tier, then implement it properly. We are a HubSpot Solutions Partner, and we will tell you honestly when HubSpot is not the right fit.",
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
              title: "CRM Selection & Roadmap",
              body: "We assess your business requirements and recommend the right CRM platform — HubSpot, Salesforce, or others — with a clear implementation roadmap.",
            },
          ],
          [
            {
              title: "Sales Process Design",
              body: "Map and optimise your sales pipeline, define stages, automations, and reporting dashboards aligned to your revenue goals.",
            },
          ],
          [
            {
              title: "Data Migration & Hygiene",
              body: "Clean, migrate, and structure your existing customer data to ensure your CRM launch starts with accurate, actionable information.",
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
      heading: { text: "How we help", grouped: true },
      grid: {
        type: "masonry",
        bg: "none",
        tone: "white",
        columns: [
          [
            {
              title: "CRM selection",
              body: "A structured evaluation of your requirements against the platforms that suit your size, industry and growth trajectory, with a clear recommendation and rationale.",
              fitTitle: true,
            },
            {
              title: "Team adoption",
              body: "Training and change management so the team uses the CRM properly from day one, rather than reverting to spreadsheets and email threads.",
              fitTitle: true,
            },
          ],
          [
            {
              title: "Process design",
              body: "Mapping your pipeline, lifecycle stages, customer journey and handoffs before any configuration, so the build reflects how you actually sell.",
              fitTitle: true,
            },
            {
              title: "Ongoing optimisation",
              body: "Regular reviews to keep the CRM aligned with how your business evolves, adding capability and cleaning up anything that has drifted out of shape.",
              fitTitle: true,
            },
          ],
          [
            {
              title: "Implementation",
              body: "Clean data migration, configuration, automation and integration, built to platform best practice with your processes rather than generic vendor defaults.",
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
      heading: { text: "CRM consulting FAQs" },
      rows: [
        {
          title: "Do you only recommend HubSpot?",
          body: "No. We are HubSpot certified and it suits most of our clients, but our job is to recommend what genuinely fits your requirements, even if that means another platform.",
          fitTitle: true,
        },
        {
          title: "We already have a CRM that is a mess. Can you help?",
          body: "Yes. We audit your current setup, clean the data, and rebuild the processes, automation and reporting so the team can trust what they see.",
          fitTitle: true,
          fitBody: true,
        },
        {
          title: "How is CRM consulting priced?",
          body: "Selection and strategy can be a fixed-fee engagement. Implementation is scoped and quoted separately based on data complexity and the number of integrations needed.",
          fitTitle: true,
        },
        {
          title: "How long does CRM implementation take?",
          body: "Typically four to eight weeks for an SMB, depending on data volume and the number of integrations. We give you a firm timeline after the scoping phase.",
          fitTitle: true,
        },
      ],
    },
  ],
  industries: ["/industries/construction", "/industries/manufacturing", "/industries/financial-services"],
  cta: {
    title: "Not sure which CRM is right for you?",
    body: "Book a free strategy session with our CRM consultants and get a tailored recommendation for your business.",
  },
};

export default function ServicesCrmConsultationPage() {
  return (
    <Page footer="full">
      <ServiceTemplate content={content} />
    </Page>
  );
}
