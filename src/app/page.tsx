import type { Metadata } from "next";
import { CheckCircle2, ClipboardList, FileText, HardHat, Handshake } from "lucide-react";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import CTABanner from "@/components/sections/CTABanner";
import GoogleReviews from "@/components/sections/GoogleReviews";
import ProblemFrame from "@/components/sections/ProblemFrame";
import RecentProjects from "@/components/sections/RecentProjects";
import ReviewedBy from "@/components/ReviewedBy";
import ContactForm from "@/components/ContactForm";
import { getGoogleReviews } from "@/lib/google-reviews";
import {
  BUSINESS_NAME,
  BUSINESS_SHORT_DESCRIPTION,
  SITE_URL,
  SOCIAL_LINKS,
  OG_IMAGE_PATH,
  RECENT_PROJECTS,
} from "@/../site.config";

const PILLAR_CARDS = [
  {
    title: "Exterior Living",
    description:
      "Outdoor kitchens, pergolas, pavers, and pools — engineered for South Florida sun, salt, and summer rain.",
    href: "/services/exterior-living",
    imageUrl: "/images/outdoor-kitchens.jpg",
    imageAlt: `Exterior Living — ${BUSINESS_NAME}`,
    bullets: [
      "Outdoor kitchens & pergolas",
      "Paver patios, driveways, pool decks",
      "Gas, electrical & lighting rough-in",
    ],
    ctaLabel: "Explore exterior work",
  },
  {
    title: "Interior Renovation",
    description:
      "Kitchens, whole-home remodels, additions, and ground-up custom builds — managed by one licensed GC from demo through final walkthrough.",
    href: "/services/interior-renovation",
    imageUrl: "/images/kitchen-remodeling.jpg",
    imageAlt: `Interior Renovation — ${BUSINESS_NAME}`,
    bullets: [
      "Kitchen & whole-home remodels",
      "Home additions & custom builds",
      "HOA coordination and permit path managed",
    ],
    ctaLabel: "Explore renovation work",
  },
  {
    title: "Home Systems",
    description:
      "Whole-house generators, panel upgrades, and plumbing — performed by the same GC who holds the mechanical and plumbing licenses.",
    href: "/services/home-systems",
    imageUrl: "/images/generator.jpg",
    imageAlt: `Home Systems — ${BUSINESS_NAME}`,
    bullets: [
      "Whole-house generators + transfer switch",
      "Panel upgrades & service changes",
      "Licensed plumbing repairs & repipes",
    ],
    ctaLabel: "Explore systems work",
  },
  {
    title: "General Contractor",
    description:
      "Licensed Florida GC self-performing mechanical, electrical, and plumbing — one license holder on your permit, one point of accountability.",
    href: "/services/general-contractor",
    imageUrl: "/images/general-contractor.jpg",
    imageAlt: `General Contractor — ${BUSINESS_NAME}`,
    bullets: [
      "Licensed general, mechanical & plumbing",
      "Fixed-bid proposals, written scope",
      "Broward + Palm Beach Counties",
    ],
    ctaLabel: "Meet your GC",
  },
];

const WHY_ITEMS = [
  {
    title: "Licensed across every major trade",
    body: "Aldo Dellamano personally holds Florida DBPR licenses as a Certified General Contractor, Certified Mechanical Contractor, and Certified Plumbing Contractor. One license holder, one point of accountability.",
  },
  {
    title: "Faster timelines without sub coordination",
    body: "No waiting on a sub's schedule to free up. MEP rough-in is sequenced with framing and drywall by the same team running your project.",
  },
  {
    title: "Free, fixed-bid estimates",
    body: "On-site walkthrough, written scope, and a fixed-bid proposal. We explain the permit path, the code requirements, and what drives cost before you commit.",
  },
  {
    title: "Serving Broward + Palm Beach County",
    body: "Fort Lauderdale and Parkland through Boca Raton, Delray Beach, Boynton Beach, West Palm Beach, and Palm Beach Gardens.",
  },
];

const PROCESS_STEPS = [
  {
    icon: ClipboardList,
    title: "Consultation",
    body: "Aldo visits the property, walks the scope with you, and reviews existing conditions — panel capacity, plumbing runs, structural notes.",
  },
  {
    icon: FileText,
    title: "Fixed-bid proposal",
    body: "You get a written, itemized scope with a fixed price. Permit path, HOA coordination, and timeline spelled out in advance.",
  },
  {
    icon: HardHat,
    title: "Permit + production",
    body: "Permits pulled under one license. Every trade on your job is Dellamano — same faces from demo through final inspection.",
  },
  {
    icon: Handshake,
    title: "Final walkthrough",
    body: "You walk the finished work with Aldo. Punch list closed, warranty handed over, permit closed with the county.",
  },
];

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
        eyebrow="What we do"
        heading="Construction & renovation services"
        subheading="Four ways we work with South Florida homeowners — from single-room remodels to ground-up custom homes."
        cards={PILLAR_CARDS}
      />

      {/* Why Dellamano — 4-up benefits on white */}
      <section className="section-primary bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <p className="eyebrow mb-3">Why Dellamano</p>
            <h2 className="section-h2">One GC, every trade</h2>
            <p className="section-lead mt-4">
              Most general contractors subcontract mechanical, electrical, and plumbing to three separate trades. We self-perform all of it under one license holder.
            </p>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_ITEMS.map((item) => (
              <li
                key={item.title}
                className="flex flex-col bg-white rounded-[1rem] p-7 border border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.04)]"
              >
                <div className="flex-shrink-0 w-11 h-11 rounded-full bg-brand-accent-50 flex items-center justify-center mb-5">
                  <CheckCircle2
                    size={20}
                    className="text-brand-accent"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="font-display text-[17px] font-bold text-brand-dark mb-2.5 leading-snug">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-[14px] leading-[1.75]">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process — 4-step */}
      <section className="section-primary bg-gray-50">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <p className="eyebrow mb-3">How we work</p>
            <h2 className="section-h2">From first call to final walkthrough</h2>
            <p className="section-lead mt-4">
              A clear four-step process — so you know exactly what happens next, and who to call if something needs to shift.
            </p>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step, idx) => {
              const Icon = step.icon;
              const num = String(idx + 1).padStart(2, "0");
              return (
                <li
                  key={step.title}
                  className="relative flex flex-col bg-white rounded-[1rem] p-7 border border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.04)]"
                >
                  <span className="absolute top-5 right-5 text-[11px] font-semibold tracking-[0.15em] text-gray-300">
                    {num}
                  </span>
                  <div className="flex-shrink-0 w-11 h-11 rounded-full bg-brand-accent-50 flex items-center justify-center mb-5">
                    <Icon size={20} className="text-brand-accent" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-[17px] font-bold text-brand-dark mb-2.5 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-[14px] leading-[1.75]">{step.body}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <RecentProjects projects={RECENT_PROJECTS} />

      {reviews && <GoogleReviews data={reviews} />}

      <CTABanner
        eyebrow="Free Estimate"
        heading="Ready to start your project?"
        subheading="Licensed general contractor serving Broward and Palm Beach Counties. Mechanical, electrical, and plumbing handled in-house — no subs, no hand-offs."
        ctaLabel="Request a Free Estimate"
        ctaHref="/contact"
      />
    </>
  );
}
