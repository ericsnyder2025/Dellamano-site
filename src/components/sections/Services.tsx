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
 * Responsive 3-column service card grid with hover lift + image zoom.
 * Cards are next/Link so the whole card is one tap target.
 */
export default function Services({
  cards,
  heading = "Our Services",
  subheading = "Professional work across every service we offer.",
  eyebrow = "Our Services",
}: ServicesProps) {
  return (
    <section className="section-primary bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="eyebrow mb-3">{eyebrow}</p>
          <h2 className="section-h2">{heading}</h2>
          <p className="section-lead mt-3 max-w-xl mx-auto">{subheading}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group relative block rounded-[1.25rem] overflow-hidden bg-white border border-[rgba(221,225,235,0.7)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
            >
              <div className="aspect-[16/10] relative overflow-hidden bg-gray-100">
                <Image
                  src={card.imageUrl}
                  alt={card.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center motion-safe:group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-[20px] font-bold text-brand-dark leading-[1.2] mb-2 tracking-tight">
                  {card.title}
                </h3>
                <p className="text-gray-500 text-[14px] leading-[1.7] mb-4 line-clamp-3">
                  {card.description}
                </p>
                <span className="inline-flex items-center gap-2 text-brand-primary text-[14px] font-bold group-hover:gap-3 transition-[gap] duration-300">
                  Learn more <ArrowRight size={14} aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
