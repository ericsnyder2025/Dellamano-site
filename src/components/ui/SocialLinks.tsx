import { SOCIAL_LINKS, BUSINESS_NAME } from "@/../site.config";

type Platform = "facebook" | "instagram" | "youtube" | "pinterest" | "tiktok" | "linkedin";

const PLATFORMS: { key: Platform; label: string; path: string }[] = [
  {
    key: "facebook",
    label: "Facebook",
    path: "M13.5 9H15V6h-1.5C11.57 6 10 7.57 10 9.5V11H8v3h2v7h3v-7h2.25L16 11h-3V9.75c0-.41.34-.75.75-.75Z",
  },
  {
    key: "instagram",
    label: "Instagram",
    path: "M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2Zm0 1.8c-3.15 0-3.5.01-4.74.07-.94.04-1.45.2-1.79.33-.45.17-.77.38-1.1.71-.34.34-.54.66-.71 1.1-.13.34-.29.85-.33 1.79-.06 1.24-.07 1.59-.07 4.74s.01 3.5.07 4.74c.04.94.2 1.45.33 1.79.17.45.38.77.71 1.1.34.34.66.54 1.1.71.34.13.85.29 1.79.33 1.24.06 1.59.07 4.74.07s3.5-.01 4.74-.07c.94-.04 1.45-.2 1.79-.33.45-.17.77-.38 1.1-.71.34-.34.54-.66.71-1.1.13-.34.29-.85.33-1.79.06-1.24.07-1.59.07-4.74s-.01-3.5-.07-4.74c-.04-.94-.2-1.45-.33-1.79a2.97 2.97 0 0 0-.71-1.1 2.97 2.97 0 0 0-1.1-.71c-.34-.13-.85-.29-1.79-.33C15.5 4 15.15 4 12 4Zm0 3.07a4.93 4.93 0 1 1 0 9.86 4.93 4.93 0 0 1 0-9.86Zm0 1.8a3.13 3.13 0 1 0 0 6.26 3.13 3.13 0 0 0 0-6.26Zm5.13-1.9a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3Z",
  },
  {
    key: "youtube",
    label: "YouTube",
    path: "M21.6 7.2c-.2-.9-.9-1.6-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4c-.9.2-1.6.9-1.8 1.8C2 8.8 2 12 2 12s0 3.2.4 4.8c.2.9.9 1.6 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8ZM10 15V9l5.2 3L10 15Z",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    path: "M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14ZM8.34 18.34V9.67H5.67v8.67h2.67Zm-1.34-9.89a1.55 1.55 0 1 0 0-3.1 1.55 1.55 0 0 0 0 3.1Zm11.34 9.89V13.6c0-2.49-1.33-3.65-3.1-3.65-1.43 0-2.07.79-2.43 1.34v-1.15H10.34v8.2h2.47v-4.58c0-.33.02-.66.12-.89.27-.66.87-1.34 1.89-1.34 1.33 0 1.87 1.01 1.87 2.5v4.31h2.47Z",
  },
  {
    key: "pinterest",
    label: "Pinterest",
    path: "M12 2a10 10 0 0 0-3.64 19.31c-.09-.81-.17-2.05.04-2.94.18-.8 1.18-5.09 1.18-5.09s-.3-.6-.3-1.49c0-1.4.81-2.44 1.82-2.44.86 0 1.27.64 1.27 1.42 0 .86-.55 2.15-.84 3.35-.24 1 .5 1.81 1.48 1.81 1.78 0 3.14-1.87 3.14-4.57 0-2.39-1.72-4.06-4.17-4.06-2.84 0-4.5 2.13-4.5 4.33 0 .86.33 1.78.74 2.28.08.1.09.18.07.28-.08.31-.25 1-.28 1.14-.04.18-.15.23-.34.14-1.25-.58-2.03-2.4-2.03-3.87 0-3.15 2.29-6.04 6.6-6.04 3.46 0 6.16 2.47 6.16 5.77 0 3.44-2.17 6.22-5.19 6.22-1.01 0-1.97-.53-2.29-1.15l-.62 2.37c-.23.87-.83 1.96-1.24 2.63A10 10 0 1 0 12 2Z",
  },
  {
    key: "tiktok",
    label: "TikTok",
    path: "M19.5 8.4c-1.7 0-3.3-.6-4.5-1.7v7.5a5.8 5.8 0 1 1-5.8-5.8c.3 0 .6 0 .9.1v3c-.3-.1-.6-.1-.9-.1a2.9 2.9 0 1 0 2.9 2.9V3h2.9c0 .3 0 .5.1.8a4.5 4.5 0 0 0 4.4 3.7v2.9Z",
  },
];

interface Props {
  className?: string;
  size?: number;
  variant?: "dark" | "light";
}

const VARIANTS = {
  dark: {
    active:
      "bg-white/5 border-white/15 text-brand-primary hover:bg-brand-primary/20 hover:border-brand-primary hover:text-brand-primary-400",
    disabled: "bg-white/5 border-white/10 text-brand-primary/40 cursor-not-allowed",
  },
  light: {
    active:
      "bg-white border-gray-200 text-brand-primary hover:border-brand-primary hover:bg-gray-50 hover:text-brand-primary-700",
    disabled: "bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed",
  },
} as const;

/**
 * Social profile icon grid. Platforms with empty/null URLs render as disabled
 * placeholders so the grid is in place now and lights up when you add URLs.
 * Renders as a 3-column grid across all breakpoints with generously-sized
 * tap targets.
 */
export default function SocialLinks({
  className = "",
  size = 28,
  variant = "dark",
}: Props) {
  const styles = VARIANTS[variant];

  return (
    <ul
      className={`grid grid-cols-3 gap-3 w-full justify-items-center ${className}`}
    >
      {PLATFORMS.map(({ key, label, path }) => {
        const href = (SOCIAL_LINKS as Record<string, string>)[key];
        const isValidUrl = href && href.startsWith("http");
        const commonClass =
          "flex items-center justify-center w-16 h-16 sm:w-[4.25rem] sm:h-[4.25rem] rounded-2xl border transition-colors";
        const iconSvg = (
          <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d={path} />
          </svg>
        );

        if (isValidUrl) {
          return (
            <li key={key}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${BUSINESS_NAME} on ${label}`}
                className={`${commonClass} ${styles.active}`}
              >
                {iconSvg}
              </a>
            </li>
          );
        }

        return (
          <li key={key}>
            <span
              role="link"
              aria-disabled="true"
              aria-label={`${label} (coming soon)`}
              title={`${label} — coming soon`}
              className={`${commonClass} ${styles.disabled}`}
            >
              {iconSvg}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
