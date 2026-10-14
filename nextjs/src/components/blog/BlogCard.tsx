// "Blog/Blog Card" (Framer module JsClMLL3Q). STUB: the blog builder replaces the visuals; keep the
// props stable (home, about, /blogs and "More Articles" all render it).
import Link from "next/link";
import type { PostSummary } from "@/lib/blog-types";

export default function BlogCard({ post, className }: { post: PostSummary; className?: string }) {
  return (
    <Link href={`/blogs/${post.slug}`} className={className}>
      {post.title}
    </Link>
  );
}
