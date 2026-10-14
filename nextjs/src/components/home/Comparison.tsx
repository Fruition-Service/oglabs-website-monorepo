// "Comparison" section of the home page (framer-m69gxi, id="comparison"): dark band with the
// "What sets us apart" badge, the word-by-word heading, "Book a consultation" and the comparison table.
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { Appear, WordsAppear } from "./Appear";
import { ENTER_TILT_0, spring } from "./fx";
import ComparisonTable from "./comparison/Table";
import s from "./Comparison.module.css";

export default function Comparison() {
  return (
    <section className={s.section} data-section="Comparison" data-framer-name="Comparison" id="comparison">
      <div className={s.container} data-framer-name="Container">
        <div className={s.headingWrapper} data-framer-name="Heading Wrapper">
          <div className={s.heading} data-framer-name="Heading">
            {/* scroll appear: Jl -> rest, spring 500/100 delay .4, threshold .5, once */}
            <Appear from={ENTER_TILT_0} transition={spring(0.4)} className={s.slot} data-framer-name="Badge">
              <Badge
                title="What sets us apart"
                textColor="rgb(255, 255, 255)"
                dotColor="rgb(255, 102, 0)"
                bgColor="rgba(0, 0, 0, 0.08)"
              />
            </Appear>
            <div className={s.text}>
              {/* text effect tu: appear by word in view (threshold .5), stagger .075, spring 400/50 */}
              <WordsAppear
                as="h2"
                className={`p-1o4nxrd ${s.h2}`}
                text="OG Labs delivers results beyond traditional partners"
              />
            </div>
          </div>
          <Appear from={ENTER_TILT_0} transition={spring(0.4)} className={s.slot} data-framer-name="Button">
            <Button
              variant={{ desktop: "Base", tablet: "Base Mobile", phone: "Base Mobile" }}
              text="Book a consultation"
              href="https://meetings-ap1.hubspot.com/thana"
            />
          </Appear>
        </div>
        <ComparisonTable />
      </div>
    </section>
  );
}
