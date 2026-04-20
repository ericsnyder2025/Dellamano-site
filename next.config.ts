import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // ─────────────────────────────────────────────────────────────
  // IMAGES — allow remote hosts for images served through next/image.
  // Add every external image host you use (Supabase, S3, Unsplash, etc.)
  // ─────────────────────────────────────────────────────────────
  images: {
    remotePatterns: [
      // Uncomment + customize per your stack:
      // {
      //   protocol: "https",
      //   hostname: "*.supabase.co",
      //   pathname: "/storage/v1/object/public/**",
      // },
      // {
      //   protocol: "https",
      //   hostname: "images.unsplash.com",
      // },
    ],
    formats: ["image/avif", "image/webp"],  // AVIF first for best compression
  },

  // ─────────────────────────────────────────────────────────────
  // HEADERS — security + robots directive scoping.
  // Legal pages (privacy/terms) get noindex via BOTH meta tag AND
  // X-Robots-Tag header so auditors don't flag conflicting directives.
  // See references/04-robots-headers.md.
  // ─────────────────────────────────────────────────────────────
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: https:; font-src 'self' https:; connect-src 'self' https:; frame-src 'self' https://www.google.com https://maps.google.com https://www.google.com/maps; frame-ancestors 'self';",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
      // noindex for legal pages (via header — mirrors meta tag)
      {
        source: "/privacy-policy",
        headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }],
      },
      {
        source: "/terms",
        headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }],
      },
      // Every other path: explicit index override
      // (neutralizes any platform default noindex on custom domains)
      {
        source: "/:path((?!privacy-policy$|terms$).*)",
        headers: [{ key: "X-Robots-Tag", value: "index, follow" }],
      },
    ];
  },

  // ─────────────────────────────────────────────────────────────
  // REDIRECTS — add apex→www canonical, legacy URL cleanup,
  // and content consolidation (301 for renamed/merged pages).
  // ─────────────────────────────────────────────────────────────
  async redirects() {
    return [
      // Apex -> www canonical host (prevents duplicate content)
      // {
      //   source: "/:path*",
      //   has: [{ type: "host", value: "{{ APEX_HOST }}" }],
      //   destination: "https://{{ WWW_HOST }}/:path*",
      //   statusCode: 301,
      // },

      // Common legacy URL cleanup
      { source: "/index.html", destination: "/", statusCode: 301 },
      { source: "/index.php", destination: "/", statusCode: 301 },
      { source: "/:path*/index.html", destination: "/:path*", statusCode: 301 },

      // Add content consolidation redirects as you rename/merge pages:
      // {
      //   source: "/old-slug",
      //   destination: "/new-slug",
      //   statusCode: 301,
      // },
    ];
  },
};

export default nextConfig;
