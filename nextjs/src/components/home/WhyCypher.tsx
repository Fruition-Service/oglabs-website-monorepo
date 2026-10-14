// "Why Cypher" section of the home page (framer-laba7a; the layer name is Framer's, kept as is):
// orange band with the heading, the subheading, six "Stats Card" tiles, the CTA and the faint
// "Large Logo" drawing behind everything.
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { Appear, WordsAppear } from "./Appear";
import { ENTER_TILT_0, spring } from "./fx";
import StatsCard, { type LogoAt } from "./why/StatsCard";
import { LARGE_LOGO_PATHS } from "./why/assets";
import s from "./WhyCypher.module.css";

const NONE: LogoAt = { desktop: false, tablet: false, phone: false };

// Container classes keep Framer's grid slots (order / height / place-self differ per slot).
const CARDS: { slot: string; number: string; description: string; logo: LogoAt }[] = [
  { slot: s.c1, number: "33%", description: "more qualified leads through HubSpot automation", logo: { ...NONE, tablet: true } },
  { slot: s.c2, number: "42%", description: "higher sales productivity across connected workflows", logo: NONE },
  { slot: s.c3, number: "200K+", description: "businesses grow with HubSpot and ClickUp", logo: { desktop: true, tablet: false, phone: true } },
  { slot: s.c4, number: "1,500+", description: "integrations connect your sales and operations stack", logo: { ...NONE, tablet: true } },
];
const CARDS_AFTER_CTA = [
  { slot: s.c5, number: "89%", description: "of teams see faster, more productive workflows", logo: NONE },
  { slot: s.c6, number: "1 Day", description: "saved every week through automated handoffs and updates", logo: NONE },
];

export default function WhyCypher() {
  return (
    <section className={s.section} data-section="Why Cypher" data-framer-name="Why Cypher">
      <div className={s.outer} data-framer-name="Container">
        <div className={s.band} data-framer-name="Why Cypher">
          <div className={s.container} data-framer-name="Container">
            <div className={s.headingWrapper} data-framer-name="Heading Wrapper">
              <div className={s.heading} data-framer-name="Heading">
                {/* phone only (framer-qgg63v-container hidden-72rtr7 hidden-jju2c5) */}
                <div className={`${s.slot} ${s.phoneOnly}`} data-framer-name="Badge">
                  <Badge
                    title="Why Cypher"
                    textColor="var(--token-a9ada049-76e9-4f1f-8c74-adc974e9300d, rgb(255, 255, 255))"
                    dotColor="var(--token-a9ada049-76e9-4f1f-8c74-adc974e9300d, rgb(255, 255, 255))"
                    bgColor="var(--token-132113d5-4de1-41ea-852e-028afb10ed22, rgba(255, 255, 255, 0.16))"
                  />
                </div>
                <div className={s.text}>
                  {/* text effect ql: appear by word in view (threshold .5), stagger .075, spring 400/50 */}
                  <WordsAppear as="h2" className={`p-1o4nxrd ${s.h2}`} text="We power digital transformation beyond implementation" />
                </div>
              </div>
              {/* scroll appear: Jl -> rest, spring 500/100 delay .4, threshold .5, once */}
              <Appear from={ENTER_TILT_0} transition={spring(0.4)} className={s.subheading} data-framer-name="Subheading">
                {/* hidden on phone (framer-mmjz5t-container hidden-1ks3cou) */}
                <div className={`${s.slot} ${s.notPhone}`} data-framer-name="Badge">
                  <Badge title="Why OG Labs" textColor="rgb(255, 102, 0)" dotColor="rgb(255, 102, 0)" bgColor="rgb(255, 255, 255)" />
                </div>
                <div className={s.text}>
                  <p className={`p-knz921 ${s.white}`}>
                    From CRM to operations to finance, OG Labs helps APAC SMBs automate work without adding complexity or
                    technical overhead.
                  </p>
                </div>
              </Appear>
            </div>
            <div className={s.numbers} data-framer-name="Numbers">
              {CARDS.map((c) => (
                <div key={c.number} className={`${s.cardSlot} ${c.slot}`}>
                  <StatsCard number={c.number} description={c.description} logo={c.logo} />
                </div>
              ))}
              <div className={s.cta} data-framer-name="CTA">
                <div className={s.ctaText}>
                  <p className={`p-mzxkxl ${s.white}`}>See how your team can achieve the same results with OG Labs.</p>
                </div>
                <div className={s.ctaButton}>
                  <Button
                    variant={{ desktop: "Dark", tablet: "Dark Mobile", phone: "Dark Mobile" }}
                    text="Book a consultation"
                    href="https://meetings-ap1.hubspot.com/thana"
                  />
                </div>
              </div>
              {CARDS_AFTER_CTA.map((c) => (
                <div key={c.number} className={`${s.cardSlot} ${c.slot}`}>
                  <StatsCard number={c.number} description={c.description} logo={c.logo} />
                </div>
              ))}
            </div>
          </div>
          <div className={s.largeLogo} data-framer-name="Large Logo" aria-hidden="true">
            <svg className={s.largeLogoSvg} viewBox="0 0 1018.817 999.608" overflow="visible" role="presentation">
              <g>
                {LARGE_LOGO_PATHS.map((d, i) => (
                  <path key={i} d={d} fill="var(--token-73e3c44c-3e91-488d-b470-4878f28aee46, rgba(255, 255, 255, 0.08))" />
                ))}
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
