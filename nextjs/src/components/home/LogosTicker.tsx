"use client";
// "Elements/Logos Ticker": Framer's ticker effect. It only starts moving once it is on screen (as on
// the live site, where the row sits still at its start position until scrolled into view).
import { useEffect, useRef, useState } from "react";
import s from "./LogosTicker.module.css";

export type Logo = { name: string; file: string };

export default function LogosTicker({ logos }: { logos: Logo[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setRunning(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const row = (copy: number) =>
    logos.map((l, i) => (
      <li key={copy + "-" + i} className={s.item} data-framer-name={l.name} aria-hidden={copy === 0 ? true : undefined}>
        <img src={`/framer/${l.file}`} alt="" loading="lazy" decoding="async" />
      </li>
    ));

  return (
    <div ref={ref} className={s.ticker} data-framer-name="Logos">
      <ul className={`${s.track} ${running ? s.running : ""}`}>
        {row(0)}
        {row(1)}
      </ul>
    </div>
  );
}
