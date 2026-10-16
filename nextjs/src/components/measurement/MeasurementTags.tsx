import {
  CF_BEACON_LOADER,
  CLARITY_LOADER,
  GA4_MEASUREMENT_ID,
  GTAG_INIT,
  GTM_CONTAINER_ID,
  GTM_LOADER,
  MEASUREMENT_GUARD,
} from "@/lib/measurement";

/* The measurement tags, server-rendered at the top of <head> so they are in the
   initial HTML (Google's tag checker and Search Console read raw HTML). The
   guard must stay first: every tag after it reads window.__msMeasure. */
export function MeasurementHead() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: MEASUREMENT_GUARD }} />
      {GTM_LOADER && <script dangerouslySetInnerHTML={{ __html: GTM_LOADER }} />}
      {GA4_MEASUREMENT_ID && (
        <>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`} />
          <script dangerouslySetInnerHTML={{ __html: GTAG_INIT }} />
        </>
      )}
      {CLARITY_LOADER && <script dangerouslySetInnerHTML={{ __html: CLARITY_LOADER }} />}
      {CF_BEACON_LOADER && <script dangerouslySetInnerHTML={{ __html: CF_BEACON_LOADER }} />}
    </>
  );
}

/** GTM's <noscript> fallback, first thing in <body>. */
export function MeasurementBodyStart() {
  if (!GTM_CONTAINER_ID) return null;
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}
