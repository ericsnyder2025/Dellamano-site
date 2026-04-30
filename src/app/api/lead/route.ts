import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

/**
 * POST /api/lead — lead form submission endpoint.
 *
 * Writes to Supabase `leads` table (see dellamano-agents/migrations/leads_table.sql).
 * The table's RLS allows anon inserts; reads/updates require the service role.
 *
 * Expected JSON body:
 *   { name, email, phone, service?, message?, source_url?, hp? }
 *
 * `hp` is a honeypot field — if populated, silently accept and do nothing.
 */

type LeadBody = {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
  source_url?: string;
  hp?: string;
};

function sanitize(v: string | undefined, max = 500): string | null {
  if (!v) return null;
  const trimmed = v.trim().slice(0, max);
  return trimmed.length > 0 ? trimmed : null;
}

export async function POST(req: Request) {
  let body: LeadBody = {};
  try {
    body = (await req.json()) as LeadBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot — silently succeed without writing anything
  if (body.hp && body.hp.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = sanitize(body.name, 120);
  const email = sanitize(body.email, 200);
  const phone = sanitize(body.phone, 40);
  const service = sanitize(body.service, 80);
  const message = sanitize(body.message, 2000);
  const sourceUrl = sanitize(body.source_url, 500);

  if (!name || !email || !phone) {
    return NextResponse.json(
      { error: "name, email, and phone are required" },
      { status: 400 }
    );
  }

  // Fold service + message into notes so we don't need schema changes.
  const notes = [
    service ? `Service interest: ${service}` : null,
    message ? `Message: ${message}` : null,
  ]
    .filter(Boolean)
    .join("\n\n");

  const supabase = createClient();
  const { error } = await supabase.from("leads").insert({
    name,
    email,
    phone,
    source_url: sourceUrl,
    notes: notes || null,
    status: "new",
  });

  if (error) {
    console.error("[api/lead] insert failed:", error.message);
    return NextResponse.json({ error: "Could not save lead" }, { status: 500 });
  }

  // Fire to Zapier (or any configured downstream) after the lead is durably
  // stored. Failures here are logged but don't fail the response — the lead
  // is already safe in Supabase.
  await fireLeadWebhook({ name, email, phone, service, message, sourceUrl });

  return NextResponse.json({ ok: true });
}

async function fireLeadWebhook(lead: {
  name: string;
  email: string;
  phone: string;
  service: string | null;
  message: string | null;
  sourceUrl: string | null;
}) {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...lead,
        submitted_at: new Date().toISOString(),
      }),
      signal: controller.signal,
    });
    if (!res.ok) {
      console.warn(`[api/lead] webhook returned ${res.status}`);
    }
  } catch (err) {
    console.warn("[api/lead] webhook failed:", err);
  } finally {
    clearTimeout(timeout);
  }
}
