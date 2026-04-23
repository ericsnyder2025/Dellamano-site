import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import Hero from "@/components/sections/Hero";
import ContactForm from "@/components/ContactForm";
import ReviewedBy from "@/components/ReviewedBy";
import ProfessionalDisclosure from "@/components/ProfessionalDisclosure";
import {
  BUSINESS_NAME,
  SITE_URL,
  PHONE_NUMBER,
  PHONE_E164,
  EMAIL,
  ADDRESS,
  HOURS,
  SERVICE_AREA_COUNTIES,
  OG_IMAGE_PATH,
} from "@/../site.config";
import { buildBreadcrumbList } from "@/lib/schema";

const PAGE_URL = `${SITE_URL}contact`;
const PAGE_TITLE = `Contact — ${BUSINESS_NAME}`;
const PAGE_DESCRIPTION = `Request a free estimate from ${BUSINESS_NAME}. Licensed Florida general contractor covering ${SERVICE_AREA_COUNTIES.join(
  " and ",
)}.`;

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

function formatHours() {
  const lines: string[] = [];
  if (HOURS.weekdays) {
    lines.push(`Mon–Fri · ${HOURS.weekdays.opens}–${HOURS.weekdays.closes}`);
  }
  if (HOURS.saturday) {
    lines.push(`Saturday · ${HOURS.saturday.opens}–${HOURS.saturday.closes}`);
  } else {
    lines.push("Saturday · By appointment");
  }
  if (HOURS.sunday) {
    lines.push(`Sunday · ${HOURS.sunday.opens}–${HOURS.sunday.closes}`);
  } else {
    lines.push("Sunday · Closed");
  }
  return lines;
}

export default function ContactPage() {
  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${PAGE_URL}#contactpage`,
    url: PAGE_URL,
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    mainEntity: { "@id": `${SITE_URL}#localbusiness` },
  };
  const breadcrumbSchema = buildBreadcrumbList([
    { name: "Home", url: SITE_URL },
    { name: "Contact", url: PAGE_URL },
  ]);
  const schema = [contactPageSchema, breadcrumbSchema];

  const hoursLines = formatHours();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <Hero
        eyebrow="Contact"
        heading="Request a free estimate"
        subheading={`Call, email, or send a project brief below. ${BUSINESS_NAME} covers ${SERVICE_AREA_COUNTIES.join(
          " and ",
        )} — one GC signing every permit.`}
        ctaLabel="Call now"
        ctaHref={`tel:${PHONE_E164}`}
        backgroundImageUrl="/images/hero.webp"
        rightColumn={<ContactForm />}
      />

      <ReviewedBy />

      <section className="section-primary bg-white">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div>
              <div className="flex items-start gap-3 mb-4">
                <Phone
                  size={22}
                  className="text-brand-primary flex-shrink-0 mt-1"
                  aria-hidden="true"
                />
                <div>
                  <p className="eyebrow mb-1">Call</p>
                  <a
                    href={`tel:${PHONE_E164}`}
                    className="font-display text-[22px] font-bold text-brand-dark hover:text-brand-primary transition-colors"
                  >
                    {PHONE_NUMBER}
                  </a>
                  <p className="text-gray-600 text-[14px] mt-2">
                    Direct to the license holder. Leave a voicemail after
                    hours and we return calls the next business morning.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-start gap-3 mb-4">
                <Mail
                  size={22}
                  className="text-brand-primary flex-shrink-0 mt-1"
                  aria-hidden="true"
                />
                <div>
                  <p className="eyebrow mb-1">Email</p>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="font-display text-[18px] font-bold text-brand-dark hover:text-brand-primary transition-colors break-all"
                  >
                    {EMAIL}
                  </a>
                  <p className="text-gray-600 text-[14px] mt-2">
                    Include a short scope description and any photos or
                    plans you have. We reply within one business day.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-start gap-3 mb-4">
                <MapPin
                  size={22}
                  className="text-brand-primary flex-shrink-0 mt-1"
                  aria-hidden="true"
                />
                <div>
                  <p className="eyebrow mb-1">Service area</p>
                  <p className="font-display text-[18px] font-bold text-brand-dark">
                    {ADDRESS.city}, {ADDRESS.state}
                  </p>
                  <p className="text-gray-600 text-[14px] mt-2">
                    Covering {SERVICE_AREA_COUNTIES.join(" and ")}.{" "}
                    <Link
                      href="/service-areas"
                      className="text-brand-primary font-bold"
                    >
                      See every city we serve
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-10 border-t border-[rgba(221,225,235,0.7)]">
            <p className="eyebrow mb-3">Hours</p>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-gray-700 text-[15px]">
              {hoursLines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <ProfessionalDisclosure {...DISCLOSURE_PROPS} />
    </>
  );
}
