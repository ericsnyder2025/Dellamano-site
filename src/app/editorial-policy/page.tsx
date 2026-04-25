import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS_NAME, SITE_URL, AUTHOR } from "@/../site.config";

// Internal nav must be relative — AUTHOR_URL is absolute (production
// domain) for canonical/schema/OG. See AuthorBio.tsx for context.
const AUTHOR_PATH = `/team/${AUTHOR.slug}`;

export const metadata: Metadata = {
  title: `Editorial Policy — ${BUSINESS_NAME}`,
  description: `How ${BUSINESS_NAME} reviews, verifies, and maintains content accuracy. Review process, AI disclosure, corrections, and conflict of interest policy.`,
  alternates: { canonical: `${SITE_URL}editorial-policy` },
  openGraph: {
    title: `Editorial Policy — ${BUSINESS_NAME}`,
    description: "How we review, verify, and maintain content accuracy.",
    url: `${SITE_URL}editorial-policy`,
    siteName: BUSINESS_NAME,
    type: "article",
  },
};

export default function EditorialPolicyPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 prose prose-lg">
      <h1>Editorial Policy</h1>
      <p>
        {BUSINESS_NAME} publishes content to help homeowners make informed decisions
        about {/* TODO: your vertical(s) */}. This page explains who reviews our
        content, how we verify facts, how we handle AI-assisted drafting, and how to
        flag errors.
      </p>

      <h2>Expert Review</h2>
      <p>
        Every article, guide, and service page on this site is reviewed for technical
        accuracy by <Link href={AUTHOR_PATH}>{AUTHOR.name}</Link>, {AUTHOR.jobTitle}.{" "}
        {AUTHOR.name} has {/* TODO: years */} years of field experience and holds{" "}
        {AUTHOR.licenses.length > 0
          ? `active ${AUTHOR.licenses.map((l) => l.name).join(", ")} credentials.`
          : "active licenses in the relevant trades."}
      </p>

      <h2>Accuracy &amp; Sources</h2>
      <p>
        Factual claims — code references, permit requirements, cost figures,
        timelines, material specifications — are verified against current authoritative
        sources before publication. When we cite numbers, we cite the source. When
        guidelines or regulations change, we update affected content.
      </p>

      <h2>AI-Assisted Content</h2>
      <p>
        Some articles on this site are drafted with AI assistance to accelerate
        research and initial prose generation. Every AI-drafted article is then:
      </p>
      <ul>
        <li>Reviewed by {AUTHOR.name} for technical accuracy against current code standards and field practice</li>
        <li>Edited for local specificity (cities, counties, climate, HOA patterns, permits)</li>
        <li>Fact-checked against authoritative sources</li>
        <li>Approved by {AUTHOR.name} before publication</li>
      </ul>
      <p>
        We disclose AI assistance because transparency matters. The final published
        content reflects {AUTHOR.name}&apos;s expertise and endorsement, regardless of
        the initial drafting tool.
      </p>

      <h2>Independence</h2>
      <p>
        Our content is editorially independent from our sales team. When we recommend
        materials, methods, or timelines, the recommendation is what we believe serves
        the homeowner best — not what maximizes our margin. If an article discusses a
        product or brand we sell, we disclose the relationship.
      </p>

      <h2>Corrections</h2>
      <p>
        Found an error or have a question about something we published? Email{" "}
        <a href={`mailto:${/* TODO: editorial email */ "editorial@example.com"}`}>
          editorial@example.com
        </a>
        . We review every correction request and update the affected content when
        appropriate. Significant corrections are noted at the bottom of the article
        with the date of the update.
      </p>

      <h2>Updates &amp; Freshness</h2>
      <p>
        We review published content at least annually and update when:
      </p>
      <ul>
        <li>Relevant codes or regulations change</li>
        <li>Material pricing shifts meaningfully</li>
        <li>New products or methods become standard in the industry</li>
        <li>Reader feedback identifies an outdated detail</li>
      </ul>
      <p>
        Every article displays the most recent review date at the top.
      </p>
    </article>
  );
}
