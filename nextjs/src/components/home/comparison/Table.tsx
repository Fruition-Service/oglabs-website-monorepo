// "Comparison/Comparison Table" (Framer module, class framer-mqe0n) with its "Comparison/Row" and
// "Comparison/Column" children and the "Plus" / "Minus" icons.
//
// Framer renders one table per breakpoint: the Desktop variant (row labels + three equal columns,
// 75% wide) and the Tablet / Mobile variants (row labels + a horizontally scrolling Framer Carousel
// of 360px columns, plus a "Scroll horizontally" notice). The Tablet / Mobile variants still carry
// the component's default column copy ("AI-driven & smart", ...): that is what the live site shows.
import shared from "../shared.module.css";
import { OG_LOGO_LIGHT } from "./assets";
import SectionReveal from "./SectionReveal";
import s from "./Table.module.css";

const ROWS = [
  "AI agentic workflows",
  "Platform expertise",
  "Industry specialisation",
  "Implementation speed",
  "Scalability for SMBs",
  "Integration depth",
  "APAC presence",
  "Ongoing support",
];

type Column = { plus: boolean; title: string; cells: string[] };

const DESKTOP: Column[] = [
  {
    plus: true,
    title: "OG Labs",
    cells: [
      "Agentic AI with Make & n8n",
      "HubSpot + ClickUp expert",
      "Constr., Mfg. Finance",
      "6 to 8 weeks typical",
      "Right-sized for SMBs",
      "Local APAC team",
      "Strategic advisory included",
      "Deep custom integrations",
    ],
  },
  {
    plus: false,
    title: "Generic automation tools",
    cells: [
      "Rules-based only",
      "One platform focus",
      "Generic, no sector",
      "Months of DIY work",
      "Hard to scale",
      "Remote only",
      "Self-serve",
      "Surface integrations",
    ],
  },
  {
    plus: false,
    title: "Traditional partners",
    cells: [
      "Limited AI capability",
      "HubSpot OR ClickUp",
      "Generic playbooks",
      "Slow waterfall projects",
      "Enterprise-priced",
      "North America focus",
      "Setup then exit",
      "Basic native integrations",
    ],
  },
];

const SCROLLING: Column[] = [
  {
    plus: true,
    title: "OG Labs",
    cells: [
      "AI-driven & smart",
      "Real-time, cross-tool",
      "AI prioritizes tasks",
      "Plug-and-play",
      "Grows with teams",
      "No coding",
      "End-to-end repetitive work",
      "24/7 automation",
    ],
  },
  {
    plus: false,
    title: "Automation tools",
    cells: [
      "Manual rules",
      "Partial & manual",
      "AI prioritizes tasks",
      "Complex",
      "Hard to scale",
      "Sometimes required",
      "Predefined steps only",
      "Trigger-dependent",
    ],
  },
  {
    plus: false,
    title: "CRM / OPS Platforms",
    cells: [
      "Limited AI",
      "CRM only",
      "Manual",
      "Rigid",
      "Expensive",
      "Limited flexibility",
      "CRM/ops tasks only",
      "System-dependent",
    ],
  },
];

/** "Plus" (svg #465907804) / "Minus" (svg #650073895): 1.5 strokes, colour token d0c27c52 (white). */
function Icon({ plus }: { plus: boolean }) {
  const stroke = "var(--token-d0c27c52-5598-475d-b517-ac18042bf84b, rgb(35, 31, 32))";
  return (
    <div className={`${s.icon} ${plus ? s.iconPlus : s.iconMinus}`} data-framer-name="Icon">
      <svg className={s.svg} viewBox="0 0 24 24" role="presentation" aria-hidden="true">
        <path d="M 0 0 L 16.5 0" fill="transparent" stroke={stroke} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" transform="translate(3.75 12)" />
        {plus && (
          <path d="M 0 0 L 0 16.5" fill="transparent" stroke={stroke} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" transform="translate(12 3.75)" />
        )}
      </svg>
    </div>
  );
}

function ColumnView({ col, name }: { col: Column; name: string }) {
  return (
    <div className={s.column} data-framer-name={col.plus ? "Desktop — Plus" : "Desktop — Minus"} data-column={name}>
      <div className={`${s.cell} ${s.title} ${col.plus ? s.titlePlus : s.titleMinus} ${shared.border}`} data-framer-name="Title">
        {col.plus ? (
          <div className={s.logo} data-framer-name="Logo" role="img" aria-label="OG Labs">
            <div className={s.logoImg} style={{ backgroundImage: OG_LOGO_LIGHT }} aria-hidden="true" />
          </div>
        ) : (
          <div className={s.cellText}>
            <p className="p-6n2e5g" style={{ textAlign: "center" }}>
              {col.title}
            </p>
          </div>
        )}
      </div>
      {col.cells.map((t, i) => (
        <div key={i} className={`${s.cell} ${shared.border}`} data-framer-name={String(i + 1)}>
          <Icon plus={col.plus} />
          <div className={s.cellText}>
            <p className="p-knz921">{t}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function Rows() {
  return (
    <div className={s.rows} data-framer-name="Rows">
      <div className={s.filler} data-framer-name="Filler" />
      {ROWS.map((r, i) => (
        <div key={r} className={s.row} data-framer-name="Row">
          <div className={s.rowText}>
            <p className={`p-knz921 ${s.rowP}`}>{r}</p>
          </div>
          {i < ROWS.length - 1 && <div className={`${s.divider} ${shared.border}`} data-framer-name="Divider" />}
        </div>
      ))}
    </div>
  );
}

export default function ComparisonTable() {
  return (
    <>
      {/* Desktop variant (framer-v-4n36a5) */}
      <div className={`${s.wrap} ${s.desktopOnly}`} data-framer-name="Comparison Table">
        <div className={`${s.table} ${shared.border}`} data-framer-name="Desktop">
          <SectionReveal className={s.container}>
            <Rows />
            <div className={s.columns} data-framer-name="Columns">
              {DESKTOP.map((c, i) => (
                <div key={c.title} className={s.colSlot} data-framer-name={`Column ${i + 1}`}>
                  <ColumnView col={c} name={`Column ${i + 1}`} />
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </div>
      {/* Tablet (framer-v-s0fsgu) / Mobile (framer-v-673kuc) variants */}
      <div className={`${s.wrap} ${s.scrollOnly}`} data-framer-name="Comparison Table">
        <div className={`${s.table} ${s.tableScroll} ${shared.border}`} data-framer-name="Tablet">
          <SectionReveal className={`${s.container} ${s.containerScroll}`}>
            <Rows />
            <div className={s.carouselSlot}>
              <section className={s.carousel}>
                <ul className={s.track} data-show-scrollbar="true" aria-atomic="false" aria-live="polite">
                  {SCROLLING.map((c, i) => (
                    <li key={c.title} className={s.slide} aria-label={`${i + 1} of 3`}>
                      <div className={s.slideCol} data-framer-name={`Column ${i + 1}`}>
                        <ColumnView col={c} name={`Column ${i + 1}`} />
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </SectionReveal>
          <div className={s.notice} data-framer-name="Buttons Notice (For Tablet & Mobile)">
            <p className="p-foxgst" style={{ textAlign: "center", color: "var(--token-ead00dcb-2b22-4edd-af15-9859b50e46de, rgba(0, 0, 0, 0.64))" }}>
              Scroll horizontally
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
