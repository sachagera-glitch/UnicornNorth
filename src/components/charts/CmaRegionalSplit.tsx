"use client";

import React, { useMemo } from "react";
import { useCurrency } from "../CurrencyContext";

import { type UnicornRow } from "@/types";

interface CmaRegionalSplitProps {
  data: UnicornRow[];
}

interface CmaAggregatedData {
  name: string;
  historical: number;
  modern: number;
  total: number;
  count: number;
}

export default function CmaRegionalSplit({ data }: CmaRegionalSplitProps) {
  const { formatValueShort } = useCurrency();

  // Aggregate data from the unicorns array
  const sortedData = useMemo(() => {
    const aggregated = data.reduce((acc: Record<string, CmaAggregatedData>, u) => {
      const cmaName = u.hqCma || "Unknown";
      const rawValuation = parseFloat(u.peakValuationCad2025 || "0");
      
      // If the valuation is extremely small (e.g. < 10000), it might be in Billions in the DB.
      // But based on ClientPage.tsx, it should be in absolute Dollars.
      // We'll treat it as Dollars to be safe with formatValueShort.
      const valuation = rawValuation;
      
      const decade = u.firstUnicornDecade || "";
      
      // Historical: 1990s, 2000s | Modern: 2010s, 2020s
      // We check for "19" or "200" to capture 1990s, 2000s.
      const isHistorical = decade.startsWith("19") || decade.startsWith("200");
      
      if (!acc[cmaName]) {
        acc[cmaName] = { name: cmaName, historical: 0, modern: 0, total: 0, count: 0 };
      }
      
      if (isHistorical) {
        acc[cmaName].historical += valuation;
      } else {
        acc[cmaName].modern += valuation;
      }
      
      acc[cmaName].total += valuation;
      acc[cmaName].count += 1;
      
      return acc;
    }, {});

    return Object.values(aggregated)
      .filter(item => item.name !== "Unknown")
      .sort((a, b) => b.total - a.total)
      .slice(0, 11);
  }, [data]);

  const maxTotal = useMemo(() => Math.max(...sortedData.map(d => d.total), 1), [sortedData]);

  return (
    <section className="section" style={{ paddingBottom: "4rem" }}>
      <div className="section-header">
        <h2>Tech Hub Value Split</h2>
        <div className="divider" />
        <p>
          Visualizing where Canada's tech wealth was created. This chart compares the total 
          peak value of the "Old Guard" (pre-2010) vs. the "New Guard" (2010+).
        </p>
      </div>

      <div className="card" style={{ padding: "2rem" }}>
        {/* Legend */}
        <div style={{ display: "flex", gap: "1.5rem", marginBottom: "2.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div style={{ width: 12, height: 12, background: "var(--navy)", borderRadius: 2 }} />
            <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-secondary)", fontFamily: "'Roboto Mono'" }}>Old Guard (Pre-2010)</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div style={{ width: 12, height: 12, background: "var(--gold)", borderRadius: 2 }} />
            <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-secondary)", fontFamily: "'Roboto Mono'" }}>New Guard (2010+)</div>
          </div>
        </div>

        {/* List */}
        <div style={{ display: "grid", gap: "0.75rem" }}>
          {sortedData.map((item, i) => {
            const histWidth = (item.historical / maxTotal) * 100;
            const modWidth = (item.modern / maxTotal) * 100;
            
            return (
              <div 
                key={item.name} 
                className="cma-item-grid"
                style={{ 
                  padding: "0.75rem 0",
                  borderBottom: i < sortedData.length - 1 ? "1px solid var(--border-light)" : "none"
                }}
              >
                {/* Rank */}
                <div 
                  className="cma-rank"
                  style={{ 
                    fontSize: "1.25rem", 
                    fontWeight: 700, 
                    color: i < 3 ? "var(--gold)" : "var(--slate-light)",
                    fontFamily: "'Playfair Display', serif",
                    opacity: 0.8
                  }}
                >
                  {i + 1}
                </div>

                {/* Name */}
                <div className="cma-name" style={{ fontSize: "1rem", fontWeight: 600, color: "var(--navy)" }}>
                  {item.name}
                </div>

                {/* Stacked Bar */}
                <div className="cma-bar" style={{ display: "flex", height: 20, gap: "4px" }}>
                  {item.historical > 0 && (
                    <div 
                      style={{ 
                        width: `${histWidth}%`, 
                        minWidth: histWidth > 0 ? "2px" : "0px",
                        background: "var(--navy)", 
                        borderRadius: "2px" 
                      }} 
                    />
                  )}
                  {item.modern > 0 && (
                    <div 
                      style={{ 
                        width: `${modWidth}%`, 
                        minWidth: modWidth > 0 ? "2px" : "0px",
                        background: "var(--gold)", 
                        borderRadius: "2px" 
                      }} 
                    />
                  )}
                </div>

                {/* Total Value */}
                <div 
                  className="cma-value"
                  style={{ 
                    fontSize: "0.9rem", 
                    fontWeight: 700, 
                    color: "var(--navy)",
                    textAlign: "right",
                    fontFamily: "'Roboto Mono'"
                  }}
                >
                  {formatValueShort(item.total)}
                </div>

                {/* Count */}
                <div 
                  className="cma-count"
                  style={{ 
                    fontSize: "0.85rem", 
                    color: "var(--text-secondary)", 
                    textAlign: "right",
                    fontFamily: "'Inter'"
                  }}
                >
                  {item.count} co.
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
