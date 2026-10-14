import type { Metadata } from "next";
import Page from "@/components/shell/Page";

export const metadata: Metadata = {
  title: "Cookies Policy | OG Labs",
  alternates: { canonical: "/legal/cookies-policy" },
};

// Framer route /legal/cookies-policy. TODO: sections (see qa/ref/legal-cookies-policy-*.json).
export default function LegalCookiesPolicyPage() {
  return <Page footer="compact">{null}</Page>;
}
