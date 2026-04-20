import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import CTABanner from "@/components/sections/CTABanner";
import ReviewedBy from "@/components/ReviewedBy";
import { BUSINESS_NAME, SITE_URL, OG_IMAGE_PATH } from "@/../site.config";

const URL = `${SITE_URL}services/general-contractor`;
const TITLE = `General Contractor — ${BUSINESS_NAME}`;
const DESCRIPTION =
  "Licensed Florida general contractor self-performing mechanical, electrical, and plumbing work across Broward and Palm Beach Counties.";

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
        heading="Licensed Florida GC — one license holder on your permit"
        subheading="Self-performing mechanical, electrical, and plumbing work in-house across Broward and Palm Beach Counties. One point of accountability from permit through final walkthrough."
        ctaLabel="Request a Free Estimate"
        ctaHref="/contact"
      />

      <ReviewedBy />

      <section className="section-primary bg-white">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <p className="eyebrow mb-3">Pillar page — content in progress</p>
          <h2 className="section-h2 mb-4">Full guide coming soon</h2>
          <p className="text-gray-600 text-[16px] leading-[1.75]">
            Our detailed guide to hiring a licensed general contractor in South Florida — including how self-performed MEP changes the permit path, schedule, and cost — is being written. In the meantime, call us directly or request a free estimate.
          </p>
        </div>
      </section>

      <CTABanner
        eyebrow="Free Estimate"
        heading="Planning a construction project?"
        subheading="Licensed general contractor covering Broward and Palm Beach Counties. Mechanical, electrical, and plumbing handled in-house — no subs, no hand-offs."
        ctaLabel="Request a Free Estimate"
        ctaHref="/contact"
      />
    </>
  );
}
