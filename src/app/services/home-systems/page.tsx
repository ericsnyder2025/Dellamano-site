import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import CTABanner from "@/components/sections/CTABanner";
import ContactForm from "@/components/ContactForm";
import ReviewedBy from "@/components/ReviewedBy";
import ServiceGallery from "@/components/sections/ServiceGallery";
import ProfessionalDisclosure from "@/components/ProfessionalDisclosure";
import PillarSubServices from "@/components/sections/PillarSubServices";
import GeneratedContent from "@/components/geo/GeneratedContent";
import { createClient } from "@/lib/supabase/server";
import { BUSINESS_NAME, SITE_URL, OG_IMAGE_PATH } from "@/../site.config";
import { buildPageSchemaBlocks } from "@/lib/schema";
import type { ContentSection, PhotoRow } from "@/types/page";

// Supabase-backed pillar wrapper. Tries the agent-written row first;
// falls back to the hardcoded placeholder layout if no published row
// exists. Same pattern as exterior-living / interior-renovation.

export const revalidate = 86400;

const SLUG = "/services/home-systems";
const PLACEHOLDER_TITLE = `Home Systems & Mechanical Work — ${BUSINESS_NAME}`;
const PLACEHOLDER_DESC =
  "Whole-house generator installations, electrical upgrades, and mechanical work across Broward and Palm Beach Counties.";

const DISCLOSURE_PROPS = {
  vertical: "construction",
  codeStandard: "Florida Building Code",
  threshold: "$1,000",
  licensingBody: "Florida DBPR",
  verificationUrl: "https://www.myfloridalicense.com",
};

type PageRow = {
  id: string;
  meta_title: string | null;
  meta_description: string | null;
  h1: string | null;
  content: ContentSection[] | null;
  faq: unknown;
  og_image_url: string | null;
  updated_at: string | null;
};

function formatLastUpdated(iso: string | null): string | undefined {
  if (!iso) return undefined;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

async function fetchPublishedPage(): Promise<PageRow | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("pages")
    .select("id, meta_title, meta_description, h1, content, faq, og_image_url, updated_at")
    .eq("url_slug", SLUG)
    .eq("status", "published")
    .maybeSingle();
  if (error) {
    console.error(`[home-systems] fetch error:`, error.message);
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
    console.error(`[home-systems] photos fetch error:`, error.message);
    return [];
  }
  return (data as PhotoRow[] | null) ?? [];
}

function pickHeroPhoto(photos: PhotoRow[]): string | undefined {
  const hero = photos.find((p) => p.storage_path?.includes("-hero."));
  return hero?.public_url;
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
        {/*
          Visual-only markup. Structured data for the FAQ ships as JSON-LD
          via buildFAQPage() — DO NOT add itemScope/itemType="schema.org/FAQPage"
          here, that triggers a duplicate-FAQPage rejection in Google Rich
          Results.
        */}
        <div className="space-y-4">
          {faq.map((item, i) => (
            <details
              key={i}
              className="group bg-white border border-[rgba(221,225,235,0.7)] rounded-[1rem] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-card)] transition-shadow"
            >
              <summary className="cursor-pointer list-none px-6 py-5 flex items-start justify-between gap-4">
                <h3 className="font-display text-[17px] sm:text-[18px] font-bold text-brand-dark leading-[1.3] tracking-tight">
                  {item.question}
                </h3>
                <span className="flex-shrink-0 text-brand-accent text-[22px] leading-none mt-0.5 group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <div className="px-6 pb-6 -mt-1">
                <p className="text-gray-600 text-[15px] leading-[1.75]">
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
        eyebrow="Home Systems · South Florida"
        heading="Whole-house generators, electrical, mechanical"
        subheading="Standby generator sales and installation, panel upgrades, and mechanical work — performed by a GC who personally holds the mechanical, electrical, and plumbing licenses."
        ctaLabel="Request a Free Estimate"
        ctaHref="#free-estimate"
        rightColumn={<ContactForm />}
      />

      <ReviewedBy />

      <ServiceGallery slug="home-systems" />

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
        subheading="Licensed general, roofing, mechanical, electrical, and plumbing contractor covering Broward and Palm Beach Counties."
        ctaLabel="Request a Free Estimate"
        ctaHref="/contact"
      />

      <ProfessionalDisclosure {...DISCLOSURE_PROPS} />
    </>
  );
}

export default async function HomeSystemsPillar() {
  const page = await fetchPublishedPage();
  if (!page || !Array.isArray(page.content) || page.content.length === 0) {
    return <PlaceholderBody />;
  }

  const photos = await fetchPhotos(page.id);
  const faq = Array.isArray(page.faq) ? (page.faq as FAQItem[]) : [];
  const heroImage = pickHeroPhoto(photos);
  const subheading =
    page.meta_description ||
    "Whole-house generators, electrical upgrades, and plumbing — one licensed GC coordinating every trade on the permit.";
  const lastUpdated = formatLastUpdated(page.updated_at);

  const schemaBlocks = buildPageSchemaBlocks({
    slug: SLUG,
    h1: page.h1,
    metaDescription: page.meta_description,
    pageType: "service",
    faq,
    image: page.og_image_url,
    dateModified: page.updated_at,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBlocks) }}
      />
      <Hero
        eyebrow="Home Systems · South Florida"
        heading={page.h1 || "South Florida Home Systems Contractor"}
        subheading={subheading}
        ctaLabel="Request a Free Estimate"
        ctaHref="#free-estimate"
        backgroundImageUrl={heroImage}
        rightColumn={<ContactForm />}
      />
      <ReviewedBy lastUpdated={lastUpdated} />
      <ServiceGallery slug="home-systems" />
      <PillarSubServices
        pillar="home-systems"
        eyebrow="Home Systems services"
        heading="The trades running inside your walls"
        subheading="Generators, electrical, and plumbing — each has its own detailed guide."
      />
      <GeneratedContent sections={page.content} photos={photos} />
      <FAQSection faq={faq} />
      <ProfessionalDisclosure {...DISCLOSURE_PROPS} />
    </>
  );
}
