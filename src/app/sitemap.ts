import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";
import { SITE_URL, AUTHOR } from "@/../site.config";

/**
 * Dynamic sitemap.
 *
 * Strategy:
 *   1. Query every published row in the `pages` table → use each row's
 *      actual `updated_at` as `lastModified`. This is what lets Google
 *      distinguish pages that actually changed from pages that didn't.
 *   2. Union with a static list of App Router routes (home, about, legal,
 *      services pillar pages, author, blog index) that aren't backed by
 *      Supabase rows. These use the current request time as a soft lastmod
 *      since their "real" change date lives in the codebase.
 *   3. Dedupe: if a URL shows up in both sources, the Supabase version wins
 *      because it has a real timestamp.
 *
 * CRITICAL: Do NOT emit /privacy-policy or /terms — they are noindex.
 * Listing them triggers "non-indexable page in sitemap" auditor flags.
 */
export const revalidate = 3600;  // Rebuild hourly

type PageRow = {
  url_slug: string | null;
  updated_at: string | null;
  page_type: string | null;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient();

  const { data: rows, error } = await supabase
    .from("pages")
    .select("url_slug, updated_at, page_type")
    .eq("status", "published")
    .limit(5000);

  if (error) {
    // Don't blow up the sitemap if Supabase is down — fall back to the
    // static routes so the file still ships. Google will retry.
    console.error("[sitemap] supabase query failed:", error.message);
  }

  const siteOrigin = SITE_URL.replace(/\/$/, "");

  const dynamicEntries: MetadataRoute.Sitemap = (rows ?? [])
    .filter((row): row is PageRow & { url_slug: string } => Boolean(row.url_slug))
    .map((row) => {
      const lastModified = row.updated_at ? new Date(row.updated_at) : new Date();
      const { changeFrequency, priority } = priorityForPageType(
        row.page_type,
        row.url_slug
      );
      return {
        url: `${siteOrigin}${row.url_slug.startsWith("/") ? row.url_slug : `/${row.url_slug}`}`,
        lastModified,
        changeFrequency,
        priority,
      };
    });

  // Static routes that live in src/app/ and aren't backed by a Supabase row.
  // Keep this list in sync with the filesystem.
  const now = new Date();
  const staticRoutes: Array<{
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }> = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/about", priority: 0.6, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
    { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
    { path: "/gallery", priority: 0.7, changeFrequency: "weekly" },
    { path: "/services", priority: 0.9, changeFrequency: "weekly" },
    { path: "/services/exterior-living", priority: 0.8, changeFrequency: "monthly" },
    { path: "/services/interior-renovation", priority: 0.8, changeFrequency: "monthly" },
    { path: "/services/home-systems", priority: 0.8, changeFrequency: "monthly" },
    { path: "/services/general-contractor", priority: 0.8, changeFrequency: "monthly" },
    { path: "/service-areas", priority: 0.7, changeFrequency: "monthly" },
    { path: `/team/${AUTHOR.slug}`, priority: 0.6, changeFrequency: "monthly" },
    { path: "/editorial-policy", priority: 0.4, changeFrequency: "yearly" },
    // /privacy-policy and /terms are intentionally noindex — do not list them.
  ];

  const dynamicUrls = new Set(dynamicEntries.map((e) => e.url));
  const staticEntries: MetadataRoute.Sitemap = staticRoutes
    .map((r) => ({
      url: `${siteOrigin}${r.path}`,
      lastModified: now,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    }))
    .filter((e) => !dynamicUrls.has(e.url));

  return [...dynamicEntries, ...staticEntries];
}

/**
 * Maps a row's page_type + slug shape to the right priority / changeFrequency.
 */
function priorityForPageType(
  pageType: string | null,
  urlSlug: string
): {
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
} {
  const segmentCount = urlSlug.split("/").filter(Boolean).length;

  if (pageType === "blog") {
    return { changeFrequency: "weekly", priority: 0.6 };
  }

  // Geo combo: /{vertical}/{city}/{service} — 3 segments
  if (segmentCount === 3) {
    return { changeFrequency: "monthly", priority: 0.7 };
  }

  // Service pillar or city hub: /{vertical}/{slug} — 2 segments
  return { changeFrequency: "monthly", priority: 0.8 };
}
