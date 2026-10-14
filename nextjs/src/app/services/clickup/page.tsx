import type { Metadata } from "next";
import Page from "@/components/shell/Page";
import ServiceTemplate from "@/components/services/ServiceTemplate";
import type { ServiceContent } from "@/components/services/types";

export const metadata: Metadata = {
  title: "ClickUp Implementation Partner Australia | OG Labs",
  description:
    "Certified ClickUp partner for Australian, NZ and SEA teams. Workspace architecture, automations, dashboards and training. Purpose-built for construction, manufacturing and professional services.",
  alternates: { canonical: "/services/clickup" },
};

// Framer route /services/clickup (copy verbatim from the Framer publish, quirks included).
const content: ServiceContent = {
  hero: {
    badge: "CLICKUP",
    title: "ClickUp, built around the way your teams deliver",
    intro: "OG Labs is a ClickUp certified partner. We design and optimise ClickUp workspaces that give you real visibility over projects, remove status-update busywork, and scale as your team grows. From workspace architecture and custom fields to dashboards and automations, we make ClickUp work the way your business actually runs.",
    image: { src: "QEPOJPjCNOHxw9bjhRvMkI1rkoI.jpg", position: "50% 85.5%", width: 1920, height: 1080 },
  },
  sections: [
    {
      kind: "grid",
      bg: "white",
      padX: 24,
      gap: 36,
      maxWidth: 1440,
      heading: { text: "What we set up" },
      grid: {
        type: "auto",
        cols: 3,
        min: 200,
        bg: "white",
        tone: "gray",
        items: [
          {
            title: "Workspace Design",
            body: "Custom ClickUp spaces, folders, and lists architected to match how your team actually works.",
          },
          {
            title: "Workflow Automation",
            body: "Automated task creation, status updates, and notifications that eliminate manual admin work.",
          },
          {
            title: "ClickUp Training & Support",
            body: "Team onboarding, training sessions, and ongoing support to drive adoption across your organisation.",
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
      heading: { text: "What we do with ClickUp", grouped: true },
      grid: {
        type: "masonry",
        bg: "none",
        tone: "white",
        columns: [
          [
            {
              title: "Workspace architecture",
              body: "Spaces, folders, lists, hierarchy, statuses and custom fields designed for clarity and reporting. Built to be understood by everyone on the team, not just admins.",
              fitTitle: true,
            },
            {
              title: "Integrations",
              body: "Connecting ClickUp to HubSpot, Slack, email, finance and your wider tech stack so work and data stay aligned across tools.",
              fitTitle: true,
            },
          ],
          [
            {
              title: "Automations",
              body: "Removing manual handoffs with native ClickUp automations and deeper logic via Make and n8n for anything ClickUp cannot handle natively.",
              fitTitle: true,
            },
            {
              title: "Migration and imports",
              body: "Moving from Asana, Monday, Jira, Trello or spreadsheets, with data prepared and imported cleanly so nothing is lost.",
              fitTitle: true,
            },
          ],
          [
            {
              title: "Dashboards and reporting",
              body: "Real-time views of workload, capacity, project health and delivery for both teams and leadership, built into the workspace.",
              fitTitle: true,
            },
            {
              title: "Training and onboarding",
              body: "Role-based training sessions and documentation so every team member knows how to use their part of the workspace and adoption holds.",
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
      maxWidth: 1440,
      heading: { text: "Our ClickUp implementation process" },
      rows: [
        {
          title: "1. Discovery and process mapping",
          body: "We document how work moves through your teams today before designing anything.",
          fitTitle: true,
          fitBody: true,
        },
        {
          title: "2. Workspace design",
          body: "We architect your spaces, hierarchy, permissions and custom fields around your real workflows.",
          fitTitle: true,
          fitBody: true,
        },
        {
          title: "3. Collaborative build",
          body: "We configure ClickUp in sessions with your team and gather feedback as we build, so the result fits from day one.",
          fitTitle: true,
          fitBody: true,
        },
        {
          title: "4. Testing and import",
          body: "User acceptance testing with your team, then data import and go-live with people confident in the system.",
          fitTitle: true,
          fitBody: true,
        },
        {
          title: "5. Adoption and managed support",
          body: "Training, documentation and ongoing optimisation so the workspace grows with your business.",
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
      maxWidth: 1440,
      heading: { text: "ClickUp implementation FAQs" },
      rows: [
        {
          title: "Do we need a certified consultant to set up ClickUp?",
          body: "It is not required, but a structured build avoids the rework and sprawl that come from learning on the fly, and it drives adoption much faster. Most self-built workspaces get rebuilt within six months.",
          fitTitle: true,
        },
        {
          title: "Can you migrate us from Asana, Monday or Jira?",
          body: "Yes. We prepare and import your data and rebuild your workflows so nothing is lost in the move.",
          fitTitle: true,
          fitBody: true,
        },
        {
          title: "Can ClickUp replace several of our existing tools?",
          body: "Often yes. ClickUp can absorb task management, docs, goals and time tracking, reducing your tech stack and licence costs.",
          fitTitle: true,
          fitBody: true,
        },
        {
          title: "Can ClickUp connect to our CRM?",
          body: "Yes. We integrate ClickUp with HubSpot and other CRMs using Make and n8n so sales handoffs flow straight into delivery without manual rekeying.",
          fitTitle: true,
          fitBody: true,
        },
        {
          title: "Do you offer ongoing ClickUp support?",
          body: "Yes, through optimisation retainers and managed services so your workspace keeps pace with how your business changes.",
          fitTitle: true,
          fitBody: true,
        },
      ],
    },
  ],
  industries: ["/industries/construction", "/industries/manufacturing"],
  cta: {
    title: "ClickUp certified partner for the Asia-Pacific region",
    body: "From workspace design to full automation, OG Labs makes ClickUp work for your business.",
  },
};

export default function ServicesClickupPage() {
  return (
    <Page footer="full">
      <ServiceTemplate content={content} />
    </Page>
  );
}
