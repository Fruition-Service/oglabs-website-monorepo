import type { Metadata } from "next";
import Page from "@/components/shell/Page";
import Hero from "@/components/home/Hero";
import Clients from "@/components/home/Clients";
import Features from "@/components/home/Features";
import Comparison from "@/components/home/Comparison";
import WhyCypher from "@/components/home/WhyCypher";
import Pricing from "@/components/home/Pricing";
import Blog from "@/components/home/Blog";
import Faq from "@/components/home/Faq";
import shared from "@/components/home/shared.module.css";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// Framer route / (page module YBCchfXrqN). Sections in Framer's order; the three dashed dividers are
// direct children of the page frame (two stacked before Blog, one before FAQ), exactly as in Framer.
export default function HomePage() {
  return (
    <Page footer="full">
      <Hero />
      <Clients />
      <Features />
      <Comparison />
      <WhyCypher />
      <Pricing />
      <div className={`${shared.divider} ${shared.border}`} data-framer-name="Divider" />
      <div className={`${shared.divider} ${shared.border}`} data-framer-name="Divider" />
      <Blog />
      <div className={`${shared.divider} ${shared.border}`} data-framer-name="Divider" />
      <Faq />
    </Page>
  );
}
