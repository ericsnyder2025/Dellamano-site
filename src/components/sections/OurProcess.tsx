import Link from "next/link";
import { Phone, ClipboardCheck, Hammer, Sparkles, ArrowRight } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: Phone,
    title: "Consultation",
    short: "Phone call or quick form",
    body: "Start with a phone call or the hero form — you'll talk directly to Aldo. We'll walk through project scope, timeline, and budget. No call-center rep, no scripts, no pressure.",
  },
  {
    num: "02",
    icon: ClipboardCheck,
    title: "On-Site Estimate",
    short: "Fixed-price written proposal",
    body: "Aldo visits the property, reviews existing conditions — panel capacity, plumbing runs, structural — and walks you through every option. You get a fixed-bid proposal with itemized scope. No hidden change orders.",
  },
  {
    num: "03",
    icon: Hammer,
    title: "Permit & Build",
    short: "One GC coordinating every trade",
    body: "Permits pulled under one license. Our team handles demolition, framing, drywall, and finishes directly, and coordinates every other trade — whether performed by our crew or a trusted specialist. One contract, one schedule, one accountable contractor walking the job.",
  },
  {
    num: "04",
    icon: Sparkles,
    title: "Final Walkthrough",
    short: "Punch list closed, warranty handed",
    body: "You walk the finished work with Aldo before the final check clears. Punch items closed, warranty documentation handed over, and the permit closed with the county. Your GC is still a phone call away afterward.",
  },
];

export default function OurProcess() {
  return (
    <section className="section-primary relative overflow-hidden bg-gradient-to-b from-white via-brand-accent-50 to-white">
      {/* Decorative blobs */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(18,128,133,0.07) 0%, transparent 40%), radial-gradient(circle at 80% 80%, rgba(18,128,133,0.07) 0%, transparent 40%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="eyebrow mb-3">How it works</p>
          <h2 className="section-h2 mb-4">Our process</h2>
          <p className="text-gray-500 text-[18px] leading-[1.7] max-w-2xl mx-auto">
            From first call to final walkthrough — every step handled by the same licensed team.
          </p>
        </div>

        {/* Connecting line — desktop only */}
        <div className="relative">
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-[88px] left-[12.5%] right-[12.5%] h-[2px]"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(18,128,133,0.35) 10%, rgba(18,128,133,0.35) 90%, transparent 100%)",
            }}
          />

          {/* Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="group relative flex motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-700"
                  style={{ animationDelay: `${i * 120}ms` }}
                >
                  <div className="relative w-full flex flex-col items-center">
                    {/* Floating icon badge */}
                    <div className="relative w-[72px] h-[72px] rounded-full bg-white border-2 border-brand-accent flex items-center justify-center shadow-[0_8px_24px_rgba(18,128,133,0.25)] group-hover:scale-110 group-hover:shadow-[0_12px_32px_rgba(18,128,133,0.35)] transition-all duration-300 mb-6 z-10">
                      <Icon size={26} className="text-brand-accent" aria-hidden="true" />
                      {/* Pulse ring on hover */}
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 rounded-full border-2 border-brand-accent opacity-0 motion-safe:group-hover:opacity-30 motion-safe:group-hover:scale-125 transition-all duration-500"
                      />
                    </div>

                    {/* Card */}
                    <div className="bg-white rounded-[1.25rem] p-7 border border-[rgba(221,225,235,0.7)] shadow-[var(--shadow-card)] group-hover:shadow-[var(--shadow-card-hover)] group-hover:-translate-y-1 transition-all duration-300 text-center w-full flex-1 flex flex-col">
                      <h3 className="font-display text-[22px] font-bold text-brand-dark leading-[1.2] mb-2 tracking-tight">
                        {step.title}
                      </h3>
                      <p className="eyebrow text-[10px] mb-4 mx-auto">{step.short}</p>
                      <p className="text-gray-600 text-[15px] leading-[1.7]">{step.body}</p>
                    </div>
                  </div>

                  {/* Connector arrow — between cards, desktop only */}
                  {i < steps.length - 1 && (
                    <div
                      aria-hidden="true"
                      className="hidden lg:flex absolute top-[24px] -right-5 w-8 h-8 rounded-full bg-brand-accent items-center justify-center shadow-[0_4px_12px_rgba(18,128,133,0.4)] z-20"
                    >
                      <ArrowRight size={14} className="text-white" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            href="#free-estimate"
            className="inline-flex items-center justify-center gap-2 bg-brand-primary text-white font-bold text-[15px] tracking-[0.04em] uppercase h-[3.5rem] px-10 rounded-[0.875rem] hover:opacity-90 transition-opacity shadow-[0_6px_20px_rgba(139,30,34,0.4)]"
          >
            Start with a Free Estimate
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
