import type { MetadataRoute } from "next";
import { SITE_URL, AUTHOR } from "@/../site.config";

// Uncomment if using Supabase for dynamic pages:
// import { createClient } from "@/lib/supabase/server";

// Uncomment if using programmatic city × service combos:
// import citiesJson from "@/data/cities.json";
// import { getAllServiceSlugs } from "@/data/services";
// import type { CitiesData } from "@/types/city";
// const cities = citiesJson as CitiesData;

/**
 * Dynamic sitemap.
 *
 * Strategy:
 *   1. Static App Router routes (always emit these with `now` as lastMod)
 *   2. Dynamic DB-backed pages (use real `updated_at` timestamps) — optional
 *   3. Template-generated URLs (city × service, tag pages, etc.) — optional
 *
 * CRITICAL: Do NOT emit noindex pages (privacy-policy, terms) here.
 * Doing so triggers "non-indexable page in sitemap" auditor flags.
 *
 * See references/03-sitemap-strategy.md for the full pattern.
 */
export const revalidate = 3600;  // Rebuild hourly

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // ─────────────────────────────────────────────
  // 1. STATIC ROUTES (file-based, no DB backing)
  // ─────────────────────────────────────────────
  const staticRoutes: Array<{
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }> = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/about", priority: 0.6, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
    { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
    { path: "/service-areas", priority: 0.7, changeFrequency: "monthly" },
    { path: `/team/${AUTHOR.slug}`, priority: 0.6, changeFrequency: "monthly" },
    { path: "/editorial-policy", priority: 0.4, changeFrequency: "yearly" },
    // DO NOT list /privacy-policy or /terms — they are noindex
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: `${SITE_URL}${r.path.replace(/^\//, "")}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  // ─────────────────────────────────────────────
  // 2. DYNAMIC DB-BACKED PAGES (uncomment if using Supabase)
  // ─────────────────────────────────────────────
  // const supabase = createClient();
  // const { data: rows } = await supabase
  //   .from("pages")
  //   .select("url_slug, updated_at, page_type")
  //   .eq("status", "published")
  //   .limit(5000);
  //
  // const dynamicEntries: MetadataRoute.Sitemap = (rows ?? []).map((row) => ({
  //   url: `${SITE_URL}${row.url_slug.replace(/^\//, "")}`,
  //   lastModified: row.updated_at ? new Date(row.updated_at) : now,
  //   changeFrequency: priorityFor(row.page_type).changeFrequency,
  //   priority: priorityFor(row.page_type).priority,
  // }));

  const dynamicEntries: MetadataRoute.Sitemap = [];

  // ─────────────────────────────────────────────
  // 3. TEMPLATE-GENERATED URLS (city × service combos, etc.)
  // ─────────────────────────────────────────────
  // const comboEntries: MetadataRoute.Sitemap = [];
  // const cityKeys = Object.keys(cities);
  // for (const vertical of ["vertical1", "vertical2"] as const) {
  //   const serviceSlugs = getAllServiceSlugs(vertical);
  //   for (const city of cityKeys) {
  //     comboEntries.push({
  //       url: `${SITE_URL}${vertical}/${city}`,
  //       lastModified: now,
  //       changeFrequency: "monthly",
  //       priority: 0.8,
  //     });
  //     for (const service of serviceSlugs) {
  //       comboEntries.push({
  //         url: `${SITE_URL}${vertical}/${city}/${service}`,
  //         lastModified: now,
  //         changeFrequency: "monthly",
  //         priority: 0.7,
  //       });
  //     }
  //   }
  // }

  const comboEntries: MetadataRoute.Sitemap = [];

  // Dedupe: dynamic (real timestamps) wins over static and template entries
  const dynamicUrls = new Set(dynamicEntries.map((e) => e.url));
  const deduped = [
    ...dynamicEntries,
    ...staticEntries.filter((e) => !dynamicUrls.has(e.url)),
    ...comboEntries.filter((e) => !dynamicUrls.has(e.url)),
  ];

  return deduped;
}

// function priorityFor(pageType: string | null): {
//   priority: number;
//   changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
// } {
//   if (pageType === "blog") return { priority: 0.6, changeFrequency: "weekly" };
//   if (pageType === "geo") return { priority: 0.7, changeFrequency: "monthly" };
//   if (pageType === "pillar") return { priority: 0.8, changeFrequency: "monthly" };
//   return { priority: 0.5, changeFrequency: "monthly" };
// }
