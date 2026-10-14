// Framer rich text: a RichTextContainer wrapper (carries the layer's layout class, e.g. width or
// white-space) around the styled element (carries the text preset). Keeping both levels matters:
// presets with `text-wrap: balance` re-enable wrapping inside a `white-space: pre` wrapper.
import type { CSSProperties, ReactNode } from "react";
import t from "./text.module.css";

const BALANCED = new Set(["p-1o4nxrd", "p-mzxkxl", "p-1ln46ju"]);

export default function Txt({
  as: Tag = "p",
  className,
  preset,
  color,
  align,
  style,
  children,
}: {
  as?: "p" | "h1" | "h2" | "h3" | "span" | "div";
  /** The Framer text layer's layout class (wrapper). */
  className?: string;
  /** Preset class: "p-xxxx", or "h1" for Framer's Heading 1 preset. */
  preset: string;
  /** Framer's --framer-text-color override. */
  color?: string;
  align?: CSSProperties["textAlign"];
  style?: CSSProperties;
  children: ReactNode;
}) {
  const cls = preset === "h1" ? t.h1 : BALANCED.has(preset) ? `${preset} ${t.balance}` : preset;
  return (
    <div className={`${t.rt}${className ? ` ${className}` : ""}`} style={style}>
      <Tag className={cls} style={color || align ? { color, textAlign: align } : undefined}>
        {children}
      </Tag>
    </div>
  );
}
