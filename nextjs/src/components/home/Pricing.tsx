// "Pricing" section of the home page (framer-1xtz85a, id "pricing"). Holds the "Pricing/Pricing"
// component (module oi, class framer-hs9ZT): desktop uses its "Desktop, Monthly" variant, tablet and
// phone use "Mobile, Monthly" (heading and cards stacked). The component's "Pricing/Toggle" is not
// placed on the page and the cards' "Annual" prices are hidden (opacity 0), so neither is rendered.
import Badge from "@/components/ui/Badge";
import Button, { type ResponsiveVariant } from "@/components/ui/Button";
import { Appear, WordsAppear } from "./Appear";
import { ENTER_TILT_0, spring } from "./fx";
import shared from "./shared.module.css";
import s from "./Pricing.module.css";

type Plan = {
  name: string;
  tag?: string;
  description: string;
  price: string;
  period: string;
  button: { text: string; variant: ResponsiveVariant };
  benefits: string[];
};

const BASE: ResponsiveVariant = { desktop: "Base", tablet: "Base Mobile", phone: "Base Mobile" };
const DARK: ResponsiveVariant = { desktop: "Dark", tablet: "Dark Mobile", phone: "Dark Mobile" };

const PLANS: Plan[] = [
  {
    name: "Guided",
    description: "Flexible plans built to match and maximise your team’s digital growth.",
    price: "$3,000+",
    period: "/20hrs",
    button: { text: "Start with guided", variant: BASE },
    benefits: [
      "HubSpot or ClickUp implementation",
      "Process mapping & workflow design",
      "Standard integrations included",
      "Onboarding & team training",
      "Email support during setup",
    ],
  },
  {
    name: "Lock-Step",
    tag: "Popular",
    description: "Digital transformation support tailored to your goals, tools, and stage.",
    price: "$6,000+",
    period: "/40hrs",
    button: { text: "Choose Lock-Step", variant: DARK },
    benefits: [
      "Everything in Guided",
      "AI-powered workflow automation",
      "HubSpot + ClickUp integration",
      "Industry-specific customisation",
      "Priority support & optimisation",
    ],
  },
  {
    name: "Bespoke",
    description: "Choose the right level of strategy, automation, and execution for you.",
    price: "Custom",
    period: "",
    button: { text: "Choose Bespoke", variant: BASE },
    benefits: [
      "Everything in Lock-Step",
      "Agentic AI workflows with Make & n8n",
      "Unlimited custom integrations",
      "Real-time data sync across tools",
      "Dedicated support & advisory",
    ],
  },
];

/** "Checks" (Framer vector, svg template #858447551): double tick, stroke 1.5, orange. */
function Checks() {
  return (
    <svg className={s.check} role="presentation" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M 0 4.715 L 3.6 8.25 L 12 0"
        fill="transparent"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(1.5 7.5)"
      />
      <path
        d="M 0 6 L 2.291 8.25 L 10.691 0"
        fill="transparent"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(11.809 7.5)"
      />
    </svg>
  );
}

/** "Pricing/Pricing Card" (module Dr, class framer-H8fAK, single variant "Default", no hover). */
function PricingCard({ plan }: { plan: Plan }) {
  return (
    <div className={`${s.card} ${shared.border}`} data-framer-name="Default">
      {plan.tag && (
        <div className={s.tag} data-framer-name="Tag">
          <p className={`p-foxgst ${s.tagText}`}>{plan.tag}</p>
        </div>
      )}
      <div className={s.nameDesc} data-framer-name="Name & Description">
        <div className={s.name} data-framer-name="Name">
          <div className={s.nameDot} data-framer-name="Dot" />
          <p className={`p-foxgst ${s.nameText}`}>{plan.name}</p>
        </div>
        <p className={`p-knz921 ${s.desc}`}>{plan.description}</p>
      </div>
      <div className={s.priceButton} data-framer-name="Price & Button">
        <p className={`p-y0gzpf ${s.reference}`}>For reference only</p>
        <div className={s.price} data-framer-name="Price">
          <p className={`p-1e9p27t ${s.amount}`}>{plan.price}</p>
          <p className={`p-foxgst ${s.period}`}>{plan.period}</p>
        </div>
        <div className={s.button} data-framer-name="Button">
          <Button variant={plan.button.variant} text={plan.button.text} href="/contact" icon />
        </div>
      </div>
      <div className={s.benefits} data-framer-name="Benefits">
        {plan.benefits.map((b, i) => (
          <div className={s.benefit} data-framer-name="Benefit" key={b}>
            <div className={s.benefitContent} data-framer-name="Content">
              <Checks />
              <p className={`p-knz921 ${s.benefitText}`}>{b}</p>
            </div>
            {i < plan.benefits.length - 1 && (
              <div className={`${s.divider} ${shared.border}`} data-framer-name="Divider" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Pricing() {
  return (
    <section className={s.section} data-section="Pricing" data-framer-name="Pricing" id="pricing">
      <div className={s.container} data-framer-name="Container">
        <div className={s.pricing} data-framer-name="Pricing">
          <div className={s.variant}>
            <div className={s.headingWrapper} data-framer-name="Heading Wrapper">
              <div className={s.heading} data-framer-name="Heading">
                {/* Badge: Jl -> rest, spring 500/100, delay .4, threshold .5 */}
                <Appear from={ENTER_TILT_0} transition={spring(0.4)} className={s.badge} data-framer-name="Badge">
                  <Badge title="Pricing" />
                </Appear>
                <div className={s.title}>
                  <WordsAppear as="h2" className={`p-1o4nxrd ${s.h2}`} text="Tailored plans for every stage of transformation" />
                </div>
              </div>
            </div>
            <div className={s.cards} data-framer-name="Pricing Cards">
              {PLANS.map((plan) => (
                // Card appear: { opacity 0, y 48 } -> rest, spring 500/100, delay 0, threshold .5
                <Appear
                  key={plan.name}
                  from={{ opacity: 0, y: 48 }}
                  transition={spring(0)}
                  className={s.cardWrap}
                  data-framer-name="Pricing Card"
                >
                  <PricingCard plan={plan} />
                </Appear>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
