// TEMPORARY: echoes the request headers Vercel receives, to find out whether
// Cloudflare forwards the visitor's scheme. Remove once the HTTPS redirect works.
export const config = { matcher: '/__hdr-echo-7f3a' };

export default function middleware(request) {
  return new Response(JSON.stringify(Object.fromEntries(request.headers), null, 2), {
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });
}
