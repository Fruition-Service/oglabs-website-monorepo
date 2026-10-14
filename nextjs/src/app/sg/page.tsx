import type { Metadata } from "next";
import Page from "@/components/shell/Page";

export const metadata: Metadata = {
  alternates: { canonical: "/sg" },
};

// Framer route /sg. TODO: sections (see qa/ref/sg-*.json).
export default function SgPage() {
  return <Page footer="full">{null}</Page>;
}
