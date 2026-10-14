import type { Metadata } from "next";
import Page from "@/components/shell/Page";
import Hero from "@/components/landing/Hero";
import CardSection from "@/components/landing/CardSection";
import FaqSection from "@/components/landing/FaqSection";
import PillLinks from "@/components/landing/PillLinks";
import CtaBand from "@/components/landing/CtaBand";
import type { Card, FaqItem } from "@/components/landing/types";

export const metadata: Metadata = {
  title: "Education CRM & Automation Partner APAC | OG Labs",
  description:
    "OG Labs helps schools, universities, colleges and training providers across Australia, New Zealand and Southeast Asia run enquiries, enrolments and operations on HubSpot, ClickUp and automation.",
  alternates: { canonical: "/industries/education" },
};

// Not a Framer page: added after the migration on the industry template (same sections and
// components as /industries/construction).
const theEducationChallenge: Card[] = [
  { num: { text: "01", w: "auto" }, title: "Leaky enquiry pipeline", text: "Prospective students and parents enquire through forms, email, phone and events, and follow-up depends on whoever happens to pick it up." },
  { num: { text: "02", w: "auto" }, title: "Manual enrolment admin", text: "Applications, documents and offers chased through inboxes and spreadsheets, with staff rekeying the same details into several systems." },
  { num: { text: "03", w: "auto" }, title: "No view of the student journey", text: "Admissions, student services and leadership each see a fragment, so nobody can tell which campaigns fill classes or where applicants drop out." },
];

const whatWeDeliver: Card[] = [
  { title: "Enquiry & admissions CRM", text: "HubSpot configured around your admissions funnel. Every enquiry captured, nurtured with timely follow-ups and tracked through to application, offer and enrolment." },
  { title: "Enrolment workflows in ClickUp", text: "Structured workspaces for applications, document checks, offers and onboarding, so admissions teams always know what is outstanding and who owns it." },
  { title: "Student system integrations", text: "Connect your CRM to your student information system, LMS and finance tools with Make and n8n, so enrolment data flows through without manual rekeying." },
  { title: "AI-assisted communications", text: "AI workflows that answer common enquiries, draft personalised follow-ups and route complex questions to the right staff member, without losing the human touch." },
];

const whereWeHelp: Card[] = [
  { title: { text: "Prospective student enquiries", w: "auto" }, text: "Capture enquiries from web forms, events and agents in one place, with automated responses and reminders so no prospective student goes cold." },
  { title: { text: "Applications and offers", w: "auto" }, text: "Track every application from submission to offer and acceptance, with document requests and status updates handled automatically." },
  { title: "Onboarding and orientation", text: "Welcome sequences, checklists and handovers that get new students set up without staff chasing forms and signatures." },
  { title: { text: "Agent and partner management", w: "auto" }, text: "Give recruitment agents and partner institutions a clear process for referrals, with performance visible to your team." },
  { title: "Program and course operations", text: "ClickUp workspaces for course delivery, timetabling tasks, staff onboarding and accreditation preparation, all visible in one place." },
  { title: { text: "Reporting for leadership", w: "auto" }, text: "Dashboards that show enquiry volume, conversion by channel and enrolment progress, without compiling spreadsheets every week." },
];

const educationFaqs: FaqItem[] = [
  { q: { text: "Do you work with schools as well as universities and colleges?", w: "auto" }, a: { text: "Yes. We work with independent schools, colleges, training providers and higher education teams, sized to how your admissions and operations actually run.", w: "auto" } },
  { q: { text: "Can you integrate with our student information system or LMS?", w: "auto" }, a: { text: "Usually yes. We connect HubSpot and ClickUp to your existing student, learning and finance systems using Make, n8n or their APIs.", w: "auto" } },
  { q: { text: "How do you handle student and parent privacy?", w: "auto" }, a: { text: "We design around the privacy rules that apply to you, limit what data moves between systems, and use self-hosted automation where records must stay in your own environment.", w: "auto" } },
  { q: { text: "Can this support international student recruitment?", w: "auto" }, a: { text: "Yes. We build enquiry, agent and application workflows that work across time zones and channels, with the tracking your team needs to follow each applicant.", w: "auto" } },
];

export default function IndustriesEducationPage() {
  return (
    <Page footer="full">
      <Hero
        layout="industry"
        badge="For education"
        title="From first enquiry to enrolment, without the admin"
        text="Education providers juggle high enquiry volumes, complex enrolments and growing expectations from students and parents. OG Labs helps schools, colleges, universities and training providers across Australia, New Zealand and Southeast Asia run admissions and operations on connected systems, using HubSpot, ClickUp and tailored automation."
        leftWidth="61%"
        clip
      />
      <CardSection
        title="The education operations challenge"
        gap={36}
        clip
        grid={{ cols: 3, min: 200 }}
        cards={theEducationChallenge}
        card={{ tone: "gray", pad: 24 }}
      />
      <CardSection
        title="What we deliver for education"
        gap={36}
        alignStart
        clip
        grid={{ cols: 2, min: 280 }}
        cards={whatWeDeliver}
        card={{ tone: "gray", pad: 32 }}
      />
      <CardSection
        title="Where we help education providers"
        grouped
        gap={48}
        grid={{ cols: 3, min: 220 }}
        cards={whereWeHelp}
        card={{ tone: "white", pad: 32 }}
      />
      <FaqSection title="Education digitalisation FAQs" items={educationFaqs} fullBleed />
      <PillLinks groups={[["/services/hubspot", "/services/clickup", "/services/ai-workflows"]]} />
      <CtaBand
        title="Ready to modernise admissions and operations?"
        text="Book a 30-minute discovery call. We will map your current enquiry and enrolment process and propose a tailored roadmap for your institution."
        clip
      />
    </Page>
  );
}
