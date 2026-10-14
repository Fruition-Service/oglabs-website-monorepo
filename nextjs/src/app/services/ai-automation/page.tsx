import type { Metadata } from "next";
import Page from "@/components/shell/Page";

export const metadata: Metadata = {
  title: "AI Automation Agency Australia | Make & n8n Experts | OG Labs",
  description:
    "OG Labs builds AI automation using Make and n8n for APAC SMBs. Lead ops, document workflows, AI agents and data sync. Free automation audit included.",
  alternates: { canonical: "/services/ai-automation" },
};

// Framer route /services/ai-automation. TODO: sections (see qa/ref/services-ai-automation-*.json).
export default function ServicesAiAutomationPage() {
  return <Page footer="full">{null}</Page>;
}
