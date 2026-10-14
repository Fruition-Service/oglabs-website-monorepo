"use client";

import { motion } from "motion/react";
import FramerImage from "./FramerImage";
import { LINKEDIN_MASK, TEAM_MARK } from "./art";
import a from "./About.module.css";
import s from "./TeamMember.module.css";

export type Member = {
  name: string;
  position: string;
  picture: { src: string; width: number; height: number; alt: string };
  linkedIn?: string;
  upsideDown?: boolean;
};

const PHOTO_SIZES =
  "(min-width: 1200px) max((min(100vw, 1440px) - 84px) / 4, 50px), (min-width: 810px) and (max-width: 1199.98px) max((min(100vw, 1440px) - 60px) / 2, 50px), (max-width: 809.98px) max(min(100vw, 1440px) - 48px, 50px)";
const WHITE = "var(--token-262ecc22-57b7-472d-83d9-e78a1e1f93a7, rgb(255, 255, 255))";

export default function TeamMember({ member }: { member: Member }) {
  return (
    <div className={`${s.card}${member.upsideDown ? ` ${s.upside}` : ""}`} data-framer-name={member.upsideDown ? "Upside Down" : "Default"}>
      <div className={s.mark} data-framer-name="Logo">
        <div className={s.markArt} aria-hidden="true" style={{ backgroundImage: `url('${TEAM_MARK}')` }} />
      </div>
      <div className={s.picture} data-framer-name="Picture">
        <div className={s.photo} data-framer-name="Picture">
          <FramerImage src={member.picture.src} alt={member.picture.alt} width={member.picture.width} height={member.picture.height} sizes={PHOTO_SIZES} />
        </div>
        {/* Style appear effect: zooms from 1.2 to 1 over 2s once in view. */}
        <motion.div
          className={s.gradient}
          data-framer-name="Gradient"
          initial={{ scale: 1.2 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ type: "tween", duration: 2, ease: [0.8, 0, 0.24, 1] }}
        />
      </div>
      <div className={s.info} data-framer-name="Information">
        <div className={s.socials} data-framer-name="Socials">
          {member.linkedIn ? (
            <a className={s.social} data-framer-name="Desktop" href={member.linkedIn} target="_blank">
              <div className={s.icon} style={{ mask: LINKEDIN_MASK, WebkitMask: LINKEDIN_MASK }} />
            </a>
          ) : null}
        </div>
        <div className={s.namePos} data-framer-name="Name & Position">
          <div className={`${s.name} ${a.rt}`}>
            <p className="p-10w9eo3" style={{ color: WHITE }}>
              {member.name}
            </p>
          </div>
          <div className={`${s.position} ${a.rt}`}>
            <p className="p-cguwu" style={{ color: WHITE, textAlign: "right" }}>
              {member.position}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
