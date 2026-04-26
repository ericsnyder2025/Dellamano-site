import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/sections/Hero";
import CTABanner from "@/components/sections/CTABanner";
import ReviewedBy from "@/components/ReviewedBy";
import ProfessionalDisclosure from "@/components/ProfessionalDisclosure";
import { createClient } from "@/lib/supabase/server";
import {
  BUSINESS_NAME,
  SITE_URL,
  SERVICE_AREA_CITIES,
  SERVICE_AREA_COUNTIES,
  SERVICE_AREA_SUMMARY,
  OG_IMAGE_PATH,
} from "@/../site.config";
import { buildBreadcrumbList, buildLocalBusiness } from "@/lib/schema";

const PAGE_URL = `${SITE_URL}service-areas`;
const PAGE_TITLE = `Service Areas — ${BUSINESS_NAME}`;
const PAGE_DESCRIPTION = `${BUSINESS_NAME} is a licensed Florida GC serving ${SERVICE_AREA_CITIES.length} cities across ${SERVICE_AREA_COUNTIES.join(
  " and ",
)}. See every community we build in.`;

const DISCLOSURE_PROPS = {
  vertical: "construction",
  codeStandard: "Florida Building Code",
  threshold: "$1,000",
  licensingBody: "Florida DBPR",
  verificationUrl: "https://www2.myfloridalicense.com",
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

// Broward vs Palm Beach split for visual grouping.
// Hardcoded here so the order matches SERVICE_AREA_CITIES exactly
// and doesn't drift when the config is edited.
const BROWARD_CITIES = new Set([
  "Fort Lauderdale",
  "Hollywood",
  "Pembroke Pines",
  "Coral Springs",
  "Pompano Beach",
  "Davie",
  "Plantation",
  "Miramar",
  "Weston",
  "Sunrise",
  "Deerfield Beach",
  "Parkland",
  "Coconut Creek",
]);

function citySlug(city: string): string {
  return city
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

async function fetchCityHubSlugs(): Promise<Set<string>> {
  // City hubs live in Supabase as published pages with page_type='city'.
  // Until writer_agent runs, there are none — that's fine, cities render
  // as plain text instead of links.
  const supabase = createClient();
  const { data, error } = await supabase
    .from("pages")
    .select("url_slug")
    .eq("page_type", "city")
    .eq("status", "published");
  if (error) {
    console.error("[service-areas] city slugs fetch error:", error.message);
    return new Set();
  }
  return new Set((data ?? []).map((r) => (r as { url_slug: string }).url_slug));
}

export default async function ServiceAreasPage() {
  const publishedCityHubSlugs = await fetchCityHubSlugs();
  const localBusinessSchema = buildLocalBusiness();
  const breadcrumbSchema = buildBreadcrumbList([
    { name: "Home", url: SITE_URL },
    { name: "Service Areas", url: PAGE_URL },
  ]);
  const schema = [localBusinessSchema, breadcrumbSchema];

  const broward = SERVICE_AREA_CITIES.filter((c) => BROWARD_CITIES.has(c));
  const palmBeach = SERVICE_AREA_CITIES.filter((c) => !BROWARD_CITIES.has(c));

  const renderCity = (city: string) => {
    const slug = citySlug(city);
    const possibleHub = `/services/${slug}`;
    const hasHub = publishedCityHubSlugs.has(possibleHub);
    if (hasHub) {
      return (
        <Link
          href={possibleHub}
          className="inline-block rounded-lg border border-[rgba(221,225,235,0.7)] bg-white px-4 py-3 text-gray-700 hover:text-brand-primary hover:border-brand-primary transition-colors"
        >
          {city}
        </Link>
      );
    }
    return (
      <span className="inline-block rounded-lg border border-[rgba(221,225,235,0.7)] bg-gray-50 px-4 py-3 text-gray-700">
        {city}
      </span>
    );
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <Hero
        eyebrow="Service Areas"
        heading="Cities we build in"
        subheading={SERVICE_AREA_SUMMARY}
        ctaLabel="Request a Free Estimate"
        ctaHref="/contact"
        backgroundImageUrl="/images/hero.webp"
      />

      <ReviewedBy />

      <section className="section-primary bg-white">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <div>
              <p className="eyebrow mb-3">Broward County</p>
              <h2 className="section-h2 mb-5">
                {broward.length} cities in Broward
              </h2>
              <p className="text-gray-600 text-[15px] leading-[1.75] mb-8">
                From Parkland and Coral Springs in the north to Hollywood
                and Pembroke Pines along the Miami-Dade line — one GC,
                one license holder, covering every community.
              </p>
              <ul className="flex flex-wrap gap-2">
                {broward.map((city) => (
                  <li key={city}>{renderCity(city)}</li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow mb-3">Palm Beach County</p>
              <h2 className="section-h2 mb-5">
                {palmBeach.length} cities in Palm Beach
              </h2>
              <p className="text-gray-600 text-[15px] leading-[1.75] mb-8">
                Boca Raton, Delray, Boynton, West Palm, Jupiter, Palm
                Beach Gardens, and Wellington — coastal hurricane zones,
                inland gated communities, and everything between.
              </p>
              <ul className="flex flex-wrap gap-2">
                {palmBeach.map((city) => (
                  <li key={city}>{renderCity(city)}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        eyebrow="Not listed?"
        heading="We travel for the right project"
        subheading="If your address is near these service areas, call — we handle larger-scope projects outside the core coverage map on a case-by-case basis."
        ctaLabel="Request a Free Estimate"
        ctaHref="/contact"
      />

      <ProfessionalDisclosure {...DISCLOSURE_PROPS} />
    </>
  );
}
