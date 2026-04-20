import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

interface LatestFromBlogProps {
  /** Filter to blog posts within this vertical. Omit to show across all. */
  vertical?: string;
  /** Narrow to posts tagged for this city (pages.target_cities). */
  city?: string;
  /** Narrow to posts tagged for this service (pages.target_services). */
  service?: string;
  /** Max cards to render. */
  limit?: number;
  heading?: string;
  eyebrow?: string;
}

interface BlogRow {
  url_slug: string;
  vertical: string | null;
  h1: string | null;
  meta_title: string | null;
  meta_description: string | null;
  published_at: string | null;
  schema_markup: { excerpt?: string } | null;
}

const SELECT_COLS =
  "url_slug, vertical, h1, meta_title, meta_description, published_at, schema_markup";

type SupabaseClient = ReturnType<typeof createClient>;

function baseQuery(supabase: SupabaseClient) {
  return supabase
    .from("pages")
    .select(SELECT_COLS)
    .eq("page_type", "blog")
    .eq("status", "published")
    .order("published_at", { ascending: false });
}

/**
 * Server component — surfaces 3 latest blog posts on collection pages
 * (city hubs, service pillars, city+service combos).
 *
 * Uses a 4-stage fallback so every collection page gets `limit` cards:
 *   1. vertical + city + service (blogs explicitly tagged for this combo)
 *   2. vertical + service (all blogs for this service in this vertical)
 *   3. vertical (any blog in the vertical)
 *   4. global (any published blog)
 *
 * Requires the `target_cities TEXT[]` and `target_services TEXT[]`
 * columns on the `pages` table — see seo-site-agents migration
 * `migrations/blog_target_cols.sql` and blog_agent's derive_blog_targets.
 */
export default async function LatestFromBlog({
  vertical,
  city,
  service,
  limit = 3,
  heading = "Latest from the Blog",
  eyebrow = "Helpful Reads",
}: LatestFromBlogProps) {
  const supabase = createClient();
  const seen = new Set<string>();
  const results: BlogRow[] = [];

  const runStage = async (
    apply: (q: ReturnType<typeof baseQuery>) => ReturnType<typeof baseQuery>,
  ) => {
    if (results.length >= limit) return;
    const { data } = await apply(baseQuery(supabase)).limit(limit * 2);
    for (const row of (data ?? []) as BlogRow[]) {
      if (seen.has(row.url_slug)) continue;
      seen.add(row.url_slug);
      results.push(row);
      if (results.length >= limit) break;
    }
  };

  if (vertical && city && service) {
    await runStage((q) =>
      q
        .eq("vertical", vertical)
        .contains("target_cities", [city])
        .contains("target_services", [service]),
    );
  }
  if (vertical && service) {
    await runStage((q) =>
      q.eq("vertical", vertical).contains("target_services", [service]),
    );
  }
  if (vertical) {
    await runStage((q) => q.eq("vertical", vertical));
  }
  await runStage((q) => q);

  const posts = results.slice(0, limit);
  if (!posts.length) return null;

  return (
    <section className="section-primary bg-brand-surface">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="eyebrow mb-3">{eyebrow}</p>
          <h2 className="section-h2">{heading}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {posts.map((post) => {
            const excerpt = post.schema_markup?.excerpt || post.meta_description || "";
            return (
              <Link
                key={post.url_slug}
                href={post.url_slug}
                className="group block bg-white rounded-[1.25rem] p-7 border border-[rgba(221,225,235,0.7)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
              >
                {post.vertical && (
                  <p className="eyebrow text-[11px] mb-4">{post.vertical}</p>
                )}
                <h3 className="font-display text-[18px] font-bold text-brand-dark leading-[1.3] mb-3 tracking-tight group-hover:text-brand-primary transition-colors">
                  {post.h1 || post.meta_title}
                </h3>
                {excerpt && (
                  <p className="text-gray-500 text-[14px] leading-[1.7] mb-4 line-clamp-3">
                    {excerpt}
                  </p>
                )}
                <span className="inline-flex items-center gap-2 text-brand-primary text-[13px] font-bold group-hover:gap-3 transition-[gap] duration-200">
                  Read article <ArrowRight size={14} aria-hidden="true" />
                </span>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            href={vertical ? `/blog?vertical=${vertical}` : "/blog"}
            className="inline-flex items-center gap-2 text-brand-dark text-[14px] font-bold hover:gap-3 transition-[gap] duration-200"
          >
            View all articles <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
