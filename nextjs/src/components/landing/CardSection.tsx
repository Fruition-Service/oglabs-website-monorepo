import Text from "./Text";
import type { Card } from "./types";
import styles from "./CardSection.module.css";

// A section heading (+ optional intro line) over a set of bordered cards.
//   grid     Framer "Grid" stack: `cols` columns of minmax(min, 1fr), cards vertically centred
//            per row (a phone shows the desktop grid overflowing, as on Framer).
//   masonry  Framer masonry ("columnMasonryLayoutEnabled"): a fixed 1152px grid of columns that
//            stack their cards; pass the cards already split into columns, in Framer's order.
//   grouped  the heading sits in its own column wrapper (16px gap to the intro).
//   tone     section background; card.tone / card.pad / card.fit style the cards
//            (fit = width: min-content, for cards whose text boxes have a fixed width).
type Layout = { grid: { cols: number; min: number }; cards: Card[] } | { masonry: Card[][] };

export type CardSectionProps = {
  title: string;
  intro?: string;
  grouped?: boolean;
  tone?: "white" | "gray";
  gap: number;
  alignStart?: boolean;
  clip?: boolean;
  card: { tone: "white" | "gray"; pad: 24 | 32; fit?: boolean };
} & Layout;

function CardBox({ c, cls }: { c: Card; cls: string }) {
  return (
    <div className={cls}>
      {c.num !== undefined && <Text value={c.num} preset="2rl9ro" />}
      <Text value={c.title} preset="2rl9ro" />
      <Text value={c.text} preset="knz921" />
    </div>
  );
}

export default function CardSection(props: CardSectionProps) {
  const { title, intro, grouped, tone = "white", gap, alignStart, clip, card } = props;
  const sectionCls = [styles.section, tone === "gray" ? styles.gray : "", alignStart ? styles.start : "", clip ? styles.clip : ""]
    .filter(Boolean)
    .join(" ");
  const cardCls = [styles.card, card.tone === "gray" ? styles.cardGray : "", card.pad === 32 ? styles.pad32 : "", card.fit ? styles.fit : ""]
    .filter(Boolean)
    .join(" ");
  const heading = <Text value={title} preset="1o4nxrd" as="h2" />;

  return (
    <div className={sectionCls} style={{ gap }}>
      {grouped ? (
        <div className={styles.group}>
          {heading}
          {intro && <Text value={intro} preset="mzxkxl" />}
        </div>
      ) : (
        heading
      )}
      {"masonry" in props ? (
        <div className={styles.masonry} style={{ gridTemplateColumns: `repeat(${props.masonry.length}, 1fr)` }}>
          {props.masonry.map((col, i) => (
            <div key={i} className={styles.column}>
              {col.map((c, j) => (
                <CardBox key={j} c={c} cls={cardCls} />
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div
          className={styles.grid}
          style={{ gridTemplateColumns: `repeat(${props.grid.cols}, minmax(${props.grid.min}px, 1fr))` }}
        >
          {props.cards.map((c, i) => (
            <CardBox key={i} c={c} cls={cardCls} />
          ))}
        </div>
      )}
    </div>
  );
}
