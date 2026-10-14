"use client";

// "Navigation/Menu Button" (script_main.js): a 76px orange pill. "Menu" rolls up and "Close" rolls
// in when open (Framer layout animation, spring bounce 0.2 / 0.4s, an 18px shift). The label box
// is as wide as the visible word (4ch / 5ch in IBM Plex Mono), so the text re-centres as it rolls.
import { motion } from "motion/react";
import s from "./MenuButton.module.css";

const SPRING = { type: "spring", bounce: 0.2, duration: 0.4 } as const;

export default function MenuButton({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <div
      className={s.btn}
      role="button"
      tabIndex={0}
      aria-expanded={open}
      aria-label={open ? "Close menu" : "Open menu"}
      data-framer-name={open ? "Open" : "Closed"}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <motion.div className={s.label} initial={false} animate={{ width: open ? "5ch" : "4ch" }} transition={SPRING}>
        <motion.p className={`p-foxgst ${s.t1}`} initial={false} animate={{ y: open ? -18 : 0 }} transition={SPRING}>
          Menu
        </motion.p>
        <motion.p className={`p-foxgst ${s.t2}`} initial={false} animate={{ y: open ? -18 : 0 }} transition={SPRING}>
          Close
        </motion.p>
      </motion.div>
    </div>
  );
}
