import type { Metadata } from "next";
import Page from "@/components/shell/Page";
import ServiceTemplate from "@/components/services/ServiceTemplate";
import type { ServiceContent } from "@/components/services/types";

export const metadata: Metadata = {
  alternates: { canonical: "/services/ai-workflows" },
};

// Framer route /services/ai-workflows (copy verbatim from the Framer publish, quirks included).
const content: ServiceContent = {
  hero: {
    badge: "AI WORKFLOWS",
    title: "Intelligent workflows that learn and adapt",
    intro: "Beyond simple automation, OG Labs designs AI workflows that handle complex, multi-step decisions, the kind of work that used to need a person at every step. We combine large language models with explicit business rules so your workflows are both smart and dependable.",
    image: { src: "uymFdwRzNNRMDnszHct7td68dtg.jpg", position: "center", width: 612, height: 344 },
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
            title: "Agentic AI Design",
            body: "Build AI agents that autonomously handle multi-step tasks — from lead qualification to document processing — using cutting-edge LLM tooling.",
          },
          {
            title: "Intelligent Document Processing",
            body: "Automate extraction, classification, and routing of documents — contracts, invoices, forms — using AI to eliminate manual review bottlenecks.",
          },
          {
            title: "AI-Powered Sales Workflows",
            body: "Layer AI on top of your HubSpot or ClickUp setup to automate follow-ups, score leads, summarise calls, and surface the right actions at the right time.",
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
      heading: { text: "What an AI workflow can do", grouped: true },
      grid: {
        type: "masonry",
        bg: "none",
        tone: "white",
        columns: [
          [
            {
              title: "Read and classify inputs",
              body: "Incoming email, documents, forms and requests automatically categorised and routed without anyone reading each one manually.",
              fitTitle: true,
            },
            {
              title: "Act on live data",
              body: "Workflows that pull current information from your CRM, project tools and the web before deciding what to do, rather than acting on stale snapshots.",
              fitTitle: true,
            },
          ],
          [
            {
              title: "Draft and generate",
              body: "Proposals, summaries, follow-up emails and reports drafted by AI grounded in your own data, ready for human review before sending.",
              fitTitle: true,
            },
            {
              title: "Escalate intelligently",
              body: "Human checkpoints at defined stages, with full context passed across so whoever reviews has everything they need to decide quickly.",
              fitTitle: true,
            },
          ],
          [
            {
              title: "Orchestrate multiple agents",
              body: "Multi-agent systems where one agent handles research, another drafts output, and a third validates before escalating to a human.",
              fitTitle: true,
            },
            {
              title: "Monitor and alert",
              body: "Continuous output monitoring with automatic flags when something falls outside expected patterns, keeping AI behaviour on the rails.",
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
        text: "Smart, but on the rails",
        grouped: true,
        intro: "We design every AI workflow with explicit guardrails: clean input validation, business-rule constraints, human-in-the-loop approvals at key steps, and audit trails. AI makes your team faster. It does not replace their judgement.",
      },
      grid: {
        type: "masonry",
        bg: "none",
        tone: "white",
        columns: [
          [
            {
              title: "Input validation",
              body: "We filter and sanitise inputs before they reach the AI model, blocking edge cases and handling malformed data before they cause problems.",
              fitTitle: true,
            },
          ],
          [
            {
              title: "Human checkpoints",
              body: "We place approval steps at any stage where a mistake would be costly. The AI proposes, your team confirms.",
              fitTitle: true,
            },
          ],
          [
            {
              title: "Audit trails",
              body: "Full logs of what the AI read, decided and did, so you can investigate any output and meet compliance obligations.",
              fitTitle: true,
            },
          ],
        ],
      },
    },
    {
      kind: "list",
      bg: "white",
      padX: 48,
      gap: 40,
      maxWidth: 1440,
      heading: { text: "AI workflow FAQs" },
      rows: [
        {
          title: "How is this different from your AI automation service?",
          body: "AI automation focuses on connecting tools and removing manual steps in well-defined processes. AI workflows go further into adaptive, agentic decision-making for complex tasks with variable inputs and outcomes.",
          fitTitle: true,
        },
        {
          title: "Which AI models do you use?",
          body: "We are model-agnostic and work with leading providers. We choose per use case based on quality, cost and data privacy requirements.",
          fitTitle: true,
          fitBody: true,
        },
        {
          title: "Will an AI workflow make mistakes?",
          body: "All AI systems can make mistakes. We design with guardrails, validation and human checkpoints to catch issues before they reach customers, and we monitor outputs continuously after launch.",
          fitTitle: true,
        },
        {
          title: "How long does it take to build an AI workflow?",
          body: "A focused single workflow typically takes two to four weeks from discovery to production. More complex multi-agent systems take longer. We always start with a scoped pilot.",
          fitTitle: true,
        },
      ],
    },
  ],
  industries: ["/industries/construction", "/industries/manufacturing", "/industries/financial-services"],
  cta: {
    title: "The future of work is autonomous",
    body: "OG Labs brings cutting-edge AI workflow expertise that most implementation partners simply don’t have. Let us show you what’s possible.",
  },
};

export default function ServicesAiWorkflowsPage() {
  return (
    <Page footer="full">
      <ServiceTemplate content={content} />
    </Page>
  );
}
