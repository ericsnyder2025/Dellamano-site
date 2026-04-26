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
import { buildBreadcrumbList, buildLocalBusiness } from "@/lib/schema";
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
    title: "Outdoor Living, Done Right",
    tagline: "BUILT FOR SOUTH FLORIDA LIVING",
    description:
      "Custom outdoor spaces engineered for South Florida conditions — sun, salt, and hurricane exposure. From concept to completion, every element is integrated: gas, electrical, lighting, and structure — all handled under one licensed contractor.",
    href: "/services/exterior-living",
    imageUrl: "/images/outdoor-kitchens.webp",
    imageAlt: `Exterior Living — ${BUSINESS_NAME}`,
    bullets: ["Outdoor Kitchens", "Pergolas & Hardscapes", "Pool Construction"],
    ctaLabel: "Explore Outdoor Projects",
  },
  {
    title: "Interior Renovations & Custom Homes",
    tagline: "ONE GC. EVERY TRADE. FULL ACCOUNTABILITY.",
    description:
      "Kitchens, full-home remodels, additions, and custom builds — all managed by a single licensed contractor from demolition through final walkthrough. No handoffs, no confusion, just one accountable team.",
    href: "/services/interior-renovation",
    imageUrl: "/images/kitchen-remodeling.webp",
    imageAlt: `Interior Renovation — ${BUSINESS_NAME}`,
    bullets: ["Kitchen Remodels", "Home Additions", "Custom Home Builds"],
    ctaLabel: "Explore Interior Work",
  },
  {
    title: "Mechanical, Electrical & Plumbing",
    tagline: "POWERING THE HOME BEHIND THE WALLS",
    description:
      "Critical home systems installed and coordinated by a contractor who is personally licensed in mechanical, electrical, and plumbing. No third-party gaps — everything is designed and executed as one system.",
    href: "/services/home-systems",
    imageUrl: "/images/generator-installation.webp",
    imageAlt: `Home Systems — ${BUSINESS_NAME}`,
    bullets: ["Whole-Home Generators", "Electrical Upgrades", "Plumbing & Repiping"],
    ctaLabel: "Explore Systems",
  },
  {
    title: "Full-Service General Contractor",
    tagline: "ONE COMPANY. EVERY PERMIT.",
    description:
      "A truly turnkey construction experience. We manage general construction, roofing, mechanical, electrical, and plumbing under one contract — signed by one licensed contractor. Clear communication, tighter coordination, and full accountability from start to finish.",
    href: "/services/general-contractor",
    imageUrl: "/images/general-contractor.webp",
    imageAlt: `General Contractor — ${BUSINESS_NAME}`,
    bullets: ["Commercial Construction", "Tenant Build-Outs"],
    ctaLabel: "Explore Commercial Work",
  },
];

export const metadata: Metadata = {
  title: "South Florida General Contractor · Broward & Palm Beach",
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

  const breadcrumbSchema = buildBreadcrumbList([
    { name: "Home", url: SITE_URL },
  ]);

  // Feed live Google Reviews data into AggregateRating + Review schema,
  // and link the four homepage pillar cards to their canonical Service
  // pages via an OfferCatalog. Both are conditional — when the API is
  // missing/down, getGoogleReviews() returns null and the rich-result
  // signals just get omitted instead of falsifying.
  const siteOrigin = SITE_URL.replace(/\/$/, "");
  const localBusinessSchema = buildLocalBusiness({
    aggregateRating: reviews
      ? {
          ratingValue: reviews.rating,
          reviewCount: reviews.userRatingCount,
        }
      : undefined,
    reviews: reviews?.reviews.map((r) => ({
      rating: r.rating,
      authorName: r.authorName,
      text: r.text,
      publishTime: r.publishTime || undefined,
    })),
    hasOfferCatalog: {
      name: "Construction Services",
      items: PILLAR_CARDS.map((c) => ({
        name: c.title,
        url: `${siteOrigin}${c.href}`,
        description: c.description,
      })),
    },
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([localBusinessSchema, breadcrumbSchema]),
        }}
      />
      <Hero
        eyebrow="South Florida General Contractor"
        heading="Every Project, Every Trade, One Contractor"
        subheading="Full-service renovations, custom homes, roofing, and outdoor living across Broward and Palm Beach Counties. One GC who personally holds the general, roofing, mechanical, electrical, and plumbing licenses — so the name signing every permit on your job is the same accountable contractor from estimate through final walkthrough."
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
        subheading="Licensed general contractor serving Broward and Palm Beach Counties. One GC signing every permit — general, roofing, mechanical, electrical, and plumbing all coordinated under one contract."
        ctaLabel="Request a Free Estimate"
        ctaHref="/contact"
      />
    </>
  );
}
