"use client";
// OG Labs Solution Finder: the chat-style box in the home hero ("OGLabsSolutionFinder", a Framer code
// component). Ported 1:1 from the published version inside the home page module (identical to
// oglabs-solution-hero/OGLabsSolutionFinder.tsx: same 78 solutions, same CSS, same logic). Only the
// Framer-specific bits are gone (property controls, the canvas-only "Form not connected" note).
//
// NEVER submit the HubSpot form for real while testing: every POST to this form is a real lead and an
// email to the founder. Intercept https://api.hsforms.com/** with Playwright page.route instead.
import { useEffect, useMemo, useRef, useState } from "react"
import type { CSSProperties, ReactNode } from "react"
import SOLUTIONS_JSON from "./solutions.json"

/**
 * OG Labs Solution Finder
 * -----------------------------------------------------------------------------
 * A single self-contained card that works like a chat. The bot asks which
 * platform, then which industry, then shows the matching builds. Any build
 * opens its full detail, and "Get it scoped" collects contact details and
 * sends them to HubSpot.
 *
 * Data: 78 solutions, generated from the catalog sheet by build-data.py.
 *
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 * @framerIntrinsicWidth 560
 * @framerIntrinsicHeight 560
 */

interface Pair {
    l: string
    t: string
}

interface BuildStep {
    l: string
    s: string
    h: string
}

interface Solution {
    id: string
    p: string
    ind: string
    uc: string
    n: string
    d: string
    sc: string
    u: string
    st: string
    o: string[]
    b: BuildStep[]
    hub: string
    per: Pair[]
    ph: string[]
    k: string[]
    intg: string[]
}


// 78 solutions, generated from the catalog sheet (oglabs-solution-hero/build-data.py).
const SOLUTIONS: Solution[] = SOLUTIONS_JSON as Solution[]

const PRODUCTS = ["HubSpot", "ClickUp", "AI Automation & Workflows"]
const SHORT_LABEL: Record<string, string> = {
    "AI Automation & Workflows": "AI Automation",
}
const ALL = "All"
const GENERAL = "Other / general"
const TYPING_MS = 550
const GREETING =
    "Hi! Let's find the right build for your business. Which platform are you working with?"

const short = (p: string) => SHORT_LABEL[p] || p

const CSS = `
.ogsf,.ogsf *{box-sizing:border-box;margin:0;padding:0}
.ogsf{
  --ink:#09090B; --muted:#71717A; --faint:#A1A1AA;
  --line:#E4E4E7; --soft:#F4F4F5; --card:#FFFFFF;
  font-family:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
  color:var(--ink); background:var(--bg);
  border:1px solid var(--line); border-radius:16px;
  display:flex; flex-direction:column; overflow:hidden;
  width:100%; position:relative; overflow-wrap:break-word;
  -webkit-font-smoothing:antialiased;
}
.ogsf--dark{--ink:#FAFAFA;--muted:#A1A1AA;--faint:#71717A;--line:#27272A;--soft:#18181B;--card:#111113}
.ogsf-mono{font-family:"IBM Plex Mono",ui-monospace,SFMono-Regular,Menlo,monospace}

/* Two screens share the same box. Only one is mounted at a time. */
.ogsf-screen{display:flex;flex-direction:column;min-height:0;flex:1}

/* ---------- header ---------- */
.ogsf-head{
  flex:0 0 auto;padding:16px 18px 12px;border-bottom:1px solid var(--line);
  display:flex;align-items:center;gap:10px;
}
.ogsf-dot{width:6px;height:6px;border-radius:50%;background:var(--accent);flex:0 0 auto}
.ogsf-title{
  font-size:11px;letter-spacing:.13em;text-transform:uppercase;
  color:var(--accent);font-weight:500;
}
.ogsf-n{margin-left:auto;font-size:11px;color:var(--faint)}

/* ---------- scrolling body, the only part that grows ---------- */
.ogsf-body{position:relative;flex:1 1 auto;min-height:0;overflow-y:auto;overscroll-behavior:contain}
.ogsf-body::-webkit-scrollbar{width:7px}
.ogsf-body::-webkit-scrollbar-thumb{background:var(--line);border-radius:7px}
.ogsf-body::-webkit-scrollbar-track{background:transparent}

.ogsf-item{
  appearance:none;width:100%;text-align:left;cursor:pointer;font:inherit;
  background:transparent;border:0;border-bottom:1px solid var(--line);
  padding:12px 18px;display:flex;align-items:center;gap:10px;
  transition:background .15s ease;
}
.ogsf-item:last-child{border-bottom:0}
.ogsf-item:hover{background:var(--soft)}
.ogsf-item-c{min-width:0;flex:1;display:block}
.ogsf-item-n{display:block;font-size:13.5px;font-weight:500;line-height:1.35}
.ogsf-item-u{display:block;font-size:11px;color:var(--faint);margin-top:2px;line-height:1.4}
.ogsf-item svg{flex:0 0 auto;color:var(--faint)}
.ogsf-item:hover svg{color:var(--accent)}
.ogsf-empty{padding:32px 18px;font-size:12.5px;color:var(--faint);text-align:center}

/* ---------- detail screen ---------- */
.ogsf-back{
  appearance:none;border:0;background:transparent;cursor:pointer;font:inherit;
  display:flex;align-items:center;gap:7px;padding:0;
  font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);
  transition:color .18s ease;
}
.ogsf-back:hover{color:var(--accent)}
.ogsf-back svg{transform:rotate(180deg)}

.ogsf-pad{padding:16px 18px}
.ogsf-badges{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:10px}
.ogsf-badge{
  font-size:10px;letter-spacing:.06em;text-transform:uppercase;
  padding:4px 8px;border-radius:100px;background:var(--soft);color:var(--muted);
}
.ogsf-badge--a{background:color-mix(in srgb, var(--accent) 13%, transparent);color:var(--accent)}
.ogsf-badge--hub{text-transform:none;letter-spacing:0;font-size:10.5px}
.ogsf-dn{font-size:18px;font-weight:600;letter-spacing:-.015em;line-height:1.25}
.ogsf-dd{margin-top:8px;font-size:12.5px;line-height:1.6;color:var(--muted)}

.ogsf-facts{
  margin-top:14px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));
  gap:1px;background:var(--line);border:1px solid var(--line);
  border-radius:10px;overflow:hidden;
}
.ogsf-fact{background:var(--card);padding:9px 10px;min-width:0}
.ogsf-fact-k{font-size:9px;letter-spacing:.09em;text-transform:uppercase;color:var(--faint)}
.ogsf-fact-v{margin-top:3px;font-size:11.5px;font-weight:500;line-height:1.35}

.ogsf-sec{
  margin-top:18px;margin-bottom:8px;font-size:9.5px;letter-spacing:.12em;
  text-transform:uppercase;color:var(--faint);
}
.ogsf-out{list-style:none;display:grid;gap:6px}
.ogsf-out li{display:flex;gap:8px;font-size:12.5px;line-height:1.5}
.ogsf-out li::before{
  content:"";flex:0 0 auto;width:14px;height:14px;margin-top:2px;border-radius:50%;
  background:color-mix(in srgb, var(--accent) 16%, transparent) center/8px 8px no-repeat;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Cpath d='M1 6.4l3 3L11 2' fill='none' stroke='%23FF6600' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
}
.ogsf-rows{display:grid;gap:10px}
.ogsf-row-l{font-size:12px;font-weight:500;line-height:1.4}
.ogsf-row-s{font-size:12px;line-height:1.5;color:var(--muted);margin-top:2px}
.ogsf-row-h{font-size:11.5px;line-height:1.55;color:var(--faint);margin-top:3px}
.ogsf-tags{display:flex;flex-wrap:wrap;gap:5px}
.ogsf-tag{
  font-size:10.5px;padding:4px 9px;border-radius:100px;
  border:1px solid var(--line);color:var(--muted);
}
.ogsf-phase{display:flex;gap:9px;align-items:flex-start;margin-bottom:7px}
.ogsf-pn{
  flex:0 0 auto;font-size:9px;font-weight:600;padding:3px 6px;border-radius:5px;
  background:color-mix(in srgb, var(--accent) 13%, transparent);color:var(--accent);
}
.ogsf-pt{font-size:12px;line-height:1.5;color:var(--muted)}

/* ---------- footer ---------- */
.ogsf-foot{
  flex:0 0 auto;padding:12px 18px;border-top:1px solid var(--line);
  display:flex;align-items:center;gap:10px;background:var(--card);
}
.ogsf-btn{
  appearance:none;cursor:pointer;text-decoration:none;font:inherit;
  font-size:12.5px;font-weight:500;padding:10px 18px;border-radius:100px;
  background:var(--accent);color:#fff;border:0;
  display:inline-flex;align-items:center;gap:6px;transition:opacity .18s ease;
}
.ogsf-btn:hover{opacity:.88}
.ogsf-foot-t{font-size:11.5px;color:var(--muted);line-height:1.4;min-width:0}
.ogsf-btn--ghost{
  background:transparent;color:var(--accent);
  box-shadow:inset 0 0 0 1px var(--accent);
}
.ogsf-btn--ghost:hover{opacity:1;background:color-mix(in srgb, var(--accent) 9%, transparent)}
.ogsf-btn[disabled]{opacity:.55;cursor:default}
.ogsf-btn svg{flex:0 0 auto}

/* ---------- scope step (chat) ---------- */
.ogsf-form{display:flex;flex-direction:column;min-height:0;flex:1}
.ogsf-chat{padding:16px 18px;display:flex;flex-direction:column;gap:12px}
.ogsf-msg{display:flex;gap:9px;align-items:flex-start}
.ogsf-msg--me{justify-content:flex-end}
.ogsf-av{
  flex:0 0 auto;width:24px;height:24px;border-radius:50%;
  background:color-mix(in srgb, var(--accent) 14%, transparent);
  display:flex;align-items:center;justify-content:center;
}
.ogsf-av::after{content:"";width:7px;height:7px;border-radius:50%;background:var(--accent)}
.ogsf-bub{
  background:var(--soft);border-radius:4px 14px 14px 14px;
  padding:10px 12px;font-size:13px;line-height:1.5;max-width:86%;
}
.ogsf-bub strong{font-weight:600}
.ogsf-bub--me{background:var(--accent);color:#fff;border-radius:14px 4px 14px 14px}
.ogsf-fields{display:grid;gap:10px;padding-left:33px}
.ogsf-field{display:block}
.ogsf-field-l{
  display:block;margin-bottom:5px;font-size:9.5px;letter-spacing:.1em;
  text-transform:uppercase;color:var(--faint);
}
.ogsf-input{
  width:100%;font:inherit;font-size:13.5px;color:var(--ink);
  padding:10px 12px;border-radius:10px;border:1px solid var(--line);
  background:var(--card);outline:none;
  transition:border-color .15s ease,box-shadow .15s ease;
}
.ogsf-input::placeholder{color:var(--faint)}
.ogsf-input:focus{
  border-color:var(--accent);
  box-shadow:0 0 0 3px color-mix(in srgb, var(--accent) 16%, transparent);
}
.ogsf-input[aria-invalid="true"]{border-color:#DC2626}
.ogsf-ferr{display:block;margin-top:4px;font-size:11px;color:#DC2626}
.ogsf-alert{
  margin-left:33px;font-size:12px;line-height:1.45;border-radius:9px;padding:9px 11px;
  color:#B91C1C;background:#FEF2F2;
}
.ogsf--dark .ogsf-alert{color:#FCA5A5;background:rgba(220,38,38,.14)}
.ogsf-note{
  margin-left:auto;font-size:9.5px;letter-spacing:.06em;text-transform:uppercase;
  padding:3px 7px;border-radius:5px;color:#B45309;background:#FEF3C7;
}
.ogsf-hp{position:absolute;left:-9999px;width:1px;height:1px;opacity:0;pointer-events:none}
.ogsf-spin{
  width:12px;height:12px;border-radius:50%;
  border:2px solid rgba(255,255,255,.45);border-top-color:#fff;
  animation:ogsf-spin .7s linear infinite;
}
@keyframes ogsf-spin{to{transform:rotate(360deg)}}
/* iOS zooms any input under 16px on focus */
@media (max-width:600px){.ogsf-input{font-size:16px}}

/* ---------- conversation ---------- */
.ogsf-head-r{margin-left:auto;display:flex;align-items:center;gap:10px}
.ogsf-restart{
  appearance:none;border:0;background:transparent;cursor:pointer;font:inherit;padding:0;
  font-size:10.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--faint);
  transition:color .15s ease;
}
.ogsf-restart:hover{color:var(--accent)}
.ogsf-block{display:flex;flex-direction:column;gap:9px}
.ogsf-qr{display:flex;flex-wrap:wrap;gap:6px;padding-left:33px}
.ogsf-qr-b{
  appearance:none;cursor:pointer;font:inherit;font-size:12.5px;font-weight:500;
  padding:7px 13px;border-radius:100px;background:transparent;color:var(--accent);
  border:1px solid color-mix(in srgb, var(--accent) 45%, transparent);
  transition:background .15s ease,border-color .15s ease,color .15s ease;
}
.ogsf-qr-b:hover{background:color-mix(in srgb, var(--accent) 9%, transparent);border-color:var(--accent)}
.ogsf-qr-b span{opacity:.55;margin-left:5px;font-weight:400}
.ogsf-qr-b--quiet{border-color:var(--line);color:var(--muted);font-weight:400}
.ogsf-qr-b--quiet:hover{background:transparent;border-color:var(--accent);color:var(--accent)}
.ogsf-results{
  margin-left:33px;border:1px solid var(--line);border-radius:12px;
  overflow:hidden;background:var(--card);
}
.ogsf-results .ogsf-item{padding:11px 14px}
.ogsf-typing{display:inline-flex;gap:4px;align-items:center;padding:13px 14px}
.ogsf-typing i{
  width:6px;height:6px;border-radius:50%;background:var(--faint);
  animation:ogsf-blink 1.1s infinite ease-in-out;
}
.ogsf-typing i:nth-child(2){animation-delay:.15s}
.ogsf-typing i:nth-child(3){animation-delay:.3s}
@keyframes ogsf-blink{0%,80%,100%{opacity:.25;transform:none}40%{opacity:1;transform:translateY(-2px)}}
.ogsf-in{animation:ogsf-in .28s ease both}
@keyframes ogsf-in{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
/* returning from a solution: redraw the transcript without replaying it */
.ogsf-still .ogsf-in{animation:none}

@media (prefers-reduced-motion:reduce){
  .ogsf *{transition:none!important}
  .ogsf-in,.ogsf-typing i{animation:none!important}
}
`

function Caret({ size = 11 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path
                d="M4.5 2.5L8 6l-3.5 3.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

interface Props {
    label?: string
    greeting?: string
    portalId?: string
    formGuid?: string
    successMessage?: string
    accent?: string
    background?: string
    theme?: "light" | "dark"
    aspect?: "square" | "portrait" | "fill"
    style?: CSSProperties
}

function Bot({ children }: { children: ReactNode }) {
    return (
        <div className="ogsf-msg">
            <span className="ogsf-av" />
            <div className="ogsf-bub">{children}</div>
        </div>
    )
}

function Me({ children }: { children: ReactNode }) {
    return (
        <div className="ogsf-msg ogsf-msg--me ogsf-in">
            <div className="ogsf-bub ogsf-bub--me">{children}</div>
        </div>
    )
}

function Typing() {
    return (
        <div className="ogsf-msg" aria-label="Typing">
            <span className="ogsf-av" />
            <div className="ogsf-bub ogsf-typing">
                <i />
                <i />
                <i />
            </div>
        </div>
    )
}

export default function SolutionFinder(props: Props) {
    const {
        label = "Solution finder",
        greeting = GREETING,
        portalId = "442278519",
        formGuid = "8b0a9d02-cee6-417f-a608-52e77c0ec384",
        successMessage = "Thanks {name}. We have your details and will be in touch shortly to scope this with you.",
        accent = "#FF6600",
        background = "#FFFFFF",
        theme = "light",
        aspect = "square",
        style,
    } = props

    // The conversation: platform, then industry, then results.
    const [product, setProduct] = useState<string | null>(null)
    const [industry, setIndustry] = useState<string | null>(null)
    const [typing, setTyping] = useState(false)
    const [still, setStill] = useState(false)
    const [openId, setOpenId] = useState<string | null>(null)

    // Scope step. Sits after the catalogue, never in front of it.
    const [scoping, setScoping] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [company, setCompany] = useState("")
    const [trap, setTrap] = useState("") // honeypot, humans never see it
    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")
    const [errorMsg, setErrorMsg] = useState("")
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

    const bodyRef = useRef<HTMLDivElement | null>(null)
    const latestRef = useRef<HTMLDivElement | null>(null)
    const savedScroll = useRef(0)
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(
        () => () => {
            if (timer.current) clearTimeout(timer.current)
        },
        []
    )

    const stage = !product ? "platform" : !industry ? "industry" : "results"

    // Industries that exist for the chosen platform, "Other / general" last.
    const industries = useMemo(() => {
        const counts = new Map<string, number>()
        for (const s of SOLUTIONS) {
            if (s.p !== product) continue
            counts.set(s.ind, (counts.get(s.ind) || 0) + 1)
        }
        return [...counts.entries()].sort((a, b) =>
            a[0] === GENERAL ? 1 : b[0] === GENERAL ? -1 : a[0].localeCompare(b[0])
        )
    }, [product])

    const matches = useMemo(
        () =>
            product && industry
                ? SOLUTIONS.filter(
                      (s) => s.p === product && (industry === ALL || s.ind === industry)
                  )
                : [],
        [product, industry]
    )

    const totalForProduct = useMemo(
        () => SOLUTIONS.filter((s) => s.p === product).length,
        [product]
    )

    const open = openId ? SOLUTIONS.find((s) => s.id === openId) || null : null

    function reducedMotion() {
        return (
            typeof window !== "undefined" &&
            typeof window.matchMedia === "function" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        )
    }

    // A short typing pause before the bot answers, so it reads as a reply.
    function botReplies() {
        if (timer.current) clearTimeout(timer.current)
        setStill(false)
        if (reducedMotion()) {
            setTyping(false)
            return
        }
        setTyping(true)
        timer.current = setTimeout(() => setTyping(false), TYPING_MS)
    }

    function pickProduct(p: string) {
        setProduct(p)
        setIndustry(null)
        botReplies()
    }

    function pickIndustry(i: string) {
        setIndustry(i)
        botReplies()
    }

    function changeIndustry() {
        if (timer.current) clearTimeout(timer.current)
        setStill(false)
        setTyping(false)
        setIndustry(null)
    }

    function restart() {
        if (timer.current) clearTimeout(timer.current)
        setStill(false)
        setTyping(false)
        setProduct(null)
        setIndustry(null)
        setOpenId(null)
        savedScroll.current = 0
    }

    // Leaving the transcript (to a solution, or to scoping): remember where
    // the visitor was, and redraw it still rather than replaying it on return.
    function rememberPlace() {
        if (bodyRef.current) savedScroll.current = bodyRef.current.scrollTop
        setStill(true)
    }

    function openSolution(id: string) {
        rememberPlace()
        setOpenId(id)
    }

    // Bring the visitor's latest answer to the top, with the reply under it. Scrolls the card only, never the
    // page: scrollIntoView would drag the whole hero along with it.
    useEffect(() => {
        const body = bodyRef.current
        const el = latestRef.current
        if (!body || !el) return
        body.scrollTo({
            top: Math.max(0, el.offsetTop - 14),
            behavior: reducedMotion() ? "auto" : "smooth",
        })
    }, [product, industry, typing])

    // Back from a solution or the scope step: restore the transcript position.
    useEffect(() => {
        if (!openId && !scoping && bodyRef.current) {
            bodyRef.current.scrollTop = savedScroll.current
        }
    }, [openId, scoping])

    const productLabel = product ? short(product) : ""
    const industryPhrase =
        !industry || industry === ALL
            ? ""
            : industry === GENERAL
              ? ""
              : " for " + industry
    const subject = open
        ? open.n
        : product
          ? (/^[aeiou]/i.test(productLabel) ? "an " : "a ") + productLabel + " build" + industryPhrase
          : "a build"

    const n = matches.length
    const are = n === 1 ? "is" : "are"
    const builds = n === 1 ? "build" : "builds"
    const resultsIntro =
        n === 0
            ? "Nothing catalogued there yet. Try another industry."
            : industry === ALL
              ? "Here " + are + " all " + n + " " + productLabel + " " + builds + ". Tap one to see the full build."
              : industry === GENERAL
                ? "Here " + are + " " + n + " " + productLabel + " " + builds +
                  (n === 1 ? " that works" : " that work") +
                  " across industries. Tap one to see the full build."
                : "Here " + are + " " + n + " " + productLabel + " " + builds + " for " + industry +
                  ". Tap one to see the full build."

    const connected = Boolean(portalId && formGuid)
    // Framer showed a "Form not connected" note on its canvas only; never on a published page.
    const onCanvas = false

    function openScope() {
        rememberPlace()
        // Coming back for a second solution: keep what they typed, reset state.
        if (status !== "sending") setStatus("idle")
        setErrorMsg("")
        setFieldErrors({})
        setScoping(true)
    }

    async function submitScope(e: { preventDefault: () => void }) {
        e.preventDefault()
        if (status === "sending") return

        const n = name.trim()
        const em = email.trim()
        const co = company.trim()
        const errs: Record<string, string> = {}
        if (!n) errs.name = "Please add your name"
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(em)) errs.email = "Please add a valid email"
        if (!co) errs.company = "Please add your company"
        setFieldErrors(errs)
        setErrorMsg("")
        if (Object.keys(errs).length) return

        // A bot filled the hidden field. Look successful, send nothing.
        if (trap) {
            setStatus("sent")
            return
        }

        // Never fake a success: an unconnected form would silently lose leads.
        if (!connected) {
            setStatus("error")
            setErrorMsg("This form is not connected yet. Please use Book a consultation instead.")
            return
        }

        setStatus("sending")

        const [first, ...rest] = n.split(/\s+/)
        const message = open
            ? "Scoping request from the solution finder.\n" +
              "Solution: " + open.n + " (" + open.id + ")\n" +
              "Platform: " + open.p + "\n" +
              "Industry: " + open.ind
            : "Scoping request from the solution finder.\n" +
              "Platform: " + (product || "Not chosen yet") + "\n" +
              "Industry: " + (industry === ALL ? "All" : industry || "Not chosen yet")
        const fields = [
            { objectTypeId: "0-1", name: "firstname", value: first },
            { objectTypeId: "0-1", name: "lastname", value: rest.join(" ") },
            { objectTypeId: "0-1", name: "email", value: em },
            { objectTypeId: "0-1", name: "company", value: co },
            // The form's free-text property; it has no "message" field (label: "Please elaborate on what
            // you'd be hoping to achieve").
            { objectTypeId: "0-1", name: "website_form_submission", value: message },
        ].filter((f) => f.value)

        const context: Record<string, string> = {
            pageUri: window.location.href,
            pageName: document.title,
        }
        // Ties the lead to the visitor's existing HubSpot tracking session.
        const hutk = (document.cookie.match(/(?:^|;\s*)hubspotutk=([^;]+)/) || [])[1]
        if (hutk && /^[a-f0-9]{32}$/i.test(hutk)) context.hutk = hutk

        try {
            const res = await fetch(
                "https://api.hsforms.com/submissions/v3/integration/submit/" +
                    encodeURIComponent(portalId) + "/" + encodeURIComponent(formGuid),
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ fields, context }),
                }
            )
            if (res.ok) {
                setStatus("sent")
                return
            }
            let types: string[] = []
            try {
                const j = await res.json()
                types = (j.errors || []).map((x: { errorType?: string }) => x.errorType || "")
            } catch {
                // non-JSON error body, fall through to the generic message
            }
            if (types.includes("INVALID_EMAIL")) {
                setFieldErrors({ email: "That email does not look right" })
                setStatus("idle")
            } else if (types.includes("BLOCKED_FREE_EMAIL_DOMAIN")) {
                setFieldErrors({ email: "Please use your work email" })
                setStatus("idle")
            } else {
                setStatus("error")
                setErrorMsg("Something went wrong sending that. Please try again.")
            }
        } catch {
            setStatus("error")
            setErrorMsg("Could not send. Check your connection and try again.")
        }
    }

    const scopeButton = (
        <button
            type="button"
            className="ogsf-btn ogsf-btn--ghost"
            style={{ marginLeft: "auto" }}
            onClick={openScope}
        >
            Get it scoped
            <Caret size={10} />
        </button>
    )

    const sizing: CSSProperties =
        aspect === "fill"
            ? { height: "100%" }
            : { aspectRatio: aspect === "portrait" ? "4 / 5" : "1 / 1" }

    return (
        <div
            className={
                "ogsf" + (theme === "dark" ? " ogsf--dark" : "") + (still ? " ogsf-still" : "")
            }
            style={
                {
                    "--accent": accent,
                    "--bg": background,
                    ...sizing,
                    ...style,
                } as CSSProperties
            }
        >
            <style>{CSS}</style>

            {scoping ? (
                /* ---------------- scope screen ---------------- */
                <form className="ogsf-screen ogsf-form" onSubmit={submitScope} noValidate>
                    <div className="ogsf-head">
                        <button
                            type="button"
                            className="ogsf-back ogsf-mono"
                            onClick={() => setScoping(false)}
                        >
                            <Caret size={10} />
                            {"\"Back\""}
                        </button>
                        <span className="ogsf-n ogsf-mono">Get it scoped</span>
                    </div>

                    <div className="ogsf-body">
                        <div className="ogsf-chat">
                            <div className="ogsf-msg">
                                <span className="ogsf-av" />
                                <div className="ogsf-bub">
                                    Interested in getting <strong>{subject}</strong> scoped
                                    for your business? Leave your details and we will come
                                    back to you.
                                </div>
                            </div>

                            {status === "sent" ? (
                                <>
                                    <div className="ogsf-msg ogsf-msg--me">
                                        <div className="ogsf-bub ogsf-bub--me">
                                            {name.trim()}, {company.trim()}
                                            <br />
                                            {email.trim()}
                                        </div>
                                    </div>
                                    <div className="ogsf-msg" role="status">
                                        <span className="ogsf-av" />
                                        <div className="ogsf-bub">
                                            {successMessage.replace(
                                                "{name}",
                                                name.trim().split(/\s+/)[0]
                                            )}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="ogsf-fields">
                                        <label className="ogsf-field">
                                            <span className="ogsf-field-l ogsf-mono">Name</span>
                                            <input
                                                className="ogsf-input"
                                                type="text"
                                                name="name"
                                                autoComplete="name"
                                                placeholder="Jane Smith"
                                                value={name}
                                                aria-invalid={Boolean(fieldErrors.name)}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                            {fieldErrors.name ? (
                                                <span className="ogsf-ferr">{fieldErrors.name}</span>
                                            ) : null}
                                        </label>
                                        <label className="ogsf-field">
                                            <span className="ogsf-field-l ogsf-mono">Work email</span>
                                            <input
                                                className="ogsf-input"
                                                type="email"
                                                name="email"
                                                autoComplete="email"
                                                inputMode="email"
                                                placeholder="jane@company.com"
                                                value={email}
                                                aria-invalid={Boolean(fieldErrors.email)}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                            {fieldErrors.email ? (
                                                <span className="ogsf-ferr">{fieldErrors.email}</span>
                                            ) : null}
                                        </label>
                                        <label className="ogsf-field">
                                            <span className="ogsf-field-l ogsf-mono">Company</span>
                                            <input
                                                className="ogsf-input"
                                                type="text"
                                                name="company"
                                                autoComplete="organization"
                                                placeholder="Company name"
                                                value={company}
                                                aria-invalid={Boolean(fieldErrors.company)}
                                                onChange={(e) => setCompany(e.target.value)}
                                            />
                                            {fieldErrors.company ? (
                                                <span className="ogsf-ferr">{fieldErrors.company}</span>
                                            ) : null}
                                        </label>
                                        <input
                                            className="ogsf-hp"
                                            type="text"
                                            name="website"
                                            tabIndex={-1}
                                            autoComplete="off"
                                            aria-hidden="true"
                                            value={trap}
                                            onChange={(e) => setTrap(e.target.value)}
                                        />
                                    </div>
                                    {errorMsg ? (
                                        <div className="ogsf-alert" role="alert">
                                            {errorMsg}
                                        </div>
                                    ) : null}
                                </>
                            )}
                        </div>
                    </div>

                    <div className="ogsf-foot">
                        {status === "sent" ? (
                            <button
                                type="button"
                                className="ogsf-btn ogsf-btn--ghost"
                                style={{ marginLeft: "auto" }}
                                onClick={() => {
                                    setScoping(false)
                                    setOpenId(null)
                                }}
                            >
                                Back to solutions
                            </button>
                        ) : (
                            <>
                                <span className="ogsf-foot-t">
                                    Only used to get back to you.
                                </span>
                                <button
                                    type="submit"
                                    className="ogsf-btn"
                                    style={{ marginLeft: "auto" }}
                                    disabled={status === "sending"}
                                >
                                    {status === "sending" ? <span className="ogsf-spin" /> : null}
                                    {status === "sending" ? "Sending" : "Send"}
                                </button>
                            </>
                        )}
                    </div>
                </form>
            ) : open ? (
                /* ---------------- detail screen ---------------- */
                <div className="ogsf-screen">
                    <div className="ogsf-head">
                        <button
                            type="button"
                            className="ogsf-back ogsf-mono"
                            onClick={() => setOpenId(null)}
                        >
                            <Caret size={10} />
                            Back
                        </button>
                        <span className="ogsf-n ogsf-mono">{open.id}</span>
                    </div>

                    <div className="ogsf-body">
                        <div className="ogsf-pad">
                            <div className="ogsf-badges">
                                <span className="ogsf-badge ogsf-badge--a ogsf-mono">
                                    {open.ind}
                                </span>
                                <span className="ogsf-badge ogsf-badge--hub ogsf-mono">
                                    {open.hub}
                                </span>
                            </div>

                            <h3 className="ogsf-dn">{open.n}</h3>
                            <p className="ogsf-dd">{open.d}</p>

                            <div className="ogsf-facts">
                                <div className="ogsf-fact">
                                    <div className="ogsf-fact-k ogsf-mono">Scope</div>
                                    <div className="ogsf-fact-v">{open.sc}</div>
                                </div>
                                <div className="ogsf-fact">
                                    <div className="ogsf-fact-k ogsf-mono">Users</div>
                                    <div className="ogsf-fact-v">{open.u}</div>
                                </div>
                                <div className="ogsf-fact">
                                    <div className="ogsf-fact-k ogsf-mono">Strength</div>
                                    <div className="ogsf-fact-v">{open.st}</div>
                                </div>
                            </div>

                            {open.o.length ? (
                                <>
                                    <div className="ogsf-sec ogsf-mono">Outcomes</div>
                                    <ul className="ogsf-out">
                                        {open.o.map((o, i) => (
                                            <li key={i}>{o}</li>
                                        ))}
                                    </ul>
                                </>
                            ) : null}

                            {open.b.length ? (
                                <>
                                    <div className="ogsf-sec ogsf-mono">What we build</div>
                                    <div className="ogsf-rows">
                                        {open.b.map((m, i) => (
                                            <div key={i}>
                                                <div className="ogsf-row-l">{m.l}</div>
                                                {m.s ? (
                                                    <div className="ogsf-row-s">{m.s}</div>
                                                ) : null}
                                                {m.h ? (
                                                    <div className="ogsf-row-h">{m.h}</div>
                                                ) : null}
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : null}

                            {open.per.length ? (
                                <>
                                    <div className="ogsf-sec ogsf-mono">Who it is for</div>
                                    <div className="ogsf-rows">
                                        {open.per.map((m, i) => (
                                            <div key={i}>
                                                <div className="ogsf-row-l">{m.l}</div>
                                                <div className="ogsf-row-s">{m.t}</div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : null}

                            {open.ph.length ? (
                                <>
                                    <div className="ogsf-sec ogsf-mono">Delivery</div>
                                    {open.ph.map((p, i) => (
                                        <div className="ogsf-phase" key={i}>
                                            <span className="ogsf-pn ogsf-mono">
                                                {"0" + (i + 1)}
                                            </span>
                                            <span className="ogsf-pt">{p}</span>
                                        </div>
                                    ))}
                                </>
                            ) : null}

                            {open.k.length ? (
                                <>
                                    <div className="ogsf-sec ogsf-mono">KPIs it moves</div>
                                    <div className="ogsf-tags">
                                        {open.k.map((k, i) => (
                                            <span className="ogsf-tag ogsf-mono" key={i}>
                                                {k}
                                            </span>
                                        ))}
                                    </div>
                                </>
                            ) : null}

                            {open.intg.length ? (
                                <>
                                    <div className="ogsf-sec ogsf-mono">Integrations</div>
                                    <div className="ogsf-tags">
                                        {open.intg.map((k, i) => (
                                            <span className="ogsf-tag ogsf-mono" key={i}>
                                                {k}
                                            </span>
                                        ))}
                                    </div>
                                </>
                            ) : null}
                        </div>
                    </div>

                    <div className="ogsf-foot">
                        <span className="ogsf-foot-t">Want this scoped for your business?</span>
                        {scopeButton}
                    </div>
                </div>
            ) : (
                /* ---------------- conversation screen ---------------- */
                <div className="ogsf-screen">
                    <div className="ogsf-head">
                        <span className="ogsf-dot" />
                        <span className="ogsf-title ogsf-mono">{label}</span>
                        <span className="ogsf-head-r">
                            {onCanvas && !connected ? (
                                <span className="ogsf-note ogsf-mono">Form not connected</span>
                            ) : null}
                            {product ? (
                                <button
                                    type="button"
                                    className="ogsf-restart ogsf-mono"
                                    onClick={restart}
                                >
                                    Start over
                                </button>
                            ) : (
                                <span className="ogsf-n ogsf-mono">
                                    {SOLUTIONS.length} builds
                                </span>
                            )}
                        </span>
                    </div>

                    <div className="ogsf-body" ref={bodyRef}>
                        <div className="ogsf-chat" aria-live="polite">
                            {/* 1. platform */}
                            <div
                                className="ogsf-block ogsf-in"
                                ref={!product ? latestRef : undefined}
                            >
                                <Bot>{greeting}</Bot>
                                {stage === "platform" ? (
                                    <div className="ogsf-qr" role="group" aria-label="Platform">
                                        {PRODUCTS.map((p) => (
                                            <button
                                                key={p}
                                                type="button"
                                                className="ogsf-qr-b"
                                                onClick={() => pickProduct(p)}
                                            >
                                                {short(p)}
                                            </button>
                                        ))}
                                    </div>
                                ) : null}
                            </div>

                            {product ? (
                                <div ref={!industry ? latestRef : undefined}>
                                    <Me>{short(product)}</Me>
                                </div>
                            ) : null}

                            {/* 2. industry */}
                            {product ? (
                                stage === "industry" && typing ? (
                                    <div className="ogsf-in">
                                        <Typing />
                                    </div>
                                ) : (
                                    <div
                                        className="ogsf-block ogsf-in"
                                    >
                                        <Bot>
                                            {short(product)} it is. Which industry are you in?
                                        </Bot>
                                        {stage === "industry" ? (
                                            <div
                                                className="ogsf-qr"
                                                role="group"
                                                aria-label="Industry"
                                            >
                                                {industries.map(([name, count]) => (
                                                    <button
                                                        key={name}
                                                        type="button"
                                                        className="ogsf-qr-b"
                                                        onClick={() => pickIndustry(name)}
                                                    >
                                                        {name}
                                                        <span>{count}</span>
                                                    </button>
                                                ))}
                                                <button
                                                    type="button"
                                                    className="ogsf-qr-b ogsf-qr-b--quiet"
                                                    onClick={() => pickIndustry(ALL)}
                                                >
                                                    Show me everything
                                                    <span>{totalForProduct}</span>
                                                </button>
                                            </div>
                                        ) : null}
                                    </div>
                                )
                            ) : null}

                            {industry ? (
                                <div ref={latestRef}>
                                    <Me>{industry === ALL ? "Show me everything" : industry}</Me>
                                </div>
                            ) : null}

                            {/* 3. results */}
                            {industry ? (
                                typing ? (
                                    <div className="ogsf-in">
                                        <Typing />
                                    </div>
                                ) : (
                                    <div className="ogsf-block ogsf-in">
                                        <Bot>{resultsIntro}</Bot>
                                        {n ? (
                                            <div className="ogsf-results">
                                                {matches.map((s) => (
                                                    <button
                                                        key={s.id}
                                                        type="button"
                                                        className="ogsf-item"
                                                        onClick={() => openSolution(s.id)}
                                                    >
                                                        <span className="ogsf-item-c">
                                                            <span className="ogsf-item-n">{s.n}</span>
                                                            <span className="ogsf-item-u">{s.uc}</span>
                                                        </span>
                                                        <Caret />
                                                    </button>
                                                ))}
                                            </div>
                                        ) : null}
                                        <div className="ogsf-qr">
                                            <button
                                                type="button"
                                                className="ogsf-qr-b ogsf-qr-b--quiet"
                                                onClick={changeIndustry}
                                            >
                                                Change industry
                                            </button>
                                            <button
                                                type="button"
                                                className="ogsf-qr-b ogsf-qr-b--quiet"
                                                onClick={restart}
                                            >
                                                Start over
                                            </button>
                                        </div>
                                    </div>
                                )
                            ) : null}
                        </div>
                    </div>

                    <div className="ogsf-foot">
                        <span className="ogsf-foot-t">
                            Want a build scoped for your business?
                        </span>
                        {scopeButton}
                    </div>
                </div>
            )}
        </div>
    )
}

