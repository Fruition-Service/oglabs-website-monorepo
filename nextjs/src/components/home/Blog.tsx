// "Blog" section of the home page (framer-ndxdg5). Framer's CMS query on the "Newrsoom" collection:
// order by Published Date (TdW4qGl6x) descending, limit 3. Each card scroll-appears from y 48.
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import BlogCard from "@/components/blog/BlogCard";
import { getPosts } from "@/lib/blog";
import { Appear, WordsAppear } from "./Appear";
import { ENTER_TILT_0, spring } from "./fx";
import s from "./Blog.module.css";

async function latestPosts() {
  const posts = await getPosts();
  return [...posts]
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
    .slice(0, 3);
}

export default async function Blog() {
  const posts = await latestPosts();
  return (
    <section className={s.blog} id="blog" data-section="Blog" data-framer-name="Blog">
      <div className={s.container} data-framer-name="Container">
        <div className={s.headingWrapper} data-framer-name="Heading Wrapper">
          <div className={s.heading} data-framer-name="Heading">
            <Appear from={ENTER_TILT_0} transition={spring(0.4)} className={s.badge} data-framer-name="Badge">
              <Badge title="News" />
            </Appear>
            <WordsAppear as="h2" className={`p-1o4nxrd ${s.title}`} text="Insights & updates." />
          </div>
          <Appear from={ENTER_TILT_0} transition={spring(0.4)} className={s.button} data-framer-name="Button">
            <Button
              variant={{ desktop: "Base", tablet: "Base Mobile", phone: "Base Mobile" }}
              text="View all"
              href="/blogs"
              icon
            />
          </Appear>
        </div>
        <div className={s.list} data-framer-name="Blog">
          <div className={s.grid}>
            {posts.map((post) => (
              <Appear
                key={post.slug}
                from={{ opacity: 0, y: 48 }}
                transition={spring(0)}
                className={s.card}
                data-framer-name="Blog Card"
              >
                <BlogCard post={post} />
              </Appear>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
