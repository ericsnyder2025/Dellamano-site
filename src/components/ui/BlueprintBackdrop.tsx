/**
 * BlueprintBackdrop — decorative SVG layer for a technical/schematic feel.
 *
 * Drop inside a relative-positioned section — it fills the container,
 * renders a blueprint grid + hairline dimension marks, and stays
 * pointer-events-none so it never interferes with clicks.
 *
 * Props:
 *   - tone: "light" (for white/gray backgrounds) or "dark" (for dark bg)
 *   - intensity: overall opacity multiplier (default 1)
 *   - corners: whether to render the corner crosshair + dimension tick marks
 */

type Props = {
  tone?: "light" | "dark";
  intensity?: number;
  corners?: boolean;
  className?: string;
};

export default function BlueprintBackdrop({
  tone = "light",
  intensity = 1,
  corners = true,
  className = "",
}: Props) {
  const stroke = tone === "dark" ? "rgba(255,255,255,1)" : "rgba(15,15,16,1)";
  const gridOpacity = (tone === "dark" ? 0.07 : 0.05) * intensity;
  const accentOpacity = (tone === "dark" ? 0.16 : 0.12) * intensity;

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Tiled grid */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="bp-grid-minor" width="24" height="24" patternUnits="userSpaceOnUse">
            <path
              d="M 24 0 L 0 0 0 24"
              fill="none"
              stroke={stroke}
              strokeOpacity={gridOpacity}
              strokeWidth="1"
            />
          </pattern>
          <pattern id="bp-grid-major" width="120" height="120" patternUnits="userSpaceOnUse">
            <rect width="120" height="120" fill="url(#bp-grid-minor)" />
            <path
              d="M 120 0 L 0 0 0 120"
              fill="none"
              stroke={stroke}
              strokeOpacity={gridOpacity * 2.2}
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bp-grid-major)" />
      </svg>

      {/* Corner dimension ticks + crosshair marks */}
      {corners && (
        <>
          {/* Top-left crosshair */}
          <svg
            className="absolute top-6 left-6"
            width="44"
            height="44"
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="22"
              cy="22"
              r="1.5"
              fill={stroke}
              fillOpacity={accentOpacity * 1.5}
            />
            <line
              x1="0"
              y1="22"
              x2="44"
              y2="22"
              stroke={stroke}
              strokeOpacity={accentOpacity}
              strokeWidth="1"
            />
            <line
              x1="22"
              y1="0"
              x2="22"
              y2="44"
              stroke={stroke}
              strokeOpacity={accentOpacity}
              strokeWidth="1"
            />
          </svg>

          {/* Top-right dimension ladder */}
          <svg
            className="absolute top-8 right-8"
            width="80"
            height="16"
            viewBox="0 0 80 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="0"
              y1="8"
              x2="80"
              y2="8"
              stroke={stroke}
              strokeOpacity={accentOpacity}
              strokeWidth="1"
            />
            {[0, 20, 40, 60, 80].map((x) => (
              <line
                key={x}
                x1={x}
                y1="4"
                x2={x}
                y2="12"
                stroke={stroke}
                strokeOpacity={accentOpacity}
                strokeWidth="1"
              />
            ))}
          </svg>

          {/* Bottom-left section marker */}
          <svg
            className="absolute bottom-8 left-8"
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="24"
              cy="24"
              r="14"
              stroke={stroke}
              strokeOpacity={accentOpacity}
              strokeWidth="1"
              fill="none"
            />
            <line
              x1="24"
              y1="0"
              x2="24"
              y2="48"
              stroke={stroke}
              strokeOpacity={accentOpacity}
              strokeWidth="1"
            />
            <text
              x="24"
              y="28"
              textAnchor="middle"
              fontSize="10"
              fontFamily="monospace"
              fill={stroke}
              fillOpacity={accentOpacity * 3}
              style={{ letterSpacing: "0.05em" }}
            >
              A
            </text>
          </svg>

          {/* Bottom-right dimension arrow */}
          <svg
            className="absolute bottom-10 right-8"
            width="90"
            height="12"
            viewBox="0 0 90 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 2 6 L 88 6"
              stroke={stroke}
              strokeOpacity={accentOpacity}
              strokeWidth="1"
            />
            <path
              d="M 2 6 L 8 2 M 2 6 L 8 10"
              stroke={stroke}
              strokeOpacity={accentOpacity}
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M 88 6 L 82 2 M 88 6 L 82 10"
              stroke={stroke}
              strokeOpacity={accentOpacity}
              strokeWidth="1"
              fill="none"
            />
          </svg>
        </>
      )}
    </div>
  );
}
