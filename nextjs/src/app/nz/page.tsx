import type { Metadata } from "next";
import Page from "@/components/shell/Page";

export const metadata: Metadata = {
  alternates: { canonical: "/nz" },
};

// Framer route /nz. TODO: sections (see qa/ref/nz-*.json).
export default function NzPage() {
  return <Page footer="full">{null}</Page>;
}
