import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import CTABanner from "@/components/sections/CTABanner";
import GoogleReviews from "@/components/sections/GoogleReviews";
import ProblemFrame from "@/components/sections/ProblemFrame";
import RecentProjects from "@/components/sections/RecentProjects";
import OurProcess from "@/components/sections/OurProcess";
import OurApproach from "@/components/sections/OurApproach";
import AboutDellamano from "@/components/sections/AboutDellamano";
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
    tagline: "Designed for the South Florida outdoors",
    description:
      "Outdoor kitchens, pergolas, pavers, and pools — engineered for sun, salt, and hurricane wind loads. Built with integrated gas, electrical, and lighting.",
    href: "/services/exterior-living",
    imageUrl: "/images/outdoor-kitchens.jpg",
    imageAlt: `Exterior Living — ${BUSINESS_NAME}`,
    bullets: ["Outdoor Kitchens", "Pergolas & Hardscapes", "Pool Construction"],
    ctaLabel: "Explore exterior work",
  },
  {
    title: "Interior Renovation",
    tagline: "One GC, every trade, one signature",
    description:
      "Kitchens, whole-home remodels, additions, and ground-up custom homes — managed by one licensed GC from demo through final walkthrough.",
    href: "/services/interior-renovation",
    imageUrl: "/images/kitchen-remodeling.jpg",
    imageAlt: `Interior Renovation — ${BUSINESS_NAME}`,
    bullets: ["Kitchen Remodels", "Home Additions", "Custom Home Builds"],
    ctaLabel: "Explore renovation work",
  },
  {
    title: "Home Systems",
    tagline: "Licensed by your GC",
    description:
      "Generators, panel upgrades, and plumbing — coordinated by the same GC who personally holds the mechanical and plumbing licenses on the permit.",
    href: "/services/home-systems",
    imageUrl: "/images/generator.jpg",
    imageAlt: `Home Systems — ${BUSINESS_NAME}`,
    bullets: ["Whole-House Generators", "Electrical Service", "Plumbing & Repipes"],
    ctaLabel: "Explore systems work",
  },
  {
    title: "General Contractor",
    tagline: "One company signing every permit",
    description:
      "Licensed Florida GC coordinating general, roofing, mechanical, and plumbing across every permit — one company, one contract, one accountable contractor.",
    href: "/services/general-contractor",
    imageUrl: "/images/general-contractor.jpg",
    imageAlt: `General Contractor — ${BUSINESS_NAME}`,
    bullets: ["Fixed-Bid Proposals", "Written Scope", "Broward + Palm Beach"],
    ctaLabel: "Meet your GC",
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
        heading="South Florida General Contractor. Every Trade, One Signature."
        subheading="Full-service renovations, custom homes, roofing, and outdoor living across Broward and Palm Beach Counties. One GC who personally holds the general, roofing, mechanical, and plumbing licenses — so the name signing every permit on your job is the same accountable contractor from estimate through final walkthrough."
        ctaLabel="Request a Free Estimate"
        ctaHref="#free-estimate"
        backgroundImageUrl="/images/hero.webp"
        rightColumn={<ContactForm />}
      />

      <ReviewedBy />

      <Services
        eyebrow="What we do"
        heading="Four verticals. One standard."
        subheading="From outdoor kitchens to ground-up custom homes — every project runs through one licensed GC."
        cards={PILLAR_CARDS}
      />

      <ProblemFrame />

      <OurApproach />

      <OurProcess />

      <AboutDellamano />

      <RecentProjects projects={RECENT_PROJECTS} />

      {reviews && <GoogleReviews data={reviews} />}

      <CTABanner
        eyebrow="Free Estimate"
        heading="Ready to start your project?"
        subheading="Licensed general contractor serving Broward and Palm Beach Counties. One GC signing every permit — general, roofing, mechanical, and plumbing all coordinated under one contract."
        ctaLabel="Request a Free Estimate"
        ctaHref="/contact"
      />
    </>
  );
}
