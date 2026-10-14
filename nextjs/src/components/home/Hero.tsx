// "Hero" section of the home page (framer-14uq94): the "Announcement" pill, the headline (word-by-word
// appear on load), the lead, two buttons and the OG Labs Solution Finder.
import Link from "next/link";
import Button from "@/components/ui/Button";
import { Appear, WordsAppear } from "./Appear";
import { ENTER_TILT, spring } from "./fx";
import SolutionFinder from "./finder/SolutionFinder";
import shared from "./shared.module.css";
import s from "./Hero.module.css";

const LEAD =
  "OG Labs is the go-to digital transformation partner for SMBs across Australia, New Zealand, and Southeast Asia. We blend HubSpot and ClickUp expertise with AI-driven agentic workflows to help your business scale.";

export default function Hero() {
  return (
    <section className={s.hero} data-section="Hero" data-framer-name="Hero">
      <div className={s.container} data-framer-name="Container">
        <div className={s.headingWrapper} data-framer-name="Heading Wrapper">
          <div className={s.heading} data-framer-name="Heading">
            {/* appear p34lws: Hl -> rest, spring 500/100, delay .75 */}
            <Appear trigger="mount" from={ENTER_TILT} transition={spring(0.75)} className={s.announceWrap}>
              <Link href="/about" className={`${s.announce} ${shared.border}`} data-framer-name="Announcement">
                <div className={s.tag} data-framer-name="Tag">
                  <p className="p-foxgst">Updates</p>
                </div>
                <div className={s.title} data-framer-name="Title">
                  <p className="p-y0gzpf">Your APAC digital transformation partner</p>
                  <div className={s.icon} data-framer-name="Icon">
                    {/* appear hn6qc2: x -16 -> 0, spring 400/50, delay 1 */}
                    <Appear
                      as="span"
                      trigger="mount"
                      from={{ opacity: 0.001, x: -16 }}
                      transition={spring(1, 400, 50)}
                      style={{ display: "block", width: 16, height: 16 }}
                    >
                      <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true">
                        <path
                          d="M 0 6 L 14 6 M 14 6 L 8 0 M 14 6 L 8 12"
                          fill="transparent"
                          stroke="var(--token-442a8080-47a9-427e-9581-c23ce6c42231, rgb(0, 0, 0))"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          transform="translate(5 6)"
                        />
                      </svg>
                    </Appear>
                  </div>
                </div>
              </Link>
            </Appear>
            <div className={s.text} data-framer-name="Text">
              {/* text effect: appear by word on mount, start delay .35, stagger .075 (spring 400/50) */}
              <WordsAppear
                as="h1"
                trigger="mount"
                startDelay={0.35}
                className={s.h1}
                text="HubSpot, ClickUp & AI expert partner"
              />
              {/* appear 15rvhge: Hl -> rest, spring 500/100, delay 1 */}
              <Appear trigger="mount" from={ENTER_TILT} transition={spring(1)} className={s.lead}>
                <p className="p-mzxkxl">{LEAD}</p>
              </Appear>
            </div>
          </div>
          {/* appear 1y8b52h: Hl -> rest, spring 500/100, delay 1 */}
          <Appear
            trigger="mount"
            from={ENTER_TILT}
            transition={spring(1)}
            className={s.buttons}
            data-framer-name="Buttons"
          >
            <div className={s.button}>
              <Button
                variant={{ desktop: "Base", tablet: "Base Mobile", phone: "Base Mobile" }}
                text="Book a consultation"
                href="https://meetings-ap1.hubspot.com/thana"
                icon
              />
            </div>
            <div className={s.button}>
              <Button
                variant={{ desktop: "Light", tablet: "Light Mobile", phone: "Light Mobile" }}
                text="Explore services"
                href="/#features"
                icon={false}
              />
            </div>
          </Appear>
        </div>
        <div className={s.finder}>
          <SolutionFinder
            label="Solution finder"
            accent="rgb(255, 102, 0)"
            background="rgb(255, 255, 255)"
            theme="light"
            aspect="square"
            style={{ height: "100%", width: "100%" }}
          />
        </div>
      </div>
    </section>
  );
}
