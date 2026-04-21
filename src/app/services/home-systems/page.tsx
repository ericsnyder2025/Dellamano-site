import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import CTABanner from "@/components/sections/CTABanner";
import ReviewedBy from "@/components/ReviewedBy";
import PillarSubServices from "@/components/sections/PillarSubServices";
import { BUSINESS_NAME, SITE_URL, OG_IMAGE_PATH } from "@/../site.config";

// Placeholder pillar — pillar_writer agent will replace the body content later.
// Slug is reserved so the NAV link resolves + agent can upsert into Supabase.

const URL = `${SITE_URL}services/home-systems`;
const TITLE = `Home Systems & Mechanical Work — ${BUSINESS_NAME}`;
const DESCRIPTION =
  "Whole-house generator installations, electrical upgrades, and mechanical work across Broward and Palm Beach Counties.";

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

export default function HomeSystemsPillar() {
  return (
    <>
      <Hero
        eyebrow="Home Systems"
        heading="Whole-house generators, electrical, mechanical"
        subheading="Standby generator sales and installation, panel upgrades, and mechanical work — performed by a GC who personally holds the mechanical and plumbing licenses."
        ctaLabel="Request a Free Estimate"
        ctaHref="/contact"
      />

      <ReviewedBy />

      <PillarSubServices
        pillar="home-systems"
        eyebrow="Home Systems services"
        heading="The trades running inside your walls"
        subheading="Generators, electrical, and plumbing — coordinated by a GC who personally holds the mechanical, plumbing, and general credentials on your permit."
      />

      <section className="section-primary bg-white">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <p className="eyebrow mb-3">Pillar page — content in progress</p>
          <h2 className="section-h2 mb-4">Full guide coming soon</h2>
          <p className="text-gray-600 text-[16px] leading-[1.75]">
            Our detailed guide to generator sizing, installation, and how our GC coordinates the mechanical and electrical trades on your project is being written. In the meantime, call us or request a free estimate to discuss your project.
          </p>
        </div>
      </section>

      <CTABanner
        eyebrow="Free Estimate"
        heading="Planning a generator or systems upgrade?"
        subheading="Licensed general, mechanical, and plumbing contractor covering Broward and Palm Beach Counties."
        ctaLabel="Request a Free Estimate"
        ctaHref="/contact"
      />
    </>
  );
}
