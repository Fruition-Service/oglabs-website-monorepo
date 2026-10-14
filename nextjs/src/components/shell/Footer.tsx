// "Footer/Footer" (script_main.js). `full` = the "Call to Actioon" band (Framer's layer name, typo
// included) above the black footer card; `compact` = the card only (blogs, blog posts, legal).
// Copy and link targets are exactly as published on Framer, including the template leftovers
// (Pricing / FAQ / Testimonials anchors) and the two black-on-black "Services" column titles.
import Link from "next/link";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";
import { Rise, Tilt } from "./footer/Appear";
import FooterLink, { type FooterLinkProps } from "./footer/FooterLink";
import NewsletterForm from "./footer/NewsletterForm";
import { CTA_LOGO_SVG } from "./footer/ctaLogoSvg";
import s from "./Footer.module.css";

type L = FooterLinkProps;

const COMPANY: L[] = [
  { text: "Home", href: "/", phoneMobile: true },
  { text: "About", href: "/about", phoneMobile: true },
  { text: "Blogs", href: "/blogs", phoneMobile: true },
  { text: "Contact", href: "/contact", phoneMobile: true },
  { text: "Careers", href: "/careers" },
];
const RESOURCES: L[] = [
  { text: "Pricing", href: "/#pricing", phoneMobile: true },
  { text: "FAQ", href: "/#faq", phoneMobile: true },
  { text: "Testimonials", href: "/#testimonials", phoneMobile: true },
  { text: "Case Studies", href: "/case-studies" },
  { text: "Partnerships", href: "/partnerships" },
];
const PARTNERS: L[] = [
  { text: "Australia", href: "/au" },
  { text: "New Zealand", href: "/nz" },
  { text: "Singapore", href: "/sg" },
];
const CONNECT: L[] = [
  { text: "LinkedIn", href: "https://www.linkedin.com/company/oglabs//", newTab: true, phoneMobile: true },
  { text: "YouTube", href: "https://www.youtube.com/", newTab: true, phoneMobile: true },
  { text: "Instagram", href: "https://www.instagram.com/", newTab: true, phoneMobile: true },
  { text: "X", href: "https://x.com", newTab: true, phoneMobile: true },
];
const INDUSTRIES: L[] = [
  { text: "Construction", href: "/industries/construction" },
  { text: "Manufacturing", href: "/industries/manufacturing" },
  { text: "Financial Services", href: "/industries/financial-services" },
];
const SERVICES_A: L[] = [
  { text: "HubSpot", href: "/services/hubspot" },
  { text: "ClickUp", href: "/services/clickup" },
  { text: "AI Workflows", href: "/services/ai-workflows" },
];
const SERVICES_B: L[] = [
  { text: "AI Automation", href: "/services/ai-automation" },
  { text: "Work Management", href: "/services/work-management" },
  { text: "Advanced Integrations", href: "/services/advanced-integrations" },
];

function List({ links, className }: { links: L[]; className?: string }) {
  return (
    <div className={className ? `${s.list} ${className}` : s.list} data-framer-name="List">
      {links.map((l) => (
        <div key={l.href + l.text} className={s.linkBox}>
          <FooterLink {...l} />
        </div>
      ))}
    </div>
  );
}

function Column({ name, title, links, dim = true, className, listClassName, hideTitleOnPhone, children }: {
  name: string;
  title: string;
  links?: L[];
  dim?: boolean;
  className?: string;
  listClassName?: string;
  hideTitleOnPhone?: boolean;
  children?: React.ReactNode;
}) {
  const titleCls = `p-foxgst ${dim ? s.colTitleDim : s.colTitle}${hideTitleOnPhone ? ` ${s.hideOnPhone}` : ""}`;
  return (
    <Rise className={className ? `${s.column} ${className}` : s.column} data-framer-name={name}>
      <p className={titleCls}>{title}</p>
      {children}
      {links && <List links={links} className={listClassName} />}
    </Rise>
  );
}

/** "Arrow Reload 02" (svg template #4234060121), white, stroke 2. */
function ReloadIcon() {
  return (
    <svg className={s.reloadIcon} role="presentation" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M 9.418 13 L 14.418 13 L 14.418 18 M 5.418 5 L 0.418 5 L 0.418 0 M 14.836 6.003 C 14.275 4.616 13.336 3.413 12.126 2.532 C 10.916 1.651 9.483 1.128 7.99 1.021 C 6.497 0.914 5.004 1.227 3.681 1.927 C 2.357 2.626 1.257 3.683 0.504 4.976 M 0 11.997 C 0.561 13.385 1.499 14.587 2.71 15.468 C 3.92 16.349 5.354 16.872 6.847 16.979 C 8.34 17.086 9.832 16.772 11.155 16.073 C 12.478 15.374 13.578 14.317 14.331 13.024"
        fill="transparent"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        stroke="var(--token-a9ada049-76e9-4f1f-8c74-adc974e9300d, rgb(255, 255, 255))"
        transform="translate(4.582 3)"
      />
    </svg>
  );
}

function CallToAction() {
  return (
    <div className={s.cta} data-framer-name="Call to Actioon">
      <div className={`${s.ctaDivider} ${s.bordered}`} data-framer-name="Divider" />
      <div className={s.headingWrap} data-framer-name="Heading Wrapper">
        <div className={s.heading} data-framer-name="Heading">
          <div className={s.row} data-framer-name="1">
            <h2 className={`p-1o4nxrd ${s.word}`}>Turn workflows</h2>
            <Tilt className={s.tileDark} data-framer-name="Icon" from={-30} to={7}>
              <ReloadIcon />
            </Tilt>
            <h2 className={`p-1o4nxrd ${s.word}`}>into</h2>
          </div>
          <div className={s.row} data-framer-name="2">
            <h2 className={`p-1o4nxrd ${s.word}`}>systems</h2>
            <Tilt className={s.tileOrange} data-framer-name="Logo" from={30} to={-7}>
              <div className={s.fruit} aria-hidden style={{ backgroundImage: `url('${CTA_LOGO_SVG}')` }} />
            </Tilt>
            <h2 className={`p-1o4nxrd ${s.word}`}>that scale</h2>
          </div>
        </div>
        <p className={`p-mzxkxl ${s.subtitle}`}>
          Let OG Labs handle the implementation so your team focuses on high-impact work that drives real growth.
        </p>
      </div>
      <div className={s.ctaButtons} data-framer-name="Buttons">
        <div className={s.ctaButtonBox} data-framer-name="Button">
          <Button variant="Base" text="Get started" href="/" />
        </div>
      </div>
    </div>
  );
}

export default function Footer({ variant }: { variant: "full" | "compact" }) {
  return (
    <div className={s.wrap} data-section="Footer" data-framer-name="Footer" data-variant={variant}>
      <footer className={s.footer} data-framer-name="Desktop">
        {variant === "full" && <CallToAction />}
        <div className={s.card} data-framer-name="Footer">
          <div className={s.top} data-framer-name="Top">
            <div className={s.newsletterCol} data-framer-name="Newsletter">
              <div className={s.brand}>
                <Rise className={s.logoBox} data-framer-name="Logo">
                  <Logo variant="Light" />
                </Rise>
                <div className={s.badges}>
                  <div className={s.badgeStretch} data-framer-name="SolutionPartnerTierBadges FINAL_PARTNER_CREAM">
                    <img className={s.badgeImg} src="/framer/Hqu2Crs7gBDkqVcH3tpg8OwLmqI.png" width={749} height={746} alt="" decoding="async" />
                  </div>
                  <div className={s.badge} data-framer-name="2026-ClickUp-Registered-Partner-Badge">
                    <img className={s.badgeImg} src="/framer/hN3Qznq4P93fFqkoAhoKum8nPg.png" width={1017} height={1015} alt="" decoding="async" />
                  </div>
                </div>
              </div>
              <Rise className={s.newsletter} data-framer-name="Newsletter">
                <div className={s.newsText} data-framer-name="Text">
                  <p className={`p-1wlfqiw ${s.newsTitle}`}>Stay in the loop.</p>
                  <p className={`p-y0gzpf ${s.newsDesc}`}>
                    Get insights on HubSpot, ClickUp, AI automation, and digital transformation across APAC, delivered occasionally, never spam.
                  </p>
                </div>
                <NewsletterForm />
              </Rise>
            </div>
            <div className={s.linksCol}>
              <div className={s.linksTop} data-framer-name="Links">
                <Column name="Column 1 — Company" title="Company" links={COMPANY} className={s.colFill} listClassName={s.listFill} />
                <Column name="Column 2 — Resources" title="Resources" links={RESOURCES} className={s.colFill} listClassName={s.listFill} />
                <Column name="Column 2 — Resources" title="Partners" links={PARTNERS} className={s.colStart} />
                <Column name="Column 3 — Connect" title="Connect" links={CONNECT} className={s.colFill} listClassName={s.listConnect} />
              </div>
              <div className={s.linksBottom} data-framer-name="Links">
                <Column name="Column 1 — Company" title="industries" links={INDUSTRIES} />
                <Column name="Column 1 — Company" title="Services" links={SERVICES_A} />
                <Column name="Column 1 — Company" title="Services" links={SERVICES_B} dim={false} hideTitleOnPhone />
                <Column name="Column 1 — Company" title="Services" dim={false} hideTitleOnPhone>
                  <div className={s.linkBox}>
                    <FooterLink text="CRM Consultation" href="/services/crm-consultation" />
                  </div>
                  <List links={[{ text: "Process Optimisation", href: "/services/process-optimisation" }]} />
                </Column>
              </div>
            </div>
          </div>
          <div className={`${s.cardDivider} ${s.bordered}`} data-framer-name="Divider" />
          <div className={s.bottom} data-framer-name="Bottom">
            <p className={`p-foxgst ${s.legalText}`}>
              <a className={s.legalLink} href="https://oglabs.io" target="_blank" rel="">
                © 2026 OG Labs. All rights reserved.
              </a>
            </p>
            <div className={s.legal} data-framer-name="Legal">
              <p className={`p-foxgst ${s.legalText}`}>
                <Link className={s.legalLink} href="/legal/terms-of-service">
                  Terms of Service
                </Link>
              </p>
              <p className={`p-foxgst ${s.legalText}`}>
                <Link className={s.legalLink} href="/legal/privacy-policy">
                  Privacy Policy
                </Link>
              </p>
              <p className={`p-foxgst ${s.legalText}`}>
                <Link className={s.legalLink} href="/legal/cookies-policy">
                  Cookies Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
