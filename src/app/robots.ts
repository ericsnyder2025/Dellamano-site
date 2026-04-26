import type { MetadataRoute } from "next";
import { SITE_URL } from "@/../site.config";

/**
 * robots.txt generator.
 *
 * Rules:
 * - Wildcard agent allows the site root, disallows server / build paths.
 * - AI crawlers (GPTBot, ChatGPT-User, ClaudeBot, PerplexityBot,
 *   Google-Extended, Bingbot) are explicitly allowed — blocking them =
 *   invisibility in ChatGPT, Perplexity, Google AIO, Bing Chat, etc.
 * - Sitemap reference uses an absolute URL.
 * - No crawl-delay — Google ignores it and Bing handles it via webmaster
 *   tools.
 */
export default function robots(): MetadataRoute.Robots {
  const siteOrigin = SITE_URL.replace(/\/$/, "");

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
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Bingbot", allow: "/" },
    ],
    sitemap: `${siteOrigin}/sitemap.xml`,
    host: siteOrigin,
  };
}
