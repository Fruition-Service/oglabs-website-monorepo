"use client";

import { motion } from "motion/react";
import { steps } from "motion";

// "Grain — Texture BG": the noise tile Framer lays over every page, jittered in 10 steps every 8s.
// Ported from script_main.js (function pn). The container is 15% opaque and the tile is 15% again.
const X = ["0%", "-5%", "-15%", "7%", "-5%", "-15%", "15%", "0%", "3%", "-10%"];
const Y = ["0%", "-10%", "5%", "-25%", "25%", "10%", "0%", "15%", "35%", "10%"];

export default function Grain() {
  return (
    <div
      aria-hidden
      data-section="Grain — Texture BG"
      style={{ position: "absolute", inset: 0, zIndex: 1, opacity: 0.15, pointerEvents: "none", order: 1003 }}
    >
      <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
        <motion.div
          style={{
            background: "url('/framer/rR6HYXBrMmX4cRpXfXUOvpvpB0.png')",
            opacity: 0.15,
            inset: "-200%",
            width: "400%",
            height: "400%",
            position: "absolute",
          }}
          animate={{ x: X, y: Y }}
          transition={{ ease: steps(10, "start"), repeat: Infinity, duration: 8 }}
        />
      </div>
    </div>
  );
}
