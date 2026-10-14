// Framer "Legal" CMS template (page module LxbXcNVo…, root framer-wxbUJ): per-word title, a sticky
// details box (last updated, email, phone) and the rich-text body.
import { Appear, Words } from "@/components/blog/Motion";
import RichText from "@/components/blog/RichText";
import type { LegalDoc } from "@/content/legal";
import s from "./LegalView.module.css";

export default function LegalView({ doc }: { doc: LegalDoc }) {
  return (
    <section className={s.main} data-section="Main">
      <div className={s.container} data-framer-name="Container">
        <div className={s.heading} data-framer-name="Heading">
          <div className={s.title}>
            <h1 className={`p-jr195v ${s.left}`}>
              <Words text={doc.title} trigger="mount" startDelay={0.35} />
            </h1>
          </div>
        </div>
        <div className={s.content} data-framer-name="Content">
          <Appear from="rise16" delay={0.75} className={s.details} data-framer-name="Details">
            <div className={s.row} data-framer-name="Last Updated">
              <div className={s.cell}>
                <p className={`p-1721m7s ${s.left}`}>Last updated:</p>
              </div>
              <div className={s.cell} data-framer-name="Date">
                <p className={`p-knz921 ${s.accent}`}>
                  <time dateTime={doc.updated}>{doc.updatedLabel}</time>
                </p>
              </div>
            </div>
            <div className={s.row} data-framer-name="Email">
              <div className={s.cell}>
                <p className={`p-1721m7s ${s.left}`}>Email:</p>
              </div>
              <div className={s.cell}>
                <p className={`p-knz921 ${s.faint}`}>
                  <a className={s.link} href={doc.email.href} target="_blank" rel="">
                    {doc.email.text}
                  </a>
                </p>
              </div>
            </div>
            <div className={s.row} data-framer-name="Phone">
              <div className={s.cell}>
                <p className={`p-1721m7s ${s.left}`}>Phone Number:</p>
              </div>
              <div className={s.cell}>
                <p className={`p-knz921 ${s.faint}`}>
                  <a className={s.link} href={doc.phone.href} target="_blank" rel="">
                    {doc.phone.text}
                  </a>
                </p>
              </div>
            </div>
          </Appear>
          <Appear from="rise48" delay={0.35} className={s.body}>
            <RichText html={doc.html} />
          </Appear>
        </div>
      </div>
    </section>
  );
}
