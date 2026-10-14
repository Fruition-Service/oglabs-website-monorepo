import type { Metadata } from "next";
import Page from "@/components/shell/Page";
import LegalView from "@/components/legal/LegalView";
import { LEGAL } from "@/content/legal";

export const metadata: Metadata = {
  title: "Cookies Policy | OG Labs",
  alternates: { canonical: "/legal/cookies-policy" },
};

// Framer route /legal/cookies-policy (Framer "Legal" CMS item).
export default function LegalCookiesPolicyPage() {
  return (
    <Page footer="compact">
      <LegalView doc={LEGAL["cookies-policy"]} />
    </Page>
  );
}
