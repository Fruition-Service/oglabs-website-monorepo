import type { Metadata } from "next";
import Page from "@/components/shell/Page";
import LegalView from "@/components/legal/LegalView";
import { LEGAL } from "@/content/legal";

export const metadata: Metadata = {
  title: "Terms of Service | OG Labs",
  alternates: { canonical: "/legal/terms-of-service" },
};

// Framer route /legal/terms-of-service (Framer "Legal" CMS item).
export default function LegalTermsOfServicePage() {
  return (
    <Page footer="compact">
      <LegalView doc={LEGAL["terms-of-service"]} />
    </Page>
  );
}
