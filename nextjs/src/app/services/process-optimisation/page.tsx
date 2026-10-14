import type { Metadata } from "next";
import Page from "@/components/shell/Page";

export const metadata: Metadata = {
  title: "Process Optimisation Consulting APAC | OG Labs",
  description:
    "OG Labs maps, redesigns and automates your business processes. Find the friction, remove it, measure the improvement. Serving APAC SMBs across construction, manufacturing and financial services.",
  alternates: { canonical: "/services/process-optimisation" },
};

// Framer route /services/process-optimisation. TODO: sections (see qa/ref/services-process-optimisation-*.json).
export default function ServicesProcessOptimisationPage() {
  return <Page footer="full">{null}</Page>;
}
