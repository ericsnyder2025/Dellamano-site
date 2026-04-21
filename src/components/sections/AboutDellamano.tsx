import { ShieldCheck, Users, Wrench, MapPin } from "lucide-react";
import { AUTHOR, SERVICE_AREA_COUNTIES } from "@/../site.config";

const gcLicense = AUTHOR.licenses.find((l) => l.number.startsWith("CGC"));

const credentials = [
  {
    icon: ShieldCheck,
    label: "Licensed FL General Contractor",
    sub: gcLicense?.number ?? "CGC1525289",
  },
  {
    icon: Users,
    label: "Single-Source Contractor",
    sub: "One GC, one contract",
  },
  {
    icon: Wrench,
    label: "Roofing, Mechanical, Electrical & Plumbing",
    sub: "Licensed by the GC himself",
  },
  {
    icon: MapPin,
    label: "Serving Broward + Palm Beach",
    sub: SERVICE_AREA_COUNTIES.join(" + "),
  },
];

/**
 * AboutDellamano — asymmetric 2-column about section. Left: prose on tinted
 * section background. Right: 2×2 credentials grid with subtle hover lift.
 * Ports the AboutHaven pattern.
 */
export default function AboutDellamano() {
  return (
    <section className="section-primary bg-brand-accent-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-16 items-start">
          {/* Left — text */}
          <div>
            <p className="eyebrow mb-3">About Dellamano</p>
            <h2 className="section-h2 mb-6">
              Built on trade licenses.
              <br />
              Backed by accountability.
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700 text-[17px] leading-[1.75]">
                Dellamano Construction is a licensed Florida general
                contractor serving homeowners across Broward and Palm Beach
                Counties. Aldo Dellamano personally holds the state
                credentials for general, roofing, mechanical, electrical, and
                plumbing work — so every trade on your project answers to one license
                holder, whether that trade is performed by our own team or by a
                specialist crew we bring in and manage.
              </p>
              <p className="text-gray-700 text-[17px] leading-[1.75]">
                Our work is built around fixed-bid proposals, written scope,
                and single-source contractor accountability. We pull every
                permit, schedule every inspection, and walk every project from
                estimate through final walkthrough — one company, start to
                finish.
              </p>
            </div>
          </div>

          {/* Right — credentials grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {credentials.map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.label}
                  className="bg-white rounded-[1.25rem] p-6 border border-[rgba(221,225,235,0.7)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5 transition-all duration-200"
                >
                  <Icon size={20} className="text-brand-accent mb-3" aria-hidden="true" />
                  <p className="text-brand-dark text-[14px] font-bold leading-tight mb-1 font-display">
                    {c.label}
                  </p>
                  <p className="text-gray-500 text-[12px]">{c.sub}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
