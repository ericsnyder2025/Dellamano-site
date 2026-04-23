/**
 * Schema.org JSON-LD builders.
 *
 * Every content-bearing page should emit a consolidated JSON-LD block
 * with the relevant schemas for that page type. See references/02-schema-patterns.md.
 *
 * Usage pattern on a blog post:
 *
 *   const schema = [
 *     buildArticle({...}),
 *     buildBreadcrumbList([...]),
 *     buildFAQPage(faqs),
 *   ].filter(Boolean);
 *
 *   <script type="application/ld+json"
 *     dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
 */

import {
  BUSINESS_NAME,
  BUSINESS_LEGAL_NAME,
  SITE_URL,
  SOCIAL_LINKS,
  LOGO_PATH,
  PHONE_NUMBER,
  EMAIL,
  ADDRESS,
  AUTHOR,
  AUTHOR_URL,
  SCHEMA_BUSINESS_TYPE,
  SERVICE_AREA_CITIES,
  SERVICE_AREA_COUNTIES,
  HOURS,
  PARENT_COMPANY,
} from "@/../site.config";

// ─────────────────────────────────────────────────────────────────
// WebSite (emit once site-wide in root layout)
// ─────────────────────────────────────────────────────────────────
export function buildWebSite() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}#website`,
    url: SITE_URL,
    name: BUSINESS_NAME,
    publisher: { "@id": `${SITE_URL}#organization` },
    inLanguage: "en-US",
  };
}

// ─────────────────────────────────────────────────────────────────
// Organization (emit once site-wide in root layout)
// ─────────────────────────────────────────────────────────────────
export function buildOrganization() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}#organization`,
    name: BUSINESS_LEGAL_NAME,
    ...(BUSINESS_NAME !== BUSINESS_LEGAL_NAME && { alternateName: BUSINESS_NAME }),
    url: SITE_URL,
    logo: `${SITE_URL}${LOGO_PATH.replace(/^\//, "")}`,
    telephone: PHONE_NUMBER,
    email: EMAIL,
    sameAs: Object.values(SOCIAL_LINKS).filter(
      (v): v is string => typeof v === "string" && v.startsWith("http")
    ),
    ...(PARENT_COMPANY.isDba && {
      parentOrganization: {
        "@type": "Organization",
        name: PARENT_COMPANY.legalName,
        url: PARENT_COMPANY.url,
      },
    }),
  };
}

// ─────────────────────────────────────────────────────────────────
// LocalBusiness (emit once on home/about OR per-city-hub)
// ─────────────────────────────────────────────────────────────────
export function buildLocalBusiness() {
  const hoursSpec: object[] = [];
  if (HOURS.weekdays) {
    hoursSpec.push({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: HOURS.weekdays.opens,
      closes: HOURS.weekdays.closes,
    });
  }
  if (HOURS.saturday) {
    hoursSpec.push({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: HOURS.saturday.opens,
      closes: HOURS.saturday.closes,
    });
  }
  if (HOURS.sunday) {
    hoursSpec.push({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: HOURS.sunday.opens,
      closes: HOURS.sunday.closes,
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": SCHEMA_BUSINESS_TYPE,
    "@id": `${SITE_URL}#localbusiness`,
    name: BUSINESS_NAME,
    url: SITE_URL,
    telephone: PHONE_NUMBER,
    priceRange: "$$-$$$",
    ...(ADDRESS.hasStorefront && {
      address: {
        "@type": "PostalAddress",
        streetAddress: ADDRESS.street,
        addressLocality: ADDRESS.city,
        addressRegion: ADDRESS.state,
        postalCode: ADDRESS.zip,
        addressCountry: ADDRESS.country,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: ADDRESS.lat,
        longitude: ADDRESS.lng,
      },
    }),
    areaServed: [
      ...SERVICE_AREA_CITIES.map((name) => ({ "@type": "City", name })),
      ...SERVICE_AREA_COUNTIES.map((name) => ({
        "@type": "AdministrativeArea",
        name,
      })),
    ],
    openingHoursSpecification: hoursSpec,
    sameAs: [SOCIAL_LINKS.gbp, SOCIAL_LINKS.linkedin, SOCIAL_LINKS.facebook].filter(
      (v): v is string => typeof v === "string" && v.startsWith("http")
    ),
  };
}

// ─────────────────────────────────────────────────────────────────
// Person (canonical emission on /team/{slug} page)
// ─────────────────────────────────────────────────────────────────
export function buildPerson() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": AUTHOR_URL,
    name: AUTHOR.name,
    jobTitle: AUTHOR.jobTitle,
    worksFor: { "@id": `${SITE_URL}#organization` },
    url: AUTHOR_URL,
    image: AUTHOR.headshot,
    sameAs: [AUTHOR.linkedin].filter(Boolean),
    knowsAbout: AUTHOR.expertiseAreas,
    hasCredential: AUTHOR.licenses.map((l) => ({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "license",
      name: l.name,
      identifier: l.number,
      recognizedBy: {
        "@type": "Organization",
        name: l.body,
        url: l.bodyUrl,
      },
      url: l.verificationUrl,
    })),
  };
}

// ─────────────────────────────────────────────────────────────────
// Article (blog posts + pillar content)
// ─────────────────────────────────────────────────────────────────
export function buildArticle(opts: {
  url: string;
  headline: string;
  description: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${opts.url}#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": opts.url },
    headline: opts.headline,
    description: opts.description,
    ...(opts.image && { image: opts.image }),
    author: { "@id": AUTHOR_URL },
    publisher: { "@id": `${SITE_URL}#organization` },
    ...(opts.datePublished && { datePublished: opts.datePublished }),
    ...(opts.dateModified && { dateModified: opts.dateModified }),
    inLanguage: "en-US",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2", "[itemprop='name']"],
    },
  };
}

// ─────────────────────────────────────────────────────────────────
// Service (service pillar pages)
// ─────────────────────────────────────────────────────────────────
export function buildService(opts: {
  url: string;
  serviceType: string;  // e.g., "Roof Replacement"
  description: string;
  areaServed?: string[];  // City names
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${opts.url}#service`,
    serviceType: opts.serviceType,
    provider: { "@id": `${SITE_URL}#localbusiness` },
    ...(opts.areaServed && {
      areaServed: opts.areaServed.map((name) => ({ "@type": "City", name })),
    }),
    description: opts.description,
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "USD",
        price: "0",
        description: "Free estimates",
      },
    },
  };
}

// ─────────────────────────────────────────────────────────────────
// FAQPage — CRITICAL: Only emit ONCE per page. Duplicate FAQPage
// blocks are rejected by Google Rich Results and trigger GSC errors.
// ─────────────────────────────────────────────────────────────────
export function buildFAQPage(
  faqs: Array<{ question: string; answer: string }>
) {
  if (!faqs || faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,  // Do NOT set both name AND text — DataForSEO flags the redundancy
      answerCount: 1,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

// ─────────────────────────────────────────────────────────────────
// BreadcrumbList
// ─────────────────────────────────────────────────────────────────
export function buildBreadcrumbList(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ─────────────────────────────────────────────────────────────────
// HowTo (process / instructional pages)
// ─────────────────────────────────────────────────────────────────
export function buildHowTo(opts: {
  name: string;
  description: string;
  steps: Array<{ name: string; text: string; image?: string }>;
  totalTime?: string;  // ISO 8601 duration, e.g., "PT2H" = 2 hours
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: opts.name,
    description: opts.description,
    ...(opts.totalTime && { totalTime: opts.totalTime }),
    step: opts.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
      ...(s.image && { image: s.image }),
    })),
  };
}

// ─────────────────────────────────────────────────────────────────
// Consolidated page-level schema builder.
//
// Returns the JSON-LD array a content page should emit: BreadcrumbList,
// FAQPage (when FAQ items exist), plus Service (for service pillars) or
// Article (for blog posts). Used by the catch-all route and the hand-
// written pillar wrappers so both emit the same structured-data shape.
// ─────────────────────────────────────────────────────────────────
export function buildPageSchemaBlocks(opts: {
  slug: string;                         // e.g. "/services/pergolas"
  h1?: string | null;
  metaDescription?: string | null;
  pageType?: string | null;             // "service" | "blog" | "city" | ...
  faq?: Array<{ question: string; answer: string }>;
  image?: string | null;
  datePublished?: string | null;
  dateModified?: string | null;
  serviceAreaCities?: string[];
}): unknown[] {
  const canonicalUrl = `${SITE_URL.replace(/\/$/, "")}${opts.slug}`;
  const segs = opts.slug.split("/").filter(Boolean);
  const humanize = (s: string) =>
    s
      .split("-")
      .filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  const breadcrumbs: Array<{ name: string; url: string }> = [
    { name: "Home", url: SITE_URL.replace(/\/$/, "") + "/" },
  ];
  if (segs[0] === "blog") {
    breadcrumbs.push({
      name: "Blog",
      url: `${SITE_URL.replace(/\/$/, "")}/blog`,
    });
  } else if (segs[0] === "services") {
    breadcrumbs.push({
      name: "Services",
      url: `${SITE_URL.replace(/\/$/, "")}/services`,
    });
  } else if (segs[0]) {
    breadcrumbs.push({
      name: humanize(segs[0]),
      url: `${SITE_URL.replace(/\/$/, "")}/${segs[0]}`,
    });
  }
  breadcrumbs.push({
    name: opts.h1 || humanize(segs[segs.length - 1] || ""),
    url: canonicalUrl,
  });

  const blocks: unknown[] = [buildBreadcrumbList(breadcrumbs)];

  const faqSchema = buildFAQPage(opts.faq || []);
  if (faqSchema) blocks.push(faqSchema);

  if (opts.pageType === "blog") {
    blocks.push(
      buildArticle({
        url: canonicalUrl,
        headline: opts.h1 || "",
        description: opts.metaDescription || "",
        image: opts.image || undefined,
        datePublished: toISODate(opts.datePublished || undefined),
        dateModified: toISODate(opts.dateModified || undefined),
      }),
    );
  } else if (opts.pageType === "service" || segs[0] === "services") {
    blocks.push(
      buildService({
        url: canonicalUrl,
        serviceType: opts.h1 || humanize(segs[segs.length - 1] || ""),
        description: opts.metaDescription || "",
        areaServed: opts.serviceAreaCities,
      }),
    );
  }

  return blocks;
}

// ─────────────────────────────────────────────────────────────────
// Helper: truncate at word boundary (for Twitter descriptions etc.)
// ─────────────────────────────────────────────────────────────────
export function truncateAtWord(text: string, max: number): string {
  if (text.length <= max) return text;
  const sliced = text.slice(0, max - 1);
  const lastSpace = sliced.lastIndexOf(" ");
  return (lastSpace > 0 ? sliced.slice(0, lastSpace) : sliced) + "…";
}

// ─────────────────────────────────────────────────────────────────
// Helper: ISO date formatter for schema datePublished/dateModified
// ─────────────────────────────────────────────────────────────────
export function toISODate(d: Date | string | undefined): string | undefined {
  if (!d) return undefined;
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toISOString();
}
