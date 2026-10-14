import type { Metadata } from "next";
import Page from "@/components/shell/Page";
import Partnerships from "@/components/partnerships/Partnerships";

export const metadata: Metadata = {
  title: "HubSpot and ClickUp Partner Programme APAC | OG Labs",
  description:
    "Partner with OG Labs to grow across APAC. Referral partnerships, co-delivery and white-label HubSpot, ClickUp and AI automation services available.",
  alternates: { canonical: "/partnerships" },
};

// Framer route /partnerships (page module UBtPi9Fz).
export default function PartnershipsPage() {
  return (
    <Page footer="full">
      <Partnerships />
    </Page>
  );
}
