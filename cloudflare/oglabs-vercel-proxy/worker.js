// oglabs-vercel-proxy: Cloudflare Worker on oglabs.io/* and www.oglabs.io/* in front of the
// Vercel project oglabs-website (oglabs-website.vercel.app).
//
// Bodies pass through untouched and streamed. Until 18 Oct 2026 this Worker rewrote
// "www.oglabs.io" (and the old orangegrowth.io / vercel.app hosts) inside every HTML and XML
// body. The Next.js app already emits canonical https://oglabs.io URLs, and rewriting its HTML
// corrupts the length-prefixed React Server Components payload (e.g. `2:T551,` chunks), which
// stopped the page from hydrating: every animated heading stayed at opacity 0. Only redirect
// Location headers are still canonicalized.

addEventListener("fetch", event => {
  event.respondWith(handle(event.request));
});

async function handle(request) {
  const upstream = new URL(request.url);
  upstream.protocol = "https:";
  upstream.hostname = "oglabs-website.vercel.app";
  upstream.port = "";

  const requestHeaders = new Headers(request.headers);
  requestHeaders.delete("host");
  const init = {
    method: request.method,
    headers: requestHeaders,
    redirect: "manual"
  };
  if (request.method !== "GET" && request.method !== "HEAD") {
    init.body = request.body;
  }

  const origin = await fetch(upstream.toString(), init);
  const responseHeaders = new Headers(origin.headers);
  responseHeaders.set("x-oglabs-origin", "vercel-nextjs");

  const location = responseHeaders.get("location");
  if (location) {
    responseHeaders.set("location", canonicalize(location));
  }

  return new Response(origin.body, {
    status: origin.status,
    statusText: origin.statusText,
    headers: responseHeaders
  });
}

function canonicalize(value) {
  return value
    .replaceAll("www.orangegrowth.io", "oglabs.io")
    .replaceAll("orangegrowth.io", "oglabs.io")
    .replaceAll("www.oglabs.io", "oglabs.io")
    .replaceAll("oglabs-website.vercel.app", "oglabs.io");
}
