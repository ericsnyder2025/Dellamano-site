import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import CTABanner from "@/components/sections/CTABanner";
import ReviewedBy from "@/components/ReviewedBy";
import GalleryFiltered from "@/components/sections/GalleryFiltered";
import {
  BUSINESS_NAME,
  SITE_URL,
  OG_IMAGE_PATH,
  SERVICE_AREA_COUNTIES,
} from "@/../site.config";
import { buildBreadcrumbList, buildImageGallery } from "@/lib/schema";
import { GALLERY_PHOTOS, GALLERY_CATEGORIES } from "@/lib/galleryAll";

const PAGE_URL = `${SITE_URL}gallery`;
const PAGE_TITLE = `Project Gallery — ${BUSINESS_NAME}`;
// Kept ≤ 160 chars so Google doesn't truncate the description in SERPs.
const PAGE_DESCRIPTION = `Custom homes, commercial buildouts, medical clinics, and outdoor living projects across ${SERVICE_AREA_COUNTIES.join(" and ")}. One licensed contractor, every permit.`;

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
    description: PAGE_DESCRIPTION.slice(0, 125),
    images: [OG_IMAGE_PATH],
  },
};

export const revalidate = 86400;

export default function GalleryPage() {
  const breadcrumbSchema = buildBreadcrumbList([
    { name: "Home", url: SITE_URL },
    { name: "Gallery", url: PAGE_URL },
  ]);
  const gallerySchema = buildImageGallery({
    url: PAGE_URL,
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    photos: GALLERY_PHOTOS,
  });
  const schema = [gallerySchema, breadcrumbSchema];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <Hero
        eyebrow="Project Gallery"
        heading="Every Project. Every Trade. One Contractor."
        subheading={`Real photos from custom homes, commercial buildouts, medical clinics, and outdoor living projects across ${SERVICE_AREA_COUNTIES.join(" and ")}. Every permit on every job carries the same qualifier signature.`}
        ctaLabel="Request a Free Estimate"
        ctaHref="/contact"
        backgroundImageUrl="/images/hero.webp"
      />

      <ReviewedBy />

      <GalleryFiltered
        photos={GALLERY_PHOTOS}
        categories={GALLERY_CATEGORIES}
      />

      <CTABanner
        eyebrow="Free Estimate"
        heading="Like what you see?"
        subheading={`Free estimates across ${SERVICE_AREA_COUNTIES.join(" and ")}. One licensed contractor signing every permit on every trade.`}
        ctaLabel="Request a Free Estimate"
        ctaHref="/contact"
      />
    </>
  );
}
