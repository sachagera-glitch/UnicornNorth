"use client";

import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from "recharts";

const cuspData = [
  { name: "Solink", cma: "Ottawa-Gatineau", val: 700, growth: 85, sector: "Deep-Tech" },
  { name: "Solace", cma: "Ottawa-Gatineau", val: 600, growth: 70, sector: "Deep-Tech" },
  { name: "Turbopuffer", cma: "Ottawa-Gatineau", val: 800, growth: 95, sector: "Deep-Tech" },
  { name: "Mindbridge.ai", cma: "Ottawa-Gatineau", val: 550, growth: 60, sector: "Deep-Tech" },
  { name: "Subterra", cma: "Toronto", val: 650, growth: 75, sector: "CleanTech" },
  { name: "Salt XC", cma: "Toronto", val: 500, growth: 65, sector: "MarTech" },
  { name: "Vena Solutions", cma: "Toronto", val: 900, growth: 50, sector: "SaaS" },
  { name: "Ecopia AI", cma: "Toronto", val: 600, growth: 80, sector: "AI" },
  { name: "Klue", cma: "Vancouver", val: 750, growth: 85, sector: "SaaS" },
  { name: "Bench", cma: "Vancouver", val: 600, growth: 55, sector: "Fintech" },
  { name: "AlayaCare", cma: "Montréal", val: 800, growth: 70, sector: "HealthTech" },
  { name: "Jobber", cma: "Edmonton", val: 950, growth: 90, sector: "SaaS" },
  { name: "Vendasta", cma: "Saskatoon", val: 700, growth: 65, sector: "SaaS" },
  { name: "Vidyard", cma: "Kitchener-C-W", val: 600, growth: 60, sector: "MarTech" },
];

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
            <XAxis type="number" dataKey="val" name="Valuation" unit="M"
              tick={{ fontFamily: "'Roboto Mono'", fontSize: 11, fill: "var(--slate-light)" }}
              axisLine={{ stroke: "var(--border)" }} tickLine={false}
              label={{ value: "Est. Valuation ($M CAD)", position: "insideBottom", offset: -5,
                style: { fontFamily: "'Roboto Mono'", fontSize: 10, fill: "var(--slate-light)" } }}
            />
            <YAxis type="number" dataKey="growth" name="Growth" unit="%"
              tick={{ fontFamily: "'Roboto Mono'", fontSize: 11, fill: "var(--slate-light)" }}
              axisLine={false} tickLine={false}
              label={{ value: "Growth Score", angle: -90, position: "insideLeft",
                style: { fontFamily: "'Roboto Mono'", fontSize: 10, fill: "var(--slate-light)" } }}
            />
            <ZAxis type="number" dataKey="val" range={[60, 400]} />
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const d = payload[0].payload;
                return (
                  <div style={{ background: "var(--paper)", border: "1px solid var(--border)",
                    borderRadius: 2, padding: "0.5rem 0.75rem", fontFamily: "'Roboto Mono'", fontSize: 11 }}>
                    <div style={{ fontWeight: 700, color: "var(--navy)" }}>{d.name}</div>
                    <div style={{ color: "var(--slate)" }}>{d.cma} · {d.sector}</div>
                    <div style={{ color: "var(--burgundy)" }}>~${d.val}M CAD</div>
                  </div>
                );
              }}
            />
            <Scatter data={cuspData} fill="var(--navy)" fillOpacity={0.6}
              stroke="var(--navy)" strokeWidth={1} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
