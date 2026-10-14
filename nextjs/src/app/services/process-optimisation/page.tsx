import type { Metadata } from "next";
import Page from "@/components/shell/Page";
import ServiceTemplate from "@/components/services/ServiceTemplate";
import type { ServiceContent } from "@/components/services/types";

export const metadata: Metadata = {
  title: "Process Optimisation Consulting APAC | OG Labs",
  description:
    "OG Labs maps, redesigns and automates your business processes. Find the friction, remove it, measure the improvement. Serving APAC SMBs across construction, manufacturing and financial services.",
  alternates: { canonical: "/services/process-optimisation" },
};

// Framer route /services/process-optimisation (copy verbatim from the Framer publish, quirks included).
const content: ServiceContent = {
  hero: {
    badge: "PROCESS OPTIMISATION",
    title: "Find the friction, then design it out",
    intro: "Most teams lose hours every week to processes that grew by accident. OG Labs analyses how work actually happens in your business, identifies the bottlenecks and manual steps, and redesigns your workflows for efficiency, then implements the technology and automation to make the improvement stick.",
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
              title: "Process Mapping & Audit",
              body: "Document your current workflows end-to-end, identify bottlenecks, duplicate efforts, and manual steps that should be automated or eliminated.",
            },
          ],
          [
            {
              title: "Automation Opportunity Analysis",
              body: "Prioritise automation opportunities by ROI and feasibility, then build a structured roadmap to implement improvements systematically.",
            },
          ],
          [
            {
              title: "Implementation & Measurement",
              body: "Execute process improvements with clear KPIs — typically achieving 40–60% reduction in manual tasks and measurable cost savings within 6 months.",
            },
          ],
        ],
      },
    },
    {
      kind: "list",
      bg: "white",
      padX: 48,
      gap: 48,
      maxWidth: 1440,
      heading: { text: "Our approach" },
      rows: [
        {
          title: "1. Map",
          body: "We document your current processes and find where time, effort and value leak out through observation and stakeholder interviews.",
          fitTitle: true,
          fitBody: true,
        },
        {
          title: "2. Analyse",
          body: "We identify bottlenecks, duplicate effort, manual handoffs and automation opportunities with a clear view of the cost of each.",
          fitTitle: true,
          fitBody: true,
        },
        {
          title: "3. Redesign",
          body: "We design leaner workflows around your goals, testing the design against edge cases before implementation.",
          fitTitle: true,
          fitBody: true,
        },
        {
          title: "4. Implement",
          body: "We put the new process into your tools, with automation where it earns its place.",
          fitTitle: true,
          fitBody: true,
        },
        {
          title: "5. Measure",
          body: "We track improvement against agreed metrics and refine until targets are met.",
          fitTitle: true,
          fitBody: true,
        },
      ],
    },
    {
      kind: "grid",
      bg: "gray",
      padX: 24,
      gap: 48,
      maxWidth: 1440,
      heading: { text: "What improvements look like" },
      grid: {
        type: "masonry",
        bg: "none",
        tone: "white",
        columns: [
          [
            {
              title: "Fewer handoffs",
              body: "Every manual step between people is a place where work can stall. We reduce handoffs to only the ones that genuinely need human involvement.",
              fitTitle: true,
            },
          ],
          [
            {
              title: "Less rekeying",
              body: "Data entered once flows automatically to every system that needs it, eliminating a major source of errors and wasted time.",
              fitTitle: true,
            },
          ],
          [
            {
              title: "Clear ownership",
              body: "Every step has a defined owner and a clear trigger, so nothing sits in limbo waiting for someone to realise it is their job.",
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
      heading: { text: "Process optimisation FAQs" },
      rows: [
        {
          title: "Do we need new software to optimise our processes?",
          body: "Not always. Sometimes the biggest gains come from redesigning the process in tools you already have. We only recommend new tools when they earn their place against a clear ROI.",
          fitTitle: true,
        },
        {
          title: "How do you measure success?",
          body: "Against metrics agreed at the start: time saved per process, cycle time, error rate and cost per transaction. We baseline before we start so the improvement is measurable.",
          fitTitle: true,
        },
        {
          title: "How quickly will we see results?",
          body: "Quick wins often land within the first two to three weeks. Larger process redesigns are phased so value arrives early rather than waiting for everything to be perfect.",
          fitTitle: true,
        },
      ],
    },
  ],
  industries: ["/industries/construction", "/industries/manufacturing", "/industries/financial-services"],
  cta: {
    title: "Your best process is your competitive advantage",
    body: "OG Labs helps you work smarter, not harder — with sustainable process improvements that scale with your business growth.",
  },
};

export default function ServicesProcessOptimisationPage() {
  return (
    <Page footer="full">
      <ServiceTemplate content={content} />
    </Page>
  );
}
