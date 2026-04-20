"use client";

import { useCurrency } from "./CurrencyContext";

interface LifetimeSummaryProps {
  totalUnicorns: number;
  aggregatePeak: number;
  dominantHub: string;
  dominantHubCount: number;
  highestPerCapita: string;
  highestPerCapitaRate: string;
  historicalPowerhouse: string;
  historicalPowerhouseCount: number;
  highestIndividualPeak: number;
  highestIndividualName: string;
}

export default function LifetimeSummary(props: LifetimeSummaryProps) {
  const { formatValue } = useCurrency();

  const metrics = [
    { label: "Total Unicorns (Lifetime)", value: `${props.totalUnicorns} Companies` },
    {
      label: "Aggregate Peak Value*",
      value: formatValue(props.aggregatePeak),
    },
    { label: "Dominant Hub", value: <div>{props.dominantHub}<br/><span style={{ fontSize: "0.7rem", color: "var(--slate-light)" }}>({props.dominantHubCount} Unicorn Companies)</span></div> },
    { label: "Highest Per-Capita", value: <div>{props.highestPerCapita}<br/><span style={{ fontSize: "0.7rem", color: "var(--slate-light)" }}>({props.highestPerCapitaRate} Unicorns produced per 1M People)</span></div> },
    { label: "Historical Powerhouse", value: <div>{props.historicalPowerhouse}<br/><span style={{ fontSize: "0.7rem", color: "var(--slate-light)" }}>({props.historicalPowerhouseCount} Unicorn Companies)</span></div> },
    { label: "Highest Individual Peak*", value: <div>{props.highestIndividualName}<br/><span style={{ fontSize: "0.7rem", color: "var(--slate-light)" }}>({formatValue(props.highestIndividualPeak)})</span></div> },
  ];

  return (
    <section className="section">
      <div className="section-header">
        <h2>Lifetime Summary</h2>
        <div className="divider" />
        <p>All-time ecosystem metrics, 1990–2026.</p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "1rem",
        }}
      >
        {metrics.map((m, i) => (
          <div key={i} className="metric-card">
            <div className="data-label" style={{ marginBottom: "0.5rem" }}>
              {m.label}
            </div>
            <div className="data-value" style={{ fontSize: "1.15rem" }}>
              {m.value}
            </div>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: "1.5rem",
        fontSize: "0.65rem",
        fontFamily: "'Roboto Mono'",
        color: "var(--text-secondary)",
        opacity: 0.8,
        letterSpacing: "0.02em",
        textAlign: "left"
      }}>
        * Inflation adjusted to 2025 CAD based on peak market cap.
      </div>
    </section>
  );
}
