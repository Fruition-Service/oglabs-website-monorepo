// Framer page /contact (module isc8sCDM): section "Main" with the photo card, heading, benefits and
// the contact form (Framer design; submits to HubSpot, see ContactForm.tsx).
import Badge from "@/components/ui/Badge";
import { Words } from "@/components/blog/Motion";
import { Appear, type Spring } from "@/components/about/Motion";
import FramerImage from "@/components/about/FramerImage";
import ContactForm from "./ContactForm";
import s from "./Contact.module.css";

const WHITE = "var(--token-a9ada049-76e9-4f1f-8c74-adc974e9300d, rgb(255, 255, 255))";
const RISE16 = { opacity: 0.001, y: 16, rotateX: -45 };
const SLOW: Spring = { stiffness: 500, damping: 100, delay: 0.75 };
const RISE24 = { opacity: 0.001, y: 24 };
const BENEFITS = [
  ["Fast response", "Clear, direct answers"],
  ["Practical guidance", "No pressure to commit"],
];

function Check() {
  return (
    <svg className={s.check} viewBox="0 0 24 24" role="presentation">
      <path
        d="M 0 4.243 L 4.243 8.485 L 12.727 0"
        fill="transparent"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        stroke="var(--token-3756c145-13f1-478e-9253-4a4e46de6da3, #f73b1f)"
        transform="translate(6 7.757)"
      />
    </svg>
  );
}

export default function Contact() {
  let n = 0;
  return (
    <section className={s.main} data-framer-name="Main" data-section="Main">
      <div className={s.container}>
        <div className={s.wrapper}>
          <div className={s.bg}>
            <FramerImage
              src="/framer/bzKLUo7XL1xQILeGhSWzfl0OM.jpg"
              alt="a close up of a cell phone with a blurry background"
              width={4000}
              height={6000}
              sizes="calc(min(100vw, 1440px) - 48px)"
              eager
            />
          </div>
          <div className={s.overlay} />
          <div className={s.headingWrapper}>
            <div className={s.heading}>
              <Appear className={s.badge} initial={RISE16} spring={SLOW}>
                <Badge title="Contact" textColor="var(--token-941dc06b-87ea-4bfd-9f0e-231bee443435, rgb(42, 47, 54))" bgColor={WHITE} />
              </Appear>
              <div className={`${s.text} ${s.rt}`}>
                <h1 className={s.h1} style={{ color: WHITE, textAlign: "left" }}>
                  <Words text="Talk to the OG Labs team" trigger="mount" startDelay={0.35} />
                </h1>
              </div>
              <Appear className={`${s.text} ${s.rt}`} initial={RISE16} spring={SLOW}>
                <p className={`p-mzxkxl ${s.lead}`} style={{ color: WHITE, textAlign: "left" }}>
                  Reach out to the OG Labs team to ask questions, explore HubSpot or ClickUp use cases, or understand how AI-driven
                  workflows can transform your business.
                </p>
              </Appear>
            </div>
            <div className={s.benefits}>
              <Appear className={s.divider} initial={{ opacity: 0.001 }} spring={{ stiffness: 400, damping: 50, delay: 1.2 }} />
              {BENEFITS.map((pair, pi) => (
                <div key={pi} className={s.pair}>
                  {pair.map((label) => {
                    const delay = 1 + 0.05 * n++;
                    return (
                      <Appear key={label} className={s.benefit} initial={RISE24} spring={{ stiffness: 400, damping: 50, delay }}>
                        <div className={s.icon}>
                          <Check />
                        </div>
                        <div className={`${s.benefitText} ${s.rt}`}>
                          <p className="p-knz921" style={{ color: WHITE, textAlign: "left" }}>
                            {label}
                          </p>
                        </div>
                      </Appear>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
