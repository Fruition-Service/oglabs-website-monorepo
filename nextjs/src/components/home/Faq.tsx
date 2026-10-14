// "FAQ" section of the home page (framer-1k38m46, id "faq"): the heading ("questions" in grey), the
// "Ask a question" button, and the "FAQ/Accordions" component (HubSpot / ClickUp tabs + 9 accordions).
import Button from "@/components/ui/Button";
import { WordsAppear } from "./Appear";
import FaqAccordions from "./faq/FaqAccordions";
import s from "./Faq.module.css";

export default function Faq() {
  return (
    <section className={s.section} data-section="FAQ" data-framer-name="FAQ" id="faq">
      <div className={s.container} data-framer-name="Container">
        <div className={s.heading} data-framer-name="Heading">
          <div className={s.title}>
            <WordsAppear
              as="h2"
              className={`p-1o4nxrd ${s.h2}`}
              runs={[
                { text: "Frequently asked" },
                { text: "questions", style: { color: "var(--token-ead00dcb-2b22-4edd-af15-9859b50e46de, rgba(0, 0, 0, 0.64))" } },
              ]}
            />
          </div>
          <div className={s.button} data-framer-name="Button">
            <Button
              variant={{ desktop: "Base", tablet: "Base Mobile", phone: "Base Mobile" }}
              text="Ask a question"
              href="/contact"
              icon
            />
          </div>
        </div>
        <div className={s.faq} data-framer-name="FAQ">
          <FaqAccordions />
        </div>
      </div>
    </section>
  );
}
