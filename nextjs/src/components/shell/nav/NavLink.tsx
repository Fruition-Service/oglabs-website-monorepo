"use client";

// "Navigation/Link" (script_main.js, displayName "Navigation/Link"). `href` omitted renders the
// dropdown anchors (Services / Industries / Regions), which Framer renders as an <a> without href.
import Link from "next/link";
import type { MouseEventHandler, Ref } from "react";
import s from "./NavLink.module.css";

export type NavLinkProps = {
  text: string;
  href?: string;
  variant?: "Desktop" | "Mobile";
  /** Keeps the hover BG shown (dropdown anchor while its menu is open is NOT this; Framer drops it). */
  hover?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  onMouseEnter?: MouseEventHandler<HTMLAnchorElement>;
  onMouseLeave?: MouseEventHandler<HTMLAnchorElement>;
  ref?: Ref<HTMLAnchorElement>;
};

export default function NavLink({ text, href, variant = "Desktop", hover, onClick, onMouseEnter, onMouseLeave, ref }: NavLinkProps) {
  const mobile = variant === "Mobile";
  const inner = (
    <>
      {!mobile && <div className={s.bg} data-framer-name="BG" />}
      <p className={`${mobile ? "p-90gabw" : "p-cguwu"} ${s.text}`}>{text}</p>
    </>
  );
  const cls = mobile ? `${s.link} ${s.mobile}` : s.link;
  const common = {
    className: cls,
    "data-framer-name": variant,
    "data-hover": hover ? "true" : undefined,
    onClick,
    onMouseEnter,
    onMouseLeave,
    ref,
  };
  if (!href) {
    return (
      <a tabIndex={0} {...common}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} {...common}>
      {inner}
    </Link>
  );
}
