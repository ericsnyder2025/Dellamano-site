import { CheckCircle, ShieldCheck } from "lucide-react";

interface TrustSignal {
  icon?: "check" | "shield";
  label: string;
}

interface TrustSignalsProps {
  signals: TrustSignal[];
}

/**
 * Thin horizontal bar of credibility markers (licensed, insured, X years, etc.).
 * Placed directly under the hero to front-load trust without taking up a full
 * section of vertical space.
 */
export default function TrustSignals({ signals }: TrustSignalsProps) {
  return (
    <section className="bg-brand-primary-50 border-y border-brand-primary-100">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-5">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {signals.map((signal) => {
            const Icon = signal.icon === "shield" ? ShieldCheck : CheckCircle;
            return (
              <div key={signal.label} className="flex items-center gap-2">
                <Icon size={16} className="text-brand-primary" aria-hidden="true" />
                <span className="text-brand-dark text-[14px] font-semibold">
                  {signal.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
