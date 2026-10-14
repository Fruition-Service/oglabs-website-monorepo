import type { Metadata } from "next";
import Page from "@/components/shell/Page";
import ServiceTemplate from "@/components/services/ServiceTemplate";
import type { ServiceContent } from "@/components/services/types";

export const metadata: Metadata = {
  title: "AI Automation Agency Australia | Make & n8n Experts | OG Labs",
  description:
    "OG Labs builds AI automation using Make and n8n for APAC SMBs. Lead ops, document workflows, AI agents and data sync. Free automation audit included.",
  alternates: { canonical: "/services/ai-automation" },
};

// Framer route /services/ai-automation (copy verbatim from the Framer publish, quirks included).
const content: ServiceContent = {
  hero: {
    badge: "AI AUTOMATION",
    title: "AI automation that quietly does the work for you",
    intro: "OG Labs designs and builds AI-powered automation that removes the repetitive work draining your team. Using Make and n8n alongside leading AI models, we connect your tools, automate multi-step processes, and put intelligent agents to work on the tasks people should not be doing by hand.",
    image: { src: "uymFdwRzNNRMDnszHct7td68dtg.jpg", position: "center", width: 612, height: 344 },
  },
  sections: [
    {
      kind: "grid",
      bg: "white",
      padX: 24,
      gap: 36,
      maxWidth: 1440,
      heading: { text: "What we automate" },
      grid: {
        type: "auto",
        cols: 3,
        min: 200,
        bg: "white",
        tone: "gray",
        items: [
          {
            title: "Workflow Automation",
            body: "Make, n8n, and Zapier automations that connect your CRM, project management, and operations tools.",
          },
          {
            title: "Agentic AI Workflows",
            body: "Custom AI agents built to handle repetitive tasks, data extraction, and multi-step business processes.",
          },
          {
            title: "AI Integration & Support",
            body: "Ongoing support and optimisation of your AI automation stack as your business scales.",
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
      heading: { text: "What we automate", grouped: true },
      grid: {
        type: "masonry",
        bg: "none",
        tone: "white",
        columns: [
          [
            {
              title: "Lead and sales operations",
              body: "Lead capture, enrichment, scoring, routing and CRM hygiene, automated end to end so your sales team works qualified leads, not a messy inbox.",
              fitTitle: true,
            },
            {
              title: "Data synchronisation",
              body: "Reliable two-way sync between CRM, ERP, finance and project tools so nothing is rekeyed and every system shows the same accurate data.",
              fitTitle: true,
            },
          ],
          [
            {
              title: "Document and reporting workflows",
              body: "Auto-generated proposals, contracts, invoices and scheduled reports, triggered by events in your CRM or project tool.",
              fitTitle: true,
            },
            {
              title: "AI agents",
              body: "Multi-step agents that read inputs, make decisions and act, with human checkpoints at the stages where oversight matters.",
              fitTitle: true,
            },
          ],
          [
            {
              title: "Customer operations",
              body: "Onboarding sequences, support triage, and AI assistants trained on your knowledge base that handle routine queries without a human.",
              fitTitle: true,
            },
            {
              title: "Process monitoring",
              body: "Alerts and escalations triggered when something falls outside a threshold, so issues are caught before they reach customers.",
              fitTitle: true,
            },
          ],
        ],
      },
    },
    {
      kind: "grid",
      bg: "gray",
      padX: 24,
      gap: 48,
      maxWidth: 1440,
      heading: {
        text: "Make vs n8n: choosing the right tool",
        grouped: true,
        intro: "We use both platforms and choose based on your requirements. Here is the difference.",
      },
      grid: {
        type: "auto",
        cols: 2,
        min: 280,
        bg: "none",
        tone: "white",
        items: [
          {
            title: "Make",
            body: "Our choice for fast, visual, enterprise-grade automation connecting hundreds of cloud apps with branching, error handling and complex logic. Ideal when you want a maintainable visual scenario that connects your CRM, ERP and marketing tools.",
            fitTitle: true,
          },
          {
            title: "n8n",
            body: "Our choice when you want self-hosted, privacy-first automation inside your own infrastructure. No per-task pricing, full control over your data flows, and advanced AI agent capability. Right for regulated industries and sensitive data.",
            fitTitle: true,
          },
        ],
      },
    },
    {
      kind: "list",
      bg: "white",
      padX: 48,
      gap: 48,
      maxWidth: 1440,
      heading: { text: "How we deliver automation" },
      rows: [
        {
          title: "1. Free automation audit",
          body: "We map your processes and quantify the highest-ROI automation opportunities before you spend anything.",
          fitTitle: true,
          fitBody: true,
        },
        {
          title: "2. Design",
          body: "We scope the workflows, data flows, error handling and guardrails.",
          fitTitle: true,
          fitBody: true,
        },
        {
          title: "3. Build and test",
          body: "We build against real data, add human-in-the-loop checks where needed, and validate outputs before going live.",
          fitTitle: true,
          fitBody: true,
        },
        {
          title: "4. Monitor and improve",
          body: "We host, monitor and refine so automations stay reliable as your tools and processes evolve.",
          fitTitle: true,
          fitBody: true,
        },
      ],
    },
    {
      kind: "list",
      bg: "gray",
      padX: 48,
      gap: 40,
      maxWidth: 1440,
      heading: { text: "AI automation FAQs" },
      rows: [
        {
          title: "What is the difference between automation and AI automation?",
          body: "Traditional automation follows fixed rules. AI automation adds models that can read unstructured input, make judgement calls and handle exceptions, with explicit rules and human checks keeping it safe and predictable.",
          fitTitle: true,
        },
        {
          title: "Is my data safe with AI automation?",
          body: "Yes. For sensitive data we use self-hosted n8n inside your own infrastructure, apply input validation and sanitisation, and add audit trails. We never send sensitive data to external AI models without your explicit approval.",
          fitTitle: true,
        },
        {
          title: "How much time can we realistically save?",
          body: "Most SMBs save 10 to 20-plus hours per week on repetitive tasks. We quantify the exact opportunity in your free automation audit before any commitment.",
          fitTitle: true,
        },
        {
          title: "Do you maintain the automations after they are built?",
          body: "Yes. We offer monitoring and continuous improvement so automations keep running reliably as your tools and processes change.",
          fitTitle: true,
        },
        {
          title: "What tools do you integrate with?",
          body: "Make connects to 1,000-plus apps natively. n8n connects to 400-plus with the ability to call any REST API. Between them we can connect almost any tool in your stack.",
          fitTitle: true,
        },
      ],
    },
  ],
  industries: ["/industries/construction", "/industries/manufacturing", "/industries/financial-services"],
  cta: {
    title: "AI automation expertise for the Asia-Pacific region",
    body: "From simple integrations to complex agentic workflows, OG Labs builds automation that scales with your business.",
  },
};

export default function ServicesAiAutomationPage() {
  return (
    <Page footer="full">
      <ServiceTemplate content={content} />
    </Page>
  );
}
