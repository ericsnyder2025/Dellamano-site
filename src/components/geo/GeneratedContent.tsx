import Link from "next/link";
import Image from "next/image";
import {
  Quote,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import type {
  ContentSection,
  PhotoRow,
  BulletItem,
} from "@/types/page";

interface GeneratedContentProps {
  sections: ContentSection[];
  photos?: PhotoRow[];
}

function renderInlineMarkdown(text: string): React.ReactNode {
  if (!text) return text;
  const linkPattern = /\[([^\]]+)\]\((\/[^)]+|https?:\/\/[^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = linkPattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const [, anchor, href] = match;
    if (href.startsWith("/")) {
      parts.push(
        <Link
          key={`l-${key++}`}
          href={href}
          className="text-brand-link hover:text-brand-link-700 font-semibold underline decoration-brand-link/40 underline-offset-2 hover:decoration-brand-link-700 transition-colors"
        >
          {anchor}
        </Link>
      );
    } else {
      parts.push(
        <a
          key={`l-${key++}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-link hover:text-brand-link-700 font-semibold underline"
        >
          {anchor}
        </a>
      );
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts.length > 0 ? parts : text;
}

function findPhoto(photos: PhotoRow[], slot: string): PhotoRow | undefined {
  return photos.find((p) => p.storage_path?.includes(`-${slot}.webp`));
}

function getAnyMidPhoto(photos: PhotoRow[]): PhotoRow | undefined {
  return photos.find((p) => p.storage_path?.includes("-mid"));
}

function smartParagraphSplit(body: string): string[] {
  const explicit = body.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  if (explicit.length > 1) return explicit;

  const text = explicit[0] || "";
  if (text.length < 320) return [text];

  const sentences = text.match(/[^.!?]+[.!?]+(?:\s|$)/g) || [text];
  if (sentences.length < 3) return [text];

  const targetGroups = sentences.length >= 6 ? 3 : 2;
  const perGroup = Math.ceil(sentences.length / targetGroups);
  const chunks: string[] = [];
  for (let i = 0; i < sentences.length; i += perGroup) {
    chunks.push(sentences.slice(i, i + perGroup).join("").trim());
  }
  return chunks.filter(Boolean);
}

function IntroBlock({ section }: { section: ContentSection }) {
  const paragraphs = smartParagraphSplit(section.body || "");
  const firstPara = paragraphs[0] || "";
  const restParas = paragraphs.slice(1);
  const firstChar = firstPara.charAt(0);
  const firstRest = firstPara.slice(1);

  return (
    <section className="section-primary bg-white relative">
      <div
        className="absolute inset-x-0 top-0 h-[60%] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 100% at 50% 0%, rgba(184,135,60,0.06) 0%, rgba(184,135,60,0) 70%)",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-14 lg:mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-brand-accent/60" />
            <p className="eyebrow" style={{ marginBottom: 0 }}>
              Introduction
            </p>
            <div className="h-px w-16 bg-brand-accent/60" />
          </div>
          {section.heading && (
            <h2
              className="font-display font-bold text-brand-dark leading-[1.05] tracking-tight mx-auto max-w-4xl"
              style={{ fontSize: "clamp(34px, 5vw, 60px)" }}
            >
              {section.heading}
            </h2>
          )}
        </div>

        <div className="mx-auto max-w-3xl">
          <p className="text-gray-700 text-[19px] sm:text-[21px] leading-[1.75]">
            <span
              className="float-left font-display font-bold text-brand-accent leading-[0.82] mr-4 mt-2 select-none"
              style={{ fontSize: "clamp(80px, 9vw, 112px)" }}
              aria-hidden="true"
            >
              {firstChar}
            </span>
            {renderInlineMarkdown(firstRest)}
          </p>
          {restParas.length > 0 && (
            <div className="space-y-6 mt-7 clear-both">
              {restParas.map((para, pi) => (
                <p
                  key={pi}
                  className="text-gray-700 text-[18px] sm:text-[19px] leading-[1.75]"
                >
                  {renderInlineMarkdown(para)}
                </p>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-center gap-3 mt-16">
          <div className="h-px w-20 bg-brand-accent/30" />
          <div className="w-1.5 h-1.5 rounded-full bg-brand-accent/60" />
          <div className="h-px w-20 bg-brand-accent/30" />
        </div>
      </div>
    </section>
  );
}

function pickPullQuote(body: string): string | null {
  const stripped = body.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1");
  const sentences = stripped.match(/[^.!?]+[.!?]+/g) || [];
  const candidates = sentences
    .map((s) => s.trim())
    .filter((s) => s.length >= 80 && s.length <= 180);
  if (candidates.length === 0) return null;
  const scored = candidates.map((s) => ({
    s,
    score:
      (/\d/.test(s) ? 3 : 0) +
      (/(South Florida|hurricane|HVHZ|Florida|Broward|Palm Beach|code|permit)/i.test(s) ? 2 : 0) +
      Math.min(s.length, 160) / 160,
  }));
  scored.sort((a, b) => b.score - a.score);
  return scored[0].s;
}

function TextBlock({
  section,
  alt,
  index,
}: {
  section: ContentSection;
  alt: boolean;
  index: number;
}) {
  const paragraphs = smartParagraphSplit(section.body || "");
  const bg = alt ? "bg-brand-accent-50" : "bg-white";
  const sidebarRight = index % 2 === 1;
  const displayNumber = String(index + 1).padStart(2, "0");
  const pullQuote = pickPullQuote(section.body || "");
  const pullAfterIdx = Math.max(
    0,
    Math.min(paragraphs.length - 2, Math.floor(paragraphs.length * 0.4))
  );

  return (
    <section className={`section-primary ${bg} relative`}>
      <div
        className={`hidden lg:block absolute top-0 bottom-0 w-[40%] ${
          sidebarRight ? "right-0" : "left-0"
        } pointer-events-none`}
        style={{
          background: alt
            ? "linear-gradient(180deg, rgba(184,135,60,0.04) 0%, rgba(184,135,60,0) 100%)"
            : "linear-gradient(180deg, rgba(15,15,16,0.025) 0%, rgba(15,15,16,0) 100%)",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 xl:gap-16 items-start">
          <aside
            className={`lg:col-span-4 mb-10 lg:mb-0 ${
              sidebarRight ? "lg:order-2" : "lg:order-1"
            }`}
          >
            <div className="lg:sticky lg:top-24">
              <p
                className="font-display font-bold text-brand-accent/15 leading-none select-none mb-4 hidden lg:block"
                style={{ fontSize: "clamp(72px, 9vw, 132px)" }}
                aria-hidden="true"
              >
                {displayNumber}
              </p>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-10 bg-brand-accent" />
                <p className="eyebrow" style={{ marginBottom: 0 }}>
                  Local Insight
                </p>
              </div>
              {section.heading && (
                <h2 className="font-display font-bold text-brand-dark leading-[1.08] tracking-tight text-[32px] sm:text-[40px] lg:text-[44px] xl:text-[52px]">
                  {section.heading}
                </h2>
              )}
            </div>
          </aside>

          <div
            className={`lg:col-span-8 ${sidebarRight ? "lg:order-1" : "lg:order-2"}`}
          >
            <div className="space-y-6 max-w-[640px]">
              {paragraphs.map((para, pi) => (
                <div key={pi}>
                  <p className="text-gray-700 text-[17px] sm:text-[18px] leading-[1.85]">
                    {renderInlineMarkdown(para)}
                  </p>
                  {pullQuote && pi === pullAfterIdx && (
                    <figure className="my-10 relative">
                      <div className="absolute -left-3 top-0 bottom-0 w-[3px] bg-brand-accent rounded-full" />
                      <Quote
                        size={26}
                        className="text-brand-accent mb-3 ml-4"
                        aria-hidden="true"
                      />
                      <blockquote className="font-display text-[22px] sm:text-[26px] lg:text-[28px] leading-[1.35] text-brand-dark font-semibold italic pl-4 tracking-tight">
                        &ldquo;{pullQuote}&rdquo;
                      </blockquote>
                      <figcaption className="sr-only">Key insight from this section</figcaption>
                    </figure>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CalloutBlock({ section }: { section: ContentSection }) {
  return (
    <section className="section-compact bg-white">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="bg-brand-accent-50 border-l-4 border-brand-accent rounded-r-[1.25rem] p-8 sm:p-10 shadow-[var(--shadow-card)]">
          <Quote size={28} className="text-brand-accent mb-4" aria-hidden="true" />
          {section.heading && (
            <p className="eyebrow mb-4">{section.heading}</p>
          )}
          <p className="font-display text-[22px] sm:text-[26px] text-brand-dark leading-[1.4] font-semibold">
            {renderInlineMarkdown(section.body || "")}
          </p>
        </div>
      </div>
    </section>
  );
}

function BulletsBlock({ section, alt }: { section: ContentSection; alt: boolean }) {
  const items = (section.items as BulletItem[]) || [];
  const bg = alt ? "bg-brand-accent-50" : "bg-white";
  return (
    <section className={`section-primary ${bg}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="eyebrow">What You Get</p>
          {section.heading && <h2 className="section-h2">{section.heading}</h2>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-[1.25rem] p-7 border border-[rgba(221,225,235,0.7)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-lg bg-brand-accent-50 flex items-center justify-center mb-4">
                <CheckCircle2 size={20} className="text-brand-accent" aria-hidden="true" />
              </div>
              <h3 className="font-display text-[18px] font-bold text-brand-dark leading-[1.2] mb-3 tracking-tight">
                {item.title}
              </h3>
              <p className="text-gray-500 text-[14px] leading-[1.7]">{renderInlineMarkdown(item.body || (item as { description?: string }).description || "")}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StepsBlock({ section, alt }: { section: ContentSection; alt: boolean }) {
  const steps = section.steps || [];
  const bg = alt ? "bg-brand-accent-50" : "bg-white";
  return (
    <section className={`section-primary ${bg}`}>
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="mb-12">
          <p className="eyebrow">Process</p>
          {section.heading && <h2 className="section-h2">{section.heading}</h2>}
        </div>
        <ol className="space-y-6">
          {steps.map((step, i) => (
            <li
              key={i}
              className="flex gap-6 bg-white rounded-[1.25rem] p-7 border border-[rgba(221,225,235,0.7)] shadow-[var(--shadow-card)]"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-accent text-white font-display font-bold text-[18px] flex items-center justify-center shadow-md">
                {i + 1}
              </div>
              <div className="flex-1 pt-1">
                <h3 className="font-display text-[18px] font-bold text-brand-dark leading-[1.2] mb-2 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-[15px] leading-[1.7]">{renderInlineMarkdown(step.body)}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function StatGridBlock({ section }: { section: ContentSection }) {
  const stats = section.stats || [];
  return (
    <section className="bg-brand-dark py-16 sm:py-20 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(184,135,60,0.3) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {section.heading && (
          <div className="text-center mb-12">
            <p className="eyebrow-dark">By the Numbers</p>
            <h2 className="section-h2" style={{ color: "#FFFFFF" }}>{section.heading}</h2>
          </div>
        )}
        <div
          className={`grid gap-6 ${
            stats.length === 4
              ? "grid-cols-2 lg:grid-cols-4"
              : stats.length === 3
              ? "grid-cols-1 sm:grid-cols-3"
              : "grid-cols-1 sm:grid-cols-2"
          }`}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-brand-navy rounded-[1.25rem] p-8 border border-white/8 text-center"
            >
              <p className="font-display text-[40px] sm:text-[48px] font-bold text-brand-accent-200 leading-tight mb-2">
                {stat.value}
              </p>
              <p className="text-white text-[14px] font-semibold uppercase tracking-wider">
                {stat.label}
              </p>
              {stat.note && (
                <p className="text-gray-400 text-[12px] mt-2 leading-tight">{stat.note}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ComparisonBlock({ section }: { section: ContentSection }) {
  const rows = section.rows || [];
  const leftLabel = section.left_label || "Option A";
  const rightLabel = section.right_label || "Option B";
  return (
    <section className="section-primary bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="eyebrow">Side-by-Side</p>
          {section.heading && <h2 className="section-h2">{section.heading}</h2>}
        </div>
        {/* Real <table> so AI-search scanners and audit tools pick up the
            semantic table structure. CSS grid doesn't register as a table. */}
        <div className="bg-white rounded-[1.25rem] border border-[rgba(221,225,235,0.7)] shadow-[var(--shadow-card)] overflow-hidden">
          <table
            itemScope
            itemType="https://schema.org/Table"
            className="w-full border-collapse table-fixed"
          >
            {section.heading && (
              <caption className="sr-only">{section.heading}</caption>
            )}
            <thead className="bg-brand-dark text-white">
              <tr>
                <th
                  scope="col"
                  className="p-4 sm:p-5 font-display text-[13px] font-bold uppercase tracking-wider text-left"
                >
                  Feature
                </th>
                <th
                  scope="col"
                  className="p-4 sm:p-5 font-display text-[13px] font-bold uppercase tracking-wider text-center border-l border-white/10"
                >
                  {leftLabel}
                </th>
                <th
                  scope="col"
                  className="p-4 sm:p-5 font-display text-[13px] font-bold uppercase tracking-wider text-center border-l border-white/10"
                >
                  {rightLabel}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={i}
                  className={`${i % 2 === 0 ? "bg-white" : "bg-brand-accent-50"} border-t border-gray-100`}
                >
                  <th
                    scope="row"
                    className="p-4 sm:p-5 font-semibold text-brand-dark text-[14px] text-left"
                  >
                    {row.feature}
                  </th>
                  <td className="p-4 sm:p-5 text-gray-600 text-[14px] border-l border-gray-100">
                    {row.left}
                  </td>
                  <td className="p-4 sm:p-5 text-gray-600 text-[14px] border-l border-gray-100">
                    {row.right}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function ImageBlock({
  section,
  photos,
  reverse,
}: {
  section: ContentSection;
  photos: PhotoRow[];
  reverse: boolean;
}) {
  const photo =
    (section.image_slot && findPhoto(photos, section.image_slot)) ||
    getAnyMidPhoto(photos);

  if (!photo) return null;

  const heading = section.caption || photo.alt_text || "From the field";
  const support =
    photo.alt_text && photo.alt_text !== heading ? photo.alt_text : null;

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
          <figure
            className={`lg:col-span-3 ${reverse ? "lg:order-2" : "lg:order-1"}`}
          >
            <div className="rounded-[1.25rem] overflow-hidden border border-[rgba(221,225,235,0.7)] shadow-[var(--shadow-xl)] aspect-[16/10] relative bg-gray-100">
              <Image
                src={photo.public_url}
                alt={photo.alt_text || heading || "Project photo"}
                title={heading || photo.alt_text || "Project photo"}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
            </div>
            <figcaption className="text-gray-500 text-[13px] mt-3 text-center">
              {photo.alt_text || heading}
            </figcaption>
          </figure>

          <div
            className={`lg:col-span-2 ${reverse ? "lg:order-1 lg:pr-4" : "lg:order-2 lg:pl-4"}`}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10 bg-brand-accent" />
              <p className="eyebrow" style={{ marginBottom: 0 }}>
                In the Field
              </p>
            </div>
            <h3 className="font-display text-[24px] sm:text-[28px] font-bold text-brand-dark leading-[1.2] tracking-tight mb-4">
              {heading}
            </h3>
            {support && (
              <p className="text-gray-600 text-[15px] leading-[1.7]">
                {support}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function InlineCTABlock({ headline, blurb }: { headline: string; blurb: string }) {
  return (
    <section className="bg-white py-6">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="bg-brand-accent-50 border-l-4 border-brand-accent rounded-r-[1rem] p-6 sm:p-7 shadow-[var(--shadow-sm)]">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6">
            <div className="flex-1">
              <p className="font-display text-brand-dark text-[18px] sm:text-[20px] font-bold leading-[1.3] mb-1.5">
                {headline}
              </p>
              <p className="text-gray-600 text-[14px] leading-[1.55]">{blurb}</p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-brand-primary text-white font-bold text-[13px] tracking-[0.04em] uppercase h-[3rem] px-6 rounded-[0.6rem] hover:opacity-90 transition-opacity shadow-[0_4px_12px_rgba(139,30,34,0.3)] flex-shrink-0 whitespace-nowrap"
            >
              Get Estimate
              <ArrowRight size={14} className="ml-2" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTABlock({ section }: { section: ContentSection }) {
  const paragraphs = (section.body || "").split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  return (
    <section className="section-primary bg-brand-dark relative overflow-hidden py-20 lg:py-28">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(184,135,60,0.5) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-5xl px-6 lg:px-8 text-center">
        <Sparkles size={40} className="text-brand-accent-200 mx-auto mb-8" aria-hidden="true" />
        {section.heading && (
          <h2
            className="font-display text-[40px] sm:text-[56px] lg:text-[64px] font-bold leading-[1.05] mb-8 tracking-tight"
            style={{ color: "#FFFFFF" }}
          >
            {section.heading}
          </h2>
        )}
        <div className="text-gray-200 text-[19px] sm:text-[21px] leading-[1.7] space-y-6 max-w-3xl mx-auto mb-12">
          {paragraphs.map((para, pi) => (
            <p key={pi}>{renderInlineMarkdown(para)}</p>
          ))}
        </div>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center bg-brand-primary text-white font-bold text-[16px] sm:text-[17px] tracking-[0.04em] uppercase h-[4.25rem] px-12 sm:px-14 rounded-[0.875rem] hover:opacity-90 transition-opacity shadow-[0_6px_20px_rgba(139,30,34,0.5)]"
        >
          Get a Free Estimate <ArrowRight size={20} className="ml-3" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

const INLINE_CTA_VARIANTS: { headline: string; blurb: string }[] = [
  {
    headline: "Questions about your remodel or addition?",
    blurb: "Get a free, no-pressure estimate from our licensed South Florida team.",
  },
  {
    headline: "Ready to talk to a real local GC?",
    blurb: "Tell us about your project — we respond within 24 hours.",
  },
  {
    headline: "Not sure what your project should cost?",
    blurb: "Free, itemized estimates — no obligation, no sales pressure.",
  },
];

export default function GeneratedContent({ sections, photos = [] }: GeneratedContentProps) {
  if (!sections || sections.length === 0) return null;

  // Skip a leading hero block — the route should render its own hero above.
  const renderable = sections.filter((s, i) => !(s.type === "hero" && i === 0));

  const isSubstantive = (s: ContentSection) =>
    !["intro", "image", "cta"].includes(s.type);
  const substantiveIndices = renderable
    .map((s, i) => (isSubstantive(s) ? i : -1))
    .filter((i) => i >= 0);

  const injectAfter = new Set<number>();
  const introIdx = renderable.findIndex((s) => s.type === "intro");
  if (introIdx >= 0 && substantiveIndices.length >= 2) {
    injectAfter.add(introIdx);
  }
  if (substantiveIndices.length >= 4) {
    const half = substantiveIndices[Math.floor(substantiveIndices.length / 2)];
    const fourFifths = substantiveIndices[Math.floor((substantiveIndices.length * 4) / 5)];
    if (half !== undefined) injectAfter.add(half);
    if (fourFifths !== undefined && fourFifths !== half) injectAfter.add(fourFifths);
  }

  let textIndex = 0;
  let ctaCounter = 0;
  let imageIndex = 0;
  let textBlockCount = 0;

  return (
    <>
      {renderable.map((section, i) => {
        const key = `block-${i}`;
        const alt = textIndex % 2 === 1;
        const usesBg = ["text", "bullets", "steps"].includes(section.type);

        let rendered: React.ReactNode = null;

        switch (section.type) {
          case "intro":
            rendered = <IntroBlock section={section} />;
            break;
          case "text":
            rendered = (
              <TextBlock section={section} alt={alt} index={textBlockCount} />
            );
            textBlockCount++;
            break;
          case "callout":
            rendered = <CalloutBlock section={section} />;
            break;
          case "bullets":
            rendered = <BulletsBlock section={section} alt={alt} />;
            break;
          case "steps":
            rendered = <StepsBlock section={section} alt={alt} />;
            break;
          case "stat-grid":
            rendered = <StatGridBlock section={section} />;
            break;
          case "comparison":
            rendered = <ComparisonBlock section={section} />;
            break;
          case "image":
            rendered = (
              <ImageBlock
                section={section}
                photos={photos}
                reverse={imageIndex % 2 === 1}
              />
            );
            imageIndex++;
            break;
          case "cta":
            rendered = <CTABlock section={section} />;
            break;
          case "hero":
          case "services":
          case "why":
            rendered = (
              <TextBlock section={section} alt={alt} index={textBlockCount} />
            );
            textBlockCount++;
            break;
        }

        if (usesBg) textIndex++;

        const showCta = injectAfter.has(i);
        let ctaEl: React.ReactNode = null;
        if (showCta) {
          const variant = INLINE_CTA_VARIANTS[ctaCounter % INLINE_CTA_VARIANTS.length];
          ctaCounter++;
          ctaEl = (
            <InlineCTABlock
              key={`${key}-cta`}
              headline={variant.headline}
              blurb={variant.blurb}
            />
          );
        }

        return (
          <div key={key}>
            {rendered}
            {ctaEl}
          </div>
        );
      })}
    </>
  );
}
