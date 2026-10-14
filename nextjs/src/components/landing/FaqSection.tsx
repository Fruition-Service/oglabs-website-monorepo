import Text from "./Text";
import type { FaqItem } from "./types";
import styles from "./FaqSection.module.css";

// Grey "Working with OG Labs ..." / "... FAQs" block: a heading over a static list of question and
// answer rows separated by hairlines (no accordion on Framer).
//   fullBleed  the section has no 1440px max-width (construction).
export default function FaqSection({ title, items, fullBleed }: { title: string; items: FaqItem[]; fullBleed?: boolean }) {
  return (
    <div className={`${styles.section} ${fullBleed ? styles.fullBleed : ""}`}>
      <Text value={title} preset="1o4nxrd" as="h2" />
      <div className={styles.list}>
        {items.map((it, i) => (
          <div key={i} className={styles.item}>
            <Text value={it.q} preset="2rl9ro" />
            <Text value={it.a} preset="knz921" />
          </div>
        ))}
      </div>
    </div>
  );
}
