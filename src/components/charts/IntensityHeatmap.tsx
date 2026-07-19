"use client";

import { useState } from "react";

interface CmaPosition {
  name: string;
  x: number;
  y: number;
  rate: number;
  count: number;
}

const CMA_POSITIONS: CmaPosition[] = [
  { name: "Toronto", x: 625, y: 655, rate: 1.29, count: 35 },
  { name: "Montréal", x: 710, y: 615, rate: 1.08, count: 11 },
  { name: "Vancouver", x: 135, y: 585, rate: 2.25, count: 21 },
  { name: "Ottawa-Gatineau", x: 678, y: 622, rate: 5.94, count: 25 },
  { name: "Waterloo-Kitchener-C", x: 605, y: 665, rate: 6.82, count: 6 },
  { name: "St. John's", x: 945, y: 535, rate: 4.88, count: 1 },
  { name: "Calgary", x: 255, y: 565, rate: 2.02, count: 3 },
  { name: "Québec City", x: 735, y: 595, rate: 1.42, count: 2 },
  { name: "Halifax", x: 865, y: 655, rate: 1.88, count: 1 },
  { name: "Edmonton", x: 265, y: 515, rate: 1.12, count: 1 },
  { name: "Moncton", x: 835, y: 625, rate: 3.44, count: 1 },
];

function getGlowColor(rate: number): string {
  if (rate >= 5) return "rgba(139, 0, 0, 0.9)";
  if (rate >= 3) return "rgba(139, 0, 0, 0.6)";
  if (rate >= 1) return "rgba(0, 32, 78, 0.6)";
  return "rgba(160, 174, 192, 0.3)";
}

function getGlowSize(rate: number): number {
  if (rate >= 5) return 28 * 10; // Scaling for 1000px viewBox
  if (rate >= 3) return 22 * 10;
  if (rate >= 1) return 16 * 10;
  return 10 * 10;
}

export default function IntensityHeatmap() {
  const [hoveredCma, setHoveredCma] = useState<string | null>(null);

  return (
    <section className="section">
      <div className="section-header">
        <h2>The Intensity Heatmap</h2>
        <div className="divider" />
        <p>
          Tech hubs glow based on unicorns per 1 million residents (2020s decade). Smaller
          hubs like Kitchener and Moncton burn hotter than major metros.
        </p>
      </div>

      <div className="chart-container" style={{ padding: "1rem" }}>
        <svg
          viewBox="0 0 1000 800"
          className="w-full h-auto"
          style={{
            background: "var(--white)",
            borderRadius: "4px",
            aspectRatio: "1000 / 800",
          }}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Detailed Canada Silhouette */}
          <g fill="var(--paper-warm, #F2ECE0)" stroke="var(--border)" strokeWidth="0.5">
            {/* Mainland Canada + Major Islands (stylized high-fidelity) */}
            <path d="M120,580 L140,570 L160,575 L180,560 L200,565 L220,550 L240,555 L260,540 L280,545 L300,530 L320,535 L340,520 L360,525 L380,510 L400,515 L420,500 L440,505 L460,490 L480,495 L500,480 L520,485 L540,470 L560,475 L580,460 L600,465 L620,450 L640,455 L660,440 L680,445 L700,430 L720,435 L740,420 L760,425 L780,410 L800,415 L820,400 L840,405 L860,390 L880,395 L900,380 L920,385 L940,370 L960,375 L960,450 L940,460 L920,470 L900,485 L880,500 L860,515 L840,535 L820,555 L800,575 L780,595 L760,615 L740,635 L720,655 L700,675 L680,695 L660,715 L640,735 L620,745 L600,750 L580,755 L560,760 L540,760 L520,755 L500,750 L480,740 L460,730 L440,720 L420,710 L400,700 L380,690 L360,680 L340,670 L320,660 L300,650 L280,640 L260,630 L240,620 L220,610 L200,600 L180,595 L160,590 L140,585 Z" />
            {/* Newfoundland */}
            <path d="M880,500 L910,480 L940,490 L960,520 L950,550 L920,560 L890,540 Z" />
            {/* Vancouver Island */}
            <path d="M100,590 L120,580 L130,600 L110,610 Z" />
            {/* Nova Scotia */}
            <path d="M850,640 L880,630 L900,650 L890,670 L860,660 Z" />
          </g>

          {/* Glows for Intensity */}
          {CMA_POSITIONS.map((cma) => {
            const size = getGlowSize(cma.rate);
            const isHovered = hoveredCma === cma.name;
            return (
              <g
                key={cma.name}
                onMouseEnter={() => setHoveredCma(cma.name)}
                onMouseLeave={() => setHoveredCma(null)}
                style={{ cursor: "pointer" }}
              >
                {/* Outer glow */}
                <circle
                  cx={cma.x}
                  cy={cma.y}
                  r={size / 25} // Normalized for 1000px
                  fill={getGlowColor(cma.rate)}
                  opacity={isHovered ? 0.4 : 0.15}
                  style={{ transition: "opacity 0.3s, r 0.3s" }}
                />
                {/* Inner dot */}
                <circle
                  cx={cma.x}
                  cy={cma.y}
                  r={isHovered ? 25 : 18} // Normalized for 1000px
                  fill={cma.rate > 0 ? getGlowColor(cma.rate) : "var(--slate-light)"}
                  stroke="var(--paper, #FAF9F6)"
                  strokeWidth="4"
                  style={{ transition: "r 0.2s" }}
                />
                {/* Label */}
                {(isHovered || cma.rate >= 2) && (
                  <text
                    x={cma.x}
                    y={cma.y - 30}
                    textAnchor="middle"
                    style={{
                      fontFamily: "'Roboto Mono'",
                      fontSize: isHovered ? 30 : 25,
                      fill: "var(--navy)",
                      fontWeight: isHovered ? 700 : 500,
                      transition: "font-size 0.2s",
                    }}
                  >
                    {cma.name}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Tooltip overlay */}
        {hoveredCma && (
          <div
            style={{
              position: "absolute",
              bottom: 16,
              left: 16,
              background: "var(--white)",
              border: "1px solid var(--border)",
              borderRadius: 2,
              padding: "0.75rem 1rem",
              fontFamily: "'Roboto Mono'",
              fontSize: "0.75rem",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              zIndex: 10,
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 4, color: "var(--navy)" }}>
              {hoveredCma}
            </div>
            <div style={{ color: "var(--text-secondary)" }}>
              {CMA_POSITIONS.find((c) => c.name === hoveredCma)?.rate.toFixed(2)} unicorns / 1M residents
            </div>
            <div style={{ color: "var(--text-secondary)" }}>
              {CMA_POSITIONS.find((c) => c.name === hoveredCma)?.count} total companies
            </div>
          </div>
        )}

        {/* Legend */}
        <div
          style={{
            position: "absolute",
            bottom: 16,
            right: 16,
            display: "flex",
            gap: "1rem",
            fontFamily: "'Roboto Mono'",
            fontSize: "0.6rem",
            color: "var(--slate-light)",
          }}
        >
          <span>
            <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "rgba(139,0,0,0.9)", marginRight: 4, verticalAlign: "middle" }} />
            ≥5.0
          </span>
          <span>
            <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "rgba(139,0,0,0.6)", marginRight: 4, verticalAlign: "middle" }} />
            3.0–4.9
          </span>
          <span>
            <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "rgba(0,32,78,0.6)", marginRight: 4, verticalAlign: "middle" }} />
            1.0–2.9
          </span>
        </div>
      </div>
    </section>
  );
}
