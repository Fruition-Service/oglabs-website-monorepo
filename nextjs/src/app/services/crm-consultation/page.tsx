import type { Metadata } from "next";
import Page from "@/components/shell/Page";

export const metadata: Metadata = {
  alternates: { canonical: "/services/crm-consultation" },
};

// Framer route /services/crm-consultation. TODO: sections (see qa/ref/services-crm-consultation-*.json).
export default function ServicesCrmConsultationPage() {
  return <Page footer="full">{null}</Page>;
}
