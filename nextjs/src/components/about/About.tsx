// Framer page /about (module ZhZ_Eev3): sections Main (heading, reviews, photo, values list), Team and
// Blog, separated by dashed dividers.
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";
import BlogCard from "@/components/blog/BlogCard";
import { getPosts } from "@/lib/blog";
import { Appear, InView, WordsText, type Spring } from "./Motion";
import FramerImage from "./FramerImage";
import Reviews from "./Reviews";
import TeamMember, { type Member } from "./TeamMember";
import ValuesList, { type Value } from "./ValuesList";
import Txt from "./Txt";
import t from "./text.module.css";
import a from "./About.module.css";

const BLACK = "var(--token-442a8080-47a9-427e-9581-c23ce6c42231, rgb(0, 0, 0))";
const MUTED = "var(--token-ead00dcb-2b22-4edd-af15-9859b50e46de, rgba(0, 0, 0, 0.64))";
const RISE16 = { opacity: 0.001, y: 16, rotateX: -45 };
/** Style appear "enter" states used on the Team and Blog sections. */
const FADE_RISE16 = { opacity: 0, y: 16, rotateX: -45 };
const FADE_RISE48 = { opacity: 0, y: 48 };
const spring = (delay: number): Spring => ({ stiffness: 500, damping: 100, delay });

const VALUE_BODY =
  "OG Labs helps APAC SMBs transform operations through HubSpot, ClickUp, and AI-driven workflows. Our mission is to make digital transformation strategic, measurable, and outcomes-focused.";
const VALUES: Value[] = [
  { number: "01.", title: "Growth-focused", body: VALUE_BODY, border: true },
  { number: "02.", title: "Strategic, not just technical", body: VALUE_BODY, border: true },
  { number: "03.", title: "End-to-end transformation", body: VALUE_BODY, border: true },
  { number: "04.", title: "APAC native", body: VALUE_BODY, border: false },
];

// Card appear delays come from the Framer page (0.2s, 0.1s, 0s, 0s).
const TEAM: (Member & { delay: number })[] = [
  {
    name: "Josh Jebathilak",
    position: "Director, Solutions Delivery",
    picture: { src: "/framer/gpphcQty8e019mXjWcLU5UCGWQ.png", width: 800, height: 800, alt: "" },
    linkedIn: "https://www.linkedin.com/in/joshuajebathilak/",
    delay: 0.2,
  },
  {
    name: "Thana Witchawut",
    position: "Practice Lead, APAC",
    picture: { src: "/framer/jQwB2p7qKHEVTAaJ4ZPDCt683Q.png", width: 2364, height: 2364, alt: "a young man wearing glasses standing in front of a mountain" },
    linkedIn: "https://www.linkedin.com/in/thana-witchawut-110042180/",
    upsideDown: true,
    delay: 0.1,
  },
  {
    name: "Kelilah Carruthers",
    position: "Implementation / Customer Success Lead",
    picture: { src: "/framer/HK7xLx2XfNw6wu4EZKkIklV4s.png", width: 2127, height: 2364, alt: "A young woman with blonde hair smiling outdoors." },
    linkedIn: "https://www.linkedin.com/in/kelilah-carruthers-806917145/",
    delay: 0,
  },
  {
    // Framer links Bryan's card to Kelilah's LinkedIn profile; kept as is.
    name: "Bryan Camiling",
    position: "Implementation Consultant",
    picture: { src: "/framer/irDxU0pKm4udq2o47mfjoRZxg.png", width: 2299, height: 2364, alt: "" },
    linkedIn: "https://www.linkedin.com/in/kelilah-carruthers-806917145/",
    upsideDown: true,
    delay: 0,
  },
];

function Divider() {
  return <div className={a.divider} data-framer-name="Divider" />;
}

export default async function About() {
  // Framer's CMS query: the 3 newest posts. The cards keep Framer's fixed copy (title, category and
  // author are typed into the page, not bound to the post); only the cover and link come from the post.
  const posts = (await getPosts()).slice(0, 3);

  return (
    <>
      <section className={a.section} data-framer-name="Main" data-section="Main">
        <div className={a.mainContainer}>
          <div className={a.headingRow} data-framer-name="Heading">
            <div className={`${a.halfText} ${a.rt}`}>
              <WordsText
                as="h1"
                className={t.h1}
                style={{ color: BLACK, textAlign: "left" }}
                text="Built to power APAC's digital transformation."
                trigger="mount"
                startDelay={0.35}
              />
            </div>
            <div className={a.subheading} data-framer-name="Subheading">
              <Appear className={a.auto} initial={RISE16} spring={spring(0.75)} data-framer-name="Reviews">
                <Reviews />
              </Appear>
              <Appear className={`${a.fullText} ${a.rt}`} initial={RISE16} spring={spring(1)}>
                <p className="p-knz921" style={{ color: MUTED, textAlign: "left" }}>
                  OG Labs is more than a HubSpot and ClickUp partner. We blend deep platform expertise with AI-driven agentic workflows
                  to transform how SMBs across APAC work, scale, and grow.
                </p>
              </Appear>
            </div>
          </div>
          <div className={a.body} data-framer-name="Body">
            <div className={a.image} data-framer-name="Image">
              <div className={a.logo} data-framer-name="Logo">
                <Logo variant="Light" padding="0px" />
              </div>
              <div className={a.photo}>
                <FramerImage
                  src="/framer/WEkJLqYST1rqDR9bqFPZVv9ZI.jpg"
                  alt="a group of people sitting around a table with laptops"
                  width={6000}
                  height={4000}
                  sizes="calc(min(100vw, 1440px) - 48px)"
                  eager
                />
              </div>
            </div>
            <div className={a.values} data-framer-name="Values">
              <div className={a.valuesHeading} data-framer-name="Heading">
                <div className={a.auto} data-framer-name="Badge">
                  <Badge title="Our values" />
                </div>
                <div className={a.valuesTitle} data-framer-name="Heading">
                  <div className={`${a.fullText} ${a.rt}`}>
                    <WordsText
                      className={`p-1o4nxrd ${t.balance}`}
                      style={{ color: BLACK, textAlign: "left" }}
                      text="What we stand for as a partner"
                      trigger="inView"
                    />
                  </div>
                </div>
              </div>
              <ValuesList values={VALUES} />
            </div>
          </div>
        </div>
      </section>

      <Divider />

      <section className={a.section} data-framer-name="Team" data-section="Team">
        <div className={a.container}>
          <div className={a.teamHeadingRow} data-framer-name="Heading Wrapper">
            <div className={a.teamHeading} data-framer-name="Heading">
              <div className={`${a.teamTitle} ${a.rt}`}>
                <WordsText
                  className={`p-1o4nxrd ${t.balance}`}
                  style={{ color: BLACK, textAlign: "left" }}
                  text="Meet the team behind OG Labs"
                  trigger="inView"
                />
              </div>
              <div className={`${a.teamBadgePhone} ${a.phoneOnly}`} data-framer-name="Badge">
                <Badge title="Team" />
              </div>
            </div>
            <InView className={a.subheading} initial={FADE_RISE16} spring={spring(0.4)} amount={0.5} data-framer-name="Subheading">
              <div className={`${a.auto} ${a.notPhone}`} data-framer-name="Badge">
                <Badge title="Team" />
              </div>
              <Txt className={a.fullText} preset="p-knz921" color={MUTED} align="left">
                A remote-first team built for APAC, OG Labs combines deep HubSpot and ClickUp expertise with sector knowledge across
                construction, manufacturing, and financial services.
              </Txt>
            </InView>
          </div>
          <div className={a.teamGrid} data-framer-name="Body">
            {TEAM.map(({ delay, ...m }) => (
              <InView key={m.name} className={a.cell} initial={FADE_RISE48} spring={spring(delay)} amount={0.5} data-framer-name="Team Member">
                <TeamMember member={m} />
              </InView>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      <section className={a.section} data-framer-name="Blog" data-section="Blog">
        <div className={a.container}>
          <div className={a.headingRow} data-framer-name="Heading Wrapper">
            <div className={a.blogHeading} data-framer-name="Heading">
              <InView className={a.auto} initial={FADE_RISE16} spring={spring(0.4)} amount={0.5} data-framer-name="Badge">
                <Badge title="News" />
              </InView>
              <div className={`${a.halfText} ${a.rt}`}>
                <WordsText
                  className={`p-1o4nxrd ${t.balance}`}
                  style={{ color: BLACK, textAlign: "left" }}
                  text="Read the latest insights from OG Labs"
                  trigger="inView"
                />
              </div>
            </div>
            <InView className={a.auto} initial={FADE_RISE16} spring={spring(0.4)} amount={0.5} data-framer-name="Button">
              <Button variant={{ desktop: "Base", phone: "Base Mobile" }} text="View all" href="/blogs" />
            </InView>
          </div>
          <div className={a.blogWrap} data-framer-name="Blog">
            <div className={a.blogGrid}>
              {posts.map((p) => (
                <InView key={p.slug} className={a.cell} initial={FADE_RISE48} spring={spring(0)} amount={0.5} data-framer-name="Blog Card">
                  <BlogCard
                    post={{
                      ...p,
                      title: "The APAC SMB Guide to AI-Powered Digital Transformation",
                      category: "Insights",
                      authorName: "Orange Growth Labs",
                      authorPosition: "Editorial Team",
                    }}
                  />
                </InView>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
