import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

/**
 * Revalidation endpoint.
 *
 * Called by the agents (seo-site-agents/src/lib/supabase_client.py
 * notify_site_revalidate) after a page is flipped to `published`. Accepts
 * either a single `path` or an array of `paths`.
 *
 * Authenticated via `secret` in the JSON body — must match the
 * REVALIDATE_SECRET env var set in both repos. Body-based rather than
 * header-based so the Python agent can POST the secret alongside the
 * path in a single JSON payload without two request customizations.
 *
 * Example curl:
 *   curl -X POST https://example.com/api/revalidate \
 *     -H "content-type: application/json" \
 *     -d '{"secret": "'"$REVALIDATE_SECRET"'", "path": "/roofing/miami"}'
 */
export async function POST(request: Request) {
  const expected = process.env.REVALIDATE_SECRET;

  if (!expected) {
    return NextResponse.json(
      { error: "REVALIDATE_SECRET not configured on the server" },
      { status: 500 }
    );
  }

  let body: { secret?: string; path?: string; paths?: string[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON body" }, { status: 400 });
  }

  if (body.secret !== expected) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const paths = body.paths ?? (body.path ? [body.path] : []);
  if (paths.length === 0) {
    return NextResponse.json(
      { error: "must provide `path` (string) or `paths` (string[])" },
      { status: 400 }
    );
  }

  const revalidated: string[] = [];
  for (const p of paths) {
    if (typeof p !== "string" || !p.startsWith("/")) continue;
    revalidatePath(p);
    revalidated.push(p);
  }

  return NextResponse.json({ revalidated, now: Date.now() });
}
