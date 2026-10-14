import type { Metadata } from "next";
import Page from "@/components/shell/Page";
import LegalView from "@/components/legal/LegalView";
import { LEGAL } from "@/content/legal";

export const metadata: Metadata = {
  title: "Privacy Policy | OG Labs",
  alternates: { canonical: "/legal/privacy-policy" },
};

// Framer route /legal/privacy-policy (Framer "Legal" CMS item).
export default function LegalPrivacyPolicyPage() {
  return (
    <Page footer="compact">
      <LegalView doc={LEGAL["privacy-policy"]} />
    </Page>
  );
}
