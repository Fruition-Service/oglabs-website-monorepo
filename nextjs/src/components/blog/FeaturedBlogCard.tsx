// "Blog/Featured Blog Card" (Framer module u0a27kNP…, class framer-dyBnu) with its "Buttons/Read
// More" link (framer-EVjzm). Variants: Desktop (>= 1200), Tablet (810-1199: same layout), Mobile
// (<= 809: stacked, Read More becomes a grey pill without hover).
//
// Framer quirk kept on purpose: the card has no Title/Description props, so it always shows the
// component's built-in copy ("How APAC SMBs Are Using HubSpot…") whatever post is featured. Only
// the cover, category, author and link come from the post.
import Link from "next/link";
import type { PostSummary } from "@/lib/blog-types";
import s from "./FeaturedBlogCard.module.css";

const TITLE = "How APAC SMBs Are Using HubSpot, ClickUp, and AI to Transform Operations";
const DESCRIPTION = "A practical guide to digital transformation for growing businesses in Australia, New Zealand, and Southeast Asia.";

export default function FeaturedBlogCard({ post }: { post: PostSummary }) {
  const href = `/blogs/${post.slug}`;
  return (
    <div className={s.card} data-framer-name="Desktop">
      <div className={s.cover} data-framer-name="Cover">
        <div className={s.image}>{post.cover ? <img src={post.cover} alt={post.coverAlt ?? ""} decoding="async" /> : null}</div>
        <div className={s.category} data-framer-name="Category">
          <p className="p-foxgst">{post.category}</p>
        </div>
      </div>
      <div className={s.content} data-framer-name="Content">
        <div className={s.titleDesc} data-framer-name="Title & Description">
          <div className={s.text}>
            <p className={`p-foxgst ${s.muted}`}>Featured Article</p>
          </div>
          <div className={s.titleDescInner} data-framer-name="Title & Description">
            <div className={s.text}>
              <p className="p-18yqz1t">{TITLE}</p>
            </div>
            <div className={s.text}>
              <p className="p-knz921">{DESCRIPTION}</p>
            </div>
          </div>
        </div>
        <div className={s.authorButton} data-framer-name="Author & Button">
          <div className={s.author} data-framer-name="Author">
            <div className={s.picture} data-framer-name="Author Picture">
              {post.authorPicture ? <img src={post.authorPicture} alt={post.authorPictureAlt ?? ""} decoding="async" /> : null}
            </div>
            <div className={s.authorText} data-framer-name="Text">
              <div className={s.text} data-framer-name="Name">
                <p className={`p-1cvbhx ${s.left}`}>{post.authorName}</p>
              </div>
              <div className={s.text} data-framer-name="Position">
                <p className={`p-y0gzpf ${s.left} ${s.muted}`}>{post.authorPosition}</p>
              </div>
            </div>
          </div>
          <div className={s.readMoreContainer} data-framer-name="Read More Button">
            <Link href={href} className={s.readMore} data-framer-name="Desktop">
              <div className={s.readMoreLabel}>
                <p className="p-cguwu">Read more</p>
              </div>
              <div className={s.arrow} data-framer-name="Arrow">
                <div className={s.arrowBg} />
                <div className={s.arrowIcon} data-framer-name="arrow-right">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden>
                    <path stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m0 0-7-7m7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
