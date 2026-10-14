import type { Metadata } from "next";
import Page from "@/components/shell/Page";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
};

// Framer route /about. TODO: sections (see qa/ref/about-*.json).
export default function AboutPage() {
  return <Page footer="full">{null}</Page>;
}
