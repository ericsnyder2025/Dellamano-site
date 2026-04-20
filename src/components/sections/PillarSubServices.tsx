import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getServicesByPillar, type ServiceEntry } from "@/../site.config";

/**
 * PillarSubServices — grid of sub-service cards shown on a pillar page.
 *
 * Feeds from `getServicesByPillar()` so the list auto-maintains as the
 * SERVICES config changes. Each card links to the individual service page.
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
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="eyebrow mb-3">{eyebrow}</p>
          <h2 className="section-h2">{heading}</h2>
          {subheading && (
            <p className="section-lead mt-3 max-w-2xl mx-auto">{subheading}</p>
          )}
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((svc) => (
            <li key={svc.slug}>
              <Link
                href={svc.href}
                className="group block h-full bg-white rounded-[1.25rem] p-6 border border-[rgba(221,225,235,0.7)] shadow-[var(--shadow-card)] hover:-translate-y-0.5 hover:border-brand-primary/30 transition-all duration-200"
              >
                <h3 className="font-display text-[18px] font-bold text-brand-dark mb-3 leading-snug">
                  {svc.name}
                </h3>
                <p className="text-gray-600 text-[14px] leading-[1.7] mb-4">
                  {svc.tagline}
                </p>
                <span className="inline-flex items-center gap-1 text-brand-primary font-semibold text-[13px] tracking-wide uppercase group-hover:gap-2 transition-all">
                  Learn more
                  <ArrowRight size={13} aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
