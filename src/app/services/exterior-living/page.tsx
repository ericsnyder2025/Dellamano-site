import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import CTABanner from "@/components/sections/CTABanner";
import ReviewedBy from "@/components/ReviewedBy";
import PillarSubServices from "@/components/sections/PillarSubServices";
import { BUSINESS_NAME, SITE_URL, OG_IMAGE_PATH } from "@/../site.config";

// Placeholder pillar — pillar_writer agent will replace the body content later.
// Slug is reserved so the NAV link resolves + agent can upsert into Supabase.

const URL = `${SITE_URL}services/exterior-living`;
const TITLE = `Exterior Living & Outdoor Construction — ${BUSINESS_NAME}`;
const DESCRIPTION =
  "Outdoor kitchens, pergolas, pavers, and exterior upgrades across Broward and Palm Beach Counties.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    siteName: BUSINESS_NAME,
    type: "website",
    images: [OG_IMAGE_PATH],
  },
};

export default function ExteriorLivingPillar() {
  return (
    <>
      <Hero
        eyebrow="Exterior Living"
        heading="Outdoor kitchens, pergolas, and exterior construction"
        subheading="Custom outdoor spaces built for South Florida sun, salt, and summer rain — engineered by a licensed GC who personally holds the mechanical, electrical, and plumbing credentials on every permit."
        ctaLabel="Request a Free Estimate"
        ctaHref="/contact"
      />

      <ReviewedBy />

      <PillarSubServices
        pillar="exterior-living"
        eyebrow="Exterior Living services"
        heading="What we build outside the house"
        subheading="Outdoor kitchens, pergolas, hardscapes, and pool construction — engineered for South Florida sun, salt, and hurricane wind loads."
      />

      <section className="section-primary bg-white">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <p className="eyebrow mb-3">Pillar page — content in progress</p>
          <h2 className="section-h2 mb-4">Full guide coming soon</h2>
          <p className="text-gray-600 text-[16px] leading-[1.75]">
            Our detailed guide to planning, permitting, and building high-end outdoor living spaces in Broward and Palm Beach Counties is being written. In the meantime, call us directly or request a free estimate — we&apos;re happy to walk your project in person.
          </p>
        </div>
      </section>

      <CTABanner
        eyebrow="Free Estimate"
        heading="Planning an outdoor living project?"
        subheading="Licensed general contractor covering Broward and Palm Beach Counties. One GC signing every permit — every trade on your project answers to the same license holder."
        ctaLabel="Request a Free Estimate"
        ctaHref="/contact"
      />
    </>
  );
}
