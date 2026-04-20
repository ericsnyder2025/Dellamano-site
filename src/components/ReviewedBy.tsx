import Link from "next/link";
import { AUTHOR, AUTHOR_URL, EDITORIAL_POLICY_URL } from "@/../site.config";

/**
 * ReviewedBy — E-E-A-T signal component.
 *
 * Renders visible attribution near the top of content pages:
 *   "Reviewed by {AUTHOR_NAME}, {JOB_TITLE}  |  Last updated: {DATE}  |  [Editorial policy →]"
 *
 * Place this at the top of every money page, pillar, and blog post.
 * This visible attribution aligns with the Person schema's Article.author
 * reference and is a direct E-E-A-T signal for both Google and AI crawlers.
 *
 * See references/07-eeat-authority.md.
 */
export default function ReviewedBy({ lastUpdated }: { lastUpdated?: string }) {
  return (
    <div className="border-y border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-4xl px-6 py-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-gray-600">
        <span>
          Reviewed by{" "}
          <Link
            href={AUTHOR_URL}
            className="font-semibold text-gray-900 hover:underline"
          >
            {AUTHOR.name}
          </Link>
          , {AUTHOR.jobTitle}
        </span>
        {lastUpdated && (
          <>
            <span className="text-gray-300">|</span>
            <span>Last updated: {lastUpdated}</span>
          </>
        )}
        <span className="text-gray-300">|</span>
        <Link
          href={EDITORIAL_POLICY_URL}
          className="hover:underline text-gray-600"
        >
          Editorial policy →
        </Link>
      </div>
    </div>
  );
}
