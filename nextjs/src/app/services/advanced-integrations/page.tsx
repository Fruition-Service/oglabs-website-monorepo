import type { Metadata } from "next";
import Page from "@/components/shell/Page";

export const metadata: Metadata = {
  title: "Advanced System Integrations APAC | Make & n8n | OG Labs",
  description:
    "OG Labs connects your entire stack using Make, n8n and custom APIs. CRM to ERP, project management to finance, with reliable two-way data flow across APAC businesses.",
  alternates: { canonical: "/services/advanced-integrations" },
};

// Framer route /services/advanced-integrations. TODO: sections (see qa/ref/services-advanced-integrations-*.json).
export default function ServicesAdvancedIntegrationsPage() {
  return <Page footer="full">{null}</Page>;
}
