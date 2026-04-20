import Link from "next/link";
import { Phone } from "lucide-react";
import { PHONE_NUMBER, PHONE_E164 } from "@/../site.config";

interface CTABannerProps {
  heading: string;
  subheading?: string;
  ctaLabel: string;
  ctaHref: string;
  eyebrow?: string;
}

export default function CTABanner({
  heading,
  subheading,
  ctaLabel,
  ctaHref,
  eyebrow = "Free Estimate",
}: CTABannerProps) {
  return (
    <section className="section-compact bg-white">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="bg-brand-dark rounded-[1.25rem] shadow-[var(--shadow-xl)] overflow-hidden relative">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(circle at 90% 50%, rgba(74,124,155,0.3) 0%, transparent 60%)",
            }}
            aria-hidden="true"
          />

          <div className="relative px-8 sm:px-12 py-12 sm:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 items-center">
              <div>
                <p className="eyebrow-dark mb-3">{eyebrow}</p>
                <h2 className="font-display text-[28px] sm:text-[36px] font-bold leading-[1.1] mb-3 tracking-tight text-white">
                  {heading}
                </h2>
                {subheading && (
                  <p className="text-gray-400 text-[16px] leading-[1.7] max-w-md">
                    {subheading}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-3 lg:items-end">
                <Link
                  href={ctaHref}
                  className="inline-flex items-center justify-center bg-brand-primary text-white font-bold text-[14px] tracking-[0.04em] uppercase h-[3.5rem] px-8 rounded-[0.75rem] hover:opacity-90 transition-opacity shadow-[0_4px_16px_rgba(74,124,155,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
                >
                  {ctaLabel}
                </Link>
                <a
                  href={`tel:${PHONE_E164}`}
                  className="inline-flex items-center justify-center gap-2 text-gray-400 hover:text-white text-[14px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded px-2 py-1"
                >
                  <Phone size={14} aria-hidden="true" />
                  or call {PHONE_NUMBER}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
