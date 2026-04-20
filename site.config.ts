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
  "Dellamano Construction Inc. is a licensed Florida general contractor serving Broward and Palm Beach Counties. Led by Aldo Dellamano, a state-certified GC with additional licenses in mechanical, electrical, and plumbing trades, Dellamano self-performs the MEP work most GCs sub out — cutting weeks off renovation timelines and eliminating multi-sub coordination failures. Services include whole-home renovations, kitchen remodels, custom home builds, home additions, commercial buildouts with MEP, whole-house generator installations, outdoor kitchens, pergolas, and hardscape design. Every project is managed by a licensed trade holder. Licensed by the Florida DBPR; all license numbers verifiable at myfloridalicense.com.";

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
  bio: "Aldo Dellamano is the licensed general contractor and founder of Dellamano Construction Inc. He holds active Florida DBPR licenses as a Certified General Contractor, Certified Mechanical Contractor, and Certified Plumbing Contractor, letting Dellamano self-perform the trade work most GCs subcontract. His team builds and renovates homes across Broward and Palm Beach Counties.",
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
    // Electrical license — pending number from user
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
  facebook: "",
  instagram: "",
  youtube: "",
  twitter: "",
  gbp: "https://share.google/IuFPaZFHhN0vhNxZb",
};

// ─────────────────────────────────────────────────────────────────
// BRAND / VISUAL
// ─────────────────────────────────────────────────────────────────
export const OG_IMAGE_PATH = "/images/og-default.webp";
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
export const BUSINESS_TAGLINE = "One GC. Every Trade. Built In-House.";

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
      { label: "General Contractor", href: "/services/general-contractor" },
      { label: "Home Remodeling", href: "/services/home-remodeling" },
      { label: "Kitchen Remodeling", href: "/services/kitchen-remodeling" },
      { label: "Custom Home Builder", href: "/services/custom-homes" },
      { label: "Whole House Generator", href: "/services/generator-installation" },
      { label: "Outdoor Kitchens", href: "/services/outdoor-kitchens" },
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
    },
    "general-contractor": {
      name: "General Contractor",
      short_name: "General Contractor",
      primary_keyword: "general contractor",
      tagline:
        "Licensed Florida GC self-performing mechanical, electrical, and plumbing work in-house.",
      key_topics: [
        "self-performed MEP advantage",
        "permit coordination",
        "project management",
        "licensed trade oversight",
      ],
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
    },
    "generator-installation": {
      name: "Whole-House Generator Installation",
      short_name: "Whole-House Generator",
      primary_keyword: "whole house generator",
      tagline:
        "Standby generator sales, sizing, permit, and installation — licensed electrical and mechanical in-house.",
      key_topics: [
        "generator sizing",
        "transfer switch installation",
        "gas line routing",
        "hurricane readiness",
      ],
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
    },
  },
};

// Flat helper: used by the Services section to build cards.
export function getServiceCards(): Array<{
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
