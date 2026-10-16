"use client";

// The footer "Stay in the loop" form. Framer posts it as multipart form data to its Forms API (the
// action below, taken from script_main.js) and swaps the "Form Small" button through Loading
// (spinner) to Success ("Thank you!") or Error ("Error!"). The email stays in the field afterwards,
// as on Framer. The hidden honeypot inputs are Framer's; a filled honeypot is never sent.
import { useState, type FormEvent } from "react";
import s from "./NewsletterForm.module.css";
import { track } from "@/lib/measurement";

export const NEWSLETTER_ACTION = "https://api.framer.com/forms/v1/forms/a3f2477d-af4e-4d8e-b250-ca504340d930/submit";
const FRAMER_SITE_ID = "13a82e52233268a4d6d76bac5d848262f6b97e293aab7c7823bae336f017699e";
const HONEYPOTS = ["website", "company", "message", "subject", "title", "description", "feedback", "notes", "details", "remarks", "comments"];

type State = "Default" | "Loading" | "Disabled" | "Success" | "Error";

export default function NewsletterForm() {
  const [state, setState] = useState<State>("Default");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "Loading") return;
    const form = new FormData(e.currentTarget);
    if (HONEYPOTS.some((n) => String(form.get(n) ?? "") !== "")) {
      setState("Success");
      return;
    }
    const body = new FormData();
    body.append("Email", String(form.get("Email") ?? ""));
    setState("Loading");
    try {
      const res = await fetch(NEWSLETTER_ACTION, {
        method: "POST",
        body,
        headers: { "framer-site-id": FRAMER_SITE_ID, "framer-form-fields": "Email" },
      });
      setState(res.ok ? "Success" : "Error");
      // A newsletter sign-up, not a sales lead: kept out of generate_lead on purpose.
      if (res.ok) track("sign_up", { method: "newsletter", page: window.location.pathname });
    } catch {
      setState("Error");
    }
  }

  const label = state === "Success" ? "Thank you!" : state === "Error" ? "Error!" : "Subscribe";

  return (
    <form className={s.form} onSubmit={onSubmit}>
      <label className={s.label} data-framer-name="Email">
        <div className={s.field}>
          <input className={s.input} type="email" required name="Email" placeholder="Enter your email" />
        </div>
      </label>
      <div className={s.submitBox}>
        <button type="submit" className={s.submit} data-framer-name={state} data-state={state} disabled={state === "Disabled"}>
          {state === "Loading" ? (
            <div className={s.spinner} data-framer-name="Spinner">
              <div className={s.conic} data-framer-name="Conic">
                <div className={s.rounding} data-framer-name="Rounding" />
              </div>
            </div>
          ) : (
            <div className={s.container} data-framer-name="Container">
              <span className={`p-cguwu ${s.t1}`}>{label}</span>
              <span className={`p-cguwu ${s.t2}`} aria-hidden>
                {state === "Default" ? label : "Subscribe"}
              </span>
            </div>
          )}
        </button>
      </div>
      {HONEYPOTS.map((n) => (
        <input
          key={n}
          type="text"
          name={n}
          tabIndex={-1}
          autoComplete="one-time-code"
          aria-hidden="true"
          className={s.honeypot}
          data-1p-ignore="true"
          data-lpignore="true"
          data-form-type="other"
          data-bwignore="true"
          defaultValue=""
        />
      ))}
    </form>
  );
}
