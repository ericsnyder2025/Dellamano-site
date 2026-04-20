import { BUSINESS_NAME, BUSINESS_TAGLINE } from "@/../site.config";

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: { textSize: "text-xl", tagSize: "text-[8px]", iconScale: 0.8 },
  md: { textSize: "text-3xl", tagSize: "text-[9px]", iconScale: 1 },
  lg: { textSize: "text-5xl", tagSize: "text-xs", iconScale: 1.3 },
};

/**
 * Generic wordmark logo with an optional SVG icon above.
 * Replace the <svg> path with your brand mark, or wire an <Image src={LOGO_PATH}>.
 *
 * The current path is a simple roof-peak shape (Haven's mark). For a new site,
 * export your SVG mark with fill="currentColor" so it inherits the brand color.
 */
export default function Logo({ className = "", showTagline = false, size = "md" }: LogoProps) {
  const s = sizes[size];
  const displayName = BUSINESS_NAME.toUpperCase().split(" ")[0];  // First word, uppercased

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <svg
        viewBox="0 0 120 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: 90 * s.iconScale, height: 30 * s.iconScale }}
        className="mb-1"
        aria-hidden="true"
      >
        {/* TODO: Replace this path with your brand mark SVG */}
        <path
          d="M60 2 L115 36 L108 36 L60 8 L12 36 L5 36 Z"
          fill="currentColor"
          className="text-brand-primary"
        />
      </svg>

      <span
        className={`font-heading font-bold tracking-[0.15em] text-brand-primary leading-none ${s.textSize}`}
      >
        {displayName}
      </span>

      {showTagline && BUSINESS_TAGLINE && (
        <span
          className={`text-brand-primary-400 tracking-[0.2em] uppercase italic mt-1.5 ${s.tagSize}`}
        >
          {BUSINESS_TAGLINE}
        </span>
      )}
    </div>
  );
}
