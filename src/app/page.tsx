import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import CTABanner from "@/components/sections/CTABanner";
import GoogleReviews from "@/components/sections/GoogleReviews";
import ProblemFrame from "@/components/sections/ProblemFrame";
import RecentProjects from "@/components/sections/RecentProjects";
import ReviewedBy from "@/components/ReviewedBy";
import ContactForm from "@/components/ContactForm";
import BlueprintBackdrop from "@/components/ui/BlueprintBackdrop";
import { getGoogleReviews } from "@/lib/google-reviews";
import {
  BUSINESS_NAME,
  BUSINESS_SHORT_DESCRIPTION,
  SITE_URL,
  SOCIAL_LINKS,
  OG_IMAGE_PATH,
  getServiceCards,
  RECENT_PROJECTS,
} from "@/../site.config";

// Homepage canonical: absolute URL with trailing slash. See references/01.
export const metadata: Metadata = {
  title: `South Florida General Contractor | ${BUSINESS_NAME}`,
  description: BUSINESS_SHORT_DESCRIPTION,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
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

export default async function HomePage() {
  const reviews = await getGoogleReviews();

  return (
    <>
      <Hero
        eyebrow="Broward + Palm Beach County"
        heading="South Florida General Contractor. Every Trade, One License Holder."
        subheading="Full-service renovations, custom homes, and outdoor living across Broward and Palm Beach Counties. Mechanical, electrical, and plumbing handled by the same licensed team running your project — not three different subs on three different schedules."
        ctaLabel="Request a Free Estimate"
        ctaHref="#free-estimate"
        backgroundImageUrl="/images/hero.webp"
        rightColumn={<ContactForm />}
      />

      <ReviewedBy />

      <ProblemFrame />

      <Services
        eyebrow="What We Do"
        heading="Construction & Renovation Services"
        subheading="Kitchen remodels, custom homes, outdoor living, and whole-house generators — one licensed team, one point of accountability."
        cards={getServiceCards()}
      />

      {/* "Why Dellamano" differentiator — dark rhythm break with blueprint overlay */}
      <section className="section-primary bg-brand-dark relative overflow-hidden">
        <BlueprintBackdrop tone="dark" intensity={1} />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 70% 30%, rgba(37,87,191,0.14) 0%, transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(139,30,34,0.1) 0%, transparent 55%)",
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="eyebrow-dark mb-3">Why Dellamano</p>
            <h2 className="section-h2 text-white">{`One GC, Every Trade`}</h2>
            <p className="section-lead mt-3 max-w-2xl mx-auto text-gray-400">
              Most general contractors subcontract mechanical, electrical, and plumbing work to three separate trades — which means three schedules to coordinate, three license holders on your permit, and weeks of downtime between rough-ins. Dellamano self-performs all of it under one license holder.
            </p>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              {
                title: "Licensed mechanical, electrical & plumbing in-house",
                body: "Aldo Dellamano holds active FL DBPR licenses as a Certified General Contractor, Mechanical Contractor, and Plumbing Contractor. One license holder, one point of accountability.",
              },
              {
                title: "Faster timelines without sub coordination",
                body: "No waiting on a sub's schedule to free up. MEP rough-in is sequenced with the framing and drywall phases by the same team running your project.",
              },
              {
                title: "Free, no-pressure estimates",
                body: "On-site walkthrough, written scope, and a fixed-bid proposal. We explain the permit path, the code requirements, and what drives cost before you commit.",
              },
              {
                title: "Serves all of Broward + Palm Beach County",
                body: "From Fort Lauderdale and Parkland through Boca Raton, Delray Beach, Boynton Beach, West Palm Beach, and Palm Beach Gardens.",
              },
            ].map((item) => (
              <li
                key={item.title}
                className="flex items-start gap-4 bg-white/[0.03] rounded-[1.25rem] p-6 border border-white/10 backdrop-blur-sm shadow-[0_30px_50px_-20px_rgba(0,0,0,0.5)]"
              >
                <CheckCircle2
                  size={24}
                  className="text-brand-accent-200 flex-shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="font-display text-[17px] font-bold text-white mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-[14px] leading-[1.7]">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <RecentProjects projects={RECENT_PROJECTS} />

      {reviews && <GoogleReviews data={reviews} />}

      <CTABanner
        eyebrow="Free Estimate"
        heading={`Ready to start your ${"project"}?`}
        subheading="Licensed general contractor serving Broward and Palm Beach Counties. Mechanical, electrical, and plumbing handled in-house — no subs, no hand-offs."
        ctaLabel="Request a Free Estimate"
        ctaHref="/contact"
      />
    </>
  );
}
