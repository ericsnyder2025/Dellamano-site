import Link from "next/link";
import { ShieldCheck, ClipboardCheck, Wrench, Handshake, Sparkles } from "lucide-react";

const benefits = [
  {
    icon: ShieldCheck,
    title: "One licensed trade holder on your permit",
    body: "Aldo Dellamano personally signs your permit as the license holder for the general, mechanical, and plumbing scopes. There aren't three master licenses stapled to the application. One name, one accountable party — from the initial submittal through the final Certificate of Completion.",
  },
  {
    icon: Wrench,
    title: "In-house mechanical, electrical & plumbing",
    body: "MEP work gets self-performed by the same crew running the rest of the project. That means the person installing the hood vent is coordinating with the person framing the soffit — not a sub fitting you in between other jobs. Rough-ins sequence cleanly with framing and drywall, not weeks after.",
  },
  {
    icon: ClipboardCheck,
    title: "Fixed-bid written proposals",
    body: "No hourly guessing, no T&M creep. After the on-site walkthrough, you get an itemized written scope with a fixed price. If something comes up mid-project, the change order is spelled out in writing before any work begins — not shoved into a surprise invoice at the end.",
  },
  {
    icon: Handshake,
    title: "Direct line to your GC",
    body: "You won't get routed through a dispatcher or intake coordinator. Aldo responds directly during business hours. When a question comes up on a Tuesday afternoon, your contractor picks up — not a voicemail queue.",
  },
];

const whoItsFor = [
  "Want a single point of accountability on their build",
  "Expect a licensed contractor to personally sign their permit",
  "Need mechanical, electrical, and plumbing coordinated cleanly",
  "Value written scope and fixed pricing over hourly guesswork",
  "See the renovation as a relationship, not a transaction",
];

export default function OurApproach() {
  return (
    <section className="section-primary relative overflow-hidden bg-gradient-to-b from-white via-brand-accent-50 to-white">
      {/* Decorative radial blobs */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 15% 10%, rgba(37,87,191,0.06) 0%, transparent 35%), radial-gradient(circle at 85% 90%, rgba(37,87,191,0.06) 0%, transparent 35%)",
        }}
      />
      {/* Top + bottom hairline gradient edges */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-accent/20 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-accent/20 to-transparent"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-16">
          <p className="eyebrow mb-4">The Dellamano approach</p>
          <h2 className="section-h2 mb-6">
            One GC, every trade.
            <br />
            No coordination gaps.
          </h2>
          <p className="text-gray-500 text-[18px] sm:text-[20px] leading-[1.7] max-w-2xl mx-auto">
            Most general contractors hand the MEP work to three different
            subcontractors. We self-perform all of it under one license holder —
            and the difference shows up on your timeline, your budget, and your
            inspection log.
          </p>
        </div>

        {/* Intro prose — 3-column sticky heading + 2-column body */}
        <div className="bg-white rounded-[1.5rem] p-10 sm:p-14 lg:p-16 border border-brand-accent/15 shadow-[var(--shadow-card)] mb-20 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="h-px w-12 bg-brand-accent mb-5" />
                <p className="font-display text-[26px] sm:text-[30px] font-bold text-brand-dark leading-[1.2] tracking-tight">
                  Built around who signs the permit.
                </p>
              </div>
            </div>
            <div className="lg:col-span-2 space-y-6 text-gray-700 text-[17px] leading-[1.85]">
              <p>
                A renovation isn&apos;t a construction problem — it&apos;s a{" "}
                <strong className="text-brand-dark">coordination problem</strong>.
                Four to six subcontractors, each on their own schedule, each
                pointing at the previous trade when something fails inspection.
                The delays aren&apos;t because pipe-bending or drywall-hanging is
                slow. They&apos;re because nobody owns the handoffs.
              </p>

              <p>
                Aldo built Dellamano Construction around a different model:
                the same person who signs your permit also holds the mechanical
                and plumbing licenses. When an electrical rough-in needs to
                shift two feet to clear a soffit, that decision happens on-site
                in five minutes — not in a three-way text between a GC, an
                electrician&apos;s office, and a drywall crew already scheduled
                for Monday.
              </p>

              <p>
                Our{" "}
                <Link href="/services/interior-renovation" className="text-brand-accent hover:text-brand-accent-700 font-semibold hover:underline">
                  interior renovation
                </Link>{" "}
                and{" "}
                <Link href="/services/exterior-living" className="text-brand-accent hover:text-brand-accent-700 font-semibold hover:underline">
                  exterior living
                </Link>{" "}
                work is handled by a single licensed team from demo through
                final walkthrough — serving{" "}
                <strong className="text-brand-dark">Broward and Palm Beach Counties</strong>.
                One GC. One license holder on your permit. One point of
                accountability for every phase of the job.
              </p>
            </div>
          </div>
        </div>

        {/* The Dellamano Promise — 4-up benefit cards */}
        <div className="text-center mb-10">
          <p className="eyebrow mb-3">The Dellamano standard</p>
          <h3 className="font-display text-[28px] sm:text-[34px] font-bold text-brand-dark leading-tight tracking-tight">
            Four commitments. One accountable contractor.
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20 max-w-5xl mx-auto">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                className="bg-brand-accent-50 rounded-[1.25rem] p-8 border border-brand-accent/15 hover:border-brand-accent/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-accent flex items-center justify-center mb-5 shadow-[0_4px_12px_rgba(37,87,191,0.3)]">
                  <Icon size={22} className="text-white" aria-hidden="true" />
                </div>
                <h4 className="font-display text-[19px] font-bold text-brand-dark leading-[1.25] mb-3 tracking-tight">
                  {b.title}
                </h4>
                <p className="text-gray-600 text-[14px] leading-[1.7]">{b.body}</p>
              </div>
            );
          })}
        </div>

        {/* Who it's for — dark callout */}
        <div className="bg-brand-dark rounded-[1.5rem] p-8 sm:p-12 relative overflow-hidden max-w-5xl mx-auto">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background:
                "radial-gradient(ellipse at top right, rgba(37,87,191,0.4) 0%, transparent 60%)",
            }}
            aria-hidden="true"
          />
          <div className="relative">
            <p className="eyebrow-dark mb-3">Designed for</p>
            <h3 className="font-display text-[28px] sm:text-[34px] font-bold text-white leading-tight tracking-tight mb-6">
              Homeowners who want one accountable GC
            </h3>
            <p className="text-gray-300 text-[16px] leading-[1.75] mb-8 max-w-2xl">
              Dellamano was built to deliver the level of coordination most
              homeowners never get from a contractor — because most contractors
              don&apos;t hold the licenses themselves. When the person signing
              your permit is also the person running the job, the entire
              timeline gets tighter, the finger-pointing goes away, and your
              renovation becomes a relationship instead of a scramble.
            </p>
            <ul className="space-y-3">
              {whoItsFor.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Sparkles
                    size={18}
                    className="text-brand-accent-200 flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span className="text-gray-200 text-[15px] leading-[1.6]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
