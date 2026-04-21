import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import CTABanner from "@/components/sections/CTABanner";
import ReviewedBy from "@/components/ReviewedBy";
import PillarSubServices from "@/components/sections/PillarSubServices";
import { BUSINESS_NAME, SITE_URL, OG_IMAGE_PATH } from "@/../site.config";

// Placeholder pillar — pillar_writer agent will replace the body content later.
// Slug is reserved so the NAV link resolves + agent can upsert into Supabase.

const URL = `${SITE_URL}services/interior-renovation`;
const TITLE = `Interior Renovations & Additions — ${BUSINESS_NAME}`;
const DESCRIPTION =
  "Whole-home renovations, kitchen remodels, additions, and custom builds across Broward and Palm Beach Counties.";

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

export default function InteriorRenovationPillar() {
  return (
    <>
      <Hero
        eyebrow="Interior Renovation"
        heading="Whole-home renovations, kitchens, additions"
        subheading="From single-room remodels to ground-up custom builds — managed by one licensed contractor who personally holds the trade credentials so every permit on your job carries the same accountable signature."
        ctaLabel="Request a Free Estimate"
        ctaHref="/contact"
      />

      <ReviewedBy />

      <PillarSubServices
        pillar="interior-renovation"
        eyebrow="Interior Renovation services"
        heading="What we build inside the house"
        subheading="Kitchens, whole-home remodels, additions, and ground-up custom builds — managed by one licensed contractor from demo through final walkthrough."
      />

      <section className="section-primary bg-white">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <p className="eyebrow mb-3">Pillar page — content in progress</p>
          <h2 className="section-h2 mb-4">Full guide coming soon</h2>
          <p className="text-gray-600 text-[16px] leading-[1.75]">
            Our detailed guide to interior renovations — scope planning, permitting, HOA coordination, and phasing — is being written. In the meantime, call us or request a free estimate to walk your project with a licensed contractor.
          </p>
        </div>
      </section>

      <CTABanner
        eyebrow="Free Estimate"
        heading="Ready to start your renovation?"
        subheading="Licensed general contractor covering Broward and Palm Beach Counties. One GC signing every permit — one point of contact from demo through final walkthrough."
        ctaLabel="Request a Free Estimate"
        ctaHref="/contact"
      />
    </>
  );
}
