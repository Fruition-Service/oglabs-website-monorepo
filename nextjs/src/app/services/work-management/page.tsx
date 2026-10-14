import type { Metadata } from "next";
import Page from "@/components/shell/Page";

export const metadata: Metadata = {
  alternates: { canonical: "/services/work-management" },
};

// Framer route /services/work-management. TODO: sections (see qa/ref/services-work-management-*.json).
export default function ServicesWorkManagementPage() {
  return <Page footer="full">{null}</Page>;
}
