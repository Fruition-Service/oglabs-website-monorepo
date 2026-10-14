import type { Metadata } from "next";
import Page from "@/components/shell/Page";

export const metadata: Metadata = {
  alternates: { canonical: "/au" },
};

// Framer route /au. TODO: sections (see qa/ref/au-*.json).
export default function AuPage() {
  return <Page footer="full">{null}</Page>;
}
