import {
  BUSINESS_NAME,
  BUSINESS_SHORT_DESCRIPTION,
  SITE_URL,
  PHONE_NUMBER,
  EMAIL,
  AUTHOR,
  ANNUAL_PROJECTS,
  SERVICE_AREA_CITIES,
  SERVICE_AREA_SUMMARY,
} from "@/../site.config";

// Serves /llms.txt as text/plain. App Router will NOT serve a bare
// file named llms.txt from /app — it needs to be a route handler.
// See references/05-llms-txt.md.

export const dynamic = "force-static";

// TODO: Fill in services, licenses, and the About paragraph below with
// real values for your business. This handler is a starting point — the
// identity-level fields (name, phone, email, etc.) pull automatically
// from site.config.ts so they stay in sync.
const SERVICES: Array<{ name: string; slug: string; description: string }> = [
  // { name: "Service One", slug: "service-one", description: "One-line description." },
];

const LICENSES: Array<{ name: string; number: string; body: string }> = [
  // { name: "Certified General Contractor", number: "CGC1525289", body: "FL DBPR" },
];

const ABOUT_PARAGRAPH =
  `${BUSINESS_NAME} serves ${SERVICE_AREA_SUMMARY}. ` +
  (ANNUAL_PROJECTS > 0 ? `${ANNUAL_PROJECTS}+ projects completed per year. ` : "") +
  `Led by ${AUTHOR.name}, ${AUTHOR.jobTitle}.`;

function buildLlmsTxt(): string {
  const servicesBlock = SERVICES.length
    ? SERVICES.map(
        (s) => `- [${s.name}](${SITE_URL}${s.slug}) — ${s.description}`
      ).join("\n")
    : "- (fill in services in src/app/llms.txt/route.ts)";

  const licensesBlock = LICENSES.length
    ? LICENSES.map((l) => `- ${l.name} — ${l.number} (${l.body})`).join("\n")
    : "- (fill in licenses in src/app/llms.txt/route.ts)";

  const citiesBlock = SERVICE_AREA_CITIES.length
    ? SERVICE_AREA_CITIES.join(", ")
    : SERVICE_AREA_SUMMARY;

  return `# ${BUSINESS_NAME}

> ${BUSINESS_SHORT_DESCRIPTION}

## About

${ABOUT_PARAGRAPH}

## Services

${servicesBlock}

## Service Area

${SERVICE_AREA_SUMMARY} — serving ${citiesBlock}.

## Licensing & Credentials

${licensesBlock}

## Editorial & Authorship

All content is reviewed for technical accuracy by ${AUTHOR.name}, ${AUTHOR.jobTitle}.

Editorial policy: ${SITE_URL}editorial-policy

## Contact

- Phone: ${PHONE_NUMBER}
- Email: ${EMAIL}
- Service area: ${SERVICE_AREA_SUMMARY}

## Key Pages

- [Home](${SITE_URL})
- [About](${SITE_URL}about)
- [Author: ${AUTHOR.name}](${SITE_URL}team/${AUTHOR.slug})
- [Blog](${SITE_URL}blog)
- [Service Areas](${SITE_URL}service-areas)
- [Contact](${SITE_URL}contact)
- [Editorial Policy](${SITE_URL}editorial-policy)
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
