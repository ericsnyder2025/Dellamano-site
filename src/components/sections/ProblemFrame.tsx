import { AlertTriangle, Clock, MessageSquareWarning, Users } from "lucide-react";

/**
 * ProblemFrame — clean sans-serif 4-card grid framing why most renovations
 * fall apart. Mirrors the restrained card-driven aesthetic used on the
 * Haven homepage: white background, generous whitespace, subtle shadows,
 * no decorative chrome.
 */
export default function ProblemFrame() {
  const problems = [
    {
      icon: Users,
      title: "Too many subcontractors",
      body: "Most GCs stack 4-6 subs onto a single renovation — framing, plumbing, electrical, mechanical, drywall, finishing. Every new sub is another schedule to sync, another point of failure.",
    },
    {
      icon: Clock,
      title: "Delays between trades",
      body: "Electrical finishes but the plumbing sub isn't free for another week. Drywall is scheduled but one rough-in hasn't passed inspection. Every handoff is where weeks get added.",
    },
    {
      icon: MessageSquareWarning,
      title: "Nobody owns the problem",
      body: "When something fails inspection or a finish doesn't match, each sub points at the previous one. The homeowner ends up project-managing their own renovation.",
    },
    {
      icon: AlertTriangle,
      title: "Change orders multiply",
      body: "A moved outlet or an added bathroom triggers a new sub contract, a new markup, and new coordination cost. Mid-project scope changes become the most expensive line item on the job.",
    },
  ];

  return (
    <section className="section-primary bg-white">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <p className="eyebrow mb-3">Why most projects go wrong</p>
          <h2 className="section-h2">The real reason renovations run late</h2>
          <p className="section-lead mt-4">
            It&apos;s almost never the construction work itself. It&apos;s the coordination between the people doing it.
          </p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {problems.map((problem) => {
            const Icon = problem.icon;
            return (
              <li
                key={problem.title}
                className="flex items-start gap-5 bg-white rounded-[1rem] p-7 border border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.04)]"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-accent-50 flex items-center justify-center">
                  <Icon
                    size={22}
                    className="text-brand-accent"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <h3 className="font-display text-[18px] font-bold text-brand-dark mb-2.5 leading-snug">
                    {problem.title}
                  </h3>
                  <p className="text-gray-600 text-[15px] leading-[1.75]">
                    {problem.body}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-14 text-center max-w-2xl mx-auto">
          <p className="font-display text-[20px] sm:text-[22px] font-bold text-brand-dark leading-[1.4]">
            Dellamano puts one licensed GC in charge of every trade — so none of these problems compound on your job.
          </p>
        </div>
      </div>
    </section>
  );
}
