/**
 * ProfessionalDisclosure — scope-of-practice disclosure for regulated industries.
 *
 * Renders a legal/professional disclaimer near the footer of content pages.
 * This is required for contractors (construction work over $X must be licensed),
 * recommended for medical (not medical advice), financial (not financial advice),
 * and legal (not legal advice) content.
 *
 * Customize the disclosure text per industry. See references/07-eeat-authority.md.
 *
 * Parameters to fill in:
 *   - Vertical (roofing, bathroom, plumbing, etc.)
 *   - Applicable standard or code (e.g., "Florida Building Code")
 *   - Threshold for required licensing (e.g., "$1,000")
 *   - Licensing verification URL (e.g., myfloridalicense.com)
 */

import { BUSINESS_NAME } from "@/../site.config";

interface DisclosureProps {
  vertical?: string;  // e.g., "roofing", "bathroom", "plumbing"
  codeStandard?: string;  // e.g., "Florida Building Code"
  threshold?: string;  // e.g., "$1,000"
  licensingBody?: string;  // e.g., "Florida DBPR"
  verificationUrl?: string;  // e.g., "https://www.myfloridalicense.com"
}

export default function ProfessionalDisclosure({
  vertical = "FILL-IN-VERTICAL",
  codeStandard = "FILL-IN-CODE_STANDARD",
  threshold = "FILL-IN-THRESHOLD",
  licensingBody = "FILL-IN-LICENSING_BODY",
  verificationUrl = "FILL-IN-VERIFICATION_URL",
}: DisclosureProps) {
  return (
    <aside className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-3xl px-6 py-6">
        <div className="flex items-start gap-3">
          <svg
            className="w-5 h-5 mt-0.5 text-gray-500 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <p className="text-sm font-semibold text-gray-900 mb-2">
              Content Disclosure
            </p>
            <p className="text-xs text-gray-600 leading-relaxed">
              This article is provided for general information only and reflects
              current {codeStandard} requirements, common {vertical} construction
              practices, and {BUSINESS_NAME}&apos;s field experience. Actual project
              costs, permit requirements, material availability, and timelines vary
              based on your specific home, municipality, and project scope.{" "}
              {licensingBody} requires work over {threshold} to be performed by a
              licensed contractor — always consult a licensed professional before
              starting a {vertical} project. Verify credentials at{" "}
              <a
                href={verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-link hover:text-brand-link-700 hover:underline transition-colors"
              >
                {new URL(verificationUrl).host}
              </a>
              . This guidance is not a substitute for a project-specific estimate
              or on-site evaluation by a licensed professional.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
