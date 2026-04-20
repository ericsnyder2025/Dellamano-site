import Image from "next/image";
import { MapPin } from "lucide-react";
import type { RecentProject } from "@/../site.config";

/**
 * RecentProjects — homepage proof section.
 *
 * Renders 3–6 recently completed jobs with scope-first titles and
 * trade chips. Auto-hides when RECENT_PROJECTS is empty — we don't
 * ship fabricated proof. Populate via `RECENT_PROJECTS` in site.config.ts.
 */

interface RecentProjectsProps {
  projects: RecentProject[];
  eyebrow?: string;
  heading?: string;
  subheading?: string;
}

export default function RecentProjects({
  projects,
  eyebrow = "Recent projects",
  heading = "What a Dellamano job actually looks like",
  subheading = "A few recent jobs — the scope, the trades we self-performed, and where the project was.",
}: RecentProjectsProps) {
  if (!projects || projects.length === 0) return null;

  return (
    <section className="section-primary bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="eyebrow mb-3">{eyebrow}</p>
          <h2 className="section-h2">{heading}</h2>
          <p className="section-lead mt-3 max-w-2xl mx-auto">{subheading}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <article
              key={project.slug}
              className="bg-white rounded-[1.25rem] border border-[rgba(221,225,235,0.7)] overflow-hidden shadow-[var(--shadow-card)] hover:-translate-y-0.5 transition-transform duration-200 flex flex-col"
            >
              <div className="relative aspect-[4/3] bg-gray-100">
                <Image
                  src={project.image}
                  alt={`${project.title} — ${project.location}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-display text-[18px] font-bold text-brand-dark mb-2 leading-snug">
                  {project.title}
                </h3>
                <p className="flex items-center gap-1.5 text-gray-500 text-[13px] mb-3">
                  <MapPin size={13} aria-hidden="true" />
                  {project.location}
                </p>
                <p className="text-gray-600 text-[14px] leading-[1.7] mb-5 flex-1">
                  {project.summary}
                </p>
                {project.trades.length > 0 && (
                  <ul className="flex flex-wrap gap-1.5 pt-4 border-t border-gray-100">
                    {project.trades.map((trade) => (
                      <li
                        key={trade}
                        className="inline-flex items-center px-2.5 py-1 rounded-full bg-brand-dark/5 text-gray-700 text-[11px] font-semibold tracking-wide uppercase"
                      >
                        {trade}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
