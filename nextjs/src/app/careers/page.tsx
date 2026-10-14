import type { Metadata } from "next";
import Page from "@/components/shell/Page";
import Careers from "@/components/careers/Careers";

export const metadata: Metadata = {
  title: "Careers at OG Labs | Remote Digital Transformation Jobs APAC",
  description:
    "Join OG Labs, a remote-first APAC digital transformation consultancy. We hire HubSpot specialists, ClickUp consultants and automation builders.",
  alternates: { canonical: "/careers" },
};

// Framer route /careers (page module hHxzSqJO).
export default function CareersPage() {
  return (
    <Page footer="full">
      <Careers />
    </Page>
  );
}
