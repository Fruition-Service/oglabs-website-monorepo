// A blog post (Framer page module BT0taiG7…, root framer-WqoYi): title + category/date/author
// boxes, cover, a dashed divider, summary + share beside the rich-text body, then "More Articles".
import Button from "@/components/ui/Button";
import type { Post, PostSummary } from "@/lib/blog-types";
import BlogCard from "./BlogCard";
import { Appear, InView, Words } from "./Motion";
import RichText from "./RichText";
import ShareButtons from "./ShareButtons";
import s from "./PostView.module.css";

/** Framer's date formatter: toLocaleString("en-US", { dateStyle: "medium", timeZone: "UTC" }). */
function formatDate(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "" : d.toLocaleString("en-US", { dateStyle: "medium", timeZone: "UTC" });
}

export default function PostView({ post, more }: { post: Post; more: PostSummary[] }) {
  return (
    <>
      <section className={s.main} data-section="Main">
        <div className={s.container} data-framer-name="Container">
          <div className={s.heading} data-framer-name="Heading">
            <div className={s.title}>
              <h1 className="p-jr195v">{post.title}</h1>
            </div>
            <div className={s.details} data-framer-name="Details">
              <div className={s.catDate} data-framer-name="Category & Date">
                <Appear from="rise16" delay={0.75} className={s.box} data-framer-name="Category">
                  <div className={s.text}>
                    <p className={`p-foxgst ${s.muted}`}>Category</p>
                  </div>
                  <div className={s.text} data-framer-name="Position">
                    <p className={`p-knz921 ${s.strong}`}>{post.category}</p>
                  </div>
                </Appear>
                <Appear from="rise16" delay={1} className={s.box} data-framer-name="Date">
                  <div className={s.text}>
                    <p className={`p-foxgst ${s.muted}`}>Published Date</p>
                  </div>
                  <div className={s.text} data-framer-name="Position">
                    <p className={`p-knz921 ${s.strong}`}>
                      <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                    </p>
                  </div>
                </Appear>
              </div>
              <Appear from="rise16" delay={1.25} className={s.author} data-framer-name="Author">
                <div className={s.picture} data-framer-name="Author Picture">
                  {post.authorPicture ? <img src={post.authorPicture} alt={post.authorPictureAlt ?? ""} decoding="async" /> : null}
                </div>
                <div className={s.authorText} data-framer-name="Text">
                  <div className={s.text} data-framer-name="Name">
                    <p className={`p-knz921 ${s.strong}`}>{post.authorName}</p>
                  </div>
                  <div className={s.text} data-framer-name="Position">
                    <p className={`p-foxgst ${s.muted}`}>{post.authorPosition}</p>
                  </div>
                </div>
              </Appear>
            </div>
          </div>
          <Appear from="rise48" delay={1.5} className={s.cover}>
            {post.cover ? <img src={post.cover} alt={post.coverAlt ?? ""} decoding="async" fetchPriority="high" /> : null}
          </Appear>
          <div className={s.divider} data-framer-name="Divider" />
          <div className={s.content} data-framer-name="Content">
            <div className={s.side} data-framer-name="Summary & Share">
              <div className={s.panel} data-framer-name="Summary">
                <div className={s.text}>
                  <p className={`p-cguwu ${s.muted}`}>Summary</p>
                </div>
                <div className={s.text}>
                  <p className={`p-mzxkxl ${s.strong} ${s.balance}`}>{post.description}</p>
                </div>
              </div>
              <div className={s.panel} data-framer-name="Share">
                <div className={s.text}>
                  <p className={`p-cguwu ${s.muted}`}>Share this article</p>
                </div>
                <div className={s.share}>
                  <ShareButtons title={`${post.title} | OG Labs`} />
                </div>
              </div>
            </div>
            <div className={s.bodyWrap} data-framer-name="Content">
              <RichText html={post.html} className={s.body} />
            </div>
          </div>
        </div>
      </section>
      <div className={s.divider2} data-framer-name="Divider" />
      <section className={s.more} data-section="More Articles">
        <div className={s.moreContainer} data-framer-name="Container">
          <div className={s.moreHead} data-framer-name="Heading Wrapper">
            <div className={s.moreHeading} data-framer-name="Heading">
              <div className={s.moreTitle}>
                <h2 className={`p-1o4nxrd ${s.strong} ${s.balance}`}>
                  <Words text="Insights you might like." trigger="inView" />
                </h2>
              </div>
            </div>
            <InView from="rise16" delay={0.4} className={s.button} data-framer-name="Button">
              <Button variant="Base" text="More articles" href="/blogs" />
            </InView>
          </div>
          <div className={s.blog} data-framer-name="Blog">
            <div className={s.grid}>
              {more.map((p) => (
                <InView key={p.slug} from="fade48" className={s.gridItem} data-framer-name="Blog Card">
                  <BlogCard post={p} />
                </InView>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
