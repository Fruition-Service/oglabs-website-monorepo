"use client";

// Framer scroll "appear" effects used in the footer (threshold 0.5).
//  - "rise": opacity 0, y 48 -> in place, spring stiffness 500 / damping 100, once.
//  - "tilt": the CTA tiles. Framer adds the enter rotate (+-30) to the tile's resting tilt (+-7), so
//    they start at scale 0.5 / rotate +-23 and settle at scale 1 / rotate +-7, tween 0.3s delay 0.1
//    ease [0.7, 0, 0.3, 1]. animateOnce is off: leaving the viewport keeps the settled state, and
//    each re-entry snaps back to the start and plays again (measured on the live site).
import { motion, useAnimate } from "motion/react";
import { useRef, type CSSProperties, type ReactNode } from "react";

const RISE = { type: "spring", stiffness: 500, damping: 100, mass: 1 } as const;
const TILT = { type: "tween", delay: 0.1, duration: 0.3, ease: [0.7, 0, 0.3, 1] } as const;

type Props = { className?: string; style?: CSSProperties; children?: ReactNode; "data-framer-name"?: string };

export function Rise({ className, style, children, ...rest }: Props) {
  return (
    <motion.div
      className={className}
      style={{ willChange: "transform", ...style }}
      data-framer-name={rest["data-framer-name"]}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={RISE}
    >
      {children}
    </motion.div>
  );
}

export function Tilt({ className, style, children, from, to, ...rest }: Props & { from: number; to: number }) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const played = useRef(false);
  const start = { scale: 0.5, rotate: to + from };
  return (
    <motion.div
      ref={scope}
      className={className}
      style={style}
      data-framer-name={rest["data-framer-name"]}
      initial={start}
      viewport={{ amount: 0.5 }}
      onViewportEnter={() => {
        if (!scope.current) return;
        // A replay starts from the start pose (explicit first keyframes), held through the delay.
        const target = played.current ? { scale: [start.scale, 1], rotate: [start.rotate, to] } : { scale: 1, rotate: to };
        played.current = true;
        animate(scope.current, target, TILT);
      }}
    >
      {children}
    </motion.div>
  );
}
