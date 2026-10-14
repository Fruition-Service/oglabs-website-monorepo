"use client";

// Port of Framer's HubSpot form component (function G in module MQ9h7EPI1D…): loads
// https://js-<region>.hsforms.net/forms/shell.js once (or reuses window.hbspt), polls every 200ms
// until `hbspt` exists, then creates the form in a fresh `hubspot_form_<random>` div (100% x 100%)
// appended inside a display:contents wrapper. HubSpot renders the form in its own iframe.
//
// Never submit this form with test data: every submission is a real lead. Intercept requests instead.
// Framer's optional submit tracking (trackingId) is not set on this page, so it is not ported.
import { useEffect, useRef, useState } from "react";

type Hbspt = { forms: { create: (opts: { region: string; portalId: string; formId: string; target: string }) => void } };
declare global {
  interface Window {
    hbspt?: Hbspt;
  }
}

/** Framer's poll(): retry `fn` every `interval` ms, at most `max` times. */
function poll(fn: () => boolean | undefined, interval = 200, max = 300 * 5, attempt = 0) {
  if (attempt > max) {
    console.error("poll max attempts", fn);
    return;
  }
  if (!fn()) setTimeout(() => poll(fn, interval, max, attempt + 1), interval);
}

export default function HubSpotForm({ portalId, formId, region }: { portalId: string; formId: string; region: string }) {
  const [loaded, setLoaded] = useState(() => typeof window !== "undefined" && !!window.hbspt);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!region || loaded) return;
    if (window.hbspt) {
      // Already on the page (client-side navigation back to /contact): Framer flips its flag at once.
      const raf = requestAnimationFrame(() => setLoaded(true));
      return () => cancelAnimationFrame(raf);
    }
    const script = document.createElement("script");
    script.src = `https://js-${region}.hsforms.net/forms/shell.js`;
    script.async = true;
    script.onload = () =>
      poll(() => {
        if (window.hbspt) {
          setLoaded(true);
          return true;
        }
      });
    document.body.appendChild(script);
  }, [loaded, region]);

  useEffect(() => {
    const host = ref.current;
    if (!portalId || !formId || !loaded || !host || !window.hbspt) return;
    const target = document.createElement("div");
    const id = `hubspot_form_${Math.random().toString(36).substr(2, 8)}`;
    target.setAttribute("id", id);
    target.style.width = "100%";
    target.style.height = "100%";
    host.appendChild(target);
    window.hbspt.forms.create({ region, portalId, formId, target: `#${id}` });
    return () => {
      if (host.contains(target)) host.removeChild(target);
    };
  }, [loaded, portalId, formId, region]);

  return <div style={{ display: "contents" }} ref={ref} />;
}
