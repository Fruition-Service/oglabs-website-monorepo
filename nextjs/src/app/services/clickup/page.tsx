import type { Metadata } from "next";
import Page from "@/components/shell/Page";

export const metadata: Metadata = {
  title: "ClickUp Implementation Partner Australia | OG Labs",
  description:
    "Certified ClickUp partner for Australian, NZ and SEA teams. Workspace architecture, automations, dashboards and training. Purpose-built for construction, manufacturing and professional services.",
  alternates: { canonical: "/services/clickup" },
};

// Framer route /services/clickup. TODO: sections (see qa/ref/services-clickup-*.json).
export default function ServicesClickupPage() {
  return <Page footer="full">{null}</Page>;
}
