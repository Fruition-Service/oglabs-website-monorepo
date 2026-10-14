"use client";

// "Navigation/Navigation" (script_main.js). Fixed over the top of every page (z-index 10).
// Desktop: logo | dashed divider | About, Services, Industries, Regions (hover menus), Blogs, and the
// Contact / Book a consultation buttons. Tablet + phone: logo and a "Menu" pill; the menu panel
// slides down from above while the bar grows (Framer layout animation, tween 0.6s
// ease [0.77, 0, 0.175, 1]). Choosing a panel link or the logo closes it. Page scroll stays enabled.
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";
import NavLink from "./nav/NavLink";
import NavDropdown, { type DropdownItem } from "./nav/NavDropdown";
import MenuButton from "./nav/MenuButton";
import s from "./Navigation.module.css";

const SERVICES: DropdownItem[] = [
  { text: "HubSpot", href: "/services/hubspot" },
  { text: "ClickUp", href: "/services/clickup" },
  { text: "AI Automation", href: "/services/ai-automation" },
  { text: "AI Workflows", href: "/services/ai-workflows" },
  { text: "Work Management", href: "/services/work-management" },
  { text: "CRM Consultation", href: "/services/crm-consultation" },
  { text: "Advanced Integrations", href: "/services/advanced-integrations" },
  { text: "Process Optimisation", href: "/services/process-optimisation" },
];
const INDUSTRIES: DropdownItem[] = [
  { text: "Construction", href: "/industries/construction" },
  { text: "Manufacturing", href: "/industries/manufacturing" },
  { text: "Financial Services", href: "/industries/financial-services" },
];
const REGIONS: DropdownItem[] = [
  { text: "Australia", href: "/au" },
  { text: "New Zealand", href: "/nz" },
  { text: "Singapore", href: "/sg" },
];
// The tablet / phone panel keeps the Framer template's links as published.
const PANEL_LINKS = [
  { text: "About", href: "/about" },
  { text: "Features", href: "/#features" },
  { text: "Pricing", href: "/#pricing" },
  { text: "Newsroom", href: "/#blog" },
];
const BOOKING_URL = "https://meetings-ap1.hubspot.com/thana";

const BORDER = `${s.bordered} ${s.pillBorder}`;

// The appear animation plays once per page load (Framer keeps the nav in a persistent layout).
let appeared = false;

export default function Navigation() {
  const [animateIn] = useState(() => !appeared);
  const [open, setOpen] = useState(false);
  const mobileNav = useRef<HTMLElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  useEffect(() => {
    appeared = true;
  }, []);

  // Grow / shrink the bar's clip box in step with the panel (explicit heights so it can transition).
  useLayoutEffect(() => {
    const nav = mobileNav.current;
    if (first.current) {
      first.current = false;
      return;
    }
    if (!nav || !bar.current || !panel.current) return;
    const barH = bar.current.getBoundingClientRect().height;
    const panelH = panel.current.getBoundingClientRect().height;
    nav.style.setProperty("--bar-h", `${barH}px`);
    const from = nav.getBoundingClientRect().height;
    nav.style.height = `${from}px`;
    void nav.offsetHeight; // commit the start height before transitioning
    nav.style.height = `${open ? barH + 12 + panelH : barH}px`;
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className={`${s.wrap}${animateIn ? ` ${s.appear}` : ""}`} data-section="Navigation" data-framer-name="Navigation">
      {/* Desktop (>= 1200px) */}
      <nav className={s.desktop} data-framer-name="Desktop">
        <div className={s.container} data-framer-name="Container">
          <div className={`${s.links} ${BORDER}`} data-framer-name="Links">
            <div className={s.logoBox} data-framer-name="Logo">
              <Logo variant="Dark" padding="0px 16px" />
            </div>
            <div className={`${s.divider} ${s.bordered}`} data-framer-name="Divider" />
            <div className={s.linkRow} data-framer-name="Links">
              <div className={s.btnBox} data-framer-name="About">
                <NavLink text="About" href="/about" />
              </div>
              <NavDropdown text="Services" items={SERVICES} offsetX={64.59367302647297} offsetY={9.798612158905598} />
              <NavDropdown text="Industries" items={INDUSTRIES} offsetX={43.47048428171183} offsetY={9.798618657263432} />
              <NavDropdown text="Regions" items={REGIONS} offsetX={22.46878071249739} offsetY={9.798618657263432} />
              <div className={s.btnBox} data-framer-name="Newsroom">
                <NavLink text="Blogs" href="/blogs" />
              </div>
            </div>
          </div>
          <div className={`${s.buttons} ${BORDER}`} data-framer-name="Buttons">
            <div className={s.btnBox} data-framer-name="Button">
              <Button variant="Transparent Small" text="Contact" href="/contact" />
            </div>
            <div className={s.btnBox} data-framer-name="Button">
              <Button variant="Base Small" text="Book a consultation" href={BOOKING_URL} />
            </div>
          </div>
        </div>
      </nav>

      {/* Tablet / phone (< 1200px) */}
      <nav ref={mobileNav} className={s.mobile} data-framer-name={open ? "Tablet / Mobile - Opened" : "Tablet / Mobile"}>
        <div ref={bar} className={s.container} data-framer-name="Container">
          <div className={`${s.links} ${BORDER}`} data-framer-name="Links">
            <div className={s.logoBox} data-framer-name="Logo">
              <Logo variant="Dark" padding="0px 16px" onClick={open ? close : undefined} />
            </div>
          </div>
          <div className={`${s.buttons} ${BORDER}`} data-framer-name="Buttons">
            <div className={s.btnBox} data-framer-name="Menu Button">
              <MenuButton open={open} onClick={() => setOpen((o) => !o)} />
            </div>
          </div>
        </div>
        <div ref={panel} className={`${s.panel} ${BORDER}${open ? ` ${s.panelOpen}` : ""}`} data-framer-name="Tablet / Mobile Links" aria-hidden={!open}>
          <div className={s.panelLinks} data-framer-name="Links">
            {PANEL_LINKS.map((l) => (
              <div key={l.text} className={s.btnBox} data-framer-name={l.text}>
                <NavLink text={l.text} href={l.href} variant="Mobile" onClick={close} />
              </div>
            ))}
          </div>
          <div className={s.panelButtons} data-framer-name="Buttons">
            <div className={s.fullBtn} data-framer-name="Button">
              <Button variant={open ? "Transparent Mobile" : "Transparent"} text="Contact" href="/contact" />
            </div>
            <div className={s.fullBtn} data-framer-name="Button">
              <Button variant="Base Mobile" text="Book a demo" href="/" />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
