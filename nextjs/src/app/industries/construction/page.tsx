import type { Metadata } from "next";
import Page from "@/components/shell/Page";

export const metadata: Metadata = {
  alternates: { canonical: "/industries/construction" },
};

// Framer route /industries/construction. TODO: sections (see qa/ref/industries-construction-*.json).
export default function IndustriesConstructionPage() {
  return <Page footer="full">{null}</Page>;
}
