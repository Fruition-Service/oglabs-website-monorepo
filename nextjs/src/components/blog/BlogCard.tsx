// "Blog/Blog Card" (Framer module JsClMLL3Q, class framer-8xvtt). Used by /blogs, "More Articles",
// home and about. Framer shows the "Desktop" variant on desktop and tablet and "Mobile" on phone;
// the only difference is the hover (cover zooms to 1.1 over 0.5s), so it is CSS gated to >= 810px.
// Size it from the outside: the card fills the width it is given (Framer: width 100% of its
// -container), min-height 520px.
import Link from "next/link";
import type { PostSummary } from "@/lib/blog-types";
import s from "./BlogCard.module.css";

export default function BlogCard({ post, className }: { post: PostSummary; className?: string }) {
  return (
    <Link href={`/blogs/${post.slug}`} className={className ? `${s.card} ${className}` : s.card} data-framer-name="Desktop">
      <div className={s.coverTitle} data-framer-name="Cover & Title">
        <div className={s.cover} data-framer-name="Cover">
          <div className={s.category} data-framer-name="Category">
            <p className="p-foxgst">{post.category}</p>
          </div>
          <div className={s.image}>
            {post.cover ? <img src={post.cover} alt={post.coverAlt ?? ""} decoding="async" loading="lazy" /> : null}
          </div>
        </div>
        <div className={s.text}>
          <p className="p-1cxnxo3">{post.title}</p>
        </div>
      </div>
      <div className={s.author} data-framer-name="Author">
        <div className={s.text} data-framer-name="Description">
          <p className={`p-1cvbhx ${s.left}`}>{post.authorName}</p>
        </div>
        <div className={s.text} data-framer-name="Description">
          <p className={`p-y0gzpf ${s.left} ${s.muted}`}>{post.authorPosition}</p>
        </div>
      </div>
    </Link>
  );
}
