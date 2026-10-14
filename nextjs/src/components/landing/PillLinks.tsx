import Link from "next/link";
import styles from "./PillLinks.module.css";

// The industry pages end with a row of empty pill links (Framer layers with no label: each renders
// as a 2px dot from its 1px border, and the row has no height). Kept because Framer ships them.
// Each group is a centred row; `null` is an empty white box, a string is a link to that path.
export default function PillLinks({ groups }: { groups: (string | null)[][] }) {
  return (
    <div className={styles.row}>
      {groups.map((g, i) => (
        <div key={i} className={styles.group}>
          {g.map((href, j) =>
            href ? (
              <Link key={j} href={href} className={styles.pill}>
                <div className={styles.box} />
              </Link>
            ) : (
              <div key={j} className={styles.box} />
            ),
          )}
        </div>
      ))}
    </div>
  );
}
