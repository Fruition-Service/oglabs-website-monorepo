import type { Metadata } from "next";
import Page from "@/components/shell/Page";

export const metadata: Metadata = {
  title: "Terms of Service | OG Labs",
  alternates: { canonical: "/legal/terms-of-service" },
};

// Framer route /legal/terms-of-service. TODO: sections (see qa/ref/legal-terms-of-service-*.json).
export default function LegalTermsOfServicePage() {
  return <Page footer="compact">{null}</Page>;
}
