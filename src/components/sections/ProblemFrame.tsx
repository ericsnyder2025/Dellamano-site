/**
 * ProblemFrame — warm editorial variant.
 *
 * Cream-paper background, serif display type, aged-brass accent, generous
 * whitespace. No drafting-block dividers, no monospace spec strips, no
 * plate numerals. Feels like a feature spread in an architectural-home
 * magazine, not an engineer's sheet.
 */
export default function ProblemFrame() {
  const problems = [
    {
      title: "Too many subcontractors",
      body: "Most general contractors stack four to six subs onto a single renovation — framing, plumbing, electrical, mechanical, drywall, finishing. Every new sub is another schedule to sync, another point of failure.",
    },
    {
      title: "Delays between trades",
      body: "Electrical finishes but the plumbing sub isn't free for another week. Drywall is scheduled but one rough-in hasn't passed inspection. Every handoff is where weeks get added.",
    },
    {
      title: "Nobody owns the problem",
      body: "When something fails inspection or a finish doesn't match, each sub points at the previous one. The homeowner ends up project-managing their own renovation.",
    },
    {
      title: "Change orders multiply",
      body: "A moved outlet or an added bathroom triggers a new sub contract, a new markup, and new coordination cost. Mid-project scope changes become the most expensive line item on the job.",
    },
  ];

  return (
    <section
      className="relative section-primary overflow-hidden"
      style={{ backgroundColor: "var(--color-warm-cream)", color: "var(--color-warm-ink)" }}
    >
      {/* Subtle paper grain — radial gradients layered for a warm, uneven feel */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          background:
            "radial-gradient(ellipse at 15% 10%, rgba(160, 122, 78, 0.06) 0%, transparent 50%), radial-gradient(ellipse at 85% 90%, rgba(160, 122, 78, 0.05) 0%, transparent 50%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl px-6 lg:px-10">
        {/* Editorial eyebrow — small caps with brass rule */}
        <div className="flex items-center gap-4 mb-12">
          <span
            className="h-px w-12"
            style={{ backgroundColor: "var(--color-warm-brass)" }}
            aria-hidden="true"
          />
          <span
            className="text-[11px] tracking-[0.3em] uppercase font-semibold"
            style={{ color: "var(--color-warm-brass)", fontFamily: "var(--font-body)" }}
          >
            The problem
          </span>
        </div>

        {/* Section heading — serif display, large, with italic emphasis */}
        <h2
          className="font-bold leading-[1.08] tracking-[-0.015em] max-w-[18ch] mb-8"
          style={{
            fontFamily: "var(--font-editorial)",
            fontSize: "clamp(2.25rem, 5.5vw, 4rem)",
            color: "var(--color-warm-ink)",
          }}
        >
          The real reason renovations{" "}
          <em className="font-normal" style={{ fontStyle: "italic" }}>
            run late.
          </em>
        </h2>

        <p
          className="text-[18px] leading-[1.7] max-w-[52ch] mb-20"
          style={{ color: "var(--color-warm-ink-soft)" }}
        >
          It&apos;s almost never the construction work itself. It&apos;s the coordination between the people doing it.
        </p>

        {/* Editorial problem list — 2-col on desktop, hairline rules, serif titles */}
        <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-12">
          {problems.map((problem, idx) => {
            const num = String(idx + 1).padStart(2, "0");
            return (
              <li
                key={problem.title}
                className="relative pt-8"
                style={{ borderTop: "1px solid rgba(160, 122, 78, 0.35)" }}
              >
                {/* Brass ordinal — small, elegant, feels like a chapter marker */}
                <span
                  className="absolute -top-[11px] left-0 px-2 text-[10px] tracking-[0.2em] uppercase font-semibold"
                  style={{
                    color: "var(--color-warm-brass)",
                    backgroundColor: "var(--color-warm-cream)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  No. {num}
                </span>

                <h3
                  className="font-semibold leading-[1.2] mb-4 text-[26px] sm:text-[28px] tracking-[-0.01em]"
                  style={{
                    fontFamily: "var(--font-editorial)",
                    color: "var(--color-warm-ink)",
                  }}
                >
                  {problem.title}
                </h3>
                <p
                  className="text-[15.5px] leading-[1.8] max-w-[44ch]"
                  style={{ color: "var(--color-warm-ink-soft)" }}
                >
                  {problem.body}
                </p>
              </li>
            );
          })}
        </ol>

        {/* Closing editorial callout — serif, large italic emphasis, drop-cap style rule */}
        <div className="mt-24 relative">
          <div
            className="absolute left-0 top-0 bottom-0 w-[3px]"
            style={{ backgroundColor: "var(--color-warm-brass)" }}
            aria-hidden="true"
          />
          <div className="pl-8 sm:pl-10 max-w-3xl">
            <p
              className="text-[11px] tracking-[0.3em] uppercase font-semibold mb-4"
              style={{ color: "var(--color-warm-brass)", fontFamily: "var(--font-body)" }}
            >
              The Dellamano answer
            </p>
            <p
              className="font-normal leading-[1.3] tracking-[-0.01em]"
              style={{
                fontFamily: "var(--font-editorial)",
                fontSize: "clamp(1.5rem, 3.2vw, 2.25rem)",
                color: "var(--color-warm-ink)",
              }}
            >
              We remove the layer where{" "}
              <em style={{ fontStyle: "italic" }}>every one of these problems</em> lives.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
