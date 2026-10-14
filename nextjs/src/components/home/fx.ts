// Framer appear-effect values shared by the home sections. Plain module (no "use client"), so server
// components can import these and pass them to <Appear> / <WordsAppear> (from ./Appear).
import type { Transition } from "motion/react";

export type FxState = {
  opacity?: number;
  x?: number;
  y?: number;
  scale?: number;
  rotate?: number;
  rotateX?: number;
  rotateY?: number;
};

export const REST = { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0, rotateX: 0, rotateY: 0 };

// The presets the home page module uses (names follow the Framer module's constants).
/** Hl: load-appear start (opacity .001, y 16, rotateX -45). */
export const ENTER_TILT: FxState = { opacity: 0.001, y: 16, rotateX: -45 };
/** Jl: scroll-appear start for badges, subheadings and buttons. */
export const ENTER_TILT_0: FxState = { opacity: 0, y: 16, rotateX: -45 };
/** Xl: scroll-appear start for cards (y 24). */
export const ENTER_RISE: FxState = { opacity: 0, y: 24 };
/** Ul: per-word start of the heading text effect. */
export const WORD_ENTER: FxState = { opacity: 0.001, y: 16, rotateX: -90 };

export const spring = (delay: number, stiffness = 500, damping = 100): Transition => ({
  type: "spring",
  stiffness,
  damping,
  mass: 1,
  delay,
});

