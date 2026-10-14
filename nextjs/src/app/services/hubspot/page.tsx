import type { Metadata } from "next";
import Page from "@/components/shell/Page";

export const metadata: Metadata = {
  title: "HubSpot Implementation Partner Australia | OG Labs",
  description:
    "Certified HubSpot Solutions Partner for Australian, NZ and SEA SMBs. CRM implementation, migration, automation and training. Free consultation.",
  alternates: { canonical: "/services/hubspot" },
};

// Framer route /services/hubspot. TODO: sections (see qa/ref/services-hubspot-*.json).
export default function ServicesHubspotPage() {
  return <Page footer="full">{null}</Page>;
}
