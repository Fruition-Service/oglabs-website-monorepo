"use client";
// "FAQ/Accordions" (Framer module Tc, class framer-Ib1IL): a HubSpot / ClickUp toggle and nine
// "Accordion"s (module rc, class framer-HMSoR).
//
// Behaviour ported from the module:
// - Variants "Default" (HubSpot) / "Variant 2" (ClickUp), tween 0.4s ease [0.77, 0, 0.175, 1]. The
//   white "Focus" pill slides between halves and swaps its corner radii; the labels swap colours.
// - Each accordion keeps its own open state (opening one leaves the others alone), and that state
//   survives a tab switch: only the question / answer text changes.
// - Accordion "Closed" -> "Opened" (same tween): the card grows to fit the answer, the icon turns 45deg
//   into an x and its bars turn orange (they also turn orange on hover while closed). The answer sits
//   absolutely 96px below the card bottom while closed and slides into place while fading in.
// - Framer's closed variant shows the component's default answer text, so while an accordion closes
//   the fading answer reads the placeholder ("OG Labs is a digital ..."), exactly as on the live site.
//   Once closed, the answer is unmounted (on Framer it stays in the DOM at opacity 0).
import { animate, type AnimationPlaybackControls } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import { Appear } from "../Appear";
import { ENTER_RISE, ENTER_TILT_0, spring } from "../fx";
import shared from "../shared.module.css";
import s from "./FaqAccordions.module.css";

type QA = { q: string; a: string };

const HUBSPOT: QA[] = [
  {
    q: "How long does a typical HubSpot implementation take?",
    a: "Most HubSpot implementations run 4-12 weeks. A single-hub rollout covering Sales or Marketing with standard pipelines, properties, and templates is typically 4-6 weeks. Multi-hub deployments spanning Marketing, Sales, and Service usually take 8-12 weeks. Enterprise builds with custom objects, complex lifecycle stages, and full CRM migration run 12-20 weeks in phases.",
  },
  {
    q: "What training options are available for HubSpot?",
    a: "Training is role-based. Admins cover properties, pipelines, workflows, permissions, and custom reporting. Sales teams focus on sequences, templates, meeting links, and deal management. Marketers learn email, forms, landing pages, lists, and campaign attribution. Service teams cover tickets, SLAs, and the knowledge base. Delivered as live workshops, recorded modules, a custom playbook, and ongoing office hours.",
  },
  {
    q: "Can HubSpot replace all our current tools?",
    a: "Many organizations successfully consolidate 5-15 tools into HubSpot, replacing CRM, marketing, sales, service, and more. During discovery, we'll assess which tools HubSpot can replace and which integrations to maintain based on your specific requirements.",
  },
  {
    q: "Do you offer post-implementation support for HubSpot?",
    a: "Absolutely. We provide ongoing optimisation services, feature adoption assistance, workspace audits, automation development, and dedicated support channels. We're invested in your long-term success with HubSpot.",
  },
  {
    q: "Is HubSpot secure enough for enterprise use?",
    a: "Yes. HubSpot maintains SOC 2 Type II certification, GDPR compliance, and offers enterprise security features including SSO, 2FA, advanced permissions, audit logs, data residency options, and 99.99% uptime SLA.",
  },
  {
    q: "How do you ensure successful HubSpot adoption?",
    a: "Adoption starts with clean data and a pipeline your reps recognise. We align leadership on definitions first (lifecycle stages, deal stages, MQL criteria), pilot with one sales pod, then roll out team by team. We nominate internal HubSpot champions, insist on logging activity in HubSpot rather than spreadsheets, and track adoption with dashboards covering activity logging, pipeline hygiene, and sequence usage.",
  },
  {
    q: "What does the HubSpot project plan and milestones look like?",
    a: "We open with discovery and a CRM architecture blueprint, then configure objects, properties, and deal pipelines; build workflows, email templates, and lifecycle automation; connect integrations; migrate and dedupe data; run UAT with a pilot team; then train and go live hub by hub. You get a milestone plan with named owners and target dates, reviewed at weekly checkpoints.",
  },
  {
    q: "Can you migrate data from our existing CRM into HubSpot?",
    a: "We migrate from Salesforce, Pipedrive, Zoho, Dynamics, spreadsheets, and custom databases, bringing across contacts, companies, deals, activity history, notes, and attachments. The process covers data cleaning and deduplication, property mapping, a test import into a sandbox portal, validation against record counts and spot checks, then final cutover with a rollback plan.",
  },
  {
    q: "What integrations can you implement with HubSpot?",
    a: "We can integrate HubSpot with 1,500+ applications through the HubSpot marketplace, plus custom API integrations with your proprietary systems. Common integrations include Salesforce, Shopify, QuickBooks, Slack, WordPress, and various marketing tools.",
  },
];

const CLICKUP: QA[] = [
  {
    q: "How long does a typical ClickUp implementation take?",
    a: "Most ClickUp rollouts run 3-10 weeks. A single-team workspace with standard Spaces, Lists, and views can be live in 2-4 weeks. Multi-department rollouts needing custom hierarchy design, custom fields, Automations, and Dashboards typically take 6-10 weeks. Large enterprise workspaces with complex permissions and migration from several tools run 10-16 weeks in phases.",
  },
  {
    q: "What training options are available for ClickUp?",
    a: "Training is role-based. Admins learn workspace hierarchy, permissions, custom fields, and Automations. Team leads focus on Dashboards, Goals, and reporting. End users get hands-on sessions covering task management, the different views (List, Board, Gantt, Calendar), Docs, and time tracking. Delivered as live workshops, recorded modules, a custom internal playbook, and ongoing office hours.",
  },
  {
    q: "Can ClickUp replace all our current tools?",
    a: "Many organizations successfully consolidate 5-15 tools into ClickUp, replacing project management, docs, goals, time tracking, chat, and more. During discovery, we'll assess which tools ClickUp can replace and which integrations to maintain based on your specific requirements.",
  },
  {
    q: "Do you offer post-implementation support for ClickUp?",
    a: "Absolutely. We provide ongoing optimisation services, feature adoption assistance, workspace audits, automation development, and dedicated support channels. We're invested in your long-term success with ClickUp.",
  },
  {
    q: "Is ClickUp secure enough for enterprise use?",
    a: "Yes. ClickUp maintains SOC 2 Type II certification, GDPR compliance, and offers enterprise security features including SSO, 2FA, advanced permissions, audit logs, data residency options, and 99.99% uptime SLA.",
  },
  {
    q: "How do you ensure successful ClickUp adoption?",
    a: "Adoption hinges on keeping the workspace simple at launch. We start with a pilot team, agree naming conventions and a standard task template, then expand Space by Space. We appoint ClickUp champions per department, run weekly office hours through rollout, and track adoption in Dashboards monitoring task creation, comment activity, and view usage, retiring legacy tools only once usage is consistent.",
  },
  {
    q: "What does the ClickUp project plan and milestones look like?",
    a: "We start with discovery and workspace architecture design, then build the hierarchy of Spaces, Folders, and Lists; configure custom fields and views; set up Automations and integrations; migrate your data; run UAT in a pilot Space; then onboard teams in phases and go live. You get a milestone plan with named owners and target dates, tracked in a shared ClickUp Space so you can follow progress live.",
  },
  {
    q: "Can you migrate data from our existing CRM into ClickUp?",
    a: "We migrate from Asana, Monday.com, Jira, Trello, Wrike, Smartsheet, and spreadsheets, carrying across tasks, subtasks, assignees, due dates, custom fields, attachments, and comment history wherever the source API allows. The process covers field mapping, a test migration into a sandbox Space, validation against record counts, then a final cutover timed to avoid disrupting live work.",
  },
  {
    q: "What integrations can you implement with ClickUp?",
    a: "We can integrate ClickUp with 1,000+ applications through the ClickUp marketplace, plus custom API integrations with your proprietary systems. Common integrations include Slack, Google Workspace, GitHub, Zoom, Make, and various productivity tools.",
  },
];

/** The Accordion's default answer, which its "Closed" variant renders. */
const PLACEHOLDER =
  "OG Labs is a digital transformation partner specialising in HubSpot, ClickUp, and AI-driven automation for SMBs across APAC.";

const TWEEN = { duration: 0.4, ease: [0.77, 0, 0.175, 1] as [number, number, number, number] };
/** Closed answer: `position: absolute; bottom: -96px` inside the card. */
const CLOSED_OFFSET = 96;

function onEnterOrSpace(e: KeyboardEvent, fn: () => void) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    fn();
  }
}

function Accordion({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false); // answer element present (open or closing)
  const card = useRef<HTMLDivElement>(null);
  const ans = useRef<HTMLDivElement>(null);
  const lastHeight = useRef(0);
  const heightAnim = useRef<AnimationPlaybackControls | null>(null);
  const answerAnim = useRef<AnimationPlaybackControls | null>(null);
  const toggled = useRef<{ top: number | null; opacity: number } | null>(null);
  const firstRun = useRef(true);

  // Track the resting height (it changes with the viewport width) while no animation runs.
  useEffect(() => {
    const el = card.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      if (!heightAnim.current) lastHeight.current = el.getBoundingClientRect().height;
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const toggle = () => {
    const c = card.current;
    const a = ans.current;
    toggled.current = {
      top: a && c ? a.getBoundingClientRect().top - c.getBoundingClientRect().top : null,
      opacity: a ? Number(getComputedStyle(a).opacity) : 0,
    };
    if (!open) setMounted(true);
    setOpen(!open);
  };

  // Height (and, after a click, the answer's slide + fade) animate from the previous layout.
  useLayoutEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    const c = card.current;
    if (!c) return;
    const from = heightAnim.current ? c.getBoundingClientRect().height : lastHeight.current;
    heightAnim.current?.stop();
    c.style.height = "auto";
    const to = c.getBoundingClientRect().height;
    c.style.height = `${from}px`;
    const h = animate(c, { height: [from, to] }, TWEEN);
    heightAnim.current = h;
    h.then(() => {
      if (heightAnim.current !== h) return;
      heightAnim.current = null;
      c.style.height = "";
      lastHeight.current = to;
    });

    const t = toggled.current;
    toggled.current = null;
    const a = ans.current;
    if (!t || !a) return;
    answerAnim.current?.stop();
    let start: number;
    let target: number;
    if (open) {
      a.style.top = "";
      target = a.offsetTop;
      start = t.top ?? from + CLOSED_OFFSET - a.offsetHeight;
    } else {
      target = to + CLOSED_OFFSET - a.offsetHeight;
      a.style.top = `${target}px`;
      start = t.top ?? target;
    }
    a.style.opacity = String(t.opacity);
    const an = animate(a, { y: [start - target, 0], opacity: [t.opacity, open ? 1 : 0] }, TWEEN);
    answerAnim.current = an;
    if (!open) {
      an.then(() => {
        if (answerAnim.current === an) setMounted(false);
      });
    }
  }, [open, answer]);

  return (
    <div
      ref={card}
      className={`${s.card} ${shared.border}${open ? ` ${s.open}` : ""}`}
      data-framer-name={open ? "Opened" : "Closed"}
      role="button"
      tabIndex={0}
      aria-expanded={open}
      onClick={toggle}
      onKeyDown={(e) => onEnterOrSpace(e, toggle)}
    >
      <div className={s.question} data-framer-name="Question">
        <p className={`p-cguwu ${s.questionText}`}>{question}</p>
        <div className={s.icon} data-framer-name="Icon">
          <div className={`${s.bar} ${s.horizontal}`} data-framer-name="Horizontal" />
          <div className={`${s.bar} ${s.vertical}`} data-framer-name="Vertical" />
        </div>
      </div>
      {mounted && (
        <div ref={ans} className={`${s.answer} ${open ? s.answerOpen : s.answerClosing}`} data-framer-name="Answer">
          <p className={`p-knz921 ${s.answerText}`}>{open ? answer : PLACEHOLDER}</p>
        </div>
      )}
    </div>
  );
}

export default function FaqAccordions() {
  const [tab, setTab] = useState<"hubspot" | "clickup">("hubspot");
  const items = tab === "hubspot" ? HUBSPOT : CLICKUP;
  const toHubspot = () => setTab("hubspot");
  const toClickup = () => setTab("clickup");

  return (
    <div
      className={`${s.root}${tab === "clickup" ? ` ${s.clickup}` : ""}`}
      data-framer-name={tab === "clickup" ? "Variant 2" : "Default"}
    >
      {/* Toggle appear: Jl -> rest, spring 500/100, delay .4, threshold .5 */}
      <Appear
        from={ENTER_TILT_0}
        transition={spring(0.4)}
        className={`${s.toggle} ${shared.border}`}
        data-framer-name="Toggle"
      >
        <div className={s.focus} data-framer-name="Focus" />
        <div
          className={`${s.tab} ${s.tabHubspot}`}
          data-framer-name="Monthly"
          role="button"
          tabIndex={0}
          aria-pressed={tab === "hubspot"}
          onClick={toHubspot}
          onKeyDown={(e) => onEnterOrSpace(e, toHubspot)}
        >
          <p className={`p-cguwu ${s.tabText} ${s.tabTextHubspot}`}>HubSPOt</p>
        </div>
        <div
          className={`${s.tab} ${s.tabClickup}`}
          data-framer-name="Annual"
          role="button"
          tabIndex={0}
          aria-pressed={tab === "clickup"}
          onClick={toClickup}
          onKeyDown={(e) => onEnterOrSpace(e, toClickup)}
        >
          <p className={`p-cguwu ${s.tabText} ${s.tabTextClickup}`}>Clickup</p>
        </div>
      </Appear>
      {items.map((item, i) => (
        // Accordion appear: { opacity 0, y 24 } -> rest, spring 500/100, delay 0, threshold .5
        <Appear key={i} from={ENTER_RISE} transition={spring(0)} className={s.item}>
          <Accordion question={item.q} answer={item.a} />
        </Appear>
      ))}
    </div>
  );
}
