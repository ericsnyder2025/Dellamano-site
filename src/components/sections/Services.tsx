import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

interface ServiceCard {
  title: string;
  description: string;
  href: string;
  imageUrl: string;
  imageAlt: string;
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
 * Services — 2-up (or 2x2) big-card service grid. Full-bleed photography,
 * clear title, optional bullet callouts, explicit CTA button. Clean
 * sans-serif throughout, restrained section padding with generous
 * whitespace.
 */
export default function Services({
  cards,
  heading = "Our Services",
  subheading = "Professional work across every service we offer.",
  eyebrow = "What we do",
}: ServicesProps) {
  return (
    <section className="section-primary bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <p className="eyebrow mb-3">{eyebrow}</p>
          <h2 className="section-h2">{heading}</h2>
          <p className="section-lead mt-4">{subheading}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {cards.map((card) => (
            <article
              key={card.href}
              className="group relative flex flex-col rounded-[1rem] overflow-hidden bg-white border border-gray-200 shadow-[0_6px_20px_-10px_rgba(0,0,0,0.1)] hover:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.16)] hover:-translate-y-0.5 transition-all duration-300"
            >
              <Link
                href={card.href}
                className="relative aspect-[16/9] overflow-hidden bg-gray-100 focus-visible:outline-none"
                aria-label={card.title}
              >
                <Image
                  src={card.imageUrl}
                  alt={card.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center motion-safe:group-hover:scale-[1.04] transition-transform duration-500"
                />
              </Link>

              <div className="p-7 sm:p-8 flex-1 flex flex-col">
                <h3 className="font-display text-[24px] sm:text-[26px] font-bold text-brand-dark leading-[1.15] mb-3 tracking-[-0.01em]">
                  <Link
                    href={card.href}
                    className="hover:text-brand-accent-700 transition-colors"
                  >
                    {card.title}
                  </Link>
                </h3>

                <p className="text-gray-600 text-[15px] leading-[1.75] mb-5">
                  {card.description}
                </p>

                {card.bullets && card.bullets.length > 0 && (
                  <ul className="space-y-2.5 mb-7">
                    {card.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-2.5 text-gray-700 text-[14.5px] leading-[1.55]"
                      >
                        <Check
                          size={15}
                          className="text-brand-accent flex-shrink-0 mt-[3px]"
                          aria-hidden="true"
                          strokeWidth={2.5}
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-auto">
                  <Link
                    href={card.href}
                    className="inline-flex items-center gap-2 bg-brand-dark text-white font-semibold text-[13px] tracking-[0.04em] uppercase h-11 px-5 rounded-[0.625rem] hover:bg-gray-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
                  >
                    {card.ctaLabel ?? "Explore services"}
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
