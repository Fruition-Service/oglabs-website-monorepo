"use client";

import { useEffect } from "react";
import { BOOKING_HOSTS, CTA_PATHS, captureAttribution, track, trackConversion } from "@/lib/measurement";

/* Site-wide click instrumentation: one delegated listener in the capture phase
   (so a component's stopPropagation cannot hide a click) covers every current
   and future link without per-component wiring.

     booking_click   a link to the booking calendar          conversion
     contact_click   mailto: / tel: / WhatsApp               conversion
     cta_click       an internal link to the contact page    funnel signal

   Outbound clicks, scrolls and file downloads are already reported by GA4
   enhanced measurement, so they are not repeated here. Form submissions are
   tracked where the form gets its success response, never on the button press. */

function labelFor(el: HTMLElement): string {
  const text = (el.getAttribute("aria-label") || el.textContent || "").replace(/\s+/g, " ").trim();
  // Animated buttons render their label twice (one copy slides in on hover).
  const half = text.length / 2;
  const once = Number.isInteger(half) && text.slice(0, half) === text.slice(half) ? text.slice(0, half) : text;
  return once.slice(0, 80);
}

function onClick(e: MouseEvent) {
  const a = (e.target as HTMLElement | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
  if (!a) return;
  let url: URL;
  try {
    url = new URL(a.href, window.location.href);
  } catch {
    return;
  }
  const label = labelFor(a);
  const page = window.location.pathname;
  if (BOOKING_HOSTS.some((h) => url.hostname === h || url.hostname.endsWith(`.${h}`))) {
    // Without the query string: booking tools append their own tracking parameters.
    trackConversion("booking_click", { method: url.hostname, link_url: url.origin + url.pathname, cta_text: label, page });
  } else if (
    // A mailto: with no address is a "share by email" button, not someone writing to us.
    (url.protocol === "mailto:" && url.pathname) ||
    url.protocol === "tel:" ||
    /(^|\.)wa\.me$|whatsapp\.com$/.test(url.hostname)
  ) {
    const method = url.protocol === "mailto:" ? "email" : url.protocol === "tel:" ? "phone" : "whatsapp";
    trackConversion("contact_click", { method, cta_text: label, page });
  } else if (url.hostname === window.location.hostname && CTA_PATHS.some((p) => url.pathname.replace(/\/$/, "") === p)) {
    track("cta_click", { cta_text: label, cta_dest: url.pathname, page });
  }
}

export function MeasurementListener() {
  useEffect(() => {
    captureAttribution();
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
