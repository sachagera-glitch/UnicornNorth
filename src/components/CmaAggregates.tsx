import { useCurrency } from "./CurrencyContext";

import { type UnicornRow, type CmaMetadataRow } from "@/types";

interface Props {
  unicorns: UnicornRow[];
  cmaMetadata: CmaMetadataRow[];
}

export default function CmaAggregates({ unicorns, cmaMetadata }: Props) {
  const { formatValue } = useCurrency();

  // Calculate aggregate peak for each CMA from unicorns dataset
  const cmaPeaks = unicorns.reduce((acc, u) => {
    if (u.hqCma) {
      const val = parseFloat(u.peakValuationCad2025 || "0") * 1_000_000_000;
      acc[u.hqCma] = (acc[u.hqCma] || 0) + val;
    }
    return acc;
  }, {} as Record<string, number>);

  // Merge peaks with editorial metadata
  const data = cmaMetadata.map(m => ({
    ...m,
    peak: cmaPeaks[m.cma] || 0
  })).sort((a, b) => b.peak - a.peak);

  return (
    <section className="section">
      <div className="section-header">
        <h2>Tech Hub Prominence</h2>
        <div className="divider" />
        <p>Aggregate lifetime peak valuation of unicorns founded or HQ'd within the city, adjusted to 2025 constant CAD.</p>
      </div>

      <div style={{ display: "grid", gap: "0.75rem" }}>
        {data.map((c, i) => (
          <div key={i} className="card stack-mobile" style={{
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
            gap: "1.5rem", 
            alignItems: "center",
            padding: "1.25rem 1.75rem",
          }}>
            <div>
              <div className="data-label" style={{ marginBottom: 2, fontSize: "0.6rem" }}>CITY</div>
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
              <div style={{ color: "var(--text-secondary)", fontSize: "0.8rem" }}>{c.description}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
