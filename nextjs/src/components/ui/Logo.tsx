// "Elements/Logo" (Framer module xtMmwEE4u): the OG Labs wordmark, 88x24, linking home. "Dark" is
// black artwork (navigation), "Light" white (footer). `padding` is Framer's Padding control.
import Link from "next/link";
import { LOGO_SVG } from "./logoSvg";
import s from "./Logo.module.css";

export type LogoProps = {
  variant?: "Dark" | "Light";
  padding?: string;
  href?: string;
  className?: string;
  onClick?: () => void;
};

export default function Logo({ variant = "Light", padding = "0px", href = "/", className, onClick }: LogoProps) {
  return (
    <Link
      href={href}
      aria-label="OG Labs"
      className={className ? `${s.logo} ${className}` : s.logo}
      data-framer-name={variant}
      style={{ padding }}
      onClick={onClick}
    >
      <div className={s.art} aria-hidden style={{ backgroundImage: `url('${LOGO_SVG[variant]}')` }} />
    </Link>
  );
}
