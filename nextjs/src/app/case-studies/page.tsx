import type { Metadata } from "next";
import Page from "@/components/shell/Page";

export const metadata: Metadata = {
  title: "OG Labs | Case Studies | Digital Transformation Success Stories",
  description:
    "Real results from real businesses. Explore how OG Labs has helped SMBs across Australia, New Zealand, and Southeast Asia streamline operations, adopt HubSpot and ClickUp, and unlock growth through AI automation.",
  alternates: { canonical: "/case-studies" },
};

// Framer route /case-studies. TODO: sections (see qa/ref/case-studies-*.json).
export default function CaseStudiesPage() {
  return <Page footer="full">{null}</Page>;
}
