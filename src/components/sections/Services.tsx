import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ServiceCard {
  title: string;
  description: string;
  href: string;
  imageUrl: string;
  imageAlt: string;
}

interface ServicesProps {
  cards: ServiceCard[];
  heading?: string;
  subheading?: string;
  eyebrow?: string;
}

/**
 * Services — numbered service-plate grid with drafting-style title block,
 * corner sheet numbers, and dramatic hover states. Cards are next/Link so
 * the whole card is one tap target.
 */
export default function Services({
  cards,
  heading = "Our Services",
  subheading = "Professional work across every service we offer.",
  eyebrow = "Our Services",
}: ServicesProps) {
  return (
    <section className="relative section-primary bg-gradient-to-b from-white via-gray-50/60 to-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Drafting title-block line */}
        <div className="flex items-center gap-4 mb-10 text-[10px] font-mono uppercase tracking-[0.24em] text-gray-400">
          <span className="h-px flex-1 bg-gray-200" aria-hidden="true" />
          <span>Sheet A-01 · Services</span>
          <span className="h-px flex-1 bg-gray-200" aria-hidden="true" />
        </div>

        <div className="text-center mb-14 max-w-2xl mx-auto">
          <p className="eyebrow mb-3">{eyebrow}</p>
          <h2 className="section-h2">{heading}</h2>
          <p className="section-lead mt-3">{subheading}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {cards.map((card, idx) => {
            const sheetNum = String(idx + 1).padStart(2, "0");
            return (
              <Link
                key={card.href}
                href={card.href}
                className="group relative flex flex-col rounded-[0.875rem] overflow-hidden bg-white border border-gray-200 shadow-[0_6px_24px_-8px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_48px_-12px_rgba(0,0,0,0.18)] hover:border-brand-dark/30 hover:-translate-y-1 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
              >
                {/* Image band */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <Image
                    src={card.imageUrl}
                    alt={card.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center motion-safe:group-hover:scale-[1.06] transition-transform duration-[600ms]"
                  />
                  {/* Dark-bottom gradient for legibility of corner labels */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%)",
                    }}
                    aria-hidden="true"
                  />
                  {/* Sheet number — top left */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 text-white">
                    <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/70">
                      Plate
                    </span>
                    <span className="font-mono text-[13px] font-bold tracking-wider">
                      {sheetNum}
                    </span>
                  </div>
                  {/* Hairline dimension marker — bottom edge */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 text-white/60">
                    <span className="h-px flex-1 bg-white/30" />
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase">
                      {card.title}
                    </span>
                    <span className="h-px flex-1 bg-white/30" />
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-display text-[22px] font-bold text-brand-dark leading-[1.15] mb-3 tracking-[-0.01em]">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 text-[14.5px] leading-[1.7] mb-5 flex-1">
                    {card.description}
                  </p>
                  {/* Footer bar with hairline */}
                  <div className="flex items-center justify-between border-t border-gray-100 pt-4 -mx-6 px-6 -mb-6 pb-5 bg-gray-50/40">
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-gray-400">
                      {sheetNum} / {String(cards.length).padStart(2, "0")}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-brand-accent text-[13px] font-bold tracking-wide uppercase group-hover:gap-2.5 transition-[gap] duration-300">
                      View details <ArrowRight size={13} aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
