import type { Metadata } from "next";
import Page from "@/components/shell/Page";

export const metadata: Metadata = {
  title: "Privacy Policy | OG Labs",
  alternates: { canonical: "/legal/privacy-policy" },
};

// Framer route /legal/privacy-policy. TODO: sections (see qa/ref/legal-privacy-policy-*.json).
export default function LegalPrivacyPolicyPage() {
  return <Page footer="compact">{null}</Page>;
}
