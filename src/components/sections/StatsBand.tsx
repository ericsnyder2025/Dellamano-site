import BlueprintBackdrop from "@/components/ui/BlueprintBackdrop";

/**
 * StatsBand — compact numeric credentials strip between the trust strip
 * and the problem section. Uses drafting-title-block typography
 * (oversized mono numerals + small caps labels) for a technical feel
 * that carries the page's visual weight more than inline chips.
 */

type Stat = {
  value: string;
  label: string;
  sub?: string;
};

const STATS: Stat[] = [
  { value: "04", label: "Active FL DBPR Licenses", sub: "General · Roofing · Mechanical · Plumbing" },
  { value: "01", label: "GC Signing Every Permit", sub: "One accountable license holder" },
  { value: "00", label: "Subs on Your Contract", sub: "One contract with Dellamano" },
  { value: "02", label: "Counties Served", sub: "Broward + Palm Beach" },
];

export default function StatsBand() {
  return (
    <section className="relative bg-gradient-to-br from-brand-dark via-[#0B1223] to-[#060B18] text-white overflow-hidden border-t border-b border-white/5">
      <BlueprintBackdrop tone="dark" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-12 lg:py-14">
        {/* Title-block style header line */}
        <div className="flex items-center gap-4 mb-8 text-[10px] font-mono uppercase tracking-[0.24em] text-brand-accent-200">
          <span className="h-px flex-1 bg-white/10" aria-hidden="true" />
          <span>By the numbers · Sheet A-00</span>
          <span className="h-px flex-1 bg-white/10" aria-hidden="true" />
        </div>

        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6">
          {STATS.map((stat, idx) => (
            <li
              key={stat.label}
              className={`relative ${idx !== 0 ? "lg:border-l lg:border-white/10 lg:pl-6" : ""}`}
            >
              {/* Drafting tag in corner */}
              <span className="absolute top-0 right-2 text-[9px] font-mono tracking-[0.15em] text-white/25">
                0{idx + 1}
              </span>

              {/* Massive numeral */}
              <div className="font-display font-bold leading-none tabular-nums">
                <span className="block text-white text-[56px] sm:text-[68px] lg:text-[76px] tracking-tight">
                  {stat.value}
                </span>
              </div>

              {/* Hairline separator */}
              <div className="h-px w-10 bg-brand-accent-200/60 my-3" aria-hidden="true" />

              <p className="text-white/90 font-semibold text-[13px] uppercase tracking-[0.1em]">
                {stat.label}
              </p>
              {stat.sub && (
                <p className="text-white/45 text-[12px] mt-1.5 leading-[1.5]">
                  {stat.sub}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
