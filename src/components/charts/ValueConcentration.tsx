"use client";

import React, { useMemo } from "react";

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

interface ValueConcentrationProps {
  data: UnicornRow[];
}

export default function ValueConcentration({ data }: ValueConcentrationProps) {
  const stats = useMemo(() => {
    // Sort by valuation descending
    const sorted = [...data].sort((a, b) => {
      const av = parseFloat(a.peakValuationCad2025 || "0");
      const bv = parseFloat(b.peakValuationCad2025 || "0");
      return bv - av;
    });

    const totalVal = sorted.reduce((sum, u) => sum + parseFloat(u.peakValuationCad2025 || "0"), 0);
    
    const getValSum = (count: number) => 
      sorted.slice(0, count).reduce((sum, u) => sum + parseFloat(u.peakValuationCad2025 || "0"), 0);

    const top1Val = getValSum(1);
    const top3Val = getValSum(3);
    const top5Val = getValSum(5);
    const top10Val = getValSum(10);

    const getPerc = (val: number) => Math.round((val / totalVal) * 100);

    return {
      top1Perc: getPerc(top1Val),
      top3Perc: getPerc(top3Val),
      top5Perc: getPerc(top5Val),
      top10Perc: getPerc(top10Val),
      remainingPerc: 100 - getPerc(top10Val),
      totalCount: sorted.length,
      top1Name: sorted[0]?.companyName || "Top Company",
      top5Names: sorted.slice(0, 5).map(u => u.companyName).join(", "),
      remainingCount: sorted.length - 10
    };
  }, [data]);

  const rows = [
    { label: "Top 1", perc: stats.top1Perc, color: "var(--navy)" },
    { label: "Top 3", perc: stats.top3Perc, color: "var(--gold)" },
    { label: "Top 5", perc: stats.top5Perc, color: "var(--red)" },
    { label: "Top 10", perc: stats.top10Perc, color: "var(--slate)" },
    { label: `Remaining ${stats.remainingCount}`, perc: stats.remainingPerc, color: "var(--border)" },
  ];

  return (
    <section className="section" style={{ marginTop: "4rem", paddingBottom: "4rem" }}>
      <div className="section-header">
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.5rem" }}>The concentration problem</h2>
        <div className="divider" />
        <p>How much of Canada's unicorn value lives in the top few companies</p>
      </div>

      <div className="card" style={{ padding: "1.5rem" }}>
        <div style={{ display: "grid", gap: "1rem" }}>
          {rows.map((row, i) => (
            <div 
              key={i} 
              style={{ 
                display: "grid", 
                gridTemplateColumns: "clamp(60px, 15vw, 120px) 1fr 60px", 
                alignItems: "center", 
                gap: "1rem" 
              }}
            >
              <div style={{ 
                fontSize: "1rem", 
                fontWeight: 600, 
                color: "var(--text-secondary)",
                fontFamily: "'Inter'",
                textAlign: "right"
              }}>
                {row.label}
              </div>

              <div style={{ position: "relative", height: "12px", background: "rgba(0,0,0,0.03)", borderRadius: "6px", overflow: "hidden" }}>
                <div 
                  style={{ 
                    width: `${row.perc}%`, 
                    height: "100%", 
                    background: row.color,
                    borderRadius: "6px",
                    transition: "width 1s ease-out"
                  }} 
                />
              </div>

              <div style={{ 
                fontSize: "1.1rem", 
                fontWeight: 700, 
                color: "var(--navy)",
                fontFamily: "'Roboto Mono'",
                textAlign: "right"
              }}>
                {row.perc}%
              </div>
            </div>
          ))}
        </div>

        <div style={{ 
          marginTop: "2rem", 
          paddingTop: "1.5rem", 
          borderTop: "1px solid var(--border-light)",
          fontSize: "0.9rem",
          lineHeight: 1.5,
          color: "var(--text-secondary)",
          fontFamily: "'Inter'",
          maxWidth: "800px"
        }}>
          <strong>{stats.top1Name}</strong> alone = {stats.top1Perc}% of all-time peak. 
          The top 5 ({stats.top5Names}) = {stats.top5Perc}%. 
          The remaining {stats.remainingCount} companies share just {stats.remainingPerc}% of cumulative value.
        </div>
      </div>
    </section>
  );
}
