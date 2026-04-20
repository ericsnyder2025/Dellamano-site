import { createClient as supabaseCreateClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client.
 *
 * Uses the ANON key — rows are filtered by RLS policies defined in
 * seo-site-agents/migrations/001-pages-table.sql (anon reads 'published' only).
 * DO NOT use the service role key on the read path.
 */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY"
    );
  }

  return supabaseCreateClient(url, anonKey);
}
