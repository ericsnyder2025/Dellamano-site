import { AlertTriangle, Clock, MessageSquareWarning, Users } from "lucide-react";

/**
 * ProblemFrame — pain-point section that sits BEFORE the services catalog.
 *
 * Sells the problem before the solution. Frames the industry failure mode
 * (sub-soup, coordination gaps, finger-pointing) so the in-house-MEP
 * differentiator lands harder on the next screen.
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
      body: "Electrical finishes but the plumbing sub isn't free for another week. Drywall is scheduled but one rough-in hasn't passed inspection. Every handoff between subs is where weeks get added.",
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
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="eyebrow mb-3">Why most projects go wrong</p>
          <h2 className="section-h2">The real reason renovations run late</h2>
          <p className="section-lead mt-3 max-w-2xl mx-auto">
            It's almost never the construction work itself. It's the coordination between the people doing it.
          </p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {problems.map((problem) => {
            const Icon = problem.icon;
            return (
              <li
                key={problem.title}
                className="bg-gray-50 rounded-[1.25rem] p-6 border border-[rgba(221,225,235,0.7)]"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-11 h-11 rounded-full bg-brand-dark/5 flex items-center justify-center">
                    <Icon
                      size={20}
                      className="text-gray-700"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3 className="font-display text-[17px] font-bold text-brand-dark mb-2 leading-snug">
                      {problem.title}
                    </h3>
                    <p className="text-gray-600 text-[14px] leading-[1.7]">
                      {problem.body}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="text-center mt-10">
          <p className="text-brand-dark font-display text-[20px] sm:text-[22px] font-bold">
            Dellamano removes the layer where every one of these problems lives.
          </p>
        </div>
      </div>
    </section>
  );
}
