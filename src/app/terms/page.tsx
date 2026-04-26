import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS_NAME, BUSINESS_LEGAL_NAME, SITE_URL, EMAIL, PHONE_NUMBER } from "@/../site.config";

// noindex via meta tag — mirrors the X-Robots-Tag header set in
// next.config.ts so auditors don't flag conflicting directives.
export const metadata: Metadata = {
  title: `Terms of Service — ${BUSINESS_NAME}`,
  description: `Terms governing use of the ${BUSINESS_NAME} website. Construction services are provided under separate signed contracts.`,
  alternates: { canonical: `${SITE_URL}terms` },
  robots: { index: false, follow: true },
};

const EFFECTIVE_DATE = "April 26, 2026";

export default function TermsOfServicePage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 prose prose-lg">
      <h1>Terms of Service</h1>
      <p><em>Effective {EFFECTIVE_DATE}</em></p>

      <p>
        These terms govern your use of the {BUSINESS_NAME} website (the
        &quot;Site&quot;), operated by {BUSINESS_LEGAL_NAME}. By using the Site you
        agree to these terms.
      </p>

      <h2>Use of the Site</h2>
      <p>
        The Site is provided for informational purposes — to describe our services,
        share educational content, and let homeowners request estimates. You agree
        to use it lawfully and not to interfere with its operation, attempt to gain
        unauthorized access, or scrape it in ways that disrupt service.
      </p>

      <h2>Construction Services Are Separate</h2>
      <p>
        Nothing on the Site constitutes a binding offer or contract for construction
        services. All actual construction work is performed under a separate written
        agreement signed by {BUSINESS_LEGAL_NAME} and the client, which controls
        scope, price, schedule, payment terms, change orders, warranties, and
        dispute resolution.
      </p>

      <h2>Estimates &amp; Pricing</h2>
      <p>
        Pricing ranges, timelines, and process descriptions on the Site are general
        information based on typical projects. Your actual estimate depends on
        scope, site conditions, materials, code requirements, and HOA factors, and
        is provided only after an in-person site visit and written proposal.
      </p>

      <h2>Editorial Content</h2>
      <p>
        Articles, guides, and service descriptions on the Site are reviewed for
        accuracy (see our{" "}
        <Link href="/editorial-policy">Editorial Policy</Link>) but are general
        information, not project-specific advice. Code requirements, permit paths,
        and pricing change over time and vary by jurisdiction. Do not rely on Site
        content as a substitute for a licensed contractor evaluating your specific
        project.
      </p>

      <h2>Licensing</h2>
      <p>
        {BUSINESS_LEGAL_NAME} is a licensed Florida general contractor. License
        numbers and verification links are listed on our About page. We do not
        perform work outside the scope of our active licenses.
      </p>

      <h2>Intellectual Property</h2>
      <p>
        Site content — text, photos, graphics, logos — is owned by{" "}
        {BUSINESS_LEGAL_NAME} or used under license. You may share links to pages
        and quote brief excerpts with attribution. You may not republish, mirror,
        or use Site content for commercial purposes without written permission.
      </p>

      <h2>Third-Party Links</h2>
      <p>
        The Site may link to third-party resources (the Florida DBPR license
        verification site, manufacturer pages, mapping services). We don&apos;t
        control those sites and aren&apos;t responsible for their content or
        practices.
      </p>

      <h2>Disclaimers</h2>
      <p>
        The Site is provided &quot;as is.&quot; While we work to keep information
        accurate, we make no warranties about the Site itself — uptime, accuracy of
        third-party data shown on the Site, or fitness for any particular purpose.
        Construction warranties are governed by your signed services agreement.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        To the extent permitted by law, {BUSINESS_LEGAL_NAME} is not liable for
        indirect, incidental, or consequential damages arising from your use of
        the Site. Liability for construction services is governed by the signed
        services agreement, not these Site terms.
      </p>

      <h2>Governing Law</h2>
      <p>
        These terms are governed by the laws of the State of Florida, without
        regard to conflict-of-law principles. Disputes related to the Site itself
        will be resolved in the state or federal courts located in Broward or Palm
        Beach County, Florida.
      </p>

      <h2>Changes to These Terms</h2>
      <p>
        We may update these terms as our services or applicable laws change.
        Material changes will be reflected by updating the effective date above.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms? Reach us at{" "}
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a> or {PHONE_NUMBER}.
      </p>

      <p>
        <Link href="/">Return to home</Link>
      </p>
    </article>
  );
}
