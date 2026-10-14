import type { Metadata } from "next";
import Page from "@/components/shell/Page";

export const metadata: Metadata = {
  alternates: { canonical: "/services/ai-workflows" },
};

// Framer route /services/ai-workflows. TODO: sections (see qa/ref/services-ai-workflows-*.json).
export default function ServicesAiWorkflowsPage() {
  return <Page footer="full">{null}</Page>;
}
