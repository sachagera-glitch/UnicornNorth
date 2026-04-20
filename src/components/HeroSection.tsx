"use client";

import { useCurrency } from "./CurrencyContext";

interface HeroSectionProps {
  totalUnicorns: number;
  aggregatePeak: number;
  hubCount: number;
}

export default function HeroSection({ totalUnicorns, aggregatePeak, hubCount }: HeroSectionProps) {
  const { formatValue, currency } = useCurrency();

  const stats = [
    { value: totalUnicorns.toString(), label: "Companies" },
    { value: formatValue(aggregatePeak).split(" ")[0], label: `Aggregate (${currency})` },
    { value: hubCount.toString(), label: "Cities" },
    { value: "36", label: "Years" },
  ];

  return (
    <section
      style={{
        background: "var(--cream-light)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="hero-container">
        {/* Headline */}
        <h1
          style={{
            fontSize: "clamp(2rem, 4vw, 3.25rem)",
            fontWeight: 800,
            color: "var(--navy)",
            marginBottom: "0.5rem",
            lineHeight: 1.05,
          }}
        >
          The Canadian Technology{" "}
          <span style={{ color: "var(--red)" }}>Ledger</span>
        </h1>

        <p
          style={{
            fontSize: "1.05rem",
            color: "var(--text-secondary)",
            maxWidth: 540,
            marginBottom: "1.75rem",
            lineHeight: 1.5,
          }}
        >
          Chronicling the structural evolution from the hardware anchors of the
          1990s to the AI and DeepTech leaders of 2026.
        </p>

        {/* Stats bar */}
        <div className="hero-stats-bar">
          {stats.map((s, i) => (
            <div key={i} className="hero-stat-item">
              <div className="data-value hero-stat-value">
                {s.value}
              </div>
              <div className="data-label hero-stat-label">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
