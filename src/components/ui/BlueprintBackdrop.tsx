/**
 * BlueprintBackdrop — restrained architectural linework for a technical
 * section background.
 *
 * No grid tiles — a real architect's sheet doesn't tile. Instead, a small
 * set of meaningful callouts (floor plan fragment, elevation profile,
 * dimension string, section marker) placed around the section edges.
 *
 * Pointer-events-none. Respects tone (light/dark) so it reads on either bg.
 */

type Props = {
  tone?: "light" | "dark";
  className?: string;
};

export default function BlueprintBackdrop({
  tone = "light",
  className = "",
}: Props) {
  const stroke = tone === "dark" ? "rgba(255,255,255,1)" : "rgba(15,15,16,1)";
  const labelFill = tone === "dark" ? "rgba(255,255,255,1)" : "rgba(15,15,16,1)";
  // Line opacity — varies by element for layered depth
  const lineWeak = tone === "dark" ? 0.09 : 0.07;
  const lineMid = tone === "dark" ? 0.16 : 0.11;
  const lineStrong = tone === "dark" ? 0.22 : 0.16;
  const labelOp = tone === "dark" ? 0.28 : 0.22;

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      {/* ─── Top-left: Floor plan fragment bleeding off edge ────── */}
      <svg
        className="absolute -top-16 -left-20 hidden md:block"
        width="340"
        height="260"
        viewBox="0 0 340 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer wall — double line with fill between */}
        <path
          d="M 40 40 L 300 40 L 300 220 L 40 220 Z"
          stroke={stroke}
          strokeOpacity={lineMid}
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M 50 50 L 290 50 L 290 210 L 50 210 Z"
          stroke={stroke}
          strokeOpacity={lineMid}
          strokeWidth="1"
          fill="none"
        />
        {/* Interior walls */}
        <line
          x1="170"
          y1="50"
          x2="170"
          y2="140"
          stroke={stroke}
          strokeOpacity={lineMid}
          strokeWidth="1"
        />
        <line
          x1="170"
          y1="140"
          x2="290"
          y2="140"
          stroke={stroke}
          strokeOpacity={lineMid}
          strokeWidth="1"
        />
        {/* Door swing arc */}
        <path
          d="M 170 90 A 28 28 0 0 1 198 118"
          stroke={stroke}
          strokeOpacity={lineWeak}
          strokeWidth="1"
          fill="none"
        />
        <line
          x1="170"
          y1="90"
          x2="198"
          y2="118"
          stroke={stroke}
          strokeOpacity={lineWeak}
          strokeWidth="1"
          strokeDasharray="2 3"
        />
        {/* Door opening gap */}
        <line
          x1="170"
          y1="90"
          x2="170"
          y2="118"
          stroke={tone === "dark" ? "rgba(15,15,16,0)" : "rgba(255,255,255,0)"}
          strokeWidth="3"
        />
        {/* Dimension string — top */}
        <g opacity={lineStrong}>
          <line x1="40" y1="20" x2="300" y2="20" stroke={stroke} strokeWidth="0.75" />
          <line x1="40" y1="14" x2="40" y2="26" stroke={stroke} strokeWidth="0.75" />
          <line x1="170" y1="14" x2="170" y2="26" stroke={stroke} strokeWidth="0.75" />
          <line x1="300" y1="14" x2="300" y2="26" stroke={stroke} strokeWidth="0.75" />
        </g>
        <text
          x="105"
          y="16"
          fontSize="9"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          fill={labelFill}
          fillOpacity={labelOp}
          style={{ letterSpacing: "0.02em" }}
        >
          12&apos;-6&quot;
        </text>
        <text
          x="225"
          y="16"
          fontSize="9"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          fill={labelFill}
          fillOpacity={labelOp}
          style={{ letterSpacing: "0.02em" }}
        >
          8&apos;-2&quot;
        </text>
      </svg>

      {/* ─── Top-right: Elevation profile with roof peak + windows ─ */}
      <svg
        className="absolute top-10 right-10 hidden lg:block"
        width="220"
        height="96"
        viewBox="0 0 220 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Ground line */}
        <line
          x1="0"
          y1="85"
          x2="220"
          y2="85"
          stroke={stroke}
          strokeOpacity={lineStrong}
          strokeWidth="1"
        />
        {/* House elevation silhouette */}
        <path
          d="M 30 85 L 30 44 L 110 10 L 190 44 L 190 85"
          stroke={stroke}
          strokeOpacity={lineStrong}
          strokeWidth="1"
          fill="none"
        />
        {/* Windows */}
        <rect
          x="52"
          y="52"
          width="20"
          height="22"
          stroke={stroke}
          strokeOpacity={lineMid}
          strokeWidth="1"
          fill="none"
        />
        <line x1="62" y1="52" x2="62" y2="74" stroke={stroke} strokeOpacity={lineMid} strokeWidth="1" />
        <rect
          x="148"
          y="52"
          width="20"
          height="22"
          stroke={stroke}
          strokeOpacity={lineMid}
          strokeWidth="1"
          fill="none"
        />
        <line x1="158" y1="52" x2="158" y2="74" stroke={stroke} strokeOpacity={lineMid} strokeWidth="1" />
        {/* Door */}
        <rect
          x="98"
          y="58"
          width="24"
          height="27"
          stroke={stroke}
          strokeOpacity={lineMid}
          strokeWidth="1"
          fill="none"
        />
        {/* Ridge callout */}
        <line x1="110" y1="10" x2="110" y2="-4" stroke={stroke} strokeOpacity={lineWeak} strokeWidth="0.75" />
        {/* Dimension line — overall width */}
        <g opacity={lineMid}>
          <line x1="30" y1="92" x2="190" y2="92" stroke={stroke} strokeWidth="0.75" />
          <path d="M 30 92 L 36 89 M 30 92 L 36 95" stroke={stroke} strokeWidth="0.75" fill="none" />
          <path d="M 190 92 L 184 89 M 190 92 L 184 95" stroke={stroke} strokeWidth="0.75" fill="none" />
        </g>
      </svg>

      {/* ─── Bottom-left: Section cut marker ────────────────────── */}
      <svg
        className="absolute bottom-12 left-10 hidden md:block"
        width="130"
        height="46"
        viewBox="0 0 130 46"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="24"
          cy="23"
          r="16"
          stroke={stroke}
          strokeOpacity={lineStrong}
          strokeWidth="1"
          fill="none"
        />
        <line
          x1="24"
          y1="0"
          x2="24"
          y2="46"
          stroke={stroke}
          strokeOpacity={lineStrong}
          strokeWidth="1"
        />
        <text
          x="24"
          y="27"
          textAnchor="middle"
          fontSize="12"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          fontWeight="700"
          fill={labelFill}
          fillOpacity={labelOp * 1.4}
        >
          A
        </text>
        {/* Leader line + callout */}
        <line x1="42" y1="23" x2="120" y2="23" stroke={stroke} strokeOpacity={lineMid} strokeWidth="0.75" />
        <text
          x="46"
          y="19"
          fontSize="8"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          fill={labelFill}
          fillOpacity={labelOp}
          style={{ letterSpacing: "0.12em", textTransform: "uppercase" }}
        >
          SECTION CUT
        </text>
      </svg>

      {/* ─── Bottom-right: Coordinate + dimension string ────────── */}
      <svg
        className="absolute bottom-10 right-10 hidden md:block"
        width="180"
        height="60"
        viewBox="0 0 180 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Horizontal dimension */}
        <g opacity={lineStrong}>
          <line x1="0" y1="30" x2="180" y2="30" stroke={stroke} strokeWidth="0.75" />
          <path d="M 0 30 L 6 27 M 0 30 L 6 33" stroke={stroke} strokeWidth="0.75" fill="none" />
          <path d="M 180 30 L 174 27 M 180 30 L 174 33" stroke={stroke} strokeWidth="0.75" fill="none" />
          <line x1="60" y1="24" x2="60" y2="36" stroke={stroke} strokeWidth="0.75" />
          <line x1="120" y1="24" x2="120" y2="36" stroke={stroke} strokeWidth="0.75" />
        </g>
        <text
          x="26"
          y="25"
          fontSize="9"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          fill={labelFill}
          fillOpacity={labelOp}
          style={{ letterSpacing: "0.02em" }}
        >
          4&apos;-0&quot;
        </text>
        <text
          x="84"
          y="25"
          fontSize="9"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          fill={labelFill}
          fillOpacity={labelOp}
          style={{ letterSpacing: "0.02em" }}
        >
          4&apos;-0&quot;
        </text>
        <text
          x="144"
          y="25"
          fontSize="9"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          fill={labelFill}
          fillOpacity={labelOp}
          style={{ letterSpacing: "0.02em" }}
        >
          4&apos;-0&quot;
        </text>
        {/* Grid reference tag */}
        <g transform="translate(0,50)">
          <circle
            cx="10"
            cy="5"
            r="8"
            stroke={stroke}
            strokeOpacity={lineMid}
            strokeWidth="0.75"
            fill="none"
          />
          <text
            x="10"
            y="8"
            textAnchor="middle"
            fontSize="8"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            fontWeight="700"
            fill={labelFill}
            fillOpacity={labelOp * 1.3}
          >
            1
          </text>
        </g>
      </svg>
    </div>
  );
}
