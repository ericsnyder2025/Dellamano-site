import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import CTABanner from "@/components/sections/CTABanner";
import ReviewedBy from "@/components/ReviewedBy";
import PillarSubServices from "@/components/sections/PillarSubServices";
import GeneratedContent from "@/components/geo/GeneratedContent";
import { createClient } from "@/lib/supabase/server";
import { BUSINESS_NAME, SITE_URL, OG_IMAGE_PATH } from "@/../site.config";
import type { ContentSection, PhotoRow } from "@/types/page";

// Tries the Supabase pillar content first; falls back to the hardcoded
// hero/sub-services/CTA layout if no published row is found. Same pattern
// can be applied to the other /services/<slug>/page.tsx placeholders as
// their agent-generated content lands.

export const revalidate = 86400;

const SLUG = "/services/exterior-living";
const PLACEHOLDER_TITLE = `Exterior Living & Outdoor Construction — ${BUSINESS_NAME}`;
const PLACEHOLDER_DESC =
  "Outdoor kitchens, pergolas, pavers, and exterior upgrades across Broward and Palm Beach Counties.";

type PageRow = {
  id: string;
  meta_title: string | null;
  meta_description: string | null;
  h1: string | null;
  content: ContentSection[] | null;
  faq: unknown;
  og_image_url: string | null;
};

async function fetchPublishedPage(): Promise<PageRow | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("pages")
    .select("id, meta_title, meta_description, h1, content, faq, og_image_url")
    .eq("url_slug", SLUG)
    .eq("status", "published")
    .maybeSingle();
  if (error) {
    console.error(`[exterior-living] fetch error:`, error.message);
    return null;
  }
  return (data as PageRow | null) ?? null;
}

async function fetchPhotos(pageId: string): Promise<PhotoRow[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("photos")
    .select("*")
    .eq("page_id", pageId);
  if (error) {
    console.error(`[exterior-living] photos fetch error:`, error.message);
    return [];
  }
  return (data as PhotoRow[] | null) ?? [];
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchPublishedPage();
  const canonical = `${SITE_URL}${SLUG.replace(/^\//, "")}`;
  const title = page?.meta_title || page?.h1 || PLACEHOLDER_TITLE;
  const description = page?.meta_description || PLACEHOLDER_DESC;
  const ogImage = page?.og_image_url || OG_IMAGE_PATH;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: BUSINESS_NAME,
      type: "website",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: description.slice(0, 125),
      images: [ogImage],
    },
  };
}

type FAQItem = { question: string; answer: string };

function FAQSection({ faq }: { faq: FAQItem[] }) {
  if (!faq || faq.length === 0) return null;
  return (
    <section className="section-primary bg-white">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="eyebrow">Frequently Asked</p>
          <h2 className="section-h2">Common Questions</h2>
        </div>
        <div
          className="space-y-4"
          itemScope
          itemType="https://schema.org/FAQPage"
        >
          {faq.map((item, i) => (
            <details
              key={i}
              className="group bg-white border border-[rgba(221,225,235,0.7)] rounded-[1rem] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-card)] transition-shadow"
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <summary className="cursor-pointer list-none px-6 py-5 flex items-start justify-between gap-4">
                <h3
                  className="font-display text-[17px] sm:text-[18px] font-bold text-brand-dark leading-[1.3] tracking-tight"
                  itemProp="name"
                >
                  {item.question}
                </h3>
                <span className="flex-shrink-0 text-brand-accent text-[22px] leading-none mt-0.5 group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <div
                className="px-6 pb-6 -mt-1"
                itemScope
                itemProp="acceptedAnswer"
                itemType="https://schema.org/Answer"
              >
                <p
                  className="text-gray-600 text-[15px] leading-[1.75]"
                  itemProp="text"
                >
                  {item.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function PlaceholderBody() {
  return (
    <>
      <Hero
        eyebrow="Exterior Living"
        heading="Outdoor kitchens, pergolas, and exterior construction"
        subheading="Custom outdoor spaces built for South Florida sun, salt, and summer rain — engineered by a licensed GC who personally holds the mechanical, electrical, and plumbing credentials on every permit."
        ctaLabel="Request a Free Estimate"
        ctaHref="/contact"
      />

      <ReviewedBy />

      <PillarSubServices
        pillar="exterior-living"
        eyebrow="Exterior Living services"
        heading="What we build outside the house"
        subheading="Outdoor kitchens, pergolas, hardscapes, and pool construction — engineered for South Florida sun, salt, and hurricane wind loads."
      />

      <section className="section-primary bg-white">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <p className="eyebrow mb-3">Pillar page — content in progress</p>
          <h2 className="section-h2 mb-4">Full guide coming soon</h2>
          <p className="text-gray-600 text-[16px] leading-[1.75]">
            Our detailed guide to planning, permitting, and building high-end outdoor living spaces in Broward and Palm Beach Counties is being written. In the meantime, call us directly or request a free estimate — we&apos;re happy to walk your project in person.
          </p>
        </div>
      </section>

      <CTABanner
        eyebrow="Free Estimate"
        heading="Planning an outdoor living project?"
        subheading="Licensed general contractor covering Broward and Palm Beach Counties. One GC signing every permit — every trade on your project answers to the same license holder."
        ctaLabel="Request a Free Estimate"
        ctaHref="/contact"
      />
    </>
  );
}

function PageHeader({ h1 }: { h1: string }) {
  return (
    <header className="bg-brand-dark relative overflow-hidden py-20 sm:py-24 lg:py-28">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 30% 40%, rgba(184,135,60,0.35) 0%, transparent 55%)",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-5xl px-6 lg:px-8 text-center">
        <h1
          className="font-display font-bold leading-[1.05] tracking-tight"
          style={{ color: "#FFFFFF", fontSize: "clamp(36px, 6vw, 64px)" }}
        >
          {h1}
        </h1>
      </div>
    </header>
  );
}

export default async function ExteriorLivingPillar() {
  const page = await fetchPublishedPage();
  if (!page || !Array.isArray(page.content) || page.content.length === 0) {
    return <PlaceholderBody />;
  }

  const photos = await fetchPhotos(page.id);
  const faq = Array.isArray(page.faq) ? (page.faq as FAQItem[]) : [];

  return (
    <>
      <PageHeader h1={page.h1 || "Exterior Living"} />
      <GeneratedContent sections={page.content} photos={photos} />
      <FAQSection faq={faq} />
    </>
  );
}
