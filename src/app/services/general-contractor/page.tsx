import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import CTABanner from "@/components/sections/CTABanner";
import ReviewedBy from "@/components/ReviewedBy";
import { BUSINESS_NAME, SITE_URL, OG_IMAGE_PATH } from "@/../site.config";

const URL = `${SITE_URL}services/general-contractor`;
const TITLE = `General Contractor — ${BUSINESS_NAME}`;
const DESCRIPTION =
  "Licensed Florida general contractor coordinating general, roofing, mechanical, and plumbing under one permit across Broward and Palm Beach Counties.";

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

export default function GeneralContractorPillar() {
  return (
    <>
      <Hero
        eyebrow="General Contractor"
        heading="Licensed Florida GC — one company signing every permit"
        subheading="Single-source general contractor across Broward and Palm Beach Counties. General, roofing, mechanical, and plumbing licenses all held by the same GC — so every trade on your job answers to one accountable contractor."
        ctaLabel="Request a Free Estimate"
        ctaHref="/contact"
      />

      <ReviewedBy />

      <section className="section-primary bg-white">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <p className="eyebrow mb-3">Pillar page — content in progress</p>
          <h2 className="section-h2 mb-4">Full guide coming soon</h2>
          <p className="text-gray-600 text-[16px] leading-[1.75]">
            Our detailed guide to hiring a licensed general contractor in South Florida — including why the license-holder relationship matters more than who swings the hammer, and how it changes the permit path, schedule, and cost — is being written. In the meantime, call us directly or request a free estimate.
          </p>
        </div>
      </section>

      <CTABanner
        eyebrow="Free Estimate"
        heading="Planning a construction project?"
        subheading="Licensed general contractor covering Broward and Palm Beach Counties. One GC signing every permit, one accountable contractor on every trade."
        ctaLabel="Request a Free Estimate"
        ctaHref="/contact"
      />
    </>
  );
}
