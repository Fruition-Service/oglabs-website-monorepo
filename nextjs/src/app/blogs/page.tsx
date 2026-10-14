import type { Metadata } from "next";
import Page from "@/components/shell/Page";

export const metadata: Metadata = {
  alternates: { canonical: "/blogs" },
};

// Framer route /blogs. TODO: sections (see qa/ref/blogs-*.json).
export default function BlogsPage() {
  return <Page footer="compact">{null}</Page>;
}
