// "Features" section of the home page (Framer section framer-17b3rqp, id "features"): heading + badge +
// subheading, then the bento grid of six cards inside the grey "Body" panel.
//
// Animations (page module YBCchfXrqN): the heading is the word appear effect `ql` (threshold .5), the
// subheading a scroll appear (Jl -> rest, spring 500/100 delay .4, threshold .5) and the six cards a
// scroll appear (Xl -> rest) triggered by the section itself (see features/Reveal.tsx), with delays
// .1 / .2 / .5 / .4 / .4 / .3. The "ANIMATED" pictograms are animated GIFs.
import Badge from "@/components/ui/Badge";
import { Appear, WordsAppear } from "./Appear";
import { ENTER_TILT_0, spring } from "./fx";
import { RevealCard, RevealSection } from "./features/Reveal";
import { OG_MARK, TOOL_LOGO_ROWS } from "./features/logos";
import shared from "./shared.module.css";
import s from "./Features.module.css";

const BLACK = "var(--token-442a8080-47a9-427e-9581-c23ce6c42231, rgb(0, 0, 0))";
const MUTED = "var(--token-ead00dcb-2b22-4edd-af15-9859b50e46de, rgba(0, 0, 0, 0.64))";
const SOFT = "var(--token-307e8a82-e5c7-4509-9db0-a64d9f69c46e, rgba(0, 0, 0, 0.48))";

/** Framer image fill: a sized box with the <img> covering it (fit "fill" -> object-fit: cover). */
function Pic({ className, file, w, h }: { className: string; file: string; w: number; h: number }) {
  return (
    <div className={className}>
      <img className={s.fill} src={`/framer/${file}`} alt="" width={w} height={h} loading="lazy" decoding="async" />
    </div>
  );
}

function TitleDesc({ title, desc, phoneTitle20 }: { title: string; desc: string; phoneTitle20?: boolean }) {
  return (
    <div className={s.td} data-framer-name="Title & Description">
      <p className={`p-147zm1r ${s.text}${phoneTitle20 ? ` ${s.hideP}` : ""}`} style={{ color: BLACK }}>
        {title}
      </p>
      {phoneTitle20 && (
        <p className={`p-10w9eo3 ${s.text} ${s.hideD} ${s.hideT}`} style={{ color: BLACK }}>
          {title}
        </p>
      )}
      <p className={`p-knz921 ${s.text}`} style={{ color: MUTED }}>
        {desc}
      </p>
    </div>
  );
}

export default function Features() {
  return (
    <RevealSection className={s.section} data-section="Features" id="features">
      <div className={s.container} data-framer-name="Container">
        <div className={s.headingWrapper} data-framer-name="Heading Wrapper">
          <div className={s.heading} data-framer-name="Heading">
            <div className={`${s.badgeWrap} ${s.hideD}`} data-framer-name="Badge">
              <Badge title="Features" />
            </div>
            <WordsAppear
              as="h2"
              className={`p-1o4nxrd ${s.text} ${s.balance}`}
              style={{ color: MUTED }}
              runs={[{ text: "Three pillars of digital transformation", style: { color: BLACK } }]}
              amount={0.5}
            />
          </div>
          <Appear
            from={ENTER_TILT_0}
            transition={spring(0.4)}
            amount={0.5}
            className={s.subheading}
            data-framer-name="Subheading"
          >
            <div className={`${s.badgeWrap} ${s.hideT} ${s.hideP}`} data-framer-name="Badge">
              <Badge title="Features" />
            </div>
            <p className={`p-knz921 ${s.text}`} style={{ color: MUTED }}>
              From CRM implementation to AI-powered automation, OG Labs delivers end-to-end transformation tailored to
              your industry, processes, and growth goals.
            </p>
          </Appear>
        </div>

        <div className={`${s.body} ${shared.border}`} data-framer-name="Body">
          <div className={s.row} data-framer-name="Top">
            <RevealCard delay={0.1} className={`${s.card} ${s.cardSplit} ${shared.border}`} data-framer-name="Worklow Automation">
              <div className={`${s.graphics} ${s.scalePhone}`} data-framer-name="Graphics">
                <Pic className={s.pic222} file="IcWDzL5vTtFgzh2LxirBQB2saw.gif" w={500} h={500} />
                <Pic className={`${s.pic222} ${s.hideP}`} file="z1LofTcDDAEgenDZzkI0S9KoUHA.svg" w={2000} h={2000} />
              </div>
              <TitleDesc
                title="AI-powered automation"
                desc="Eliminate manual tasks with agentic AI workflows built on Make, n8n, and cutting-edge automation tools."
                phoneTitle20
              />
            </RevealCard>
            <RevealCard delay={0.2} className={`${s.card} ${s.cardCenter} ${shared.border}`} data-framer-name="Speak your workflow">
              <Pic className={s.hubspotImg} file="BI8ccv7iQ5ipLPwSpRywPGga4.png" w={1920} h={1080} />
              <TitleDesc
                title="HubSpot expertise"
                desc="Complete HubSpot deployment from CRM setup to marketing automation, configured around your business processes."
              />
            </RevealCard>
          </div>

          <div className={s.row} data-framer-name="Bottom">
            <RevealCard delay={0.5} className={`${s.card} ${s.cardSplit} ${shared.border}`} data-framer-name="Live Workflow Status">
              <div className={s.cuGraphics} data-framer-name="Graphics">
                <Pic className={s.cuImg} file="6SKfphPQ9oY7qVlom6JEDEH8WU0.png" w={2050} h={1200} />
              </div>
              <TitleDesc
                title="ClickUp implementation"
                desc="Streamline work management with expertly configured ClickUp workspaces that scale with your team's growth."
              />
            </RevealCard>

            <div className={s.toolsSlogan} data-framer-name="Tools & Slogan">
              <RevealCard delay={0.4} className={`${s.tools} ${shared.border}`} data-framer-name="Tools">
                <p className={`p-10w9eo3 ${s.text} ${s.toolsTitle}`}>
                  <span style={{ color: SOFT }}>Built for the tools APAC teams trust</span>
                </p>
                <div className={s.logos} data-framer-name="Logos">
                  {TOOL_LOGO_ROWS.map((row, i) => (
                    <div key={i} className={s.logoRow} data-framer-name={String(i + 1)}>
                      {row.map((src, j) => (
                        <div key={j} className={`${s.icon} ${shared.border}`} data-framer-name="Icon">
                          <img className={s.iconImg} src={src} alt="" />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </RevealCard>
              <RevealCard delay={0.4} className={`${s.slogan} ${shared.border}`} data-framer-name="Slogan">
                <div className={s.sloganContent} data-framer-name="Content">
                  <div className={s.logoBox} data-framer-name="Logo">
                    <div className={s.mark} aria-hidden style={{ backgroundImage: OG_MARK }} />
                  </div>
                  <p className={`p-10w9eo3 ${s.text} ${s.sloganText}`} style={{ color: SOFT }}>
                    Tailored for fast-growing APAC SMBs
                  </p>
                </div>
              </RevealCard>
            </div>

            <RevealCard delay={0.3} className={`${s.card} ${s.cardSplit} ${shared.border}`} data-framer-name="Team Collaboration">
              <div className={`${s.teamGraphics} ${s.scalePhone}`} data-framer-name="Graphics">
                <Pic className={`${s.pic164} ${s.solutions}`} file="zRYlN2dTUokVz5BbmEy2lfWCH0s.gif" w={500} h={500} />
                <Pic className={`${s.pic164} ${s.hideP}`} file="NgKPFuhhin1BGLN4ci2XRjFcK4A.svg" w={2000} h={2000} />
              </div>
              <TitleDesc
                title="Industry expertise"
                desc="Deep knowledge of construction, manufacturing, and financial services. Specialised solutions for your sector."
              />
            </RevealCard>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
