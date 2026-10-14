import type { Metadata } from "next";
import Page from "@/components/shell/Page";
import ServiceTemplate from "@/components/services/ServiceTemplate";
import type { ServiceContent } from "@/components/services/types";

export const metadata: Metadata = {
  alternates: { canonical: "/services/work-management" },
};

// Framer route /services/work-management (copy verbatim from the Framer publish, quirks included).
const content: ServiceContent = {
  hero: {
    badge: "Work Management",
    title: "Work management that ends the bottlenecks",
    intro: "OG Labs designs work management systems that change how your teams collaborate and deliver. We map how work really moves through your business, then build a system that gives everyone visibility, removes manual handoffs, and lets leadership see project health in real time.",
  },
  sections: [
    {
      kind: "grid",
      bg: "white",
      padX: 24,
      gap: 36,
      maxWidth: 1440,
      raised: true,
      grid: {
        type: "auto",
        cols: 3,
        min: 200,
        bg: "white",
        tone: "gray",
        items: [
          {
            title: "Workspace Architecture",
            body: "Design scalable ClickUp workspaces with the right hierarchy — spaces, folders, lists, and views — tailored to your team structure and workflows.",
          },
          {
            title: "Process Standardisation",
            body: "Create templates, standard operating procedures, and automated task flows that ensure consistency and accountability across projects.",
          },
          {
            title: "Team Onboarding & Training",
            body: "Hands-on training and change management to ensure 90%+ team adoption within the first 3 months of implementation.",
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
      heading: { text: "What we deliver", grouped: true },
      grid: {
        type: "masonry",
        bg: "none",
        tone: "white",
        columns: [
          [
            {
              title: "Workflow design",
              body: "Standardised, repeatable processes for how work is requested, assigned, tracked and completed, built into the tools your team already uses.",
              fitTitle: true,
            },
            {
              title: "Automated handoffs",
              body: "Removing the chase-up emails and status meetings between stages with automations that move work and notify people at the right moment.",
              fitTitle: true,
            },
          ],
          [
            {
              title: "Capacity and resource planning",
              body: "Clear views of who is working on what so nothing is overloaded or dropped, and commitments are realistic before they are made.",
              fitTitle: true,
            },
            {
              title: "Reporting and dashboards",
              body: "Utilisation, throughput and delivery-against-deadline dashboards for both team leads and leadership.",
              fitTitle: true,
            },
          ],
          [
            {
              title: "Cross-team visibility",
              body: "One place where sales, delivery and operations can see the same status, so handoffs are clean and everyone knows what is happening without chasing.",
              fitTitle: true,
            },
            {
              title: "System integration",
              body: "Connecting your work management tool to CRM, finance and communication tools so data does not live in silos.",
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
      heading: { text: "Work management FAQs" },
      rows: [
        {
          title: "Is work management the same as project management?",
          body: "Broader. Project management runs individual projects. Work management is the system that runs all of your recurring and project work together, giving you one view across everything in flight.",
          fitTitle: true,
        },
        {
          title: "Which tool do you build on?",
          body: "Usually ClickUp, because of its flexibility, custom fields and reporting. We recommend based on your specific needs and existing tools rather than defaulting to any single platform.",
          fitTitle: true,
        },
        {
          title: "Can you connect work management to our CRM?",
          body: "Yes. We connect ClickUp to HubSpot and your wider stack so sales handoffs and delivery stay in sync without anyone manually copying data between systems.",
          fitTitle: true,
        },
        {
          title: "How long before we see results?",
          body: "Teams typically see visibility and handoff improvements within the first two weeks. The bigger productivity gains come as the team builds habits around the new workflows over the following month.",
          fitTitle: true,
        },
      ],
    },
  ],
  industries: ["/industries/construction", "/industries/manufacturing"],
  cta: {
    title: "Ready to eliminate workflow chaos?",
    body: "Let our work management consultants design a system your team will actually use — and love.",
  },
};

export default function ServicesWorkManagementPage() {
  return (
    <Page footer="full">
      <ServiceTemplate content={content} />
    </Page>
  );
}
