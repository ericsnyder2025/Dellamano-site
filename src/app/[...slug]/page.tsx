import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SITE_URL, BUSINESS_NAME, OG_IMAGE_PATH } from "@/../site.config";
import GeneratedContent from "@/components/geo/GeneratedContent";
import Hero from "@/components/sections/Hero";
import ContactForm from "@/components/ContactForm";
import ReviewedBy from "@/components/ReviewedBy";
import AuthorBio from "@/components/AuthorBio";
import ProfessionalDisclosure from "@/components/ProfessionalDisclosure";
import type { ContentSection, PhotoRow } from "@/types/page";

/**
 * Catch-all route — renders agent-generated pages from the `pages` table.
 *
 * Matching rule: the incoming URL path is joined with "/" and prefixed with
 * "/" to form the `url_slug` stored by the agents (e.g., `/services/exterior-living`,
 * `/blog/kitchen-remodel-cost`).
 *
 * See references/15-tech-stack-deployment.md + dellamano-agents/INTEGRATION.md.
 */

export const revalidate = 86400;  // 24h ISR; force-refreshed by /api/revalidate

type PageRow = {
  id: string;
  url_slug: string;
  vertical: string | null;
  page_type: string | null;
  meta_title: string | null;
  meta_description: string | null;
  h1: string | null;
  content: ContentSection[] | null;
  faq: unknown;
  og_image_url: string | null;
  published_at: string | null;
  updated_at: string | null;
};

async function fetchPage(urlSlug: string): Promise<PageRow | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("pages")
    .select(
      "id, url_slug, vertical, page_type, meta_title, meta_description, h1, content, faq, og_image_url, published_at, updated_at"
    )
    .eq("url_slug", urlSlug)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    console.error(`[pages] fetch error for ${urlSlug}:`, error.message);
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
    console.error(`[photos] fetch error for page ${pageId}:`, error.message);
    return [];
  }
  return (data as PhotoRow[] | null) ?? [];
}

function slugFromParams(slugParts: string[] | undefined): string {
  const joined = (slugParts ?? []).filter(Boolean).join("/");
  return `/${joined}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug: slugParts } = await params;
  const slug = slugFromParams(slugParts);
  const page = await fetchPage(slug);
  if (!page) return {};

  const canonical = `${SITE_URL}${slug.replace(/^\//, "")}`;
  const ogImage = page.og_image_url || OG_IMAGE_PATH;

  return {
    title: page.meta_title || page.h1 || BUSINESS_NAME,
    description: page.meta_description ?? undefined,
    alternates: { canonical },
    openGraph: {
      title: page.meta_title || page.h1 || BUSINESS_NAME,
      description: page.meta_description ?? undefined,
      url: canonical,
      siteName: BUSINESS_NAME,
      type: page.page_type === "blog" ? "article" : "website",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: page.meta_title || page.h1 || BUSINESS_NAME,
      description: page.meta_description?.slice(0, 125),
      images: [ogImage],
    },
  };
}

function eyebrowFromSlug(slug: string): string {
  // Take the last non-empty path segment, title-case it, append region.
  // `/services/exterior-living` -> "Exterior Living · South Florida"
  // `/blog/kitchen-remodel-cost` -> "Kitchen Remodel Cost · South Florida"
  const last = slug.split("/").filter(Boolean).pop() || "";
  const words = last
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return words ? `${words} · South Florida` : "South Florida";
}

function pickHeroPhoto(photos: PhotoRow[]): string | undefined {
  // Agent stores the hero as <slug>-hero.webp. Prefer that; fall back to
  // letting Hero use its component default.
  const hero = photos.find((p) => p.storage_path?.includes("-hero."));
  return hero?.public_url;
}

function formatLastUpdated(iso: string | null): string | undefined {
  if (!iso) return undefined;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

// Dellamano-wide defaults for the contractor scope-of-practice disclosure.
// Every /services/* and /blog/* page gets the same disclaimer; tighten
// per-vertical here if different work categories ever need different text.
const DISCLOSURE_PROPS = {
  vertical: "construction",
  codeStandard: "Florida Building Code",
  threshold: "$1,000",
  licensingBody: "Florida DBPR",
  verificationUrl: "https://www.myfloridalicense.com",
};

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

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug: slugParts } = await params;
  const slug = slugFromParams(slugParts);
  const page = await fetchPage(slug);
  if (!page) notFound();

  const photos = await fetchPhotos(page.id);
  const sections = Array.isArray(page.content) ? page.content : [];
  const faq = Array.isArray(page.faq) ? (page.faq as FAQItem[]) : [];
  const heroImage = pickHeroPhoto(photos);
  const subheading =
    page.meta_description ||
    "Licensed South Florida general contractor. Broward and Palm Beach Counties.";
  const lastUpdated = formatLastUpdated(page.updated_at);
  const isBlog = page.page_type === "blog";

  return (
    <>
      <Hero
        eyebrow={eyebrowFromSlug(slug)}
        heading={page.h1 || BUSINESS_NAME}
        subheading={subheading}
        ctaLabel="Request a Free Estimate"
        ctaHref="#free-estimate"
        backgroundImageUrl={heroImage}
        rightColumn={<ContactForm />}
      />
      <ReviewedBy lastUpdated={lastUpdated} showEditorialLink={isBlog} />
      <GeneratedContent sections={sections} photos={photos} />
      {isBlog && <AuthorBio />}
      <FAQSection faq={faq} />
      <ProfessionalDisclosure {...DISCLOSURE_PROPS} />
    </>
  );
}
