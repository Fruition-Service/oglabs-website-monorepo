import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

// Called by the OG Labs content portal (oglabs.io/internal) when it releases, edits or takes down a
// post, so the blog shows the change at once instead of after the feed's five-minute cache. Bearer
// REVALIDATE_SECRET (SITE_REVALIDATE_SECRET on the portal side); fails closed when unset.
export async function POST(req: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await req.json().catch(() => ({}))) as { slugs?: unknown };
  const slugs = Array.isArray(body.slugs) ? body.slugs.filter((s): s is string => typeof s === "string" && /^[a-z0-9-]+$/.test(s)) : [];
  // Expired outright so the next render fetches the feed (and HubSpot); src/lib/pipeline.ts falls back if it is down.
  revalidateTag("blog", { expire: 0 });
  for (const path of ["/", "/blogs", "/about", "/sitemap.xml"]) revalidatePath(path);
  for (const slug of slugs) revalidatePath(`/blogs/${slug}`);
  return NextResponse.json({ ok: true, revalidated: slugs });
}
