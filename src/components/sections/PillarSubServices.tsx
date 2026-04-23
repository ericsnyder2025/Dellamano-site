import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getServicesByPillar, type ServiceEntry } from "@/../site.config";

/**
 * PillarSubServices — image tiles for each sub-service on a pillar page.
 *
 * Feeds from `getServicesByPillar()` so the list auto-maintains as the
 * SERVICES config changes. Each card links to the sub-service page.
 */
export default function PillarSubServices({
  pillar,
  eyebrow,
  heading,
  subheading,
}: {
  pillar: NonNullable<ServiceEntry["pillar"]>;
  eyebrow: string;
  heading: string;
  subheading?: string;
}) {
  const services = getServicesByPillar(pillar);
  if (services.length === 0) return null;

  return (
    <section className="section-primary bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <p className="eyebrow mb-3">{eyebrow}</p>
          <h2 className="section-h2">{heading}</h2>
          {subheading && <p className="section-lead mt-4">{subheading}</p>}
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((svc) => (
            <li key={svc.slug}>
              <Link
                href={svc.href}
                className="group relative block h-full rounded-[1.25rem] overflow-hidden bg-white border border-[rgba(221,225,235,0.7)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
              >
                <div className="aspect-[16/10] relative overflow-hidden bg-gray-100">
                  <Image
                    src={svc.imageUrl}
                    alt={svc.imageAlt}
                    width={1600}
                    height={1000}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="absolute inset-0 w-full h-full object-cover object-center motion-safe:group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-[18px] font-bold text-brand-dark mb-2 leading-snug tracking-tight">
                    {svc.name}
                  </h3>
                  <p className="text-gray-600 text-[14px] leading-[1.7] mb-4 line-clamp-3">
                    {svc.tagline}
                  </p>
                  <span className="inline-flex items-center gap-2 text-brand-primary font-bold text-[13px] tracking-wide uppercase group-hover:gap-3 transition-all">
                    Learn more
                    <ArrowRight size={13} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
