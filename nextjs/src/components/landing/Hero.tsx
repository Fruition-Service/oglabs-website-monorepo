import Text from "./Text";
import styles from "./Hero.module.css";

// Page hero: optional full-width photo, then a row with the orange badge + h1 on the left and the
// intro paragraph on the right (bottom-aligned).
//   layout "region"    /au /nz /sg: photo 100% wide, 100px top padding.
//   layout "fixed"     /case-studies: photo and row fixed at 1152px, section sized to its content.
//   layout "industry"  /industries/*: no photo, 200px top padding.
//   clip               overflow: clip on the section and the paragraph column (construction).
export type HeroProps = {
  layout: "region" | "fixed" | "industry";
  badge: string;
  /** White badge label (regions, case studies); industry badges keep the preset's black. */
  badgeLight?: boolean;
  title: string;
  text: string;
  /** Width of the badge + h1 column, as on Framer ("60%", "61%", ...). */
  leftWidth: string;
  image?: { src: string; width: number; height: number; position: string };
  clip?: boolean;
};

export default function Hero({ layout, badge, badgeLight, title, text, leftWidth, image, clip }: HeroProps) {
  return (
    <div className={`${styles.hero} ${styles[layout]} ${clip ? styles.clip : ""}`}>
      {image && (
        <div className={styles.image}>
          <img
            src={image.src}
            width={image.width}
            height={image.height}
            alt=""
            decoding="async"
            style={{ objectPosition: image.position }}
          />
        </div>
      )}
      <div className={styles.row}>
        <div className={styles.left} style={{ width: leftWidth }}>
          <div className={styles.badge}>
            <Text value={{ text: badge, w: "auto" }} preset="foxgst" color={badgeLight ? "rgb(255, 255, 255)" : undefined} />
          </div>
          <Text value={title} preset="1ylqbua" as="h1" />
        </div>
        <div className={styles.right}>
          <Text value={text} preset="mzxkxl" />
        </div>
      </div>
    </div>
  );
}
