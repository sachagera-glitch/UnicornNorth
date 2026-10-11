"use client";

import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from "recharts";

export interface CuspCompany {
  name: string;
  cma: string;
  val: number;
  growth: number;
  sector: string;
  valuationBasis?: string;
  growthScoreBasis?: string;
  entryStatus?: string;
  primarySource?: string;
}

const cuspData: CuspCompany[] = [
  { name: "Solink", cma: "Ottawa-Gatineau", val: 700, growth: 85, sector: "Deep-Tech" },
  { name: "Solace", cma: "Ottawa-Gatineau", val: 600, growth: 70, sector: "Deep-Tech" },
  { name: "Mindbridge.ai", cma: "Ottawa-Gatineau", val: 550, growth: 60, sector: "Deep-Tech" },
  { name: "Dominion Dynamics", cma: "Ottawa-Gatineau", val: 550, growth: 90, sector: "Defence Technology" },
  { name: "Field Effect Software", cma: "Ottawa-Gatineau", val: 500, growth: 100, sector: "Cybersecurity" },
  { name: "Subterra", cma: "Toronto", val: 650, growth: 75, sector: "CleanTech" },
  { name: "Salt XC", cma: "Toronto", val: 500, growth: 65, sector: "MarTech" },
  { name: "Ecopia AI", cma: "Toronto", val: 600, growth: 80, sector: "AI" },
  {
    name: "Float Financial",
    cma: "Toronto",
    val: 550,
    growth: 42.4,
    sector: "Fintech (business banking / spend management)",
    valuationBasis: "Reported C$550M post-money, C$85M all-equity Series C (fully closed 23 Jul 2026). Equity value; ~C$100M warehouse lines excluded.",
    growthScoreBasis: "Valuation CAGR Series B → C (Helcim precedent). Revenue-based alternative: >120% over ~18 months => 69% annualized.",
    entryStatus: "ADD — active Radar entry",
    primarySource: "https://betakit.com/float-announces-85-million-series-c-round-to-support-ai-push/",
  },
  { name: "Klue", cma: "Vancouver", val: 750, growth: 85, sector: "SaaS" },
  { name: "Bench", cma: "Vancouver", val: 600, growth: 55, sector: "Fintech" },
  { name: "AlayaCare", cma: "Montréal", val: 800, growth: 70, sector: "HealthTech" },
  { name: "Vendasta", cma: "Saskatoon", val: 700, growth: 65, sector: "SaaS" },
  { name: "Vidyard", cma: "Waterloo-Kitchener-C", val: 600, growth: 60, sector: "MarTech" },
  {
    name: "Miovision",
    cma: "Waterloo-Kitchener-C",
    val: 1055,
    growth: 59.7,
    sector: "Intelligent transportation / smart mobility",
    valuationBasis: "Round-implied: ~US$125M primary + C$36M tranche + 20% dilution. 2023 C$296M round was a mix of primary, secondary and acquisition financing (GTT, US$107M). Low/high at 25%/15%: C$844M / C$1,407M.",
    growthScoreBasis: "Revenue CAGR 2021–2024 (stale; includes acquisitions). No valuation CAGR available — 2020 and 2023 post-money undisclosed.",
    entryStatus: "HOLD — value exceeds band at base. Publish on Radar only if verification lands below C$1,000M; otherwise use Leadership Board",
    primarySource: "https://betakit.com/miovision-acquires-global-traffic-technologies-raises-260-million-from-telus-maverix-edc/",
  },
  { name: "Propel Holdings", cma: "Toronto", val: 855, growth: 80, sector: "Fintech" },
  { name: "Certn", cma: "Victoria", val: 600, growth: 75, sector: "Trust & ID" },
  { name: "Kardium", cma: "Vancouver", val: 600, growth: 70, sector: "Medtech" },
  { name: "Cyclic Materials", cma: "Toronto", val: 700, growth: 85, sector: "Cleantech" },
  { name: "Eavor Technologies", cma: "Calgary", val: 650, growth: 90, sector: "Energy-Tech" },
  { name: "GHGSat", cma: "Montréal", val: 600, growth: 65, sector: "Spacetech" },
  { name: "Blackline Safety", cma: "Calgary", val: 510, growth: 60, sector: "IoT/Safety" },
  { name: "Helcim Inc.", cma: "Calgary", val: 250, growth: 61, sector: "FinTech — SMB Payments" },
  { name: "Colab Software", cma: "St. John's", val: 700, growth: 80, sector: "Engineering Software" },
  { name: "Spellbook", cma: "St. John's", val: 490, growth: 85, sector: "Legal AI" },
];

const watchlistDossiers: CuspCompany[] = cuspData.filter(
  (c) => Boolean(c.valuationBasis || c.entryStatus)
);

export default function SuccessorRadar() {
  return (
    <section id="radar" className="section">
      <div className="section-header">
        <h2>The Successor Radar</h2>
        <div className="divider" />
        <p>Companies on the cusp ($500M–$1B CAD) plotted by estimated valuation vs. growth trajectory. Bubble size = valuation.</p>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={420}>
          <ScatterChart margin={{ top: 20, right: 40, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis
              type="number"
              dataKey="val"
              name="Valuation"
              unit="M"
              tick={{ fontFamily: "'Roboto Mono'", fontSize: 11, fill: "var(--slate-light)" }}
              axisLine={{ stroke: "var(--border)" }}
              tickLine={false}
              label={{
                value: "Est. Valuation ($M CAD)",
                position: "insideBottom",
                offset: -5,
                style: { fontFamily: "'Roboto Mono'", fontSize: 10, fill: "var(--slate-light)" },
              }}
            />
            <YAxis
              type="number"
              dataKey="growth"
              name="Growth"
              unit="%"
              tick={{ fontFamily: "'Roboto Mono'", fontSize: 11, fill: "var(--slate-light)" }}
              axisLine={false}
              tickLine={false}
              label={{
                value: "Growth Score",
                angle: -90,
                position: "insideLeft",
                style: { fontFamily: "'Roboto Mono'", fontSize: 10, fill: "var(--slate-light)" },
              }}
            />
            <ZAxis type="number" dataKey="val" range={[60, 420]} />
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const d = payload[0].payload as CuspCompany;
                return (
                  <div
                    style={{
                      background: "var(--paper)",
                      border: "1px solid var(--border)",
                      borderRadius: 4,
                      padding: "0.6rem 0.85rem",
                      fontFamily: "'Roboto Mono'",
                      fontSize: 11,
                      maxWidth: 340,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    }}
                  >
                    <div style={{ fontWeight: 700, color: "var(--navy)", fontSize: "0.85rem" }}>{d.name}</div>
                    <div style={{ color: "var(--slate)", margin: "0.15rem 0" }}>{d.cma} · {d.sector}</div>
                    <div style={{ color: "var(--burgundy)", fontWeight: 600 }}>
                      ~${d.val.toLocaleString()}M CAD · {d.growth}% Growth
                    </div>
                    {d.valuationBasis && (
                      <div style={{ marginTop: "0.4rem", paddingTop: "0.4rem", borderTop: "1px dashed var(--border)", fontSize: "0.68rem", color: "var(--charcoal)", lineHeight: 1.35 }}>
                        <span style={{ fontWeight: 600, color: "var(--navy)" }}>Basis: </span>
                        {d.valuationBasis}
                      </div>
                    )}
                    {d.entryStatus && (
                      <div style={{ marginTop: "0.3rem" }}>
                        <span
                          style={{
                            display: "inline-block",
                            padding: "0.1rem 0.4rem",
                            borderRadius: 3,
                            fontSize: "0.65rem",
                            fontWeight: 600,
                            background: d.entryStatus.startsWith("ADD") ? "rgba(16, 185, 129, 0.15)" : "rgba(245, 158, 11, 0.15)",
                            color: d.entryStatus.startsWith("ADD") ? "#065f46" : "#92400e",
                          }}
                        >
                          {d.entryStatus}
                        </span>
                      </div>
                    )}
                  </div>
                );
              }}
            />
            <Scatter
              data={cuspData}
              fill="var(--navy)"
              fillOpacity={0.65}
              stroke="var(--navy)"
              strokeWidth={1}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Radar Candidate Watchlist & Research Dossier Table */}
      {watchlistDossiers.length > 0 && (
        <div style={{ marginTop: "2.5rem" }}>
          <div style={{ marginBottom: "1rem" }}>
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "var(--navy)",
                margin: 0,
              }}
            >
              Radar Watchlist & Research Dossier
            </h3>
            <p style={{ margin: "0.25rem 0 0", fontSize: "0.8rem", color: "var(--slate)" }}>
              Vetted pipeline candidates with detailed valuation methodology, growth scores, and verification status.
            </p>
          </div>

          <div
            style={{
              overflowX: "auto",
              border: "1px solid var(--border)",
              borderRadius: 4,
              background: "var(--white)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
            }}
          >
            <table className="data-table" style={{ margin: 0, minWidth: 960 }}>
              <thead>
                <tr>
                  <th>Company Name</th>
                  <th>HQ CMA</th>
                  <th>Sector Focus</th>
                  <th style={{ textAlign: "right" }}>Est. Valuation ($M CAD)</th>
                  <th style={{ textAlign: "right" }}>Growth Score (%)</th>
                  <th>Valuation Basis</th>
                  <th>Growth Score Basis</th>
                  <th>Entry Status</th>
                  <th>Primary Source</th>
                </tr>
              </thead>
              <tbody>
                {watchlistDossiers.map((c, i) => (
                  <tr key={i} className="hover-row">
                    <td className="company-name" style={{ fontWeight: 700, whiteSpace: "nowrap" }}>
                      {c.name}
                    </td>
                    <td style={{ whiteSpace: "nowrap", color: "var(--navy)" }}>{c.cma}</td>
                    <td style={{ color: "var(--slate)", fontSize: "0.8rem", maxWidth: 200 }}>
                      {c.sector}
                    </td>
                    <td
                      style={{
                        fontFamily: "'Roboto Mono'",
                        textAlign: "right",
                        fontWeight: 600,
                        color: "var(--burgundy)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      ${c.val.toLocaleString()}
                    </td>
                    <td
                      style={{
                        fontFamily: "'Roboto Mono'",
                        textAlign: "right",
                        fontWeight: 600,
                        color: "var(--navy)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {c.growth}%
                    </td>
                    <td style={{ fontSize: "0.75rem", color: "var(--charcoal)", maxWidth: 280, lineHeight: 1.4 }}>
                      {c.valuationBasis}
                    </td>
                    <td style={{ fontSize: "0.75rem", color: "var(--slate)", maxWidth: 240, lineHeight: 1.4 }}>
                      {c.growthScoreBasis}
                    </td>
                    <td style={{ whiteSpace: "nowrap" }}>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "0.2rem 0.5rem",
                          borderRadius: 3,
                          fontFamily: "'Roboto Mono'",
                          fontSize: "0.65rem",
                          fontWeight: 600,
                          background: c.entryStatus?.startsWith("ADD")
                            ? "rgba(16, 185, 129, 0.12)"
                            : "rgba(245, 158, 11, 0.12)",
                          color: c.entryStatus?.startsWith("ADD") ? "#065f46" : "#92400e",
                          border: c.entryStatus?.startsWith("ADD")
                            ? "1px solid rgba(16, 185, 129, 0.3)"
                            : "1px solid rgba(245, 158, 11, 0.3)",
                        }}
                      >
                        {c.entryStatus}
                      </span>
                    </td>
                    <td style={{ whiteSpace: "nowrap" }}>
                      {c.primarySource ? (
                        <a
                          href={c.primarySource}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: "var(--red)",
                            fontFamily: "'Roboto Mono'",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            textDecoration: "none",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.25rem",
                          }}
                        >
                          Source ↗
                        </a>
                      ) : (
                        "—"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}
