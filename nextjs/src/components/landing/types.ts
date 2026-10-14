// Content types shared by the region, industry and case-studies pages.
//
// A text value is either a plain string (Framer "Fill" width: 100%, wraps) or an object that pins
// the text box: `w: "auto"` is Framer's "Fit" width (white-space: pre, never wraps, may overflow
// its card on narrow screens exactly like the live site), a number is a fixed pixel width.
export type Txt = string | { text: string; w: "auto" | number };

export type Card = {
  /** Optional "01"-style index line above the title (same preset as the title). */
  num?: Txt;
  title: Txt;
  text: Txt;
};

export type FaqItem = { q: Txt; a: Txt };
