import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Hero from "@/components/sections/Hero";
import CTABanner from "@/components/sections/CTABanner";
import ReviewedBy from "@/components/ReviewedBy";
import ProfessionalDisclosure from "@/components/ProfessionalDisclosure";
import {
  BUSINESS_NAME,
  SITE_URL,
  SERVICE_AREA_COUNTIES,
  OG_IMAGE_PATH,
  PILLARS,
  getServicesByPillar,
} from "@/../site.config";
import { buildBreadcrumbList } from "@/lib/schema";

const PAGE_URL = `${SITE_URL}services`;
const PAGE_TITLE = `Construction Services — ${BUSINESS_NAME}`;
const PAGE_DESCRIPTION = `Full-service construction in ${SERVICE_AREA_COUNTIES.join(
  " and ",
)}. Kitchen remodels, outdoor kitchens, custom homes, generators, electrical, and plumbing — every trade under one license holder.`;

const DISCLOSURE_PROPS = {
  vertical: "construction",
  codeStandard: "Florida Building Code",
  threshold: "$1,000",
  licensingBody: "Florida DBPR",
  verificationUrl: "https://www.myfloridalicense.com",
};

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    siteName: BUSINESS_NAME,
    type: "website",
    images: [OG_IMAGE_PATH],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [OG_IMAGE_PATH],
  },
};

export const revalidate = 86400;

export default function ServicesIndexPage() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${PAGE_URL}#collectionpage`,
    url: PAGE_URL,
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    isPartOf: { "@id": `${SITE_URL}#website` },
    about: { "@id": `${SITE_URL}#organization` },
  };
  const breadcrumbSchema = buildBreadcrumbList([
    { name: "Home", url: SITE_URL },
    { name: "Services", url: PAGE_URL },
  ]);
  const schema = [collectionSchema, breadcrumbSchema];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <Hero
        eyebrow="Services"
        heading="Every trade on your project answers to one license"
        subheading={`${BUSINESS_NAME} is a licensed Florida general contractor signing every permit as the qualifier for general, mechanical, electrical, and plumbing work across ${SERVICE_AREA_COUNTIES.join(
          " and ",
        )}.`}
        ctaLabel="Request a Free Estimate"
        ctaHref="/contact"
        backgroundImageUrl="/images/hero.webp"
      />

      <ReviewedBy />

      {PILLARS.map((pillar) => {
        const services = getServicesByPillar(pillar.slug);
        return (
          <section
            key={pillar.slug}
            className="section-primary bg-white odd:bg-gray-50"
          >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="text-center mb-10 max-w-2xl mx-auto">
                <p className="eyebrow mb-3">{pillar.name}</p>
                <h2 className="section-h2 mb-4">
                  <Link
                    href={`/services/${pillar.slug}`}
                    className="hover:text-brand-primary transition-colors"
                  >
                    {pillar.name}
                  </Link>
                </h2>
                <p className="section-lead">{pillar.tagline}</p>
                <Link
                  href={`/services/${pillar.slug}`}
                  className="inline-flex items-center gap-2 mt-4 text-brand-primary font-bold text-[13px] tracking-wide uppercase hover:gap-3 transition-all"
                >
                  Read the full guide
                  <ArrowRight size={13} aria-hidden="true" />
                </Link>
              </div>

              {services.length > 0 && (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {services.map((svc) => (
                    <li key={svc.slug}>
                      <Link
                        href={svc.href}
                        className="group relative block h-full rounded-[1.25rem] overflow-hidden bg-white border border-[rgba(221,225,235,0.7)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
                      >
                        <div className="aspect-[16/10] relative overflow-hidden bg-gray-100">
                          <Image
                            src={svc.imageUrl}
                            alt={svc.imageAlt}
                            width={1600}
                            height={1000}
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="absolute inset-0 w-full h-full object-cover object-center motion-safe:group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="font-display text-[18px] font-bold text-brand-dark mb-2 leading-snug tracking-tight">
                            {svc.name}
                          </h3>
                          <p className="text-gray-600 text-[14px] leading-[1.7] mb-4 line-clamp-3">
                            {svc.tagline}
                          </p>
                          <span className="inline-flex items-center gap-2 text-brand-primary font-bold text-[13px] tracking-wide uppercase group-hover:gap-3 transition-all">
                            Learn more
                            <ArrowRight size={13} aria-hidden="true" />
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        );
      })}

      <CTABanner
        eyebrow="Free Estimate"
        heading="One GC. Every trade. Every signature."
        subheading={`Covering ${SERVICE_AREA_COUNTIES.join(
          " and ",
        )}. Call us to walk your project in person.`}
        ctaLabel="Request a Free Estimate"
        ctaHref="/contact"
      />

      <ProfessionalDisclosure {...DISCLOSURE_PROPS} />
    </>
  );
}
