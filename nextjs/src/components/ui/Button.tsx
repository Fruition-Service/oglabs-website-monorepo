// "Buttons/Primary" (Framer module N2rUJJski). STUB: the shell builder replaces the visuals; the
// props below are the contract every page uses, so keep them stable.
//
// Framer swaps a button's variant per breakpoint (e.g. "Base" on desktop, "Base Mobile" on phone).
// Pass one variant, or an object with the desktop variant plus optional tablet/phone overrides.
import Link from "next/link";

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
  className?: string;
  /** Renders a <button> instead of a link (forms). */
  type?: "button" | "submit";
  onClick?: () => void;
};

export default function Button({ text, href, newTab, className, type, onClick }: ButtonProps) {
  if (!href || type) {
    return (
      <button type={type ?? "button"} onClick={onClick} className={className}>
        {text}
      </button>
    );
  }
  return (
    <Link href={href} className={className} target={newTab ? "_blank" : undefined} rel={newTab ? "noopener" : undefined}>
      {text}
    </Link>
  );
}
