// Framer page "Careers" (module hHxzSqJO). A static page: hero, perks grid, open roles, how we work,
// who we hire and a dark "Don't see a role" band. Framer has no tablet/phone overrides for this page,
// so the 1152px grids overflow on narrow screens exactly like the live site.
import Link from "next/link";
import s from "./Careers.module.css";
import Txt from "../about/Txt";

type Card = { title: string; body: string };

// Framer's masonry grid (3 tracks) lays these out column by column; listed here per column.
const PERKS: Card[][] = [
  [
    { title: "Remote-first culture", body: "Work from anywhere in the APAC region. We believe the best work happens when people have the freedom to choose their environment." },
    { title: "Continuous learning", body: "Certifications, courses, and learning budgets — we invest in your professional development as much as our clients' businesses." },
  ],
  [
    { title: "Cutting-edge tech stack", body: "Work with the latest AI tools, automation platforms, and CRM technologies. We're always experimenting with what's next." },
    { title: "Small team, big growth", body: "Join a small, high-performing team where your contributions are visible and your career growth is fast. No corporate bureaucracy." },
  ],
  [
    { title: "Real impact, real clients", body: "Work on meaningful projects that genuinely transform how businesses operate. Every engagement delivers measurable results." },
    { title: "Flexible engagement", body: "We hire for full-time roles, part-time, and contract arrangements. Tell us how you work best." },
  ],
];

const ROLES = [
  {
    tag: "FULL-TIME · REMOTE",
    title: "HubSpot Implementation Consultant",
    location: "Australia / New Zealand / Singapore",
    body: "We're looking for a certified HubSpot specialist with 2+ years of hands-on implementation experience. You'll own client relationships from discovery through to go-live and beyond.",
  },
  {
    tag: "FULL-TIME · REMOTE",
    title: "AI Automation Specialist",
    location: "APAC (any location)",
    body: "Build agentic AI workflows using Make, n8n, and LLM APIs. Strong background in automation, API integrations, and a passion for solving complex business problems with AI.",
  },
  {
    tag: "CONTRACT · REMOTE",
    title: "Digital Transformation Consultant",
    location: "APAC (any location)",
    body: "Experienced consultant to support growing client engagements. Background in CRM, work management, or process optimisation. ClickUp and/or HubSpot experience preferred.",
  },
];

const HOW: Card[] = [
  { title: "Remote and flexible", body: "We are remote-first across APAC. You own your outcomes, not your hours." },
  { title: "Meaningful client work", body: "You will work directly with clients on problems that genuinely matter to their business, not be a cog in a large agency machine." },
  { title: "Fast growth", body: "Small team, big scope. You will develop skills across CRM, project management and AI automation faster than at a larger firm." },
];

const WHO: Card[] = [
  { title: "HubSpot specialists", body: "Certified and experienced across multiple Hubs. You know when to push back on a client's brief because there is a better way to configure it." },
  { title: "ClickUp consultants", body: "You have built workspaces from scratch, handled migrations, and trained teams. You think in processes, not just features." },
  { title: "Automation builders", body: "Make and/or n8n, comfortable with APIs and JSON, able to design reliable multi-step workflows that handle errors gracefully." },
];

function CardItem({ card }: { card: Card }) {
  return (
    <div className={s.card}>
      <Txt className={s.nowrap} preset="p-2rl9ro">{card.title}</Txt>
      <Txt className={s.wrap} preset="p-knz921">{card.body}</Txt>
    </div>
  );
}

function Grid({ columns }: { columns: Card[][] }) {
  return (
    <div className={s.grid} style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
      {columns.map((col, i) => (
        <div key={i} className={s.column}>
          {col.map((c) => (
            <CardItem key={c.title} card={c} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default function Careers() {
  return (
    <div className={s.root}>
      <div className={s.hero}>
        <div className={s.heroRow}>
          <div className={s.heroLeft}>
            <div className={s.pill}>
              <Txt className={s.nowrap} preset="p-foxgst" color="rgb(255, 255, 255)">CAREERS</Txt>
            </div>
            <Txt as="h1" className={s.wrap} preset="h1">Build the future of work, with us</Txt>
          </div>
          <div className={s.heroRight}>
            <Txt className={s.wrap} preset="p-mzxkxl">
              OG Labs is a remote-first, growth-focused consultancy helping SMBs across APAC transform how they operate. We are
              looking for curious, methodical people who love solving real business problems with HubSpot, ClickUp and AI
              automation.
            </Txt>
          </div>
        </div>
      </div>

      <div className={s.perksBand}>
        <div className={s.perksInner}>
          <Grid columns={PERKS} />
        </div>
      </div>

      <div className={s.section}>
        <Txt as="h2" className={s.wrap} preset="p-1o4nxrd">Open roles</Txt>
        {ROLES.map((r) => (
          <div key={r.title} className={s.role}>
            <div className={s.roleRow}>
              <div className={s.roleMeta}>
                <Txt className={s.nowrap} preset="p-foxgst">{r.tag}</Txt>
                <Txt className={s.nowrap} preset="p-2rl9ro">{r.title}</Txt>
                <Txt className={s.nowrap} preset="p-knz921">{r.location}</Txt>
              </div>
            </div>
            <Txt className={s.wrap} preset="p-knz921">{r.body}</Txt>
          </div>
        ))}
        <Link href="/contact" className={s.cta}>
          <Txt className={s.nowrap} preset="p-foxgst" color="rgb(255, 255, 255)">GET IN TOUCH</Txt>
        </Link>
      </div>

      <div className={s.section}>
        <div className={s.heading}>
          <Txt as="h2" className={s.wrap} preset="p-1o4nxrd">How we work</Txt>
        </div>
        <Grid columns={HOW.map((c) => [c])} />
      </div>

      <div className={s.sectionGrey}>
        <div className={s.heading}>
          <Txt as="h2" className={s.wrap} preset="p-1o4nxrd">Who we hire</Txt>
          <Txt className={s.wrap} preset="p-mzxkxl">
            We are always interested in strong people, even if we do not have an active opening. If you are excellent at any of
            the following, send us your details.
          </Txt>
        </div>
        <Grid columns={WHO.map((c) => [c])} />
      </div>

      <div className={s.dark}>
        <Txt as="h2" className={s.wrap} preset="p-1o4nxrd" color="rgb(255, 255, 255)">Don&apos;t see a role that fits?</Txt>
        <Txt className={s.wrap} preset="p-mzxkxl" color="rgb(255, 255, 255)">
          We&apos;re always interested in exceptional people. Send us your CV and tell us how you&apos;d like to contribute to OG
          Labs&apos; mission.
        </Txt>
      </div>
    </div>
  );
}
