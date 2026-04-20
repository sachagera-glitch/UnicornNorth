"use client";

import { useState, useMemo } from "react";

interface UnicornRow {
  id: number;
  companyName: string;
  hqCma: string | null;
  industry: string | null;
  firstUnicornDecade: string | null;
  peakValuationCad2025: string | null;
  companyStatus: string | null;
  isRevenueMultiplier: boolean;
}

interface UnicornIntensityProps {
  unicorns: UnicornRow[];
}

// Fixed population data (Millions) for intensity calculation
const CMA_POPULATIONS: Record<string, Record<string, number>> = {
  "Ottawa-Gatineau": { "1990s": 0.80, "2000s": 1.00, "2010s": 1.20, "2020s": 1.488, "All time": 1.488 },
  "Toronto": { "1990s": 3.80, "2000s": 4.80, "2010s": 5.50, "2020s": 6.202, "All time": 6.202 },
  "Vancouver": { "1990s": 1.60, "2000s": 2.00, "2010s": 2.30, "2020s": 2.643, "All time": 2.643 },
  "Kitchener-C-W": { "1990s": 0.35, "2000s": 0.42, "2010s": 0.48, "2020s": 0.576, "All time": 0.576 },
  "Montréal": { "1990s": 3.20, "2000s": 3.50, "2010s": 3.90, "2020s": 4.292, "All time": 4.292 },
  "Calgary": { "1990s": 0.70, "2000s": 1.00, "2010s": 1.20, "2020s": 1.482, "All time": 1.482 },
  "Québec City": { "1990s": 0.60, "2000s": 0.70, "2010s": 0.80, "2020s": 0.839, "All time": 0.839 },
  "St. John's": { "1990s": 0.17, "2000s": 0.18, "2010s": 0.20, "2020s": 0.213, "All time": 0.213 },
  "Edmonton": { "1990s": 0.80, "2000s": 1.00, "2010s": 1.20, "2020s": 1.418, "All time": 1.418 },
  "Hamilton": { "1990s": 0.60, "2000s": 0.70, "2010s": 0.75, "2020s": 0.785, "All time": 0.785 },
  "Winnipeg": { "1990s": 0.65, "2000s": 0.70, "2010s": 0.78, "2020s": 0.835, "All time": 0.835 },
};

const CMA_COLORS: Record<string, string> = {
  "Ottawa-Gatineau": "var(--navy)",
  "Kitchener-C-W": "var(--gold)",
  "Vancouver": "var(--red)",
  "Toronto": "var(--slate)",
  "St. John's": "var(--burgundy)",
  "Montréal": "var(--slate-light)",
  "Québec City": "var(--red-dark)",
  "Calgary": "var(--border)",
  "Hamilton": "var(--navy-light, #1e3a8a)",
  "Winnipeg": "var(--slate)",
  "Edmonton": "var(--slate-light)",
};

export default function UnicornIntensity({ unicorns }: UnicornIntensityProps) {
  const [activeDecade, setActiveDecade] = useState("All time");

  const decades = ["1990s", "2000s", "2010s", "2020s", "All time"];

  const displayData = useMemo(() => {
    // 1. Group unicorns by CMA for the active decade
    const counts: Record<string, number> = {};
    
    unicorns.forEach(u => {
      const cma = u.hqCma;
      if (!cma) return;
      
      // If "All time", include all. Otherwise, only if decade matches.
      const decadeMatches = activeDecade === "All time" || u.firstUnicornDecade === activeDecade;
      
      if (decadeMatches) {
        counts[cma] = (counts[cma] || 0) + 1;
      }
    });

    // 2. Calculate rates based on counts and fixed population
    return Object.entries(counts)
      .map(([cma, count]) => {
        const pop = CMA_POPULATIONS[cma]?.[activeDecade] || CMA_POPULATIONS[cma]?.["All time"] || 1.0;
        return {
          cma,
          count,
          rate: count / pop
        };
      })
      .filter(d => d.count > 0)
      .sort((a, b) => b.rate - a.rate);
  }, [unicorns, activeDecade]);

  const maxRate = Math.max(...displayData.map(d => d.rate), 1);

  return (
    <section id="intensity" className="section">
      <div className="section-header">
        <h2>Unicorn Intensity Ranking</h2>
        <div className="divider" />
        <p>Unicorns per 1 million residents. Tabulated directly from the {unicorns.length}-company dataset.</p>
      </div>

      <div className="card" style={{ padding: "2rem" }}>
        {/* Decade selection */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem", flexWrap: "wrap" }}>
          {decades.map((d) => (
            <button
              key={d}
              onClick={() => setActiveDecade(d)}
              style={{
                padding: "0.5rem 1.25rem",
                borderRadius: "2rem",
                border: "1px solid var(--border)",
                background: activeDecade === d ? "var(--navy)" : "white",
                color: activeDecade === d ? "white" : "var(--navy)",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.85rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              {d}
            </button>
          ))}
        </div>

        {/* Ranking List */}
        <div style={{ display: "grid", gap: "1rem" }}>
          {displayData.length > 0 ? (
            displayData.map((item, i) => (
              <div key={item.cma} style={{ display: "grid", gridTemplateColumns: "30px 180px 1fr 60px", alignItems: "center", gap: "1rem" }}>
                <div style={{ 
                  fontSize: "1.1rem", 
                  fontWeight: 700, 
                  color: i < 3 ? "var(--gold)" : "var(--slate-light)",
                  fontFamily: "'Playfair Display', serif"
                }}>
                  {i + 1}
                </div>
                <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--navy)" }}>
                  {item.cma}
                </div>
                <div style={{ position: "relative", height: "2.5rem", background: "var(--cream-light)", borderRadius: "4px" }}>
                  <div 
                    style={{ 
                      position: "absolute",
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: `${(item.rate / maxRate) * 100}%`,
                      background: CMA_COLORS[item.cma] || "var(--slate)",
                      opacity: 0.8,
                      borderRadius: "4px",
                      transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                    }}
                  />
                  <div 
                    style={{ 
                      position: "absolute",
                      left: `${Math.max((item.rate / maxRate) * 100, 2)}%`,
                      top: 0,
                      bottom: 0,
                      display: "flex",
                      alignItems: "center",
                      paddingLeft: (item.rate / maxRate) < 0.2 ? "0.75rem" : "1rem",
                      color: (item.rate / maxRate) < 0.2 ? "var(--navy)" : "white",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      fontFamily: "'Roboto Mono', monospace",
                      whiteSpace: "nowrap",
                      pointerEvents: "none",
                      transition: "all 0.4s ease-out"
                    }}
                  >
                    {item.rate.toFixed(1)} per M
                  </div>
                </div>
                <div style={{ fontSize: "0.85rem", color: "var(--slate-light)", textAlign: "right" }}>
                  {item.count} co.
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: "center", padding: "3rem", color: "var(--slate-light)", fontFamily: "'Roboto Mono'" }}>
              No companies reached unicorn status in this decade.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
