import type { Metadata } from "next";
import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import { ShieldCheck, ExternalLink, Phone, Mail } from "lucide-react";
import Hero from "@/components/sections/Hero";
import CTABanner from "@/components/sections/CTABanner";
import ReviewedBy from "@/components/ReviewedBy";
import {
  AUTHOR,
  AUTHOR_URL,
  BUSINESS_NAME,
  SITE_URL,
  SERVICE_AREA_COUNTIES,
  OG_IMAGE_PATH,
  PHONE_NUMBER,
  PHONE_E164,
  EMAIL,
} from "@/../site.config";
import { buildPerson, buildBreadcrumbList } from "@/lib/schema";

const PAGE_TITLE = `${AUTHOR.name} — ${AUTHOR.jobTitle} | ${BUSINESS_NAME}`;
const PAGE_DESCRIPTION = `${AUTHOR.name} is the licensed Florida general contractor behind ${BUSINESS_NAME}. Four DBPR licenses (general, roofing, mechanical, plumbing) under one signature, serving ${SERVICE_AREA_COUNTIES.join(" and ")}.`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: AUTHOR_URL },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: AUTHOR_URL,
    siteName: BUSINESS_NAME,
    type: "profile",
    images: [AUTHOR.headshot || OG_IMAGE_PATH],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [AUTHOR.headshot || OG_IMAGE_PATH],
  },
};

export const revalidate = 3600;

export default function AldoDellamanoPage() {
  const personSchema = buildPerson();
  const breadcrumbSchema = buildBreadcrumbList([
    { name: "Home", url: SITE_URL },
    { name: "Team", url: `${SITE_URL}team` },
    { name: AUTHOR.name, url: AUTHOR_URL },
  ]);
  const schema = [personSchema, breadcrumbSchema];

  const headshotOnDisk = path.join(
    process.cwd(),
    "public",
    AUTHOR.headshot.replace(/^\//, "")
  );
  const headshotExists = existsSync(headshotOnDisk);
  const initials = AUTHOR.name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <Hero
        eyebrow="Team"
        heading={AUTHOR.name}
        subheading={`${AUTHOR.jobTitle} — every permit on a ${BUSINESS_NAME} project carries Aldo's qualifier signature.`}
        ctaLabel="Request a Free Estimate"
        ctaHref="/contact"
        backgroundImageUrl="/images/hero.webp"
      />

      <ReviewedBy showEditorialLink />

      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-10 items-start">
          <div className="flex justify-center md:justify-start">
            {headshotExists ? (
              <Image
                src={AUTHOR.headshot}
                alt={`${AUTHOR.name} headshot`}
                width={200}
                height={200}
                className="rounded-full"
              />
            ) : (
              <div
                aria-label={`${AUTHOR.name} headshot placeholder`}
                className="w-[200px] h-[200px] rounded-full bg-gray-100 flex items-center justify-center text-4xl font-bold text-gray-400"
              >
                {initials}
              </div>
            )}
          </div>
          <div>
            <h2 className="font-display text-3xl font-bold mb-2">
              About {AUTHOR.name.split(" ")[0]}
            </h2>
            <p className="text-gray-700 leading-relaxed text-[17px]">
              {AUTHOR.bio}
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 text-[15px]">
              <a
                href={`tel:${PHONE_E164}`}
                className="inline-flex items-center gap-2 text-brand-link hover:underline"
              >
                <Phone className="w-4 h-4" /> {PHONE_NUMBER}
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 text-brand-link hover:underline"
              >
                <Mail className="w-4 h-4" /> {EMAIL}
              </a>
            </div>
          </div>
        </div>
      </section>

      {AUTHOR.expertiseAreas.length > 0 && (
        <section className="bg-gray-50 py-14 border-y border-gray-200">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="font-display text-2xl font-bold mb-6">
              Areas of Expertise
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-[15px] text-gray-800">
              {AUTHOR.expertiseAreas.map((area) => (
                <li key={area} className="flex items-start gap-2">
                  <span
                    className="text-brand-link mt-[7px] w-1.5 h-1.5 rounded-full bg-brand-link flex-shrink-0"
                    aria-hidden="true"
                  />
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {AUTHOR.licenses.length > 0 && (
        <section className="bg-white py-16">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="font-display text-2xl font-bold mb-2">
              Florida DBPR Licenses
            </h2>
            <p className="text-gray-600 mb-6 text-[15px]">
              Every license below is verifiable on the Florida Department of
              Business and Professional Regulation public lookup. Click any
              license number to verify.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {AUTHOR.licenses.map((license) => {
                const isPending = !license.verificationUrl;
                return (
                  <li
                    key={`${license.name}-${license.number}`}
                    className={`flex items-start gap-3 p-4 rounded border ${
                      isPending
                        ? "border-gray-200 bg-gray-50"
                        : "border-gray-200 bg-white hover:border-brand-link transition-colors"
                    }`}
                  >
                    <ShieldCheck
                      className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                        isPending ? "text-gray-300" : "text-brand-link"
                      }`}
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-semibold text-[15px]">{license.name}</p>
                      {isPending ? (
                        <p className="text-gray-500 text-sm italic mt-0.5">
                          {license.number} <span>(pending)</span>
                        </p>
                      ) : (
                        <a
                          href={license.verificationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand-link hover:underline text-sm inline-flex items-center gap-1 mt-0.5"
                        >
                          #{license.number}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      <p className="text-gray-500 text-xs mt-1">{license.body}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
            <p className="text-xs text-gray-500 mt-6">
              Verify any Florida contractor license at{" "}
              <a
                href="https://www.myfloridalicense.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-link hover:underline"
              >
                myfloridalicense.com
              </a>
              .
            </p>
          </div>
        </section>
      )}

      <CTABanner
        heading="Work directly with Aldo on your next project"
        subheading={`Free estimates across ${SERVICE_AREA_COUNTIES.join(" and ")}. One signature on every permit.`}
        ctaLabel="Request a Free Estimate"
        ctaHref="/contact"
      />
    </>
  );
}
