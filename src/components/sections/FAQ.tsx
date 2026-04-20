"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  heading: string;
  items: FAQItem[];
  eyebrow?: string;
}

/**
 * Accessible collapsible FAQ list. For rich-results eligibility, also emit a
 * FAQPage JSON-LD schema on the same page — see src/lib/schema.ts buildFAQPage.
 * Never emit FAQPage schema on a page that doesn't visibly show all Q&A pairs.
 */
export default function FAQ({ heading, items, eyebrow = "Common Questions" }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section-primary bg-gray-50">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="eyebrow mb-3">{eyebrow}</p>
          <h2 className="section-h2">{heading}</h2>
        </div>
        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-[1.25rem] border border-[rgba(221,225,235,0.7)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow overflow-hidden"
            >
              <button
                type="button"
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-inset"
                onClick={() => setOpenIndex((prev) => (prev === index ? null : index))}
                aria-expanded={openIndex === index}
              >
                <span className="font-display text-brand-dark font-bold text-[16px] pr-4 leading-[1.3]">
                  {item.question}
                </span>
                <ChevronDown
                  size={20}
                  className={`text-brand-primary shrink-0 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5">
                  <p className="text-gray-500 text-[15px] leading-[1.7]">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
