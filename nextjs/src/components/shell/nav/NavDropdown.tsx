"use client";

// A desktop nav anchor with its hover overlay (Framer "Overlay": placement bottom, alignment center,
// offsetX/offsetY from the Framer source, safe area on, zIndex 11). The menu is a white 24px-radius
// card with a soft shadow that fades in with a spring (bounce 0.2, 0.4s), transform origin top.
// It closes when the pointer leaves both the anchor and the card; a transparent bridge covers the
// gap between them (Framer's "safe area").
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import NavLink from "./NavLink";
import s from "./NavDropdown.module.css";

export type DropdownItem = { text: string; href: string };

const SPRING = { type: "spring", bounce: 0.2, duration: 0.4 } as const;
const COLLISION_PADDING = 20;
const noop = () => () => {};
/** false during SSR and hydration, true afterwards (portals need document.body). */
const useMounted = () => useSyncExternalStore(noop, () => true, () => false);

export default function NavDropdown({ text, items, offsetX, offsetY }: { text: string; items: DropdownItem[]; offsetX: number; offsetY: number }) {
  const anchor = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ left: number; top: number; anchorLeft: number; anchorWidth: number; anchorBottom: number } | null>(null);
  const closeTimer = useRef<number | null>(null);
  const mounted = useMounted();

  const cancelClose = () => {
    if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpen(false), 0);
  };

  const place = useCallback(() => {
    const a = anchor.current;
    if (!a) return;
    const r = a.getBoundingClientRect();
    const w = card.current?.offsetWidth ?? 0;
    let left = r.left + r.width / 2 + offsetX - w / 2;
    if (w) left = Math.max(COLLISION_PADDING, Math.min(left, window.innerWidth - COLLISION_PADDING - w));
    setPos({ left, top: r.bottom + offsetY, anchorLeft: r.left, anchorWidth: r.width, anchorBottom: r.bottom });
  }, [offsetX, offsetY]);

  // Measure once the card exists (its width centres it), then keep it pinned on resize.
  useLayoutEffect(() => {
    if (open) place();
  }, [open, place]);
  useEffect(() => {
    if (!open) return;
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [open, place]);
  useEffect(() => () => cancelClose(), []);

  return (
    <div className={s.anchor} ref={anchor} data-framer-name="Industries">
      <NavLink
        text={text}
        onMouseEnter={() => {
          cancelClose();
          setOpen(true);
        }}
        onMouseLeave={scheduleClose}
      />
      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <div key="dropdown" className={s.layer} onMouseEnter={cancelClose} onMouseLeave={scheduleClose}>
                {pos && (
                  <div
                    className={s.bridge}
                    style={{ left: pos.anchorLeft, top: pos.anchorBottom, width: pos.anchorWidth, height: Math.max(0, pos.top - pos.anchorBottom) }}
                  />
                )}
                <motion.div
                  ref={card}
                  role="dialog"
                  className={s.card}
                  style={{ left: pos?.left ?? -9999, top: pos?.top ?? 0, transformOrigin: "50% 0%" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: SPRING }}
                  exit={{ opacity: 0, transition: SPRING }}
                >
                  <div className={s.list}>
                    {items.map((it) => (
                      <NavLink key={it.href} text={it.text} href={it.href} onClick={() => setOpen(false)} />
                    ))}
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}
