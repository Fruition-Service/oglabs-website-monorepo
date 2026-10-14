"use client";

// Framer entrance effects used on the about and contact pages, with the exact initial states and
// springs from the Framer modules (blog/Motion.tsx only covers the 500/100 spring).
//
// - <Appear>: "appear" animation (data-framer-appear-id): runs once on load.
// - <InView>: style appear effect (__framer__styleAppearEffectEnabled): runs once when `amount` of
//   the element is in view.
import { motion, useInView, type TargetAndTransition } from "motion/react";
import { Fragment, useRef, type CSSProperties, type ReactNode } from "react";

export type Spring = { stiffness: number; damping: number; mass?: number; delay?: number };

type Props = {
  initial: TargetAndTransition;
  spring: Spring;
  className?: string;
  style?: CSSProperties;
  as?: "div" | "section" | "form";
  children?: ReactNode;
  "data-framer-name"?: string;
  "data-section"?: string;
};

const TO: TargetAndTransition = { opacity: 1, x: 0, y: 0, rotate: 0, rotateX: 0, rotateY: 0, scale: 1 };

function transition({ stiffness, damping, mass = 1, delay = 0 }: Spring) {
  return { type: "spring" as const, stiffness, damping, mass, delay };
}

export function Appear({ initial, spring, as = "div", children, ...rest }: Props) {
  const M = motion[as];
  return (
    <M initial={initial} animate={TO} transition={transition(spring)} {...rest}>
      {children}
    </M>
  );
}

export function InView({ initial, spring, amount = 0, as = "div", children, ...rest }: Props & { amount?: number }) {
  const M = motion[as];
  return (
    <M initial={initial} whileInView={TO} viewport={{ once: true, amount }} transition={transition(spring)} {...rest}>
      {children}
    </M>
  );
}

/**
 * Framer text effect "appear", tokenization "word": each word rises from y 16 / rotateX -90 with
 * spring 400/50, staggered 0.075s. trigger "mount" starts after `startDelay`; "inView" starts when
 * `threshold` of the whole text element is visible (Framer observes the element, not each word).
 */
export function WordsText({
  as: Tag = "h2",
  text,
  trigger,
  startDelay = 0,
  threshold = 0.5,
  className,
  style,
}: {
  as?: "h1" | "h2" | "p";
  text: string;
  trigger: "mount" | "inView";
  startDelay?: number;
  threshold?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, amount: threshold });
  const go = trigger === "mount" || inView;
  const words = text.split(" ");
  return (
    <Tag ref={ref} className={className} style={style}>
      {words.map((w, i) => (
        <Fragment key={i}>
          {i > 0 ? " " : null}
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ opacity: 0.001, y: 16, rotateX: -90 }}
            animate={go ? { opacity: 1, y: 0, rotateX: 0 } : undefined}
            transition={{ type: "spring", stiffness: 400, damping: 50, mass: 1, delay: startDelay + i * 0.075 }}
          >
            {w}
          </motion.span>
        </Fragment>
      ))}
    </Tag>
  );
}
