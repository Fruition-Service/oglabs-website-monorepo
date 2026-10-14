"use client";

// Framer's three entrance effects used on the blog and legal pages, ported 1:1:
//
// - <Appear>: an "appear" animation (data-framer-appear-id + the framer/appear JSON): runs once on
//   load after `delay`, spring stiffness 500 / damping 100.
// - <InView>: a style appear effect (__framer__styleAppearEffectEnabled): runs once when half the
//   element is in view (threshold 0.5), same spring.
// - <Words>: a text effect (tokenization "word"): each word is an inline-block that rises from
//   y 16 / rotateX -90 with spring 400/50, staggered 0.075s, on mount after `startDelay` or in view.
import { motion, type TargetAndTransition, type Transition } from "motion/react";
import { Fragment, type CSSProperties, type ReactNode } from "react";

type From = "rise16" | "rise48" | "fade48";

/** Framer's initial states: rise16 = opacity .001, y 16, rotateX -45; rise48 = opacity .001, y 48; fade48 = opacity 0, y 48. */
const FROM: Record<From, TargetAndTransition> = {
  rise16: { opacity: 0.001, y: 16, rotateX: -45 },
  rise48: { opacity: 0.001, y: 48 },
  fade48: { opacity: 0, y: 48 },
};
const TO: TargetAndTransition = { opacity: 1, y: 0, rotateX: 0 };
const spring = (delay: number): Transition => ({ type: "spring", stiffness: 500, damping: 100, mass: 1, delay });

type Props = {
  from: From;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  "data-framer-name"?: string;
  "data-section"?: string;
};

export function Appear({ from, delay = 0, children, ...rest }: Props) {
  return (
    <motion.div initial={FROM[from]} animate={TO} transition={spring(delay)} {...rest}>
      {children}
    </motion.div>
  );
}

export function InView({ from, delay = 0, children, ...rest }: Props) {
  return (
    <motion.div initial={FROM[from]} whileInView={TO} viewport={{ once: true, amount: 0.5 }} transition={spring(delay)} {...rest}>
      {children}
    </motion.div>
  );
}

/** Splits `text` into words that appear one after another (Framer text effect, type "appear"). */
export function Words({ text, trigger, startDelay = 0 }: { text: string; trigger: "mount" | "inView"; startDelay?: number }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => {
        const transition: Transition = { type: "spring", stiffness: 400, damping: 50, mass: 1, delay: startDelay + i * 0.075 };
        const initial = { opacity: 0.001, y: 16, rotateX: -90 };
        const target = { opacity: 1, y: 0, rotateX: 0 };
        const span =
          trigger === "mount" ? (
            <motion.span style={{ display: "inline-block" }} initial={initial} animate={target} transition={transition}>
              {w}
            </motion.span>
          ) : (
            <motion.span
              style={{ display: "inline-block" }}
              initial={initial}
              whileInView={target}
              viewport={{ once: true, amount: 0.5 }}
              transition={transition}
            >
              {w}
            </motion.span>
          );
        return (
          <Fragment key={i}>
            {i > 0 ? " " : null}
            {span}
          </Fragment>
        );
      })}
    </>
  );
}
