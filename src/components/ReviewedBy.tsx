import Link from "next/link";
import { AUTHOR } from "@/../site.config";

// Internal nav must be relative — AUTHOR_URL / EDITORIAL_POLICY_URL are
// absolute (production domain) for canonical/schema/OG; using them as
// Link hrefs causes off-host nav when the production domain isn't the
// host serving the response.
const AUTHOR_PATH = `/team/${AUTHOR.slug}`;
const EDITORIAL_POLICY_PATH = "/editorial-policy";

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
      <div className="mx-auto max-w-5xl px-6 py-5 flex flex-col items-center text-center">
        <p className="text-gray-600 text-[14px] text-center w-full">
          Reviewed by{" "}
          <Link
            href={AUTHOR_PATH}
            className="font-semibold text-brand-link hover:text-brand-link-700 hover:underline transition-colors"
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
          <ul className="mt-3 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[13px] text-gray-600 mx-auto">
            {AUTHOR.licenses.map((license) => {
              const short = license.name
                .replace(/^Certified\s+/i, "")
                .replace(/\s+Contractor$/i, "")
                .trim();
              const isPending = !license.verificationUrl;

              if (isPending) {
                return (
                  <li key={`${license.name}-pending`}>
                    <span className="text-gray-400 italic">
                      FL {short}
                      <span className="text-gray-400/70"> (pending)</span>
                    </span>
                  </li>
                );
              }

              return (
                <li key={license.number}>
                  <a
                    href={license.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-link hover:text-brand-link-700 hover:underline transition-colors"
                  >
                    FL #{license.number}
                    <span className="text-brand-link/70"> ({short})</span>
                  </a>
                </li>
              );
            })}
          </ul>
        )}

        {showEditorialLink && (
          <p className="mt-3 text-[12px] text-gray-500 text-center">
            <Link
              href={EDITORIAL_POLICY_PATH}
              className="text-brand-link hover:text-brand-link-700 hover:underline transition-colors"
            >
              Editorial policy →
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}
