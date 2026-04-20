import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/sections/Hero";
import CTABanner from "@/components/sections/CTABanner";
import ReviewedBy from "@/components/ReviewedBy";
import {
  BUSINESS_NAME,
  SITE_URL,
  OG_IMAGE_PATH,
  SERVICES,
  type ServiceEntry,
} from "@/../site.config";

/**
 * ServiceStub — shared placeholder for a service URL.
 *
 * Each /services/{slug}/page.tsx that uses this is TEMPORARY — it exists so
 * the URL resolves + nav works while the writer_agent is wired up. Once the
 * agent writes a real page into the Supabase `pages` table for this slug,
 * delete the /services/{slug}/page.tsx file and the `[...slug]` catch-all
 * will serve the agent's content instead.
 */

function findService(slug: string): ServiceEntry | null {
  for (const services of Object.values(SERVICES)) {
    if (slug in services) return services[slug];
  }
  return null;
}

export function stubMetadata(slug: string): Metadata {
  const svc = findService(slug);
  if (!svc) return {};
  const url = `${SITE_URL}services/${slug}`;
  const title = `${svc.name} — ${BUSINESS_NAME}`;
  const description = svc.tagline;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: BUSINESS_NAME,
      type: "website",
      images: [OG_IMAGE_PATH],
    },
  };
}

export default function ServiceStub({ slug }: { slug: string }) {
  const svc = findService(slug);
  if (!svc) {
    return (
      <section className="section-primary bg-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="section-h2">Service not found</h1>
          <p className="text-gray-600 mt-4">
            <Link href="/services" className="text-brand-accent hover:text-brand-accent-700 hover:underline transition-colors">
              View all services
            </Link>
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <Hero
        eyebrow={svc.short_name}
        heading={svc.name}
        subheading={svc.tagline}
        ctaLabel="Request a Free Estimate"
        ctaHref="/contact"
      />

      <ReviewedBy />

      <section className="section-primary bg-white">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <p className="eyebrow mb-3">Service page — content in progress</p>
          <h2 className="section-h2 mb-4">Full guide coming soon</h2>
          <p className="text-gray-600 text-[16px] leading-[1.75]">
            A detailed guide to {svc.name.toLowerCase()} in Broward and Palm Beach Counties is being written. In the meantime, call us or request a free estimate — we&apos;re happy to walk your project in person.
          </p>
        </div>
      </section>

      <CTABanner
        eyebrow="Free Estimate"
        heading={`Planning a ${svc.short_name.toLowerCase()} project?`}
        subheading="Licensed general contractor covering Broward and Palm Beach Counties. Mechanical, electrical, and plumbing handled in-house."
        ctaLabel="Request a Free Estimate"
        ctaHref="/contact"
      />
    </>
  );
}
