import type { Metadata } from "next";
import Page from "@/components/shell/Page";
import About from "@/components/about/About";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
};

// Framer route /about (page module ZhZ_Eev3).
export default function AboutPage() {
  return (
    <Page footer="full">
      <About />
    </Page>
  );
}
