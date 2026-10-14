"use client";

// "Buttons/Primary" (Framer module N2rUJJski). The props below are the contract every page uses.
//
// Framer swaps a button's variant per breakpoint (e.g. "Base" on desktop, "Base Mobile" on phone).
// Pass one variant, or an object with the desktop variant plus optional tablet/phone overrides
// (tablet falls back to desktop, phone falls back to tablet).
//
// The element is the Framer `<a class="framer-3r3W1 framer-k5s7fk">`: a 100px pill, label in IBM
// Plex Mono (16px, "Small" variants 14px), the arrow icon, and the roll-up label on hover. Mobile
// variants have no hover. Wrap it yourself if the Framer markup has a sized `-container` div.
import Link from "next/link";
import type { MouseEvent } from "react";
import s from "./Button.module.css";

export type ButtonVariant =
  | "Base" | "Base Small" | "Light" | "Light Small" | "Dark" | "Dark Small" | "Transparent" | "Transparent Small"
  | "Base Mobile" | "Base Small Mobile" | "Light Mobile" | "Light Small Mobile" | "Dark Mobile" | "Dark Small Mobile"
  | "Transparent Mobile" | "Transparent Small Mobile";

export type ResponsiveVariant = ButtonVariant | { desktop: ButtonVariant; tablet?: ButtonVariant; phone?: ButtonVariant };

export type ButtonProps = {
  variant?: ResponsiveVariant;
  text: string;
  href?: string;
  newTab?: boolean;
  /** Framer's "Icon ON/OFF" (default on: the arrow). */
  icon?: boolean;
  /** Framer's "Icon" vector: "up-right" (default, set item h5I2ImRYH) or "right" ("Arrow Right MD"). */
  arrow?: "up-right" | "right";
  className?: string;
  /** Renders a <button> instead of a link (forms). */
  type?: "button" | "submit";
  onClick?: () => void;
};

type Axes = { kind: "base" | "light" | "dark" | "transparent"; size: "reg" | "small"; hover: "hover" | "nohover" };

function axes(v: ButtonVariant): Axes {
  const k = v.split(" ")[0].toLowerCase() as Axes["kind"];
  return { kind: k, size: v.includes("Small") ? "small" : "reg", hover: v.includes("Mobile") ? "nohover" : "hover" };
}

function variantClasses(variant: ResponsiveVariant): string {
  const r = typeof variant === "string" ? { desktop: variant } : variant;
  const d = r.desktop;
  const t = r.tablet ?? d;
  const p = r.phone ?? t;
  const out: string[] = [];
  for (const [prefix, v] of [["d", d], ["t", t], ["p", p]] as const) {
    if (prefix !== "d" && v === (prefix === "t" ? d : t)) continue; // inherits the wider breakpoint
    const a = axes(v);
    const up = a.size === "small" && (a.kind === "light" || a.kind === "transparent") ? "up20" : "up22";
    out.push(s[`${prefix}_${a.kind}`], s[`${prefix}_${a.size}`], s[`${prefix}_${up}`], s[`${prefix}_${a.hover}`]);
  }
  return out.join(" ");
}

/** The arrow icons, stroke 1.5 as the button sets it. "up-right" = svg template #2472121044;
 *  "right" = "Arrow Right MD" (#1369426539), used by the home "Why Cypher" CTA. */
const ARROWS = {
  "up-right": { d: "M 0 10 L 10 0 M 10 0 L 2 0 M 10 0 L 10 8", t: "translate(7 7)" },
  right: { d: "M 0 6 L 14 6 M 14 6 L 8 0 M 14 6 L 8 12", t: "translate(5 6)" },
} as const;

function Arrow({ kind }: { kind: keyof typeof ARROWS }) {
  const a = ARROWS[kind];
  return (
    <svg className={s.icon} role="presentation" viewBox="0 0 24 24" aria-hidden>
      <path d={a.d} fill="transparent" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} transform={a.t} />
    </svg>
  );
}

function toPath(href: string) {
  // Framer writes relative hrefs ("./contact", "../"); this site's routes are all absolute.
  if (/^(https?:|mailto:|tel:|#)/.test(href)) return href;
  return href.replace(/^(\.\.?\/)+/, "/").replace(/^([^/])/, "/$1");
}

export default function Button({ variant = "Base", text, href, newTab, icon = true, arrow = "up-right", className, type, onClick }: ButtonProps) {
  const name = typeof variant === "string" ? variant : variant.desktop;
  const cls = `${s.btn} ${variantClasses(variant)}${className ? ` ${className}` : ""}`;
  const children = (
    <>
      <span className={s.label} data-framer-name="Container">
        <span className={`${s.t1} ${s.reg16}`}>{text}</span>
        <span className={`${s.t2} ${s.reg16}`} aria-hidden>
          {text}
        </span>
      </span>
      {icon && <Arrow kind={arrow} />}
    </>
  );

  if (!href || type) {
    return (
      <button type={type ?? "button"} onClick={onClick} className={cls} data-framer-name={name}>
        {children}
      </button>
    );
  }

  const to = toPath(href);
  const hash = to.indexOf("#");
  // Framer links have smoothScroll on: an in-page anchor glides instead of jumping.
  const smooth = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.();
    if (hash < 0 || newTab) return;
    const path = to.slice(0, hash) || window.location.pathname;
    if (path !== window.location.pathname) return;
    const el = document.getElementById(decodeURIComponent(to.slice(hash + 1)));
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth" });
    history.replaceState(null, "", to);
  };

  if (/^(https?:|mailto:|tel:)/.test(to)) {
    return (
      <a href={to} className={cls} data-framer-name={name} target={newTab ? "_blank" : undefined} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <Link href={to} className={cls} data-framer-name={name} target={newTab ? "_blank" : undefined} onClick={smooth}>
      {children}
    </Link>
  );
}
