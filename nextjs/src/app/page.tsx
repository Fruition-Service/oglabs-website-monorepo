import type { Metadata } from "next";
import Page from "@/components/shell/Page";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// Framer route /. TODO: sections (see qa/ref/home-*.json).
export default function HomePage() {
  return <Page footer="full">{null}</Page>;
}
