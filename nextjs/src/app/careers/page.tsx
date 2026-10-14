import type { Metadata } from "next";
import Page from "@/components/shell/Page";

export const metadata: Metadata = {
  title: "Careers at OG Labs | Remote Digital Transformation Jobs APAC",
  description:
    "Join OG Labs, a remote-first APAC digital transformation consultancy. We hire HubSpot specialists, ClickUp consultants and automation builders.",
  alternates: { canonical: "/careers" },
};

// Framer route /careers. TODO: sections (see qa/ref/careers-*.json).
export default function CareersPage() {
  return <Page footer="full">{null}</Page>;
}
