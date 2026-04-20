"use client";

import { useCurrency } from "./CurrencyContext";

export default function HeroSection() {
  const { formatValue, currency } = useCurrency();

  const stats = [
    { value: "101", label: "Companies" },
    { value: formatValue(2_150_700_000_000).split(" ")[0], label: `Aggregate (${currency})` },
    { value: "11", label: "CMAs" },
    { value: "36", label: "Years" },
  ];

  return (
    <section
      style={{
        background: "var(--cream-light)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "2.5rem 2rem 2rem",
        }}
      >
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
        <div
          style={{
            display: "flex",
            gap: "2.5rem",
            flexWrap: "wrap",
          }}
        >
          {stats.map((s, i) => (
            <div key={i}>
              <div
                className="data-value"
                style={{ fontSize: "1.5rem", lineHeight: 1.2 }}
              >
                {s.value}
              </div>
              <div className="data-label" style={{ fontSize: "0.65rem" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
