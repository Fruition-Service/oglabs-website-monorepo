import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Page from "@/components/shell/Page";
import PostView from "@/components/blog/PostView";
import { getMorePosts, getPost, getPosts } from "@/lib/blog";

// Every known post is prerendered; a post published in HubSpot after the build renders on first
// request and is then cached. Pages (and the HubSpot fetch behind them) refresh every 5 minutes.
export const revalidate = 300;
export const dynamicParams = true;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) return {};
  // Deliberately "<title> | OG Labs", not Framer's leftover "- Cypher - AI-Powered Solutions…".
  const title = `${post.title} | OG Labs`;
  const images = post.cover ? [post.cover] : undefined;
  return {
    title,
    description: post.description,
    alternates: { canonical: `/blogs/${post.slug}` },
    openGraph: { type: "article", title, description: post.description, url: `/blogs/${post.slug}`, publishedTime: post.publishedAt, images },
    twitter: { card: "summary_large_image", title, description: post.description, images },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPost((await params).slug);
  if (!post) notFound();
  const more = await getMorePosts(post);
  return (
    <Page footer="compact">
      <PostView post={post} more={more} />
    </Page>
  );
}
