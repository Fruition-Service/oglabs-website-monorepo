import type { CSSProperties } from "react";
import type { Txt } from "./types";
import styles from "./Text.module.css";

// One Framer RichTextContainer: a wrapper box (width mode) around a single <p>/<h1>/<h2>.
//   preset  Framer text preset id (`framer-styles-preset-<id>` == `p-<id>` in presets.css).
//   color   Framer's inline `--framer-text-color` override.
// The h1 preset (1ylqbua) is styled here: presets.css only defines it for links.
const BALANCED = new Set(["1ylqbua", "1o4nxrd", "mzxkxl"]);

export default function Text({
  value,
  preset,
  as: Tag = "p",
  color,
}: {
  value: Txt;
  preset: string;
  as?: "p" | "h1" | "h2";
  color?: string;
}) {
  const text = typeof value === "string" ? value : value.text;
  const w = typeof value === "string" ? undefined : value.w;
  const box = w === "auto" ? styles.fit : styles.fill;
  const boxStyle: CSSProperties | undefined = typeof w === "number" ? { width: w } : undefined;
  const cls = [preset === "1ylqbua" ? styles.h1 : `p-${preset}`, BALANCED.has(preset) ? styles.balance : ""]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={box} style={boxStyle}>
      <Tag className={cls} style={color ? { color } : undefined}>
        {text}
      </Tag>
    </div>
  );
}
