import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { SITE_URL } from "@/../site.config";

// IndexNow key — matches /public/{KEY}.txt that search engines fetch
// to verify ownership. https://www.indexnow.org/documentation
// Bing, Yandex, Seznam, and Naver all accept submissions via this
// endpoint. Google does NOT participate — Google discovers new content
// via sitemap.xml + organic crawl.
const INDEXNOW_KEY = "a7afad83b11a326a5f31b1ea7880bfb5";
const INDEXNOW_HOST = new URL(SITE_URL).host;
const INDEXNOW_KEY_LOCATION = `${SITE_URL.replace(/\/$/, "")}/${INDEXNOW_KEY}.txt`;

/**
 * Ping IndexNow with a list of URLs that just changed. Never raises —
 * logs a warning and continues so a third-party outage can't block the
 * revalidation path.
 */
async function submitToIndexNow(urls: string[]): Promise<void> {
  if (urls.length === 0) return;
  try {
    const resp = await fetch("https://api.indexnow.org/IndexNow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        host: INDEXNOW_HOST,
        key: INDEXNOW_KEY,
        keyLocation: INDEXNOW_KEY_LOCATION,
        urlList: urls,
      }),
    });
    if (!resp.ok) {
      console.warn(
        `[indexnow] submission returned ${resp.status} for ${urls.length} URL(s)`
      );
    }
  } catch (e) {
    console.warn(`[indexnow] submission errored:`, e);
  }
}

/**
 * Supabase database webhook receiver.
 *
 * Configure in the Supabase dashboard:
 *   Database → Webhooks → Create a new hook
 *   Table:  pages
 *   Events: INSERT, UPDATE, DELETE
 *   Type:   HTTP Request → POST
 *   URL:    https://<SITE_HOST>/api/supabase-webhook
 *   HTTP Headers: x-webhook-secret: <REVALIDATE_SECRET value>
 *
 * When a row change affects something currently-or-formerly visible to
 * the public (status=published on either side of the change), this
 * endpoint calls revalidatePath() on the row's url_slug so the ISR
 * cache refreshes on the next request instead of waiting up to the
 * route's revalidate interval.
 *
 * Draft-only changes (draft → draft) are ignored.
 *
 * Auth reuses REVALIDATE_SECRET so there's one value to rotate.
 */

interface SupabaseWebhookPayload {
  type: "INSERT" | "UPDATE" | "DELETE";
  table: string;
  schema: string;
  record: {
    url_slug?: string;
    status?: string;
    [key: string]: unknown;
  } | null;
  old_record: {
    url_slug?: string;
    status?: string;
    [key: string]: unknown;
  } | null;
}

// Derive the parent-index path to also revalidate when a child page
// changes. For `/services/exterior-living` that's `/services`. For
// `/blog/foo` that's `/blog`. Helps avoid "I published but the index
// still shows the old list" confusion. Returns null for root or
// single-segment paths (those ARE index pages).
function parentIndex(path: string): string | null {
  const segments = path.split("/").filter(Boolean);
  if (segments.length < 2) return null;
  return `/${segments[0]}`;
}

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-webhook-secret");
  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  let payload: SupabaseWebhookPayload;
  try {
    payload = (await request.json()) as SupabaseWebhookPayload;
  } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  if (payload.table !== "pages") {
    return NextResponse.json({ ignored: "wrong table", table: payload.table });
  }

  const currentStatus = payload.record?.status;
  const prevStatus = payload.old_record?.status;
  const path = payload.record?.url_slug ?? payload.old_record?.url_slug;

  if (!path || typeof path !== "string") {
    return NextResponse.json({ ignored: "no url_slug in payload" });
  }

  // Revalidate if the row is currently published OR was previously
  // published. Covers every case that affects the public cache:
  //   INSERT  with status=published  → new page appears
  //   UPDATE  draft → published      → page goes live
  //   UPDATE  published → draft      → page disappears
  //   UPDATE  published → published  → content edit flushes cache
  //   DELETE  of a published row     → page disappears
  // Draft-only changes are ignored.
  const shouldRevalidate =
    currentStatus === "published" || prevStatus === "published";

  if (!shouldRevalidate) {
    return NextResponse.json({
      ignored: "draft-only change",
      path,
      type: payload.type,
    });
  }

  revalidatePath(path);

  const siteOrigin = SITE_URL.replace(/\/$/, "");
  const indexNowUrls: string[] = [`${siteOrigin}${path}`];
  const parent = parentIndex(path);
  if (parent) {
    revalidatePath(parent);
    indexNowUrls.push(`${siteOrigin}${parent}`);
  }

  // Tell Bing / Yandex / Seznam / Naver about the change immediately.
  // Only fire for publish-forward transitions (not unpublish) so we're
  // not asking search engines to recrawl a URL that now 404s.
  const becamePublished =
    currentStatus === "published" &&
    (payload.type === "INSERT" || prevStatus !== "published");
  const contentEdit =
    currentStatus === "published" && prevStatus === "published";

  let indexNowSubmitted = false;
  if (becamePublished || contentEdit) {
    await submitToIndexNow(indexNowUrls);
    indexNowSubmitted = true;
  }

  return NextResponse.json({
    revalidated: true,
    path,
    parent_revalidated: parent,
    type: payload.type,
    old_status: prevStatus,
    new_status: currentStatus,
    indexnow_submitted: indexNowSubmitted,
    indexnow_urls: indexNowSubmitted ? indexNowUrls.length : 0,
    timestamp: Date.now(),
  });
}
