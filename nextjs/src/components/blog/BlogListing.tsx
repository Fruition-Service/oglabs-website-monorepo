// The /blogs page body (Framer page module u0a27kNP…, root framer-HnDWU): heading with the per-word
// appear, the featured card, then every non-featured post in a 3/2/1 column grid.
import Badge from "@/components/ui/Badge";
import BlogCard from "./BlogCard";
import FeaturedBlogCard from "./FeaturedBlogCard";
import { Appear, InView, Words } from "./Motion";
import type { PostSummary } from "@/lib/blog-types";
import s from "./BlogListing.module.css";

export default function BlogListing({ featured, posts }: { featured: PostSummary | null; posts: PostSummary[] }) {
  return (
    <section className={s.section} data-section="Blogs">
      <div className={s.container} data-framer-name="Container">
        <div className={s.headWrap} data-framer-name="Heading Wrapper">
          <div className={s.heading} data-framer-name="Heading">
            <div className={s.badgePhone} data-framer-name="Badge">
              <Badge title="Newsroom" />
            </div>
            <div className={s.h1Wrap}>
              <h1 className={s.h1}>
                <Words text="Insights for APAC's transformation leaders" trigger="mount" startDelay={0.35} />
              </h1>
            </div>
          </div>
          <Appear from="rise16" delay={0.75} className={s.sub} data-framer-name="Subheading">
            <div className={s.badgeWide} data-framer-name="Badge">
              <Badge title="Newsroom" />
            </div>
            <div className={s.subText}>
              <p className={`p-knz921 ${s.muted}`}>
                Practical guides and case studies on HubSpot, ClickUp, AI automation, and digital transformation for growing SMBs across APAC.
              </p>
            </div>
          </Appear>
        </div>
        <div className={s.blog} data-framer-name="Blog">
          <div className={s.featured} data-framer-name="Featured Blog">
            {featured ? (
              <InView from="fade48" className={s.featuredItem} data-framer-name="Featured Blog Card">
                <FeaturedBlogCard post={featured} />
              </InView>
            ) : null}
          </div>
          <div className={s.grid}>
            {posts.map((post) => (
              <InView key={post.slug} from="fade48" className={s.gridItem} data-framer-name="Blog Card">
                <BlogCard post={post} />
              </InView>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
