import type { Metadata } from "next";
import Page from "@/components/shell/Page";

export const metadata: Metadata = {
  alternates: { canonical: "/industries/manufacturing" },
};

// Framer route /industries/manufacturing. TODO: sections (see qa/ref/industries-manufacturing-*.json).
export default function IndustriesManufacturingPage() {
  return <Page footer="full">{null}</Page>;
}
