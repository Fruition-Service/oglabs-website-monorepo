import type { Metadata } from "next";
import Page from "@/components/shell/Page";

export const metadata: Metadata = {
  alternates: { canonical: "/us" },
};

// Framer route /us. TODO: sections (see qa/ref/us-*.json).
export default function UsPage() {
  return <Page footer="full">{null}</Page>;
}
