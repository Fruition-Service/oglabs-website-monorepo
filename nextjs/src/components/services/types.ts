// Content model for the 8 Framer service pages (/services/*). They share one unnamed-wrapper
// template: a hero, card grids, a step/FAQ list, a hidden industry-links strip and a dark CTA band.
// Every page has the same CSS at all three breakpoints (only the text presets change size), so the
// differences between pages are captured here as data.

/** A title + body pair, used by cards and list rows. */
export type ServiceItem = {
  title: string;
  body: string;
  /** Framer "Fit" width: `white-space: pre`, the text never wraps (it overflows on narrow screens). */
  fitTitle?: boolean;
  fitBody?: boolean;
};

/** "gray": #f0f0f0 card, 24px padding. "white": #fff card, 32px padding. Both have a 1px #e4e4e4 border. */
export type CardTone = "gray" | "white";

export type ServiceGrid =
  /** Framer stack grid: `repeat(cols, minmax(min, 1fr))`, full width. */
  | { type: "auto"; cols: number; min: number; bg: "white" | "none"; tone: CardTone; items: ServiceItem[] }
  /** Framer masonry grid: fixed 1152px wide, one flex column per entry (overflows on tablet/phone). */
  | { type: "masonry"; bg: "white" | "none"; tone: CardTone; columns: ServiceItem[][] };

export type ServiceHeading = {
  text: string;
  /** Wrapped in a 16px-gap column (optionally with an 18px intro paragraph under the h2). */
  grouped?: boolean;
  intro?: string;
};

type SectionFrame = {
  bg: "white" | "gray";
  /** Horizontal padding (vertical is always 80px). */
  padX: 24 | 48;
  gap: number;
  /** null = no max-width. */
  maxWidth: number | null;
  /** `z-index: 0` on the section. */
  raised?: boolean;
  heading?: ServiceHeading;
};

export type ServiceSection =
  | (SectionFrame & { kind: "grid"; grid: ServiceGrid })
  | (SectionFrame & { kind: "list"; rows: ServiceItem[] });

export type ServiceContent = {
  hero: {
    badge: string;
    title: string;
    intro: string;
    /** The "Dan-freeman-…" banner (259px tall). */
    image?: { src: string; position: string; width: number; height: number };
  };
  sections: ServiceSection[];
  /** Hrefs of the (empty, zero-size) industry chip links Framer keeps above the CTA band. */
  industries: string[];
  cta: { title: string; body: string };
};
