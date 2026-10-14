"use client";

// The values list on /about. Each value sits under a 1px marker; Framer's scroll variant switches a
// value to "Active" once its marker passes the middle of the viewport (threshold 0.5, offset 1px:
// active while scrollY >= markerTop - 1 - innerHeight / 2) and back to "Inactive" above it.
import { useEffect, useRef, useState } from "react";
import Txt from "./Txt";
import a from "./About.module.css";
import s from "./ValuesList.module.css";

export type Value = { number: string; title: string; body: string; border: boolean };

export default function ValuesList({ values }: { values: Value[] }) {
  const markers = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState<boolean[]>(() => values.map(() => false));

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const next = markers.current.map((m) => (m ? y >= m.getBoundingClientRect().top + y - 1 - window.innerHeight * 0.5 : false));
      setActive((prev) => (prev.length === next.length && prev.every((v, i) => v === next[i]) ? prev : next));
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className={a.list} data-framer-name="List">
      {values.map((v, i) => (
        <ValueRow key={v.number} value={v} active={active[i]} markerRef={(el) => (markers.current[i] = el)} index={i} />
      ))}
    </div>
  );
}

function ValueRow({ value, active, markerRef, index }: { value: Value; active: boolean; markerRef: (el: HTMLDivElement | null) => void; index: number }) {
  return (
    <>
      <div className={a.marker} data-framer-name={`Value ${index + 1}`} ref={markerRef} />
      <div className={a.fullWidth} data-framer-name={`Value ${index + 1}`}>
        <div className={`${s.item}${active ? ` ${s.active}` : ""}`} data-framer-name={active ? "Active" : "Inactive"}>
          <div className={s.titleRow} data-framer-name="Title">
            <div className={`${s.num} ${a.rt}`}>
              <p>{value.number}</p>
            </div>
            <div className={`${s.title} ${a.rt}`}>
              <p>{value.title}</p>
            </div>
          </div>
          <Txt className={s.desc} preset="p-mzxkxl">
            {value.body}
          </Txt>
          {value.border ? <div className={s.divider} data-framer-name="Divider" /> : null}
        </div>
      </div>
    </>
  );
}
