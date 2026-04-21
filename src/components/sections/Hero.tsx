import Image from "next/image";
import { Phone } from "lucide-react";
import Link from "next/link";
import { PHONE_NUMBER, PHONE_E164 } from "@/../site.config";

interface HeroProps {
  heading: string;
  subheading: string;
  ctaLabel: string;
  ctaHref: string;
  backgroundImageUrl?: string;
  eyebrow?: string;
  /** Optional right-column render (e.g., lead form). If omitted, hero is single-column. */
  rightColumn?: React.ReactNode;
}

/**
 * Full-width hero with image background, dark overlay, eyebrow pill, headline,
 * subhead, and primary + phone CTAs. Optional right column (usually a lead form).
 *
 * LCP-optimized: background uses <Image priority fetchPriority="high">.
 */
export default function Hero({
  heading,
  subheading,
  ctaLabel,
  ctaHref,
  backgroundImageUrl = "/images/hero.webp",
  eyebrow,
  rightColumn,
}: HeroProps) {
  return (
    <section className="relative bg-brand-dark overflow-hidden">
      <Image
        src={backgroundImageUrl}
        alt=""
        fill
        priority
        fetchPriority="high"
        quality={85}
        sizes="100vw"
        className="object-cover object-center"
        aria-hidden="true"
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, rgba(15,15,16,0.94) 0%, rgba(15,15,16,0.82) 45%, rgba(15,15,16,0.55) 100%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 80% 20%, rgba(255,255,255,0.06) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div
          className={`grid grid-cols-1 ${rightColumn ? "lg:grid-cols-[1.1fr_1fr]" : ""} gap-12 lg:gap-16 items-center`}
        >
          <div>
            {eyebrow && <p className="eyebrow-dark mb-4">{eyebrow}</p>}
            <h1
              className="font-display text-[40px] sm:text-[52px] font-bold leading-[1.2] sm:leading-[1.05] tracking-tight mb-6 text-white"
            >
              {heading}
            </h1>
            <p className="text-gray-400 text-[18px] leading-[1.7] max-w-[560px] mb-8">
              {subheading}
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <Link
                href={ctaHref}
                className="inline-flex items-center justify-center bg-brand-primary text-white font-bold text-[14px] tracking-[0.04em] uppercase h-[3.5rem] px-8 rounded-[0.75rem] hover:opacity-90 transition-opacity shadow-[0_4px_16px_rgba(139,30,34,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
              >
                {ctaLabel}
              </Link>
              <a
                href={`tel:${PHONE_E164}`}
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white font-semibold text-[14px] tracking-[0.02em] h-[3.5rem] px-6 rounded-[0.75rem] border border-white/15 hover:bg-white/15 hover:border-white/25 transition-colors touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                <Phone size={16} aria-hidden="true" />
                {PHONE_NUMBER}
              </a>
            </div>
          </div>

          {rightColumn && <div>{rightColumn}</div>}
        </div>
      </div>

      <div className="h-1 bg-brand-primary" />
    </section>
  );
}
