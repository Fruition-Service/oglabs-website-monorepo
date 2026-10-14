import type { Metadata } from "next";
import Page from "@/components/shell/Page";
import Hero from "@/components/landing/Hero";
import CardSection from "@/components/landing/CardSection";
import FaqSection from "@/components/landing/FaqSection";
import CtaBand from "@/components/landing/CtaBand";
import type { Card, FaqItem } from "@/components/landing/types";

export const metadata: Metadata = {
  alternates: { canonical: "/au" },
};

// Framer route /au. Desktop-only Framer page (no tablet/phone layouts): narrower screens
// show the desktop layout squeezed, overflowing where Framer overflows.
const localExpertiseRegional: Card[] = [
  { title: "HubSpot consultant Australia", text: "Implementation, optimisation, and integration of HubSpot Sales, Marketing, and Service Hubs for Australian SMBs." },
  { title: "ClickUp consultant Australia", text: "Workspace design, workflow automation, and team rollouts for ClickUp across Australian project and operations teams." },
  { title: "AI automation consultant", text: "Make, n8n, and agentic AI workflows that connect your tech stack and remove operational drag from Australian businesses." },
];

const servicesForAustralian: Card[][] = [
  [
    { title: { text: "HubSpot implementation", w: "auto" }, text: "Certified HubSpot Solutions Partner delivering onboarding, migration, CRM implementation and ongoing optimisation for Australian SMBs." },
    { title: { text: "CRM consulting", w: "auto" }, text: "Vendor-neutral CRM advice and implementation. We recommend what fits your business and tell you honestly when something is not the right tool." },
  ],
  [
    { title: { text: "ClickUp implementation", w: "auto" }, text: "ClickUp certified. Workspace architecture, automations, dashboards and training for Australian construction, manufacturing and professional services firms." },
    { title: { text: "Advanced integrations", w: "auto" }, text: "Connecting CRM, ERP, finance and project tools so your Australian operation runs on clean, consistent data." },
  ],
  [
    { title: { text: "AI automation", w: "auto" }, text: "Make and n8n automation that cuts manual work, syncs your systems and gives your team time back, built and maintained by specialists." },
    { title: { text: "Process optimisation", w: "auto" }, text: "Finding and removing the friction in how your Australian team works, using a mix of process redesign, automation and better tooling." },
  ],
];

const workingWithOg: FaqItem[] = [
  { q: { text: "Where in Australia do you work?", w: "auto" }, a: { text: "Remotely across the country, serving clients in Sydney, Melbourne, Brisbane, Perth, Adelaide and regional businesses.", w: "auto" } },
  { q: { text: "Are you a registered Australian business?", w: "auto" }, a: { text: "Yes. OG Labs is a registered Australian business.", w: "auto" } },
  { q: { text: "Do you only work with large businesses?", w: "auto" }, a: { text: "No. Our primary focus is SMBs with 10 to 200 employees. We build solutions right-sized for SMB budgets with room to scale.", w: "auto" } },
  { q: { text: "Can you come on-site?", w: "auto" }, a: { text: "We work primarily remotely, which keeps costs down. For larger engagements we can discuss on-site sessions.", w: "auto" } },
];

export default function AuPage() {
  return (
    <Page footer="full">
      <Hero
        layout="region"
        badge="Australia"
        badgeLight
        title="Your HubSpot, ClickUp and AI automation partner in Australia"
        text="OG Labs is a registered Australian business helping SMBs across Sydney, Melbourne, Brisbane, Perth and beyond get more from HubSpot, ClickUp and AI automation. Local expertise, same-timezone support, and deep experience in construction, manufacturing and financial services."
        leftWidth="60%"
        image={{ src: "/framer/HjvbfeH1ic5bdI4AadTGOzzuuD4.jpg", width: 4896, height: 3264, position: "50% 34%" }}
      />
      <CardSection
        title="Local expertise, regional reach"
        gap={36}
        grid={{ cols: 3, min: 200 }}
        cards={localExpertiseRegional}
        card={{ tone: "gray", pad: 24 }}
      />
      <CardSection
        title="Services for Australian businesses"
        grouped
        gap={48}
        masonry={servicesForAustralian}
        card={{ tone: "white", pad: 32 }}
      />
      <FaqSection title="Working with OG Labs in Australia" items={workingWithOg} />
      <CtaBand
        title="Working with Australian SMBs in Sydney, Melbourne, Brisbane, and beyond"
        text="Book a consultation. We are remote-first across Australia and engage with teams in every state and territory."
      />
    </Page>
  );
}
