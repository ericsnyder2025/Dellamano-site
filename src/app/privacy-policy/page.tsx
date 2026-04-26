import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS_NAME, BUSINESS_LEGAL_NAME, SITE_URL, EMAIL, PHONE_NUMBER } from "@/../site.config";

// noindex via meta tag — mirrors the X-Robots-Tag header set in
// next.config.ts so auditors don't flag conflicting directives.
export const metadata: Metadata = {
  title: `Privacy Policy — ${BUSINESS_NAME}`,
  description: `How ${BUSINESS_NAME} collects, uses, and protects information submitted through this website.`,
  alternates: { canonical: `${SITE_URL}privacy-policy` },
  robots: { index: false, follow: true },
};

const EFFECTIVE_DATE = "April 26, 2026";

export default function PrivacyPolicyPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 prose prose-lg">
      <h1>Privacy Policy</h1>
      <p><em>Effective {EFFECTIVE_DATE}</em></p>

      <p>
        {BUSINESS_LEGAL_NAME} (&quot;{BUSINESS_NAME},&quot; &quot;we,&quot; &quot;us&quot;) operates this
        website. This policy explains what information we collect, how we use it, and
        the choices you have.
      </p>

      <h2>Information We Collect</h2>
      <p>We collect information in two ways:</p>
      <ul>
        <li>
          <strong>Information you give us.</strong> When you submit our contact form
          or request an estimate, we collect your name, phone number, email address,
          and any project details you choose to share.
        </li>
        <li>
          <strong>Information collected automatically.</strong> Like most websites, we
          log standard request data (IP address, browser type, pages viewed, referring
          URL, timestamp) for security and analytics purposes.
        </li>
      </ul>

      <h2>How We Use Your Information</h2>
      <ul>
        <li>To respond to estimate requests and provide construction services</li>
        <li>To follow up on quoted projects and answer questions</li>
        <li>To improve site performance, content, and user experience</li>
        <li>To comply with legal obligations and protect against fraud</li>
      </ul>
      <p>
        We do <strong>not</strong> sell or rent your personal information. We do not
        share contact-form submissions with third parties for marketing.
      </p>

      <h2>Cookies &amp; Analytics</h2>
      <p>
        This site uses minimal cookies for core functionality and may use
        privacy-respecting analytics to understand aggregate site usage. You can
        disable cookies in your browser; the site will continue to function.
      </p>

      <h2>Service Providers</h2>
      <p>
        We use trusted third-party services to host the site, send transactional
        email, and handle estimate-form submissions. These providers process data on
        our behalf under their own security and privacy obligations.
      </p>

      <h2>Data Retention</h2>
      <p>
        We retain estimate requests and customer communications for as long as
        necessary to provide quoted services, satisfy our legal and tax obligations,
        and warranty obligations on completed work. You can request deletion of your
        information at any time by emailing the address below.
      </p>

      <h2>Your Choices</h2>
      <p>
        You may request a copy of the information we hold about you, ask us to
        correct inaccuracies, or ask us to delete your information. Florida residents
        and residents of states with applicable privacy laws may have additional
        rights — we honor those requests on the same terms.
      </p>

      <h2>Children&apos;s Privacy</h2>
      <p>
        This site is not directed to children under 13, and we do not knowingly
        collect information from children under 13.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        We may update this policy as our practices or applicable laws change.
        Material changes will be reflected by updating the effective date above.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy? Reach us at{" "}
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a> or {PHONE_NUMBER}.
      </p>

      <p>
        <Link href="/">Return to home</Link>
      </p>
    </article>
  );
}
