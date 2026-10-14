"use client";

// The designed contact form from the Framer page (module isc8sCDM, Framer republish of 14 Oct 2026
// 07:51 UTC), submitting to HubSpot instead of Framer Forms: the same HubSpot form the home Solution
// Finder posts to (portal 442278519, form 8b0a9d02-…, region ap1), via the forms submission API with
// a JSON body of fields + context, as in src/components/home/finder/SolutionFinder.tsx.
//
// HubSpot form fields (public render definition): firstname*, lastname*, email*, company*, phone,
// website_form_submission ("Please elaborate on what you'd be hoping to achieve"). This form has no
// company field, so HubSpot rejects submissions as long as Company Name stays required there.
// Country/Region has no HubSpot field; it is appended to the message.
//
// States follow the Framer "Form" button: Default -> Loading (spinner) -> "Thank you!" on a 2xx,
// "Error!" otherwise. Like Framer, the form does not submit again after either.
//
// NEVER submit this with test data: every POST is a real lead and an email to the founder. Test by
// intercepting https://api.hsforms.com/** with Playwright page.route.
import Link from "next/link";
import { motion } from "motion/react";
import { useState, type FormEvent, type KeyboardEvent } from "react";
import Txt from "@/components/about/Txt";
import s from "./Contact.module.css";

const PORTAL_ID = "442278519";
const FORM_GUID = "8b0a9d02-cee6-417f-a608-52e77c0ec384";
const SUBMIT_URL = `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_GUID}`;
/** The form's free-text property (its label: "Please elaborate on what you'd be hoping to achieve"). */
const MESSAGE_FIELD = "website_form_submission";

const LOCATIONS: [string, string][] = [
  ["Amsterdam", "amsterdam"], ["Bangkok", "Bangkok"], ["Berlin", "berlin"], ["Bejing", "Bejing"], ["Cairo", "Cairo"],
  ["Copenhagen", "copenhagen"], ["Delhi", "Delhi"], ["Dhaka", "Dhaka"], ["Dubai", "dubai"], ["Guangzhou", "Guangzhou"],
  ["Jakarta", "Jakarta"], ["Kolkata", "Kolkata"], ["Manila", "Manila"], ["Mexico City", "Mexico City"], ["New York", "new york"],
  ["San Francisco", "san francisco"], ["Shanghai", "Shanghai"], ["Singapore", "Singapore"], ["Seoul", "Seoul"], ["Sydney", "Sydney"],
  ["Tokyo", "tokyo"], ["Warsaw", "warsaw"],
];

type FormState = "incomplete" | "complete" | "pending" | "success" | "error";

/** Builds the HubSpot submission body from the form. */
function hubspotPayload(form: HTMLFormElement) {
  const data = new FormData(form);
  const get = (k: string) => String(data.get(k) ?? "").trim();
  const location = get("Location");
  const locationTitle = LOCATIONS.find(([, v]) => v === location)?.[0] ?? location;
  const message = [get("Your message"), locationTitle ? `Country/Region: ${locationTitle}` : ""].filter(Boolean).join("\n\n");
  const fields = [
    { objectTypeId: "0-1", name: "firstname", value: get("First Name") },
    { objectTypeId: "0-1", name: "lastname", value: get("Last Name") },
    { objectTypeId: "0-1", name: "email", value: get("Email") },
    { objectTypeId: "0-1", name: MESSAGE_FIELD, value: message },
  ].filter((f) => f.value);
  const context: Record<string, string> = { pageUri: window.location.href, pageName: document.title };
  // Ties the lead to the visitor's HubSpot tracking session.
  const hutk = (document.cookie.match(/(?:^|;\s*)hubspotutk=([^;]+)/) || [])[1];
  if (hutk && /^[a-f0-9]{32}$/i.test(hutk)) context.hutk = hutk;
  return { fields, context };
}

/** True when a required field is still empty (Framer's "incomplete" state). */
function hasEmptyRequired(form: HTMLFormElement) {
  return Array.from(form.querySelectorAll<HTMLInputElement>("input, textarea, select")).some((f) => f.required && f.value === "");
}

function SubmitButton({ state }: { state: FormState }) {
  const shown = state === "pending" ? "pending" : state === "success" ? "success" : state === "error" ? "error" : "idle";
  const label = shown === "success" ? "Thank you!" : shown === "error" ? "Error!" : "Submit";
  const color = { color: "var(--token-a9ada049-76e9-4f1f-8c74-adc974e9300d, rgb(255, 255, 255))", textAlign: "center" as const };
  return (
    <div className={s.submitContainer}>
      <button type="submit" className={s.submit} data-state={shown} data-reset="button" data-framer-name={{ idle: "Default", pending: "Loading", success: "Success", error: "Error" }[shown]}>
        {shown === "pending" ? (
          <div className={s.spinner} data-framer-name="Spinner">
            <div className={s.conic}>
              <div className={s.rounding} />
            </div>
          </div>
        ) : (
          <div className={s.submitLabel} data-framer-name="Container">
            <p className={`p-1721m7s ${s.submitText}`} style={color}>
              {label}
            </p>
            <p aria-hidden="true" className={`p-1721m7s ${s.submitTextNext}`} style={color}>
              Submit
            </p>
          </div>
        )}
      </button>
    </div>
  );
}

export default function ContactForm() {
  const [state, setState] = useState<FormState>("incomplete");

  const submit = async (form: HTMLFormElement) => {
    if (state !== "incomplete" && state !== "complete") return;
    const body = hubspotPayload(form);
    setState("pending");
    try {
      const res = await fetch(SUBMIT_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      setState(res.ok ? "success" : "error");
      if (!res.ok) console.error("HubSpot form submission failed", res.status, await res.text().catch(() => ""));
    } catch (e) {
      setState("error");
      console.error(e);
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void submit(e.currentTarget);
  };
  const onKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.target instanceof HTMLTextAreaElement) return;
    if (e.key === "Enter" && e.currentTarget.checkValidity()) {
      e.preventDefault();
      void submit(e.currentTarget);
    }
  };
  const onChange = (e: FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    setState((prev) => (prev === "pending" || prev === "success" || prev === "error" ? prev : hasEmptyRequired(form) ? "incomplete" : "complete"));
  };

  const labelColor = "var(--token-ead00dcb-2b22-4edd-af15-9859b50e46de, rgba(0, 0, 0, 0.64))";
  return (
    <motion.form
      className={s.form}
      data-framer-name="Form"
      initial={{ opacity: 0.001, y: 36 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 50, mass: 1, delay: 1.2 }}
      onSubmit={onSubmit}
      onKeyDown={onKeyDown}
      onChange={onChange}
    >
      <Txt className={s.text} preset="p-2rl9ro" color="var(--token-442a8080-47a9-427e-9581-c23ce6c42231, rgb(0, 0, 0))" align="left">
        Send us a message
      </Txt>
      <div className={s.inputs} data-framer-name="Inputs">
        <div className={s.row}>
          <label className={s.field}>
            <Txt className={s.text} preset="p-y0gzpf" color={labelColor} align="left">
              First name*
            </Txt>
            <div className={s.input}>
              <input type="text" required name="First Name" placeholder="" autoComplete="given-name" className={s.control} />
            </div>
          </label>
          <label className={s.field}>
            <Txt className={s.text} preset="p-y0gzpf" color={labelColor} align="left">
              Last name*
            </Txt>
            <div className={s.input}>
              <input type="text" required name="Last Name" placeholder="" autoComplete="family-name" className={s.control} />
            </div>
          </label>
        </div>
        <div className={s.row}>
          <label className={s.field}>
            <Txt className={s.text} preset="p-y0gzpf" color={labelColor} align="left">
              Email address*
            </Txt>
            <div className={s.input}>
              <input type="email" required name="Email" placeholder="" autoComplete="email" className={s.control} />
            </div>
          </label>
          <label className={s.field}>
            <Txt className={`${s.text} ${s.labelLocation}`} preset="p-y0gzpf" color={labelColor} align="left">
              Country/Region
            </Txt>
            <div className={s.select}>
              <select name="Location" className={s.control} defaultValue="">
                <option value="" disabled>
                  Select…
                </option>
                {LOCATIONS.map(([title, value]) => (
                  <option key={value} value={value}>
                    {title}
                  </option>
                ))}
              </select>
            </div>
          </label>
        </div>
        <label className={s.messageField}>
          <Txt className={s.text} preset="p-y0gzpf" color={labelColor} align="left">
            Your message
          </Txt>
          <div className={s.textarea}>
            <textarea name="Your message" placeholder="" className={s.control} />
          </div>
        </label>
      </div>
      <Txt className={s.legal} preset="p-y0gzpf" color={labelColor} align="left">
        By submitting the form, you agree to receive communications from us and to data processing in accordance with our{" "}
        <Link href="/legal/terms-of-service">Terms</Link> &amp; <Link href="/legal/privacy-policy">Privacy Policy</Link>.
      </Txt>
      <SubmitButton state={state} />
    </motion.form>
  );
}
