"use client";

import { useCurrency } from "./CurrencyContext";

const CMA_DATA = [
  { cma: "Ottawa-Gatineau", peak: 1500600000000, lens: "The Historical Titan", desc: "Generated nearly 70% of all-time value." },
  { cma: "Toronto", peak: 270100000000, lens: "Modern Growth Engine", desc: "Dominates 2020s volume." },
  { cma: "Kitchener-C-W", peak: 156900000000, lens: "Durable Platform Hub", desc: "Built around lasting anchors." },
  { cma: "Montréal", peak: 105600000000, lens: "High-Value Scale", desc: "Fewer companies, but large average scale." },
  { cma: "Vancouver", peak: 104100000000, lens: "Diverse Deep-Tech", desc: "Strongest AgTech/CleanTech mix." },
  { cma: "St. John's", peak: 4100000000, lens: "Fintech Outpost", desc: "Home to Verafin." },
  { cma: "Calgary", peak: 2800000000, lens: "Energy-Tech Hub", desc: "Scaling Benevity and Neo Financial." },
  { cma: "Québec City", peak: 2400000000, lens: "AI & Auto Hub", desc: "Led by Coveo and LeddarTech." },
  { cma: "Edmonton", peak: 2000000000, lens: "New Node Hub", desc: "Crossed with Jobber." },
  { cma: "Hamilton", peak: 1100000000, lens: "Edtech Expansion", desc: "HQ for Prodigy Education." },
  { cma: "Winnipeg", peak: 1000000000, lens: "Prairie AgTech", desc: "Home to Farmers Edge." },
];

export default function CmaAggregates() {
  const { formatValue } = useCurrency();

  return (
    <section className="section">
      <div className="section-header">
        <h2>Regional Prominence</h2>
        <div className="divider" />
        <p>Aggregate lifetime peak valuation by CMA, adjusted to 2025 constant CAD.</p>
      </div>

      <div style={{ display: "grid", gap: "0.75rem" }}>
        {CMA_DATA.map((c, i) => (
          <div key={i} className="card" style={{
            display: "grid", gridTemplateColumns: "1fr 1fr 2fr", gap: "1.5rem", alignItems: "center",
            padding: "1.25rem 1.75rem",
          }}>
            <div>
              <div className="data-label" style={{ marginBottom: 2, fontSize: "0.6rem" }}>CMA</div>
              <div style={{ fontWeight: 700, fontSize: "1rem", color: "var(--navy)" }}>{c.cma}</div>
            </div>
            <div>
              <div className="data-label" style={{ marginBottom: 2, fontSize: "0.6rem" }}>Aggregate Peak</div>
              <div className="data-value" style={{ fontSize: "1rem" }}>{formatValue(c.peak)}</div>
            </div>
            <div>
              <div style={{ fontWeight: 600, color: "var(--red)", fontSize: "0.8rem", marginBottom: 1 }}>
                {c.lens}
              </div>
              <div style={{ color: "var(--text-secondary)", fontSize: "0.8rem" }}>{c.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
