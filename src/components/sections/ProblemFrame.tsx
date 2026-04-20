import BlueprintBackdrop from "@/components/ui/BlueprintBackdrop";

/**
 * ProblemFrame — editorial/spec-sheet treatment for "why projects go wrong."
 *
 * Oversized plate numerals, monospace dimension annotations, hairline rules.
 * Sits on a warm off-white section to differentiate from flat white sections
 * around it. Closing statement gets full-width emphasis.
 */
export default function ProblemFrame() {
  const problems = [
    {
      spec: "4–6 SUBS · PER JOB",
      title: "Too many subcontractors",
      body: "Most GCs stack 4–6 subs onto a single renovation — framing, plumbing, electrical, mechanical, drywall, finishing. Every new sub is another schedule to sync, another point of failure.",
    },
    {
      spec: "WEEKS ADDED · HANDOFFS",
      title: "Delays between trades",
      body: "Electrical finishes but the plumbing sub isn't free for another week. Drywall is scheduled but one rough-in hasn't passed inspection. Every handoff is where weeks get added.",
    },
    {
      spec: "ZERO · ACCOUNTABILITY",
      title: "Nobody owns the problem",
      body: "When something fails inspection or a finish doesn't match, each sub points at the previous one. The homeowner ends up project-managing their own renovation.",
    },
    {
      spec: "COMPOUNDING · COST",
      title: "Change orders multiply",
      body: "A moved outlet or an added bathroom triggers a new sub contract, a new markup, and new coordination cost. Mid-project scope changes become the most expensive line item on the job.",
    },
  ];

  return (
    <section className="relative section-primary bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden">
      <BlueprintBackdrop tone="light" />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        {/* Drafting title-block header line */}
        <div className="flex items-center gap-4 mb-12 text-[10px] font-mono uppercase tracking-[0.24em] text-gray-400">
          <span className="h-px flex-1 bg-gray-200" aria-hidden="true" />
          <span>Sheet A-02 · The problem</span>
          <span className="h-px flex-1 bg-gray-200" aria-hidden="true" />
        </div>

        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="eyebrow mb-4">Why most projects go wrong</p>
          <h2 className="section-h2">The real reason renovations run late</h2>
          <p className="section-lead mt-4 mx-auto">
            It&apos;s almost never the construction work itself. It&apos;s the coordination between the people doing it.
          </p>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10 lg:gap-x-14">
          {problems.map((problem, idx) => {
            const num = String(idx + 1).padStart(2, "0");
            return (
              <li
                key={problem.title}
                className="relative flex flex-col pb-10 md:pb-0 border-b border-gray-200/70 md:border-b-0 last:border-b-0"
              >
                <div className="flex items-baseline gap-5 mb-5">
                  <span className="font-display font-bold tabular-nums text-gray-200 text-[72px] sm:text-[84px] leading-none tracking-tight">
                    {num}
                  </span>
                  <div className="flex-1 pt-3">
                    <div className="flex items-center gap-3 text-gray-400">
                      <span className="h-px w-6 bg-gray-300" aria-hidden="true" />
                      <span className="font-mono text-[10px] tracking-[0.2em] uppercase">
                        {problem.spec}
                      </span>
                    </div>
                  </div>
                </div>

                <h3 className="font-display text-[22px] sm:text-[24px] font-bold text-brand-dark leading-[1.15] mb-3 tracking-[-0.01em]">
                  {problem.title}
                </h3>
                <p className="text-gray-600 text-[15px] leading-[1.75] max-w-[42ch]">
                  {problem.body}
                </p>
              </li>
            );
          })}
        </ol>

        {/* Closing statement — full-width emphasis */}
        <div className="mt-20 pt-12 border-t border-gray-200 text-center max-w-3xl mx-auto">
          <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-brand-accent mb-5">
            The Dellamano answer
          </p>
          <p className="font-display text-[24px] sm:text-[30px] lg:text-[34px] font-bold text-brand-dark leading-[1.25] tracking-[-0.015em]">
            We remove the layer where{" "}
            <span className="relative inline-block">
              <span className="relative">every one of these problems</span>
              <span
                className="absolute left-0 right-0 bottom-1 h-2 bg-brand-accent/15 -z-10"
                aria-hidden="true"
              />
            </span>{" "}
            lives.
          </p>
        </div>
      </div>
    </section>
  );
}
