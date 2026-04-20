import Link from "next/link";
import { AUTHOR, AUTHOR_URL, EDITORIAL_POLICY_URL } from "@/../site.config";

/**
 * ReviewedBy — sitewide E-E-A-T trust strip.
 *
 * Renders centered attribution + verifiable license chips:
 *
 *   Reviewed by {AUTHOR.name}, {AUTHOR.jobTitle}
 *   FL #CGC1525289 (General) · FL #CFC1434398 (Plumbing) · FL #CMC1251666 (Mechanical)
 *
 * Visible on every money page directly below the Hero. Aligns with the Person
 * schema's Article.author reference and is a direct E-E-A-T signal for both
 * Google and AI crawlers.
 */
export default function ReviewedBy({
  lastUpdated,
  showEditorialLink = false,
}: {
  lastUpdated?: string;
  showEditorialLink?: boolean;
}) {
  return (
    <section
      className="bg-white border-b border-gray-200"
      aria-label="Content attribution and licenses"
    >
      <div className="mx-auto max-w-5xl px-6 py-5 text-center">
        <p className="text-gray-600 text-[14px]">
          Reviewed by{" "}
          <Link
            href={AUTHOR_URL}
            className="font-semibold text-brand-dark hover:underline"
          >
            {AUTHOR.name}
          </Link>
          , {AUTHOR.jobTitle}
          {lastUpdated && (
            <>
              <span className="text-gray-300 mx-2">·</span>
              <span className="text-gray-500">Last updated: {lastUpdated}</span>
            </>
          )}
        </p>

        {AUTHOR.licenses.length > 0 && (
          <ul className="mt-3 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[13px] text-gray-600">
            {AUTHOR.licenses.map((license) => {
              const short = license.name
                .replace(/^Certified\s+/i, "")
                .replace(/\s+Contractor$/i, "")
                .trim();
              return (
                <li key={license.number}>
                  <a
                    href={license.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-dark hover:underline transition-colors"
                  >
                    FL #{license.number}
                    <span className="text-gray-400"> ({short})</span>
                  </a>
                </li>
              );
            })}
          </ul>
        )}

        {showEditorialLink && (
          <p className="mt-3 text-[12px] text-gray-500">
            <Link
              href={EDITORIAL_POLICY_URL}
              className="hover:text-brand-dark hover:underline transition-colors"
            >
              Editorial policy →
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}
