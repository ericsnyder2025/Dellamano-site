import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Hero from "@/components/sections/Hero";
import CTABanner from "@/components/sections/CTABanner";
import ReviewedBy from "@/components/ReviewedBy";
import ProfessionalDisclosure from "@/components/ProfessionalDisclosure";
import { createClient } from "@/lib/supabase/server";
import {
  BUSINESS_NAME,
  SITE_URL,
  SERVICE_AREA_COUNTIES,
  OG_IMAGE_PATH,
} from "@/../site.config";
import { buildBreadcrumbList } from "@/lib/schema";

const PAGE_URL = `${SITE_URL}blog`;
const PAGE_TITLE = `Construction Insights — ${BUSINESS_NAME}`;
const PAGE_DESCRIPTION = `Guides on permit paths, remodel costs, and South Florida building-code realities from ${BUSINESS_NAME}, a licensed Florida general contractor.`;

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

type BlogPost = {
  url_slug: string;
  h1: string | null;
  meta_title: string | null;
  meta_description: string | null;
  published_at: string | null;
  updated_at: string | null;
  og_image_url: string | null;
};

async function fetchBlogPosts(): Promise<BlogPost[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("pages")
    .select(
      "url_slug, h1, meta_title, meta_description, published_at, updated_at, og_image_url",
    )
    .eq("page_type", "blog")
    .eq("status", "published")
    .order("published_at", { ascending: false });
  if (error) {
    console.error("[blog-index] fetch error:", error.message);
    return [];
  }
  return (data as BlogPost[] | null) ?? [];
}

function formatDate(iso: string | null): string | undefined {
  if (!iso) return undefined;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function BlogIndexPage() {
  const posts = await fetchBlogPosts();

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${PAGE_URL}#blog`,
    url: PAGE_URL,
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    publisher: { "@id": `${SITE_URL}#organization` },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.h1 || p.meta_title || "",
      url: `${SITE_URL.replace(/\/$/, "")}${p.url_slug}`,
      ...(p.published_at && { datePublished: p.published_at }),
      ...(p.updated_at && { dateModified: p.updated_at }),
    })),
  };
  const breadcrumbSchema = buildBreadcrumbList([
    { name: "Home", url: SITE_URL },
    { name: "Blog", url: PAGE_URL },
  ]);
  const schema = [blogSchema, breadcrumbSchema];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <Hero
        eyebrow="Blog"
        heading="Construction insights from a licensed Florida GC"
        subheading={`Permit paths, remodel costs, and building-code realities for ${SERVICE_AREA_COUNTIES.join(
          " and ",
        )} — written by the license holder on every project.`}
        ctaLabel="Request a Free Estimate"
        ctaHref="/contact"
        backgroundImageUrl="/images/hero.webp"
      />

      <ReviewedBy />

      <section className="section-primary bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center max-w-2xl mx-auto">
              <p className="eyebrow mb-3">Posts coming soon</p>
              <h2 className="section-h2 mb-4">
                We&apos;re writing the playbook
              </h2>
              <p className="text-gray-600 text-[16px] leading-[1.75]">
                New posts are being written and will land here as they
                publish. In the meantime, explore our{" "}
                <Link
                  href="/services"
                  className="text-brand-primary font-bold"
                >
                  services guides
                </Link>{" "}
                or request a free estimate.
              </p>
            </div>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {posts.map((post) => {
                const date = formatDate(post.published_at || post.updated_at);
                return (
                  <li key={post.url_slug}>
                    <Link
                      href={post.url_slug}
                      className="group relative flex flex-col h-full rounded-[1.25rem] overflow-hidden bg-white border border-[rgba(221,225,235,0.7)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
                    >
                      <div className="p-6 flex flex-col flex-1">
                        {date && (
                          <p className="eyebrow mb-3 text-gray-500">{date}</p>
                        )}
                        <h3 className="font-display text-[18px] font-bold text-brand-dark mb-3 leading-snug tracking-tight">
                          {post.h1 || post.meta_title}
                        </h3>
                        {post.meta_description && (
                          <p className="text-gray-600 text-[14px] leading-[1.7] mb-4 line-clamp-4">
                            {post.meta_description}
                          </p>
                        )}
                        <span className="mt-auto inline-flex items-center gap-2 text-brand-primary font-bold text-[13px] tracking-wide uppercase group-hover:gap-3 transition-all">
                          Read post
                          <ArrowRight size={13} aria-hidden="true" />
                        </span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>

      <CTABanner
        eyebrow="Free Estimate"
        heading="Planning a project?"
        subheading={`Licensed GC covering ${SERVICE_AREA_COUNTIES.join(
          " and ",
        )}. Call us to walk your project in person.`}
        ctaLabel="Request a Free Estimate"
        ctaHref="/contact"
      />

      <ProfessionalDisclosure {...DISCLOSURE_PROPS} />
    </>
  );
}
