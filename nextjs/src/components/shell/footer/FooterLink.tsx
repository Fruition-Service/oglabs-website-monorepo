"use client";

// "Footer/Link" (script_main.js). Hover: "Line In" (label to 64% white, underline grows over the
// label), leave: "Line Out" (underline slides off to the right), then after 250ms it snaps back to
// rest. Line In / Out use a spring (stiffness 500, damping 60); the reset is instant. Framer animates
// the underline with a layout animation, so this uses motion's `layout` too.
// `phoneMobile`: Framer uses the hover-less "Mobile" variant for this link on phones.
import Link from "next/link";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import s from "./FooterLink.module.css";

const SPRING = { type: "spring", stiffness: 500, damping: 60, mass: 1 } as const;
const INSTANT = { duration: 0 } as const;
const WHITE = "rgb(255, 255, 255)";
const DIM = "rgba(255, 255, 255, 0.64)";

export type FooterLinkProps = { text: string; href: string; newTab?: boolean; phoneMobile?: boolean };

export default function FooterLink({ text, href, newTab, phoneMobile }: FooterLinkProps) {
  const [state, setState] = useState<"rest" | "in" | "out">("rest");
  const timer = useRef<number | null>(null);
  useEffect(() => () => {
    if (timer.current !== null) window.clearTimeout(timer.current);
  }, []);

  const hoverable = () => !(phoneMobile && window.matchMedia("(max-width: 809.98px)").matches);
  const enter = () => {
    if (!hoverable()) return;
    if (timer.current !== null) window.clearTimeout(timer.current);
    setState("in");
  };
  const leave = () => {
    if (state !== "in") return;
    setState("out");
    timer.current = window.setTimeout(() => setState("rest"), 250);
  };

  const t = state === "rest" ? INSTANT : SPRING;
  const cls = `${s.link}${state === "in" ? ` ${s.in}` : state === "out" ? ` ${s.out}` : ""}`;
  const external = /^https?:/.test(href);
  const inner = (
    <>
      <div className={s.text} data-framer-name="Text">
        <motion.p className={`p-knz921 ${s.label}`} initial={false} animate={{ color: state === "rest" ? WHITE : DIM }} transition={t}>
          {text}
        </motion.p>
      </div>
      <motion.div className={s.underline} data-framer-name="Underline" layout transition={t} />
    </>
  );
  const props = { className: cls, "data-framer-name": "Desktop", onMouseEnter: enter, onMouseLeave: leave };
  if (external) {
    return (
      <a href={href} target={newTab ? "_blank" : undefined} {...props}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} {...props}>
      {inner}
    </Link>
  );
}
