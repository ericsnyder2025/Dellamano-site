import type { Metadata } from "next";
import { Inter, Montserrat, Fraunces } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileStickyBar from "@/components/layout/MobileStickyBar";
import ScrollToTop from "@/components/layout/ScrollToTop";
import {
  BUSINESS_NAME,
  BUSINESS_LEGAL_NAME,
  BUSINESS_SHORT_DESCRIPTION,
  SITE_URL,
  SOCIAL_LINKS,
  OG_IMAGE_PATH,
  LOGO_PATH,
  PHONE_NUMBER,
  EMAIL,
  PARENT_COMPANY,
} from "@/../site.config";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

// Editorial serif — used for warm-editorial variant sections
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// ─────────────────────────────────────────────────────────────────
// METADATA — absolute canonical, full OG, full Twitter defaults.
// Every page that overrides openGraph MUST include `images` explicitly
// (Next.js replaces nested objects, doesn't merge). See references/01.
// ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: `${BUSINESS_NAME} | ${BUSINESS_SHORT_DESCRIPTION.split(".")[0]}`,
    template: "%s",
  },
  description: BUSINESS_SHORT_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: BUSINESS_NAME,
    description: BUSINESS_SHORT_DESCRIPTION,
    url: SITE_URL,
    siteName: BUSINESS_NAME,
    type: "website",
    images: [OG_IMAGE_PATH],
  },
  twitter: {
    card: "summary_large_image",
    site: SOCIAL_LINKS.twitter ? `@${SOCIAL_LINKS.twitter}` : undefined,
    title: BUSINESS_NAME,
    description: BUSINESS_SHORT_DESCRIPTION.slice(0, 125),
    images: [OG_IMAGE_PATH],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}#website`,
  url: SITE_URL,
  name: BUSINESS_NAME,
  publisher: { "@id": `${SITE_URL}#organization` },
  inLanguage: "en-US",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}#organization`,
  name: BUSINESS_LEGAL_NAME,
  ...(BUSINESS_NAME !== BUSINESS_LEGAL_NAME && { alternateName: BUSINESS_NAME }),
  url: SITE_URL,
  logo: `${SITE_URL}${LOGO_PATH.replace(/^\//, "")}`,
  telephone: PHONE_NUMBER,
  email: EMAIL,
  sameAs: Object.values(SOCIAL_LINKS).filter((v) => v && v.startsWith("http")),
  ...(PARENT_COMPANY.isDba && {
    parentOrganization: {
      "@type": "Organization",
      name: PARENT_COMPANY.legalName,
      url: PARENT_COMPANY.url,
    },
  }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${montserrat.variable} ${fraunces.variable} h-full antialiased`}
    >
      <head>
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM context" />
        {/* <link rel="preconnect" href="https://{{ SUPABASE_HOST }}" crossOrigin="" /> */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([websiteSchema, organizationSchema]),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col pb-[80px] lg:pb-0">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-brand-primary focus:text-white focus:px-4 focus:py-2 focus:rounded"
        >
          Skip to main content
        </a>
        <ScrollToTop />
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <MobileStickyBar />
      </body>
    </html>
  );
}
