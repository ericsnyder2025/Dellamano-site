import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SITE_URL, BUSINESS_NAME, OG_IMAGE_PATH } from "@/../site.config";

/**
 * Catch-all route — renders agent-generated pages from the `pages` table.
 *
 * Matching rule: the incoming URL path is joined with "/" and prefixed with
 * "/" to form the `url_slug` stored by the agents (e.g., `/roofing/miami`,
 * `/blog/roofing/shingle-vs-tile`).
 *
 * TO CUSTOMIZE: swap <ContentPlaceholder> for a real block renderer that
 * iterates page.content (the agent stores a JSONB array of typed blocks —
 * see haven-agents blog_agent/writer_agent for the shape).
 *
 * See references/15-tech-stack-deployment.md + seo-site-agents/INTEGRATION.md.
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
  content: unknown;
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

function slugFromParams(slugParts: string[] | undefined): string {
  const joined = (slugParts ?? []).filter(Boolean).join("/");
  return `/${joined}`;
}

export async function generateMetadata({
  params,
}: {
  params: { slug?: string[] };
}): Promise<Metadata> {
  const slug = slugFromParams(params.slug);
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

export default async function DynamicPage({
  params,
}: {
  params: { slug?: string[] };
}) {
  const slug = slugFromParams(params.slug);
  const page = await fetchPage(slug);
  if (!page) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      {page.h1 && <h1 className="text-4xl font-bold mb-6">{page.h1}</h1>}

      {/*
        TODO: Replace this placeholder with your block renderer.
        `page.content` is a JSONB array of typed blocks written by the
        agents. See haven-site/src/components/geo/GeneratedContent.tsx for
        a reference renderer that handles intro / text / callout / bullets /
        steps / comparison / stat-grid / image / cta block types.
      */}
      <pre className="text-sm bg-gray-100 p-4 rounded overflow-auto">
        {JSON.stringify(page.content, null, 2)}
      </pre>
    </article>
  );
}
