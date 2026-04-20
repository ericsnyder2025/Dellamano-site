import type { Metadata } from "next";
import {
  BUSINESS_NAME,
  BUSINESS_SHORT_DESCRIPTION,
  SITE_URL,
  SOCIAL_LINKS,
  OG_IMAGE_PATH,
} from "@/../site.config";

// CRITICAL: Homepage canonical must be absolute WITH trailing slash.
// `canonical: "/"` may normalize away the slash, breaking internal-link
// consolidation. See references/01-nextjs-seo-setup.md.
export const metadata: Metadata = {
  title: `${BUSINESS_NAME} | ${BUSINESS_SHORT_DESCRIPTION.split(".")[0]}`,
  description: BUSINESS_SHORT_DESCRIPTION,
  alternates: {
    canonical: SITE_URL,  // Absolute URL with trailing slash
  },
  openGraph: {
    // MUST include images — root layout openGraph is REPLACED, not merged
    title: BUSINESS_NAME,
    description: BUSINESS_SHORT_DESCRIPTION,
    url: SITE_URL,
    siteName: BUSINESS_NAME,
    type: "website",
    images: [OG_IMAGE_PATH],
  },
  twitter: {
    card: "summary_large_image",
    site: SOCIAL_LINKS.twitter ? `@${SOCIAL_LINKS.twitter}` : undefined,
    title: BUSINESS_NAME,
    description: BUSINESS_SHORT_DESCRIPTION.slice(0, 125),
    images: [OG_IMAGE_PATH],
  },
};

export const revalidate = 3600;

export default function HomePage() {
  return (
    <>
      {/* TODO: Hero section with H1 containing primary keyword */}
      <section className="py-16 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
            {/* Primary keyword-targeted H1 */}
            {BUSINESS_NAME}
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            {BUSINESS_SHORT_DESCRIPTION}
          </p>
          {/* TODO: CTA button(s) */}
        </div>
      </section>

      {/* TODO: Services grid */}
      {/* TODO: Why choose us / value props */}
      {/* TODO: Social proof / reviews */}
      {/* TODO: Service areas / map */}
      {/* TODO: Latest blog posts */}
      {/* TODO: Final CTA */}
    </>
  );
}
