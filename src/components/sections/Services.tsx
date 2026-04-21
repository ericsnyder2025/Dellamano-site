import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ServiceCard {
  title: string;
  description: string;
  href: string;
  imageUrl: string;
  imageAlt: string;
  tagline?: string;
  bullets?: string[];
  ctaLabel?: string;
}

interface ServicesProps {
  cards: ServiceCard[];
  heading?: string;
  subheading?: string;
  eyebrow?: string;
}

/**
 * Services — dark-card vertical-style grid with full-bleed photography,
 * gradient overlay, and content overlaid on the image (desktop). Mobile
 * stacks content below the image. Ported from Haven's Verticals component.
 */
export default function Services({
  cards,
  heading = "Our Services",
  subheading,
  eyebrow = "What we do",
}: ServicesProps) {
  return (
    <section className="section-primary bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <p className="eyebrow mb-3">{eyebrow}</p>
          <h2 className="section-h2">{heading}</h2>
          {subheading && <p className="section-lead mt-4">{subheading}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group relative block rounded-[1.25rem] overflow-hidden bg-brand-dark border border-brand-dark/10 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
            >
              <div className="aspect-[16/10] relative overflow-hidden">
                <Image
                  src={card.imageUrl}
                  alt={card.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 640px"
                  quality={80}
                  className="object-cover object-center motion-safe:group-hover:scale-105 transition-transform duration-500"
                />
                {/* Desktop gradient overlay + content */}
                <div
                  className="hidden lg:block absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(15,15,16,0.95) 0%, rgba(15,15,16,0.75) 40%, rgba(15,15,16,0.15) 70%, transparent 100%)",
                  }}
                  aria-hidden="true"
                />
                <div className="hidden lg:flex absolute inset-0 flex-col justify-end p-8">
                  {card.tagline && (
                    <p className="eyebrow-dark mb-2">{card.tagline}</p>
                  )}
                  <h3 className="font-display text-[28px] font-bold text-white leading-tight mb-3 tracking-tight">
                    {card.title}
                  </h3>
                  <p className="text-gray-300 text-[14px] leading-[1.6] mb-4 max-w-md">
                    {card.description}
                  </p>
                  {card.bullets && card.bullets.length > 0 && (
                    <ul className="flex flex-wrap gap-x-4 gap-y-1 mb-5">
                      {card.bullets.map((b, i) => (
                        <li key={i} className="text-gray-400 text-[12px]">
                          · {b}
                        </li>
                      ))}
                    </ul>
                  )}
                  <span className="inline-flex items-center gap-2 text-brand-accent-200 text-[14px] font-bold group-hover:gap-3 transition-[gap] duration-300">
                    {card.ctaLabel ?? "Explore services"}
                    <ArrowRight size={14} aria-hidden="true" />
                  </span>
                </div>
              </div>

              {/* Mobile content — stacked below image */}
              <div className="lg:hidden p-6">
                {card.tagline && (
                  <p className="eyebrow-dark mb-2">{card.tagline}</p>
                )}
                <h3 className="font-display text-[24px] font-bold text-white leading-tight mb-3 tracking-tight">
                  {card.title}
                </h3>
                <p className="text-gray-300 text-[14px] leading-[1.6] mb-4">
                  {card.description}
                </p>
                {card.bullets && card.bullets.length > 0 && (
                  <ul className="flex flex-wrap gap-x-4 gap-y-1 mb-4">
                    {card.bullets.map((b, i) => (
                      <li key={i} className="text-gray-400 text-[12px]">
                        · {b}
                      </li>
                    ))}
                  </ul>
                )}
                <span className="inline-flex items-center gap-2 text-brand-accent-200 text-[14px] font-bold group-hover:gap-3 transition-[gap] duration-300">
                  {card.ctaLabel ?? "Explore services"}
                  <ArrowRight size={14} aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
