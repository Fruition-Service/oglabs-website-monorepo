"use client";
// Framer's appear effects, ported to motion.
//
// - `Appear` covers both kinds the home page uses:
//   * load appear (`data-framer-appear-id` + the `appear` JSON in the SSR HTML): trigger="mount"
//   * scroll appear (`__framer__styleAppearEffectEnabled`, `__framer__enter`, `__framer__animate`,
//     `__framer__threshold`, `__framer__animateOnce`): trigger="inView" (the default)
// - `WordsAppear` is Framer's text effect `{ type: "appear", tokenization: "word" }`: every word is an
//   inline-block that animates from `effect` to rest, staggered by `transition.delay` per word, after
//   `startDelay`.
import { motion, type Transition } from "motion/react";
import type { CSSProperties, ReactNode } from "react";
// The start states / springs (ENTER_TILT, ENTER_RISE, spring(), ...) live in ./fx (not a client module),
// so server components can import them and pass them in.
import { REST, WORD_ENTER, spring, type FxState } from "./fx";

type Tag = "div" | "section" | "p" | "span" | "a" | "li" | "h2";

export function Appear({
  as = "div",
  from,
  transition,
  trigger = "inView",
  amount = 0.5,
  className,
  style,
  children,
  ...rest
}: {
  as?: Tag;
  from: FxState;
  transition: Transition;
  trigger?: "mount" | "inView";
  amount?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
} & Record<`data-${string}`, string>) {
  const M = motion[as] as typeof motion.div;
  const anim =
    trigger === "mount"
      ? { animate: { ...REST, transition } }
      : { whileInView: { ...REST, transition }, viewport: { once: true, amount } };
  return (
    <M className={className} style={style} initial={from} {...anim} {...rest}>
      {children}
    </M>
  );
}

/**
 * Framer's "appear" text effect with word tokenization, rendered as the text element itself (`as`), so
 * the in-view threshold is measured on a real box. Spaces stay real text between the words.
 * `children` may be an array of runs (e.g. to colour some words differently): each run is
 * { text, className?, style? }.
 */
export type Run = { text: string; className?: string; style?: CSSProperties };

export function WordsAppear({
  as = "p",
  text,
  runs,
  trigger = "inView",
  startDelay = 0,
  stagger = 0.075,
  amount = 0.5,
  className,
  style,
}: {
  as?: "h1" | "h2" | "h3" | "p" | "span";
  text?: string;
  runs?: Run[];
  trigger?: "mount" | "inView";
  startDelay?: number;
  stagger?: number;
  amount?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const M = motion[as] as typeof motion.p;
  const parts = runs ?? [{ text: text ?? "" }];
  const container =
    trigger === "mount"
      ? { initial: "hidden", animate: "shown" }
      : { initial: "hidden", whileInView: "shown", viewport: { once: true, amount } };
  // Tokens: words, plus "\n" for a forced line break (Framer writes those as <br>).
  const tokenize = (t: string) => t.replace(/\n/g, " \n ").split(" ").filter(Boolean);
  const total = parts.reduce((a, r) => a + tokenize(r.text).filter((w) => w !== "\n").length, 0);
  let n = 0;
  return (
    <M className={className} style={style} {...container}>
      {parts.map((run, ri) =>
        tokenize(run.text).map((w, wi) => {
          if (w === "\n") return <br key={ri + "-" + wi} />;
          const i = n++;
          return (
            <span key={ri + "-" + wi} style={{ display: "contents" }}>
              <motion.span
                className={run.className}
                style={{ display: "inline-block", ...run.style }}
                variants={{
                  hidden: WORD_ENTER,
                  shown: { ...REST, transition: spring(startDelay + i * stagger, 400, 50) },
                }}
              >
                {w}
              </motion.span>
              {i < total - 1 ? " " : null}
            </span>
          );
        }),
      )}
    </M>
  );
}
