import type { Metadata } from "next";
import Page from "@/components/shell/Page";

export const metadata: Metadata = {
  alternates: { canonical: "/industries/financial-services" },
};

// Framer route /industries/financial-services. TODO: sections (see qa/ref/industries-financial-services-*.json).
export default function IndustriesFinancialServicesPage() {
  return <Page footer="full">{null}</Page>;
}
