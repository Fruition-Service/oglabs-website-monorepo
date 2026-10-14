"use client";
// The comparison table's "Container" (framer-rlq93a) appears when its *scroll section* comes into view,
// not when the container itself does: Framer passes the Comparison section ref as
// `__framer__targets: [{ ref: scrollSection, target: "animate" }]`, threshold .5, once.
// Start state `_s` = opacity 0 (no offset), transition `vs` = spring 500/100, delay .5.
import { motion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

export default function SectionReveal({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const target = ref.current?.closest("section");
    if (!target) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(target);
    return () => io.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      className={className}
      data-framer-name="Container"
      initial={{ opacity: 0 }}
      animate={shown ? { opacity: 1 } : { opacity: 0 }}
      transition={{ type: "spring", stiffness: 500, damping: 100, mass: 1, delay: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
