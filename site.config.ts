/**
 * site.config.ts — Dellamano Construction Inc.
 *
 * Single source of truth for site-specific values. Every template file
 * in src/ imports from this file.
 */

// ─────────────────────────────────────────────────────────────────
// BUSINESS IDENTITY
// ─────────────────────────────────────────────────────────────────
export const BUSINESS_NAME: string = "Dellamano Construction";
export const BUSINESS_LEGAL_NAME: string = "Dellamano Construction Inc.";
export const BUSINESS_SHORT_DESCRIPTION =
  "Licensed Florida general contractor in Broward & Palm Beach Counties. Kitchen remodels, home renovations, outdoor kitchens, generators, custom homes.";
export const BUSINESS_LONG_DESCRIPTION =
  "Dellamano Construction Inc. is a licensed Florida general contractor serving Broward and Palm Beach Counties. Led by Aldo Dellamano, a state-certified GC who personally holds licenses in roofing, mechanical, electrical, and plumbing trades. Every trade running on a Dellamano project answers to the same license holder whose signature appears on every permit the job requires — whether the work is performed by our own team or by a trusted specialist crew we bring in and manage. Services include whole-home renovations, kitchen remodels, custom home builds, home additions, commercial buildouts, whole-house generator installations, outdoor kitchens, pergolas, hardscape design, and roofing. One company, one contract, one accountable contractor from estimate through final walkthrough. Licensed by the Florida DBPR; all license numbers verifiable at myfloridalicense.com.";

// ─────────────────────────────────────────────────────────────────
// URL / HOST
// ─────────────────────────────────────────────────────────────────
export const SITE_URL = "https://www.dellamanoconstruction.com/";
export const SITE_HOST = "www.dellamanoconstruction.com";

// ─────────────────────────────────────────────────────────────────
// CONTACT
// ─────────────────────────────────────────────────────────────────
export const PHONE_NUMBER = "(561) 654-7243";
export const PHONE_E164 = "+15616547243";
export const EMAIL = "aldo@dellamanoconstruction.com";

// ─────────────────────────────────────────────────────────────────
// ADDRESS
// Dellamano operates from a Parkland, FL address but functions as a
// Service Area Business (no public storefront). Address kept for
// citations and structured data; frontend hides it per SAB convention.
// Address currently in GBP verification — coords may need refinement.
// ─────────────────────────────────────────────────────────────────
export const ADDRESS = {
  hasStorefront: false,
  street: "6523 NW 105th Terrace",
  city: "Parkland",
  state: "FL",
  zip: "33076",
  country: "US",
  lat: "26.3106",
  lng: "-80.2372",
};

// ─────────────────────────────────────────────────────────────────
// AUTHOR / FACE OF BUSINESS
// ─────────────────────────────────────────────────────────────────
export const AUTHOR = {
  name: "Aldo Dellamano",
  slug: "aldo-dellamano",
  jobTitle: "Licensed Florida General Contractor",
  bio: "Aldo Dellamano is the licensed general contractor and founder of Dellamano Construction Inc. He personally holds active Florida DBPR licenses as a Certified General Contractor, Certified Roofing Contractor, Certified Mechanical Contractor, and Certified Plumbing Contractor — so every trade running on a Dellamano project answers to one license holder, whether performed by our own team or a specialist crew we bring in and manage. His company builds and renovates homes across Broward and Palm Beach Counties.",
  headshot: "/images/aldo-dellamano.webp",
  linkedin: "",
  expertiseAreas: [
    "Florida Building Code",
    "High-Velocity Hurricane Zone (HVHZ) Construction",
    "Kitchen Remodeling",
    "Whole-Home Renovation",
    "Custom Home Building",
    "Commercial Buildouts with MEP",
    "Outdoor Living Construction",
  ] as string[],
  licenses: [
    {
      name: "Certified General Contractor",
      number: "CGC1525289",
      body: "Florida DBPR",
      bodyUrl: "https://www.myfloridalicense.com",
      verificationUrl:
        "https://www.myfloridalicense.com/LicenseDetail.asp?SID=&id=6ABCAD00ABE46152930AAC25DB4D35F0",
    },
    {
      name: "Certified Roofing Contractor",
      number: "CCC1335157",
      body: "Florida DBPR",
      bodyUrl: "https://www.myfloridalicense.com",
      verificationUrl: "https://www.myfloridalicense.com",
    },
    {
      name: "Certified Mechanical Contractor",
      number: "CMC1251666",
      body: "Florida DBPR",
      bodyUrl: "https://www.myfloridalicense.com",
      verificationUrl:
        "https://www.myfloridalicense.com/LicenseDetail.asp?SID=&id=40F4ECFABE0C23584F095F47C68C2161",
    },
    {
      name: "Certified Plumbing Contractor",
      number: "CFC1434398",
      body: "Florida DBPR",
      bodyUrl: "https://www.myfloridalicense.com",
      verificationUrl:
        "https://www.myfloridalicense.com/LicenseDetail.asp?SID=&id=39DD85916742B987C251349976F7D728",
    },
    {
      // Electrical — number pending from user. Empty verificationUrl
      // tells the ReviewedBy + About license panels to render this
      // entry as a non-clickable "Pending" chip until the real number
      // is provided.
      name: "Certified Electrical Contractor",
      number: "Pending",
      body: "Florida DBPR",
      bodyUrl: "https://www.myfloridalicense.com",
      verificationUrl: "",
    },
    // Pool license — pending state approval
  ] as Array<{
    name: string;
    number: string;
    body: string;
    bodyUrl: string;
    verificationUrl: string;
  }>,
};
export const AUTHOR_URL = `${SITE_URL}team/${AUTHOR.slug}`;

// ─────────────────────────────────────────────────────────────────
// PARENT COMPANY
// Dellamano is its own Florida legal entity — not a DBA.
// ─────────────────────────────────────────────────────────────────
export const PARENT_COMPANY = {
  isDba: false,
  legalName: "",
  shortName: "",
  url: "",
};

// ─────────────────────────────────────────────────────────────────
// BUSINESS CATEGORIES
// ─────────────────────────────────────────────────────────────────
export const SCHEMA_BUSINESS_TYPE = "GeneralContractor";

export const GBP_PRIMARY_CATEGORY = "General contractor";
export const GBP_SECONDARY_CATEGORIES = [
  "Kitchen remodeler",
  "Remodeler",
  "Custom home builder",
  "Construction company",
  "Mechanical contractor",
  "Plumber",
] as string[];

// ─────────────────────────────────────────────────────────────────
// SERVICE AREAS
// ─────────────────────────────────────────────────────────────────
export const SERVICE_AREA_CITIES = [
  // Broward County
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
  // Palm Beach County
  "West Palm Beach",
  "Boca Raton",
  "Delray Beach",
  "Boynton Beach",
  "Jupiter",
  "Palm Beach Gardens",
  "Wellington",
  "Lake Worth",
] as string[];

export const SERVICE_AREA_COUNTIES = [
  "Broward County",
  "Palm Beach County",
] as string[];

export const SERVICE_AREA_SUMMARY =
  "Broward and Palm Beach Counties — including Fort Lauderdale, Boca Raton, West Palm Beach, Delray Beach, Parkland, and surrounding South Florida cities.";

// ─────────────────────────────────────────────────────────────────
// HOURS
// ─────────────────────────────────────────────────────────────────
export const HOURS = {
  weekdays: { opens: "08:00", closes: "17:00" },
  saturday: { opens: "09:00", closes: "14:00" },
  sunday: null as { opens: string; closes: string } | null,
};

// ─────────────────────────────────────────────────────────────────
// SOCIAL / sameAs
// ─────────────────────────────────────────────────────────────────
export const SOCIAL_LINKS = {
  linkedin: "",
  facebook: "https://www.facebook.com/dellamanoconstruction/",
  instagram: "",
  youtube: "",
  twitter: "",
  gbp: "https://share.google/IuFPaZFHhN0vhNxZb",
};

// ─────────────────────────────────────────────────────────────────
// BRAND / VISUAL
// ─────────────────────────────────────────────────────────────────
export const OG_IMAGE_PATH = "/images/og-default.jpg";
export const LOGO_PATH = "/images/logo.png";
export const FAVICON_PATH = "/favicon.ico";

// ─────────────────────────────────────────────────────────────────
// ANNUAL METRICS
// ─────────────────────────────────────────────────────────────────
export const ANNUAL_PROJECTS = 0;
export const YEARS_IN_BUSINESS = 0;

// ─────────────────────────────────────────────────────────────────
// EDITORIAL
// ─────────────────────────────────────────────────────────────────
export const EDITORIAL_POLICY_URL = `${SITE_URL}editorial-policy`;

// ─────────────────────────────────────────────────────────────────
// BRAND
// ─────────────────────────────────────────────────────────────────
export const BUSINESS_TAGLINE = "Every Project. Every Trade. One Signature.";

// ─────────────────────────────────────────────────────────────────
// NAVIGATION
// ─────────────────────────────────────────────────────────────────
export const NAV_PRIMARY: Array<{
  label: string;
  href: string;
  items?: { label: string; href: string }[];
}> = [
  {
    label: "Services",
    href: "/services",
    items: [
      { label: "Exterior Living", href: "/services/exterior-living" },
      { label: "Interior Renovation", href: "/services/interior-renovation" },
      { label: "Home Systems", href: "/services/home-systems" },
      { label: "General Contractor", href: "/services/general-contractor" },
    ],
  },
  {
    label: "Service Areas",
    href: "/locations",
  },
];

export const NAV_SIMPLE: Array<{ label: string; href: string }> = [
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_COMPANY_LINKS: Array<{ label: string; href: string }> = [
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Editorial Policy", href: "/editorial-policy" },
];

export const FOOTER_LEGAL_LINKS: Array<{ label: string; href: string }> = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms" },
];

// ─────────────────────────────────────────────────────────────────
// SERVICES (homepage top 6 by search volume)
// URL convention: /{vertical}/{slug} — all under single "services" vertical.
// ─────────────────────────────────────────────────────────────────
export type ServiceEntry = {
  name: string;
  short_name: string;
  primary_keyword: string;
  tagline: string;
  key_topics: string[];
  image?: string;
  /** Show on the homepage services grid. Defaults to false. */
  homepage?: boolean;
  /** Which pillar this service rolls up to (for NAV grouping + pillar page listings). */
  pillar?:
    | "exterior-living"
    | "interior-renovation"
    | "home-systems"
    | "general-contractor";
  /**
   * Page template the content-generation agent should use.
   * - "service-pillar": individual service deep-dive (default for SERVICES entries)
   * - "combo": city × service landing page
   */
  page_type?: "service-pillar" | "combo";
};

export const SERVICES: Record<string, Record<string, ServiceEntry>> = {
  services: {
    "outdoor-kitchens": {
      name: "Outdoor Kitchens",
      short_name: "Outdoor Kitchens",
      primary_keyword: "outdoor kitchen",
      tagline:
        "Custom built-in outdoor kitchens engineered for South Florida sun, salt, and summer rain.",
      key_topics: [
        "material selection for humid climates",
        "grill ventilation and hood code",
        "stone and stucco finishes",
        "electrical and gas rough-in",
      ],
      image: "/images/outdoor-kitchens.jpg",
      homepage: false,
      page_type: "service-pillar",
      pillar: "exterior-living",
    },
    "kitchen-remodeling": {
      name: "Kitchen Remodeling",
      short_name: "Kitchen Remodel",
      primary_keyword: "kitchen remodeling",
      tagline:
        "Full-service kitchen renovations — cabinetry, counters, MEP, and finish work by one licensed team.",
      key_topics: [
        "cabinet and layout planning",
        "MEP rough-in under one GC",
        "permit and HOA coordination",
        "timeline and phasing",
      ],
      image: "/images/kitchen-remodeling.jpg",
      homepage: false,
      page_type: "service-pillar",
      pillar: "interior-renovation",
    },
    "general-contractor": {
      name: "General Contractor",
      short_name: "General Contractor",
      primary_keyword: "general contractor",
      tagline:
        "Licensed Florida GC coordinating general, roofing, mechanical, and plumbing across every permit.",
      key_topics: [
        "single-source contractor accountability",
        "permit coordination",
        "project management",
        "licensed trade oversight",
      ],
      image: "/images/general-contractor.jpg",
      homepage: false,
      page_type: "service-pillar",
    },
    "home-remodeling": {
      name: "Home Remodeling",
      short_name: "Home Remodel",
      primary_keyword: "home remodeling",
      tagline:
        "Whole-home renovations from design through final walkthrough — one GC, every trade.",
      key_topics: [
        "whole-home scope planning",
        "live-in vs move-out phasing",
        "structural and MEP upgrades",
        "finish selection",
      ],
      image: "/images/home-remodeling.jpg",
      homepage: false,
      page_type: "service-pillar",
      pillar: "interior-renovation",
    },
    "generator-installation": {
      name: "Whole-House Generator Installation",
      short_name: "Whole-House Generator",
      primary_keyword: "whole house generator",
      tagline:
        "Standby generator sales, sizing, permit, and installation — coordinated by a GC who personally holds the mechanical and plumbing licenses.",
      key_topics: [
        "generator sizing",
        "transfer switch installation",
        "gas line routing",
        "hurricane readiness",
      ],
      image: "/images/generator.jpg",
      homepage: false,
      page_type: "service-pillar",
      pillar: "home-systems",
    },
    "custom-homes": {
      name: "Custom Home Builder",
      short_name: "Custom Homes",
      primary_keyword: "custom home builder",
      tagline:
        "Ground-up custom home construction across Broward and Palm Beach Counties.",
      key_topics: [
        "lot selection and site prep",
        "architectural coordination",
        "HVHZ construction",
        "finish and fixture selection",
      ],
      image: "/images/custom-homes.jpg",
      homepage: false,
      page_type: "service-pillar",
      pillar: "interior-renovation",
    },

    // ─── Exterior Living additions ─────────────────────────────────
    pergolas: {
      name: "Pergola Builder",
      short_name: "Pergolas",
      primary_keyword: "pergola builder",
      tagline:
        "Custom pergolas and shade structures engineered for South Florida wind loads and permit code.",
      key_topics: [
        "aluminum vs wood vs PVC framing",
        "wind-load engineering for HVHZ",
        "permit path for attached vs freestanding",
        "integrated lighting and fans",
      ],
      homepage: false,
      page_type: "service-pillar",
      pillar: "exterior-living",
    },
    hardscapes: {
      name: "Hardscapes & Paver Patios",
      short_name: "Hardscapes",
      primary_keyword: "paver patio installation",
      tagline:
        "Paver patios, driveways, and hardscape design — base prep and drainage engineered for FL rainfall.",
      key_topics: [
        "paver vs concrete vs natural stone",
        "base prep and drainage",
        "sealing and long-term maintenance",
        "integration with pool deck and patio",
      ],
      homepage: false,
      page_type: "service-pillar",
      pillar: "exterior-living",
    },
    "pool-construction": {
      name: "Pool Construction",
      short_name: "Pools",
      primary_keyword: "pool builder",
      tagline:
        "In-ground pool design and construction — full GC coordination including deck, MEP, and permit.",
      key_topics: [
        "pool shell design and rebar",
        "screen enclosure engineering",
        "pool equipment and electrical",
        "permit and code compliance",
      ],
      homepage: false,
      page_type: "service-pillar",
      pillar: "exterior-living",
    },

    // ─── Interior Renovation additions ─────────────────────────────
    "home-additions": {
      name: "Home Additions",
      short_name: "Additions",
      primary_keyword: "home addition",
      tagline:
        "Single-room and multi-room additions — structural, MEP, and finish work by one licensed team.",
      key_topics: [
        "setback and zoning review",
        "foundation and structural tie-in",
        "MEP extension under one permit",
        "roof tie-in and drainage",
      ],
      homepage: false,
      page_type: "service-pillar",
      pillar: "interior-renovation",
    },

    // ─── Home Systems additions ────────────────────────────────────
    electrical: {
      name: "Electrical Contractor",
      short_name: "Electrical",
      primary_keyword: "electrical contractor",
      tagline:
        "Licensed residential electrical work — panel upgrades, service changes, and full rewires by your GC.",
      key_topics: [
        "panel and service upgrades",
        "whole-home rewire",
        "code compliance and permit",
        "generator and EV integration",
      ],
      homepage: false,
      page_type: "service-pillar",
      pillar: "home-systems",
    },
    plumbing: {
      name: "Plumbing Contractor",
      short_name: "Plumbing",
      primary_keyword: "plumbing contractor",
      tagline:
        "Licensed residential plumbing — repipes, fixture replacement, and new construction rough-in.",
      key_topics: [
        "whole-home repipe",
        "fixture and drain replacement",
        "tankless water heater installation",
        "gas line work",
      ],
      homepage: false,
      page_type: "service-pillar",
      pillar: "home-systems",
    },

    // ─── General Contractor additions ──────────────────────────────
    "commercial-construction": {
      name: "Commercial Construction",
      short_name: "Commercial",
      primary_keyword: "commercial general contractor",
      tagline:
        "Ground-up and renovation commercial projects across Broward and Palm Beach — one GC signing every permit.",
      key_topics: [
        "commercial permit path",
        "MEP coordination under one license holder",
        "phased occupied-tenant work",
        "code compliance and inspections",
      ],
      homepage: false,
      page_type: "service-pillar",
      pillar: "general-contractor",
    },
    "tenant-fit-outs": {
      name: "Tenant Fit-Outs",
      short_name: "Tenant Fit-Outs",
      primary_keyword: "tenant fit out contractor",
      tagline:
        "Office, retail, and medical tenant improvements — fast-track buildouts with MEP coordinated in-house.",
      key_topics: [
        "landlord work-letter scope",
        "fast-track MEP coordination",
        "medical and retail code requirements",
        "after-hours phasing for occupied buildings",
      ],
      homepage: false,
      page_type: "service-pillar",
      pillar: "general-contractor",
    },
  },
};

// ─────────────────────────────────────────────────────────────────
// PILLARS (4 umbrella pages — /services/{slug})
// Each pillar page is an umbrella that lists the services rolling up
// to it. Agents iterate this list to generate the "main-pillar"
// template, while SERVICES entries drive the "service-pillar"
// template. Keep these in sync with the ServiceEntry `pillar` union.
// ─────────────────────────────────────────────────────────────────
export type PillarEntry = {
  slug: "exterior-living" | "interior-renovation" | "home-systems" | "general-contractor";
  name: string;
  short_name: string;
  primary_keyword: string;
  tagline: string;
  key_topics: string[];
  image?: string;
  page_type: "main-pillar";
};

export const PILLARS: PillarEntry[] = [
  {
    slug: "exterior-living",
    name: "Exterior Living",
    short_name: "Exterior Living",
    primary_keyword: "outdoor living contractor",
    tagline:
      "Outdoor kitchens, pergolas, pavers, and pools — engineered for South Florida sun, salt, and summer rain.",
    key_topics: [
      "outdoor kitchen planning and code",
      "pergola wind-load engineering for HVHZ",
      "paver base prep and drainage",
      "pool construction and deck integration",
    ],
    image: "/images/outdoor-kitchens.jpg",
    page_type: "main-pillar",
  },
  {
    slug: "interior-renovation",
    name: "Interior Renovation",
    short_name: "Interior Renovation",
    primary_keyword: "home renovation contractor",
    tagline:
      "Kitchen remodels, whole-home renovations, additions, and custom builds — one licensed GC, every trade in-house.",
    key_topics: [
      "whole-home scope planning and phasing",
      "kitchen remodel permit path",
      "addition foundation and MEP tie-in",
      "ground-up custom home construction",
    ],
    image: "/images/kitchen-remodeling.jpg",
    page_type: "main-pillar",
  },
  {
    slug: "home-systems",
    name: "Home Systems",
    short_name: "Home Systems",
    primary_keyword: "residential mechanical contractor",
    tagline:
      "Whole-house generators, electrical service, and plumbing — licensed mechanical, electrical, and plumbing in-house.",
    key_topics: [
      "whole-house generator sizing and install",
      "panel and service upgrades",
      "whole-home repipe",
      "gas line and tankless water heater work",
    ],
    image: "/images/generator.jpg",
    page_type: "main-pillar",
  },
  {
    slug: "general-contractor",
    name: "General Contractor",
    short_name: "General Contractor",
    primary_keyword: "licensed general contractor",
    tagline:
      "Licensed Florida GC self-performing mechanical, electrical, and plumbing — one license holder on your permit.",
    key_topics: [
      "commercial construction permit path",
      "tenant fit-out scope and landlord coordination",
      "self-performed MEP advantage",
      "single license holder on every trade",
    ],
    image: "/images/general-contractor.jpg",
    page_type: "main-pillar",
  },
];

// ─────────────────────────────────────────────────────────────────
// RECENT PROJECTS (homepage proof section)
// Fill in 3 real completed projects once photos + scope details
// are available. While this array is empty, the section auto-hides
// on the homepage — intentional so we don't ship fabricated proof.
//
// Guidance per project:
//   - title: scope line in contractor-speak ("10,000 SF medical office buildout")
//   - summary: one sentence covering the unusual/hard part of the job
//   - location: "City, County" — keeps it local-SEO relevant
//   - trades: visible chips of the trades we coordinated on the job
//   - image: /images/projects/{slug}.jpg — real photo, not stock
// ─────────────────────────────────────────────────────────────────
export type RecentProject = {
  slug: string;
  title: string;
  summary: string;
  location: string;
  trades: string[];
  image: string;
};

export const RECENT_PROJECTS: RecentProject[] = [
  // Example shape — delete this comment block + populate with real completed jobs.
  // {
  //   slug: "coral-springs-medical-office",
  //   title: "10,000 SF medical office buildout",
  //   summary:
  //     "Full MEP coordination for a five-suite medical office including dedicated generator feed, medical-grade plumbing fixtures, and separate zoned HVAC per exam room.",
  //   location: "Coral Springs, Broward County",
  //   trades: ["General", "Mechanical", "Plumbing", "Electrical"],
  //   image: "/images/projects/coral-springs-medical-office.jpg",
  // },
];

// Flat helper: used by the Services section to build cards.
// Only services flagged `homepage: true` appear on the homepage grid — other
// services are still routable and show up in nav + pillar pages.
export function getServiceCards(opts: { homepageOnly?: boolean } = { homepageOnly: true }): Array<{
  title: string;
  description: string;
  href: string;
  imageUrl: string;
  imageAlt: string;
}> {
  const cards: Array<{
    title: string;
    description: string;
    href: string;
    imageUrl: string;
    imageAlt: string;
  }> = [];
  for (const [vertical, services] of Object.entries(SERVICES)) {
    for (const [slug, svc] of Object.entries(services)) {
      if (opts.homepageOnly && !svc.homepage) continue;
      cards.push({
        title: svc.name,
        description: svc.tagline,
        href: `/${vertical}/${slug}`,
        imageUrl: svc.image ?? OG_IMAGE_PATH,
        imageAlt: `${svc.name} — ${BUSINESS_NAME}`,
      });
    }
  }
  return cards;
}

// Helper: list all services under a given pillar (for pillar page sub-service lists).
export function getServicesByPillar(pillar: NonNullable<ServiceEntry["pillar"]>): Array<{
  slug: string;
  name: string;
  tagline: string;
  href: string;
  imageUrl: string;
  imageAlt: string;
}> {
  const out: Array<{
    slug: string;
    name: string;
    tagline: string;
    href: string;
    imageUrl: string;
    imageAlt: string;
  }> = [];
  for (const [vertical, services] of Object.entries(SERVICES)) {
    for (const [slug, svc] of Object.entries(services)) {
      if (svc.pillar === pillar) {
        out.push({
          slug,
          name: svc.name,
          tagline: svc.tagline,
          href: `/${vertical}/${slug}`,
          imageUrl: svc.image ?? OG_IMAGE_PATH,
          imageAlt: `${svc.name} — ${BUSINESS_NAME}`,
        });
      }
    }
  }
  return out;
}
