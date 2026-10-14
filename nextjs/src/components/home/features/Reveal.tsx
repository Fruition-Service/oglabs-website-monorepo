"use client";
// The Features bento cards use Framer's scroll appear with `__framer__targets: [{ ref: <section>,
// target: "animate" }]`: they are not observed themselves, the whole <section> is. Measured on the live
// site, all six cards start together when the section's top crosses the middle of the viewport (at every
// width, although the section is 1240-2442px tall), i.e. an IntersectionObserver on the section with a
// -50% bottom root margin. `RevealSection` renders the <section> and owns that observer; `RevealCard`
// animates from Framer's `Xl` start (opacity 0, y 24) with its own spring delay once it fires.
import { motion, useInView } from "motion/react";
import { createContext, useContext, useRef, type CSSProperties, type ReactNode } from "react";
import { ENTER_RISE, REST, spring } from "../fx";

const InView = createContext(false);

export function RevealSection({
  className,
  id,
  children,
  ...rest
}: { className?: string; id?: string; children: ReactNode } & Record<`data-${string}`, string>) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -50% 0px" });
  return (
    <section ref={ref} className={className} id={id} {...rest}>
      <InView.Provider value={inView}>{children}</InView.Provider>
    </section>
  );
}

export function RevealCard({
  delay,
  className,
  style,
  children,
  ...rest
}: { delay: number; className?: string; style?: CSSProperties; children: ReactNode } & Record<`data-${string}`, string>) {
  const inView = useContext(InView);
  return (
    <motion.div
      className={className}
      style={style}
      initial={ENTER_RISE}
      animate={inView ? { ...REST, transition: spring(delay) } : ENTER_RISE}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
