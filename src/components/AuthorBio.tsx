import Link from "next/link";
import Image from "next/image";
import { AUTHOR, AUTHOR_URL } from "@/../site.config";

/**
 * AuthorBio — appears at the END of content pages, before the CTA.
 *
 * Duplicates the ReviewedBy attribution as visible content at the foot of
 * the article, with bio + credentials + link to full author page. This
 * aligns with the Person schema and is a second E-E-A-T signal per page.
 *
 * See references/07-eeat-authority.md.
 */
export default function AuthorBio() {
  return (
    <aside className="border-t border-gray-200 py-10">
      <div className="mx-auto max-w-3xl px-6">
        <p className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">
          About the Author
        </p>
        <div className="flex gap-6 items-start">
          {AUTHOR.headshot && (
            <Image
              src={AUTHOR.headshot}
              alt={`${AUTHOR.name} headshot`}
              width={88}
              height={88}
              className="rounded-full flex-shrink-0"
            />
          )}
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-1">
              <Link href={AUTHOR_URL} className="hover:underline">
                {AUTHOR.name}
              </Link>
            </h3>
            <p className="text-gray-600 text-sm mb-3">{AUTHOR.jobTitle}</p>
            <p className="text-gray-700 text-[15px] leading-relaxed mb-3">
              {AUTHOR.bio}
            </p>
            {AUTHOR.licenses.length > 0 && (
              <p className="text-gray-500 text-xs mb-2">
                Licenses:{" "}
                {AUTHOR.licenses.map((l, i) => (
                  <span key={l.number}>
                    {i > 0 && ", "}
                    <a
                      href={l.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {l.name} #{l.number}
                    </a>
                  </span>
                ))}
              </p>
            )}
            <Link
              href={AUTHOR_URL}
              className="text-brand-link hover:text-brand-link-700 text-sm font-semibold hover:underline transition-colors"
            >
              View full credentials →
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
