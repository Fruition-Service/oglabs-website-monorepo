// The shared Framer template behind the 8 /services/* pages. All sections are unnamed Framer
// wrappers (compare them with `@page`); the page is static: no hover states, no appear effects.
import type { CSSProperties } from "react";
import Link from "next/link";
import type { ServiceContent, ServiceGrid, ServiceHeading, ServiceItem, ServiceSection, CardTone } from "./types";
import s from "./ServiceTemplate.module.css";

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");

/** Framer RichTextContainer: "Fit" (white-space: pre, auto width) or fill (wraps, 100% width). */
function Text({ fit, children }: { fit?: boolean; children: React.ReactNode }) {
  return <div className={cx(s.text, fit ? s.fit : s.fill)}>{children}</div>;
}

function Hero({ hero }: { hero: ServiceContent["hero"] }) {
  return (
    <div className={s.hero}>
      {hero.image && (
        <div className={s.heroImage} data-section="Dan-freeman-7Zb7kUyQg1E-unsplash">
          <div className={s.heroImageFill}>
            <img
              decoding="async"
              width={hero.image.width}
              height={hero.image.height}
              src={`/framer/${hero.image.src}`}
              alt=""
              style={{ objectPosition: hero.image.position }}
            />
          </div>
        </div>
      )}
      <div className={s.heroRow}>
        <div className={s.heroMain}>
          <div className={s.badge}>
            <Text fit>
              <p className="p-foxgst">{hero.badge}</p>
            </Text>
          </div>
          <Text>
            <h1 className={cx(s.h1, s.balance)}>{hero.title}</h1>
          </Text>
        </div>
        <div className={s.heroAside}>
          <Text>
            <p className={cx("p-mzxkxl", s.balance)}>{hero.intro}</p>
          </Text>
        </div>
      </div>
    </div>
  );
}

function Heading({ heading }: { heading: ServiceHeading }) {
  const h2 = (
    <Text>
      <h2 className={cx("p-1o4nxrd", s.balance)}>{heading.text}</h2>
    </Text>
  );
  if (!heading.grouped) return h2;
  return (
    <div className={s.headingGroup}>
      {h2}
      {heading.intro && (
        <Text>
          <p className={cx("p-mzxkxl", s.balance)}>{heading.intro}</p>
        </Text>
      )}
    </div>
  );
}

function Item({ item, className }: { item: ServiceItem; className: string }) {
  return (
    <div className={className}>
      <Text fit={item.fitTitle}>
        <p className="p-2rl9ro">{item.title}</p>
      </Text>
      <Text fit={item.fitBody}>
        <p className="p-knz921">{item.body}</p>
      </Text>
    </div>
  );
}

const cardClass = (tone: CardTone) => cx(s.card, tone === "gray" ? s.cardGray : s.cardWhite);

function Grid({ grid }: { grid: ServiceGrid }) {
  const bg = grid.bg === "white" ? s.bgWhite : s.bgNone;
  if (grid.type === "masonry") {
    return (
      <div className={cx(s.masonry, bg)} style={{ gridTemplateColumns: `repeat(${grid.columns.length}, 1fr)` }}>
        {grid.columns.map((col, i) => (
          <div key={i} className={s.masonryColumn}>
            {col.map((item) => (
              <Item key={item.title} item={item} className={cardClass(grid.tone)} />
            ))}
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className={cx(s.autoGrid, bg)} style={{ gridTemplateColumns: `repeat(${grid.cols},minmax(${grid.min}px,1fr))` }}>
      {grid.items.map((item) => (
        <Item key={item.title} item={item} className={cardClass(grid.tone)} />
      ))}
    </div>
  );
}

function Section({ section }: { section: ServiceSection }) {
  const style: CSSProperties = { gap: section.gap, maxWidth: section.maxWidth ?? undefined };
  return (
    <div
      className={cx(s.section, section.bg === "gray" && s.sectionGray, section.padX === 48 && s.sectionWide, section.raised && s.raised)}
      style={style}
    >
      {section.heading && <Heading heading={section.heading} />}
      {section.kind === "grid" ? (
        <Grid grid={section.grid} />
      ) : (
        <div className={s.rows}>
          {section.rows.map((row) => (
            <Item key={row.title} item={row} className={s.row} />
          ))}
        </div>
      )}
    </div>
  );
}

/** Framer keeps an unfinished "industries" chip row here: empty links, 0px tall, off-canvas. */
function IndustryStrip({ hrefs }: { hrefs: string[] }) {
  return (
    <div className={s.strip}>
      <div className={s.stripRow}>
        <div className={s.stripFill} />
        <div className={s.stripFill} />
      </div>
      <div className={s.stripRow}>
        {hrefs.map((href) => (
          <Link key={href} href={href} className={s.stripLink}>
            <div className={s.stripFill} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function ServiceTemplate({ content }: { content: ServiceContent }) {
  return (
    <>
      <Hero hero={content.hero} />
      {content.sections.map((section, i) => (
        <Section key={i} section={section} />
      ))}
      <IndustryStrip hrefs={content.industries} />
      <div className={s.cta}>
        <Text>
          <h2 className={cx("p-1o4nxrd", s.balance)}>{content.cta.title}</h2>
        </Text>
        <Text>
          <p className={cx("p-mzxkxl", s.balance)}>{content.cta.body}</p>
        </Text>
      </div>
    </>
  );
}
