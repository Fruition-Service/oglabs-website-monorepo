import type { Metadata } from "next";
import Page from "@/components/shell/Page";
import Contact from "@/components/contact/Contact";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
};

// Framer route /contact (page module isc8sCDM).
export default function ContactPage() {
  return (
    <Page footer="full">
      <Contact />
    </Page>
  );
}
