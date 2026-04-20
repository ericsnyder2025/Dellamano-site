import type { Metadata } from "next";
import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, ExternalLink, CheckCircle2, Phone } from "lucide-react";
import Hero from "@/components/sections/Hero";
import CTABanner from "@/components/sections/CTABanner";
import ReviewedBy from "@/components/ReviewedBy";
import {
  AUTHOR,
  BUSINESS_NAME,
  BUSINESS_LEGAL_NAME,
  SITE_URL,
  SERVICE_AREA_COUNTIES,
  OG_IMAGE_PATH,
  SOCIAL_LINKS,
  PHONE_NUMBER,
  PHONE_E164,
} from "@/../site.config";
import { buildBreadcrumbList } from "@/lib/schema";

const PAGE_URL = `${SITE_URL}about`;
const PAGE_TITLE = `About — ${BUSINESS_NAME}`;
const PAGE_DESCRIPTION = `Meet Aldo Dellamano, the licensed Florida general contractor behind ${BUSINESS_NAME}. Four trade licenses under one roof, serving ${SERVICE_AREA_COUNTIES.join(" and ")}.`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    siteName: BUSINESS_NAME,
    type: "profile",
    images: [OG_IMAGE_PATH],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [OG_IMAGE_PATH],
  },
};

export const revalidate = 3600;

export default function AboutPage() {
  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${PAGE_URL}#aboutpage`,
    url: PAGE_URL,
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    mainEntity: { "@id": `${SITE_URL}#organization` },
    primaryImageOfPage: AUTHOR.headshot,
  };

  const breadcrumbSchema = buildBreadcrumbList([
    { name: "Home", url: SITE_URL },
    { name: "About", url: PAGE_URL },
  ]);

  const schema = [aboutPageSchema, breadcrumbSchema];

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
        eyebrow="About"
        heading="Meet the contractor signing your permit"
        subheading={`${BUSINESS_NAME} is a small, owner-operated general contractor in ${SERVICE_AREA_COUNTIES.join(" and ")}. One license holder — Aldo Dellamano — carries the general, mechanical, and plumbing credentials on every project, so the permits, the schedule, and the finish work all answer to the same person.`}
        ctaLabel="Request a Free Estimate"
        ctaHref="/contact"
        backgroundImageUrl="/images/hero.webp"
      />

      <ReviewedBy />

      {/* ─── Founder intro with headshot ──────────────────────────── */}
      <section className="section-primary bg-white">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-10 md:gap-14 items-start">
            <div className="mx-auto md:mx-0 w-[240px] md:w-[280px]">
              <div className="relative aspect-square rounded-[1.25rem] overflow-hidden bg-gray-100 border border-[rgba(221,225,235,0.9)] shadow-[var(--shadow-card)]">
                {headshotExists ? (
                  <Image
                    src={AUTHOR.headshot}
                    alt={`${AUTHOR.name}, ${AUTHOR.jobTitle}`}
                    fill
                    sizes="(max-width: 768px) 240px, 280px"
                    className="object-cover"
                  />
                ) : (
                  <div
                    className="flex items-center justify-center w-full h-full bg-gradient-to-br from-brand-dark to-gray-800 text-white font-display font-bold text-[72px] tracking-tight"
                    aria-label={`${AUTHOR.name} photo placeholder`}
                  >
                    {initials}
                  </div>
                )}
              </div>
              <p className="font-display font-bold text-[20px] text-brand-dark mt-5 text-center md:text-left">
                {AUTHOR.name}
              </p>
              <p className="text-gray-600 text-[14px] text-center md:text-left">
                Founder &amp; {AUTHOR.jobTitle}
              </p>
            </div>

            <div>
              <p className="eyebrow mb-3">The founder</p>
              <h2 className="section-h2 mb-6">
                Four trade licenses, one signature
              </h2>
              <p className="text-gray-700 text-[17px] leading-[1.75] mb-5">
                Aldo Dellamano spent years watching the same breakdown repeat on South Florida job sites: a homeowner hires a general contractor, the GC subcontracts the mechanical, electrical, and plumbing to three different license holders, and three weeks of the schedule vanish into calendar conflicts between subs who barely knew each other. {BUSINESS_NAME} exists to remove that layer.
              </p>
              <p className="text-gray-700 text-[17px] leading-[1.75] mb-5">
                Aldo holds Florida DBPR licenses as a Certified General Contractor, Certified Mechanical Contractor, and Certified Plumbing Contractor, with an active electrical credential rounding out the trades a typical renovation actually requires. That combination is unusual. Most GCs hold a CGC and hire out everything else. It means the name on your building permit is the same name running the trade work — not three different license holders and a project manager in the middle.
              </p>
              <p className="text-gray-700 text-[17px] leading-[1.75]">
                The company is based in Parkland and works exclusively across {SERVICE_AREA_COUNTIES.join(" and ")} — a deliberately tight radius that keeps crews on one or two active jobs at a time instead of spreading thin across the state.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── What that actually changes for homeowners ─────────────── */}
      <section className="section-primary bg-gray-50">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="eyebrow mb-3">What that changes</p>
            <h2 className="section-h2">Why one license holder matters on a remodel</h2>
            <p className="section-lead mt-3 max-w-2xl mx-auto">
              The in-house MEP model sounds like a technicality. On a real job, it changes the week-to-week experience in four specific ways.
            </p>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              {
                title: "One number to call when something shifts",
                body: "If an electrical rough-in needs to move two feet to clear a soffit, that decision happens on-site in five minutes — not in a three-way text thread between a GC, an electrician's office, and a drywall crew already scheduled for Monday.",
              },
              {
                title: "Your permit pulls faster",
                body: "County inspectors see one qualifier of record on the mechanical, plumbing, and structural portions of the same permit. No waiting on three different master licenses to get attached to the application before submittal.",
              },
              {
                title: "Change orders stop multiplying",
                body: "Mid-project scope changes — a moved island, a second hood vent, an added bathroom — don't trigger a new sub contract and a new markup every time. The trade work is priced and executed by the same team already on-site.",
              },
              {
                title: "The inspection log is one conversation",
                body: "When Broward or Palm Beach asks a follow-up question on a failed inspection, the person who did the work answers it. Not a PM relaying a message from a sub who's now on a different job in Miramar.",
              },
            ].map((item) => (
              <li
                key={item.title}
                className="flex items-start gap-4 bg-white rounded-[1.25rem] p-6 border border-[rgba(221,225,235,0.7)] shadow-[var(--shadow-card)]"
              >
                <CheckCircle2
                  size={24}
                  className="text-brand-primary flex-shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="font-display text-[17px] font-bold text-brand-dark mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-[14px] leading-[1.7]">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── Licenses panel — verifiable credentials ─────────────── */}
      <section className="section-primary bg-white">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="mb-10">
            <p className="eyebrow mb-3">Credentials</p>
            <h2 className="section-h2 mb-4">Florida DBPR licenses on record</h2>
            <p className="text-gray-700 text-[17px] leading-[1.75] max-w-2xl">
              Every license below is active and held by {AUTHOR.name} personally. Click any license number to verify it directly with the Florida Department of Business &amp; Professional Regulation.
            </p>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {AUTHOR.licenses.map((license) => (
              <li
                key={license.number}
                className="relative bg-white rounded-[1rem] border border-[rgba(221,225,235,0.9)] p-5 shadow-[var(--shadow-card)]"
              >
                <div className="flex items-start gap-3 mb-3">
                  <ShieldCheck
                    size={22}
                    className="text-brand-primary flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <p className="font-display font-bold text-brand-dark text-[15px] leading-snug">
                      {license.name}
                    </p>
                    <p className="text-gray-500 text-[12px] mt-0.5">{license.body}</p>
                  </div>
                </div>
                <a
                  href={license.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-brand-primary font-semibold text-[14px] hover:underline"
                >
                  {license.number}
                  <ExternalLink size={13} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>

          <p className="text-gray-500 text-[13px] leading-[1.7] mt-6 max-w-2xl">
            Verify any Florida contractor at{" "}
            <a
              href="https://www.myfloridalicense.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-primary hover:underline"
            >
              myfloridalicense.com
            </a>
            . We recommend every homeowner pull the license of any contractor they consider, ours included.
          </p>
        </div>
      </section>

      {/* ─── How we work ──────────────────────────────────────────── */}
      <section className="section-primary bg-gray-50">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="mb-10">
            <p className="eyebrow mb-3">How we work</p>
            <h2 className="section-h2">From first call to final walkthrough</h2>
          </div>

          <ol className="space-y-6">
            {[
              {
                step: "01",
                title: "On-site walkthrough",
                body: "Aldo visits the property, walks the scope with you, and looks at the conditions behind the walls — electrical panel capacity, existing plumbing runs, structural obvious issues. No salesperson, no second visit required to get real numbers.",
              },
              {
                step: "02",
                title: "Written, itemized proposal",
                body: "You get a fixed-bid proposal with line-item scope — what's included, what's excluded, what the permit path looks like, and a realistic timeline. If HOA approval is in the picture, we outline that path too.",
              },
              {
                step: "03",
                title: "Permit and production",
                body: "Permits pulled under one license, materials ordered, crew scheduled. Every trade on your job is Dellamano — same faces from demo through final inspection.",
              },
              {
                step: "04",
                title: "Final walkthrough and warranty",
                body: "You walk the finished work with Aldo before the last check clears. Punch list items get closed out, warranty documentation handed over, and the permit closed with the county.",
              },
            ].map((phase) => (
              <li
                key={phase.step}
                className="flex items-start gap-5 bg-white rounded-[1.25rem] p-6 border border-[rgba(221,225,235,0.7)]"
              >
                <span className="font-display font-bold text-brand-primary-400 text-[28px] leading-none flex-shrink-0 w-[60px]">
                  {phase.step}
                </span>
                <div>
                  <h3 className="font-display font-bold text-brand-dark text-[18px] mb-2">
                    {phase.title}
                  </h3>
                  <p className="text-gray-600 text-[15px] leading-[1.7]">{phase.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── Where to reach Aldo ──────────────────────────────────── */}
      <section className="section-primary bg-white">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <p className="eyebrow mb-3">Get in touch</p>
          <h2 className="section-h2 mb-4">Talk to Aldo directly</h2>
          <p className="text-gray-700 text-[17px] leading-[1.75] mb-8 max-w-xl mx-auto">
            Estimates come from the license holder, not an intake form. Call, text, or request a free estimate online — Aldo responds personally during business hours.
          </p>

          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href={`tel:${PHONE_E164}`}
              className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white font-semibold text-[14px] tracking-[0.02em] h-[3.25rem] px-6 rounded-[0.75rem] hover:bg-gray-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/40"
            >
              <Phone size={16} aria-hidden="true" />
              {PHONE_NUMBER}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-brand-primary text-white font-bold text-[14px] tracking-[0.04em] uppercase h-[3.25rem] px-7 rounded-[0.75rem] hover:opacity-90 transition-opacity shadow-[0_4px_16px_rgba(139,30,34,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
            >
              Request Free Estimate
            </Link>
          </div>

          <p className="text-gray-500 text-[13px] mt-8">
            {SOCIAL_LINKS.gbp && (
              <>
                Also on{" "}
                <a
                  href={SOCIAL_LINKS.gbp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-primary hover:underline"
                >
                  Google Business Profile
                </a>
                {" · "}
              </>
            )}
            <a
              href="https://www.facebook.com/aldo.dellamano"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-primary hover:underline"
            >
              Aldo on Facebook
            </a>
            {" · "}
            <Link href="/editorial-policy" className="text-brand-primary hover:underline">
              Editorial policy
            </Link>
          </p>
        </div>
      </section>

      <CTABanner
        eyebrow="Free Estimate"
        heading={`Start your project with ${BUSINESS_LEGAL_NAME}`}
        subheading="Licensed GC covering mechanical, electrical, and plumbing in-house. Broward and Palm Beach Counties."
        ctaLabel="Request a Free Estimate"
        ctaHref="/contact"
      />
    </>
  );
}
