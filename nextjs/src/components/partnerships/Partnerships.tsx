// Framer page "Partners" (module UBtPi9Fz): hero, platform partner cards (HubSpot / ClickUp / Make /
// n8n), regional partnerships, why an accredited partner, ways to partner, FAQs and a dark CTA band.
// Framer has no tablet/phone overrides for this page; the fixed-width grids overflow like live.
import Link from "next/link";
import FramerImage from "@/components/about/FramerImage";
import Txt from "@/components/about/Txt";
import s from "./Partnerships.module.css";

type Card = { title: string; body: string };

const PLATFORMS: {
  logo: { src: string; w: number; h: number; box: "hubspot" | "clickup" | "full"; sizes: string };
  body: string;
  services: string;
}[] = [
  {
    logo: { src: "/framer/lTSe2BGdsGc98bmUwBOy78TWGY.png", w: 3520, h: 2160, box: "hubspot", sizes: "max(max((min(100vw, 1440px) - 72px) / 2, 300px) - 80px, 1px)" },
    body: "OG Labs is a certified HubSpot Solutions Partner. We deliver accredited onboarding, CRM implementation, and sales and marketing automation across every HubSpot hub. From data migration and custom object modelling to reporting and revenue operations, we configure HubSpot around how your business actually sells and serves, not the other way around.",
    services: "Services covered: Sales Hub, Marketing Hub, Service Hub, Operations Hub, Content Hub, Commerce Hub, plus platform migrations and custom integrations.",
  },
  {
    logo: { src: "/framer/7j8sNJ5PSkcdyT8van2gDL01js.png", w: 5055, h: 1841, box: "clickup", sizes: "max(max((min(100vw, 1440px) - 72px) / 2, 300px) - 80px, 1px)" },
    body: "As a ClickUp certified partner, OG Labs designs and optimises work management systems that scale with your business. We handle everything from workspace architecture, hierarchy, and custom fields to dashboards, automations, and team onboarding, so projects stay visible and teams stop drowning in busywork.",
    services: "Services covered: Workspace architecture, custom fields and views, automations, dashboards, integrations, training and onboarding.",
  },
  {
    logo: { src: "/framer/D3I8f7BnP8vxsyzHLC4E2mH0.png", w: 1939, h: 520, box: "full", sizes: "calc(max((min(100vw, 1440px) - 72px) / 2, 300px) - 80px)" },
    body: "We use Make to build enterprise-grade automation scenarios that connect hundreds of apps with multi-step logic, branching, and error handling that basic Zapier-style tools cannot match. It is our go-to for visual, maintainable automations that move data reliably between your CRM, ERP, finance, and marketing systems.",
    services: "Use cases: CRM and ERP sync, lead routing, document generation, scheduled reporting pipelines.",
  },
  {
    logo: { src: "/framer/fJGTFQubDGQ5Bvl4fwywgLSVrlo.png", w: 1141, h: 399, box: "full", sizes: "calc(max((min(100vw, 1440px) - 72px) / 2, 300px) - 80px)" },
    body: "For clients who want self-hosted, privacy-first automation, n8n is our tool of choice. It gives you fine-grained control over your data flows and the flexibility to build advanced AI agent workflows, with no per-task pricing and no vendor lock-in. Ideal for regulated industries and teams that need automation to live inside their own infrastructure.",
    services: "Use cases: AI agent orchestration, internal tool automation, custom API workflows, retrieval-augmented assistants.",
  },
];

const REGIONS = [
  {
    tag: "AUSTRALIA",
    title: "Australian Operations",
    body: "OG Labs operates as a registered Australian business, serving clients in Sydney, Melbourne, Brisbane, and Perth with local expertise and same-timezone support. We help Australian SMBs across construction, manufacturing, and financial services implement HubSpot and ClickUp, then automate the manual work in between.",
  },
  {
    tag: "NEW ZEALAND",
    title: "New Zealand Network",
    body: "An established delivery network across Auckland, Wellington, and Christchurch, giving New Zealand businesses the same standard of HubSpot implementation, ClickUp setup, and AI automation as our Australian operations, with full timezone alignment.",
  },
  {
    tag: "SINGAPORE",
    title: "Southeast Asia Hub",
    body: "Singapore-based operations serving the broader Southeast Asia market, with a growing presence across Malaysia, Indonesia, the Philippines, and beyond. Our regional hub gives multi-country teams a single partner for CRM, work management, and process automation.",
  },
];

const WHY: Card[] = [
  { title: "Accredited, not improvised", body: "Our team holds current HubSpot and ClickUp certifications, so your build follows platform best practice. That keeps your setup upgradeable and audit-ready instead of a tangle of shortcuts that breaks at the next release." },
  { title: "One partner, full stack", body: "Most agencies cover a single tool. We connect HubSpot, ClickUp, Make, and n8n into one operating system for your business. That means fewer vendors, cleaner data, and automations that span departments rather than stopping at the edge of one app." },
  { title: "Built for APAC SMBs", body: "We work in your timezone and understand how Australian, New Zealand, and Southeast Asian businesses buy, sell, and report. Every solution is right-sized for an SMB budget with clear room to scale as you grow." },
];

const WAYS: Card[] = [
  { title: "Referral partners", body: "Send us clients who need HubSpot, ClickUp, or automation help and earn a share of the engagement. Ideal for accountants, fractional operators, and adjacent agencies who want to look after their clients without building a delivery team." },
  { title: "Co-delivery partners", body: "Bring us in to handle the technical build while you own the client relationship. We work quietly in the background or as a named specialist on your team, whichever suits the engagement and your brand." },
  { title: "Technology partners", body: "Software vendors who want a certified APAC implementation partner for their customers. We help your users onboard, integrate, and reach value faster, which lifts adoption and retention on your platform." },
];

const FAQS: Card[] = [
  { title: "What platforms is OG Labs certified in?", body: "We are a certified HubSpot Solutions Partner and a ClickUp certified partner, and we build advanced automation on Make and n8n. We hold and actively maintain current accreditations across these platforms, so your projects follow the latest best practice." },
  { title: "Do you white-label work for other agencies?", body: "Yes. We regularly deliver HubSpot, ClickUp, and automation projects under other agencies brands, with clear scopes and confidentiality agreements in place. You keep the client relationship, we provide the technical horsepower." },
  { title: "Which regions and timezones do you cover?", body: "We serve clients across Australia, New Zealand, and Southeast Asia, with operations registered in Australia and a regional hub in Singapore. That gives partners full timezone coverage from AEST through to SGT." },
  { title: "How do referral commissions work?", body: "We agree a referral share up front based on the size and type of engagement, paid once the referred client is onboarded. Get in touch and we will walk you through the current terms." },
  { title: "Can you integrate these platforms with our existing tools?", body: "Almost always. Using Make and n8n we connect HubSpot and ClickUp with ERPs, finance systems, data warehouses, and custom APIs, so data flows cleanly across your whole stack instead of being copied by hand." },
];

// Framer's masonry grid with 3 tracks; with three items each one gets its own column.
function Grid({ children }: { children: React.ReactNode[] }) {
  return (
    <div className={s.grid} style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
      {children.map((c, i) => (
        <div key={i} className={s.column}>
          {c}
        </div>
      ))}
    </div>
  );
}

function SimpleCard({ card, className }: { card: Card; className: string }) {
  return (
    <div className={className}>
      <Txt className={s.nowrap} preset="p-2rl9ro">{card.title}</Txt>
      <Txt className={s.wrap} preset="p-knz921">{card.body}</Txt>
    </div>
  );
}

export default function Partnerships() {
  return (
    <div className={s.root}>
      <div className={s.hero}>
        <div className={s.heroRow}>
          <div className={s.heroLeft}>
            <div className={s.pill}>
              <Txt className={s.nowrap} preset="p-foxgst" color="rgb(255, 255, 255)">
                PARTNER ECOSYSTEM
              </Txt>
            </div>
            <Txt as="h1" className={s.wrap} preset="h1">Our Partner Ecosystem</Txt>
          </div>
          <div className={s.heroRight}>
            <Txt className={s.wrap} preset="p-mzxkxl">
              OG Labs is an accredited partner of the leading platforms powering modern digital transformation: HubSpot, ClickUp,
              Make, and n8n. Our certifications mean you get expert-level CRM implementation, work management, and AI automation
              backed by the best tools available, delivered by a team that understands the APAC market. Every partnership we hold
              is one we actively use to ship measurable results for clients across Australia, New Zealand, and Southeast Asia.
            </Txt>
          </div>
        </div>
      </div>

      <div className={s.platformBand}>
        <div className={s.platformInner}>
          <Txt as="h2" className={s.wrap} preset="p-1o4nxrd">Platform partners</Txt>
          <div className={s.platformGrid}>
            {PLATFORMS.map((p) => {
              const img = (
                <FramerImage src={p.logo.src} width={p.logo.w} height={p.logo.h} sizes={p.logo.sizes} fit="contain" eager={p.logo.box !== "full"} />
              );
              return (
                <div key={p.logo.src} className={s.platformCard}>
                  {p.logo.box === "full" ? (
                    <div className={s.logoFull}>{img}</div>
                  ) : (
                    <div className={s.logoBox}>
                      <div className={p.logo.box === "hubspot" ? s.logoHubspot : s.logoClickup}>{img}</div>
                    </div>
                  )}
                  <Txt className={s.wrap} preset="p-mzxkxl">{p.body}</Txt>
                  <Txt className={s.wrap} preset="p-knz921">{p.services}</Txt>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className={s.section}>
        <Txt as="h2" className={s.wrap} preset="p-1o4nxrd">Regional partnerships</Txt>
        <Grid>
          {REGIONS.map((r) => (
            <div key={r.tag} className={s.cardGrey}>
              <div className={s.pill}>
                <Txt className={s.nowrap} preset="p-foxgst" color="rgb(255, 255, 255)">
                  {r.tag}
                </Txt>
              </div>
              <Txt className={s.wrap} preset="p-2rl9ro">{r.title}</Txt>
              <Txt className={s.wrap} preset="p-knz921">{r.body}</Txt>
            </div>
          ))}
        </Grid>
      </div>

      <div className={s.section}>
        <div className={s.heading}>
          <Txt as="h2" className={s.nowrap} preset="p-1o4nxrd">Why work with an accredited partner</Txt>
          <Txt className={s.nowrap} preset="p-mzxkxl">
            Anyone can buy a HubSpot or ClickUp licence. Getting real value out of these platforms is a different job. Working
            with an accredited OG Labs team means your systems are built to platform best practice, connected end to end, and
            shaped around the way your business actually runs.
          </Txt>
        </div>
        <Grid>
          {WHY.map((c) => (
            <SimpleCard key={c.title} card={c} className={s.cardGrey} />
          ))}
        </Grid>
      </div>

      <div className={s.sectionGrey}>
        <div className={s.headingClear}>
          <Txt as="h2" className={s.nowrap} preset="p-1o4nxrd">Ways to partner with us</Txt>
          <Txt className={s.nowrap} preset="p-mzxkxl">
            We work with referral partners, agencies, and software vendors across APAC. Pick the model that fits how you want to
            work with your clients, and we handle the rest.
          </Txt>
        </div>
        <Grid>
          {WAYS.map((c) => (
            <SimpleCard key={c.title} card={c} className={s.card} />
          ))}
        </Grid>
      </div>

      <div className={s.faqSection}>
        <Txt as="h2" className={s.nowrap} preset="p-1o4nxrd">Partnership FAQs</Txt>
        <div className={s.faqList}>
          {FAQS.map((c, i) => (
            <SimpleCard key={c.title} card={c} className={i === FAQS.length - 1 ? s.faqLast : s.faq} />
          ))}
        </div>
      </div>

      <div className={s.dark}>
        <Txt as="h2" className={s.wrap} preset="p-1o4nxrd" color="rgb(255, 255, 255)">
          Become a partner
        </Txt>
        <Txt className={s.wrap} preset="p-mzxkxl" color="rgb(255, 255, 255)">
          Are you a software vendor, agency, or consultant looking to partner with OG Labs? Whether you want to refer clients,
          co-deliver projects, or white-label our HubSpot, ClickUp, and AI automation expertise, we would love to explore how we
          can grow together across APAC. Reach out and tell us what you are building.
        </Txt>
        <Link href="/contact" className={s.cta}>
          <Txt className={s.nowrap} preset="p-foxgst" color="rgb(255, 255, 255)">
            GET IN TOUCH
          </Txt>
        </Link>
      </div>
    </div>
  );
}
