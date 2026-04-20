import type { MetadataRoute } from "next";
import { SITE_URL } from "@/../site.config";

/**
 * robots.txt generator.
 *
 * Rules:
 * - Don't block AI crawlers (GPTBot, Claude-Web, PerplexityBot) — they're
 *   how AI search results get populated. Blocking them = invisibility in
 *   ChatGPT, Perplexity, Google AIO, etc.
 * - Always reference the sitemap with an absolute URL.
 * - Don't use crawl-delay — Google ignores it.
 *
 * See references/04-robots-headers.md.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/_next/",
          // Do NOT list /privacy-policy or /terms here.
          // Use meta robots noindex + X-Robots-Tag header instead
          // (see next.config.ts).
        ],
      },
    ],
    sitemap: `${SITE_URL}sitemap.xml`,
    host: SITE_URL.replace(/\/$/, ""),  // Host without trailing slash
  };
}
