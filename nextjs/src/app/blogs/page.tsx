import type { Metadata } from "next";
import Page from "@/components/shell/Page";
import BlogListing from "@/components/blog/BlogListing";
import { getListing } from "@/lib/blog";

export const metadata: Metadata = {
  alternates: { canonical: "/blogs" },
};

// New HubSpot posts appear within 5 minutes without a redeploy (the HubSpot fetch is cached 300s).
export const revalidate = 300;

// Framer route /blogs.
export default async function BlogsPage() {
  const { featured, rest } = await getListing();
  return (
    <Page footer="compact">
      <BlogListing featured={featured} posts={rest} />
    </Page>
  );
}
