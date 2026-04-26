import {
  BUSINESS_NAME,
  BUSINESS_SHORT_DESCRIPTION,
  SITE_URL,
  PHONE_NUMBER,
  EMAIL,
  AUTHOR,
  ANNUAL_PROJECTS,
  YEARS_IN_BUSINESS,
  SERVICE_AREA_CITIES,
  SERVICE_AREA_SUMMARY,
  SERVICES,
  PILLARS,
} from "@/../site.config";

// Serves /llms.txt as text/plain. App Router will NOT serve a bare
// file named llms.txt from /app — it needs to be a route handler.
// See references/05-llms-txt.md.

export const dynamic = "force-static";

const SITE_ORIGIN = SITE_URL.replace(/\/$/, "");

const ABOUT_PARAGRAPH =
  `${BUSINESS_NAME} serves ${SERVICE_AREA_SUMMARY}. ` +
  (ANNUAL_PROJECTS > 0 ? `${ANNUAL_PROJECTS}+ projects per year. ` : "") +
  (YEARS_IN_BUSINESS > 0 ? `${YEARS_IN_BUSINESS}+ years in business. ` : "") +
  `Led by ${AUTHOR.name}, ${AUTHOR.jobTitle}.`;

function buildPillarsBlock(): string {
  return PILLARS.map(
    (p) => `- [${p.name}](${SITE_ORIGIN}/services/${p.slug}) — ${p.tagline}`
  ).join("\n");
}

function buildServicesBlock(): string {
  const lines: string[] = [];
  for (const [vertical, services] of Object.entries(SERVICES)) {
    for (const [slug, svc] of Object.entries(services)) {
      lines.push(
        `- [${svc.name}](${SITE_ORIGIN}/${vertical}/${slug}) — ${svc.tagline}`
      );
    }
  }
  return lines.join("\n");
}

function buildLicensesBlock(): string {
  if (!AUTHOR.licenses?.length) return "- (no licenses on file)";
  return AUTHOR.licenses
    .map((l) => {
      const link = l.verificationUrl ? ` — verify: ${l.verificationUrl}` : "";
      return `- ${l.name} — ${l.number} (${l.body})${link}`;
    })
    .join("\n");
}

function buildLlmsTxt(): string {
  const citiesBlock = SERVICE_AREA_CITIES.length
    ? SERVICE_AREA_CITIES.join(", ")
    : SERVICE_AREA_SUMMARY;

  return `# ${BUSINESS_NAME}

> ${BUSINESS_SHORT_DESCRIPTION}

## About

${ABOUT_PARAGRAPH}

## Service Pillars

${buildPillarsBlock()}

## Services

${buildServicesBlock()}

## Service Area

${SERVICE_AREA_SUMMARY} — serving ${citiesBlock}.

## Licensing & Credentials

${buildLicensesBlock()}

## Editorial & Authorship

All content is reviewed for technical accuracy by ${AUTHOR.name}, ${AUTHOR.jobTitle}.

Editorial policy: ${SITE_ORIGIN}/editorial-policy

## Contact

- Phone: ${PHONE_NUMBER}
- Email: ${EMAIL}
- Service area: ${SERVICE_AREA_SUMMARY}

## Key Pages

- [Home](${SITE_ORIGIN}/)
- [About](${SITE_ORIGIN}/about)
- [Author: ${AUTHOR.name}](${SITE_ORIGIN}/team/${AUTHOR.slug})
- [Services](${SITE_ORIGIN}/services)
- [Service Areas](${SITE_ORIGIN}/service-areas)
- [Blog](${SITE_ORIGIN}/blog)
- [Contact](${SITE_ORIGIN}/contact)
- [Editorial Policy](${SITE_ORIGIN}/editorial-policy)
`;
}

export function GET() {
  return new Response(buildLlmsTxt(), {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
