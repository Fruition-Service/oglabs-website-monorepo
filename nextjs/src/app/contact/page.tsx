import type { Metadata } from "next";
import Page from "@/components/shell/Page";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
};

// Framer route /contact. TODO: sections (see qa/ref/contact-*.json).
export default function ContactPage() {
  return <Page footer="full">{null}</Page>;
}
