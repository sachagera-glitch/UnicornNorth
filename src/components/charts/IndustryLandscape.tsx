"use client";

import React, { useMemo } from "react";
import { useCurrency } from "../CurrencyContext";

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

interface IndustryLandscapeProps {
  data: UnicornRow[];
}

interface SectorData {
  label: string;
  value: number;
  companies: string[];
  color: string;
  gridArea?: string;
}

const SECTOR_MAPPING: Record<string, string> = {
  "Telecom": "Telecom",
  "Mobile": "Telecom",
  "E-commerce": "E-commerce / SaaS",
  "POS Software": "E-commerce / SaaS",
  "SaaS": "E-commerce / SaaS",
  "Software": "Software",
  "IT Consulting": "Software",
  "IT Services": "Software",
  "Edtech": "Software",
  "Cybersecurity": "Software",
  "Hardware": "Hardware",
  "Semiconductors": "Hardware",
  "Fintech": "Fintech",
  "Web3": "Web3",
  "AI": "AI",
  "AI Hardware": "AI",
  "Healthtech": "Health",
  "Biotech": "Health",
  "Digital Health": "Health",
  "Life Sciences": "Health",
  "Cleantech": "Clean",
  "Agtech": "Clean",
  "AgTech": "Clean",
  "Space Tech": "Other",
  "Satellite Tech": "Other",
  "Logistics": "Other",
};

export default function IndustryLandscape({ data }: IndustryLandscapeProps) {
  const { formatValueShort } = useCurrency();

  const sectors = useMemo(() => {
    const raw: Record<string, { value: number; companies: string[] }> = {};
    
    data.forEach(u => {
      const industry = u.industry || "Other";
      const sector = SECTOR_MAPPING[industry] || "Other";
      const valuation = parseFloat(u.peakValuationCad2025 || "0");
      
      if (!raw[sector]) {
        raw[sector] = { value: 0, companies: [] };
      }
      raw[sector].value += valuation;
      if (raw[sector].companies.length < 6) {
        // Clean up common suffix
        const name = u.companyName.split(" (")[0];
        raw[sector].companies.push(name);
      }
    });

    const colors: Record<string, string> = {
      "Telecom": "var(--navy)",
      "E-commerce / SaaS": "var(--gold)",
      "Software": "var(--red)",
      "Hardware": "var(--slate)",
      "Fintech": "var(--burgundy)",
      "AI": "var(--slate-light)",
      "Web3": "var(--navy-light, #1e3a8a)",
      "Health": "var(--red-dark, #7f1d1d)",
      "Clean": "var(--border)",
      "Other": "var(--slate)",
    };

    return Object.entries(raw)
      .map(([label, d]) => ({
        label,
        value: d.value,
        companies: d.companies,
        color: colors[label] || "#E5E7EB"
      }))
      .sort((a, b) => b.value - a.value);
  }, [data]);

  return (
    <section className="section">
      <div className="section-header">
        <h2>Industry Landscape</h2>
        <div className="divider" />
        <p>
          Proportional area = aggregate peak valuation. Telecom's outsized footprint is almost 
          entirely historical — one sector's past dwarfs every modern industry combined.
        </p>
      </div>

      <div className="card" style={{ padding: "1.5rem", background: "var(--paper-warm)" }}>
        {/* Treemap-like Layout using CSS Grid */}
        <div 
          className="grid-stack-mobile"
          style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(12, 1fr)",
            gridTemplateRows: "repeat(6, 80px)",
            gap: "8px",
            borderRadius: "8px",
            overflow: "hidden"
          }}
        >
          {/* Telecom (Massive) */}
          {sectors.find(s => s.label === "Telecom") && (
            <SectorTile 
              sector={sectors.find(s => s.label === "Telecom")!} 
              gridArea="1 / 1 / 7 / 7" 
              format={formatValueShort}
              showDetails
            />
          )}

          {/* E-commerce / SaaS */}
          {sectors.find(s => s.label === "E-commerce / SaaS") && (
            <SectorTile 
              sector={sectors.find(s => s.label === "E-commerce / SaaS")!} 
              gridArea="1 / 7 / 4 / 10" 
              format={formatValueShort}
            />
          )}

          {/* Software */}
          {sectors.find(s => s.label === "Software") && (
            <SectorTile 
              sector={sectors.find(s => s.label === "Software")!} 
              gridArea="1 / 10 / 4 / 13" 
              format={formatValueShort}
            />
          )}

          {/* Hardware */}
          {sectors.find(s => s.label === "Hardware") && (
            <SectorTile 
              sector={sectors.find(s => s.label === "Hardware")!} 
              gridArea="4 / 7 / 6 / 9" 
              format={formatValueShort}
            />
          )}

          {/* Fintech */}
          {sectors.find(s => s.label === "Fintech") && (
            <SectorTile 
              sector={sectors.find(s => s.label === "Fintech")!} 
              gridArea="4 / 9 / 6 / 11" 
              format={formatValueShort}
            />
          )}

          {/* AI */}
          {sectors.find(s => s.label === "AI") && (
            <SectorTile 
              sector={sectors.find(s => s.label === "AI")!} 
              gridArea="4 / 11 / 6 / 13" 
              format={formatValueShort}
            />
          )}

          {/* Smaller ones */}
          <div className="stack-mobile" style={{ gridArea: "6 / 7 / 7 / 13", display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {sectors.filter(s => ["Web3", "Health", "Clean", "Other"].includes(s.label)).map(s => (
               <div key={s.label} style={{ flex: 1, background: s.color, borderRadius: "6px", padding: "0.75rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--navy)" }}>{s.label}</div>
                  <div style={{ fontSize: "0.7rem", fontWeight: 600, color: "rgba(0,0,0,0.5)" }}>{formatValueShort(s.value)}</div>
               </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SectorTile({ sector, gridArea, format, showDetails }: { sector: SectorData, gridArea: string, format: (v: number) => string, showDetails?: boolean }) {
  const isDark = ["var(--navy)", "var(--burgundy)", "var(--red)", "var(--red-dark, #7f1d1d)", "var(--navy-light, #1e3a8a)", "var(--slate)"].includes(sector.color);
  const textColor = isDark ? "white" : "var(--navy)";
  const subColor = isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.4)";

  return (
    <div 
      style={{ 
        gridArea, 
        background: sector.color, 
        borderRadius: "8px", 
        padding: "1.25rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "transform 0.2s",
        cursor: "default"
      }}
    >
      <div>
        <div style={{ fontSize: "1.1rem", fontWeight: 700, color: textColor, marginBottom: "2px" }}>{sector.label}</div>
        <div style={{ fontSize: "0.85rem", fontWeight: 600, color: subColor }}>{format(sector.value)}</div>
      </div>
      
      {showDetails && (
        <div style={{ fontSize: "0.75rem", color: textColor, opacity: 0.8, fontWeight: 500, lineHeight: 1.4 }}>
          — {sector.companies.join(", ")}
        </div>
      )}
    </div>
  );
}
