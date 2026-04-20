"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Aggregate market cap data by decade and sector (simplified from PRD)
const epochData = [
  { year: "1990", Telecom: 800, Ecommerce: 0, AI: 0, Software: 10, Other: 5 },
  { year: "1995", Telecom: 1200, Ecommerce: 0, AI: 0, Software: 20, Other: 10 },
  { year: "1998", Telecom: 1100, Ecommerce: 0, AI: 0, Software: 40, Other: 15 },
  { year: "2000", Telecom: 1400, Ecommerce: 5, AI: 0, Software: 50, Other: 63 },
  { year: "2002", Telecom: 300, Ecommerce: 5, AI: 0, Software: 30, Other: 10 },
  { year: "2005", Telecom: 200, Ecommerce: 8, AI: 0, Software: 45, Other: 14 },
  { year: "2008", Telecom: 120, Ecommerce: 12, AI: 0, Software: 55, Other: 13 },
  { year: "2010", Telecom: 80, Ecommerce: 20, AI: 0, Software: 60, Other: 12 },
  { year: "2013", Telecom: 50, Ecommerce: 80, AI: 5, Software: 76, Other: 15 },
  { year: "2015", Telecom: 40, Ecommerce: 150, AI: 10, Software: 90, Other: 20 },
  { year: "2017", Telecom: 30, Ecommerce: 280, AI: 20, Software: 95, Other: 30 },
  { year: "2019", Telecom: 25, Ecommerce: 350, AI: 40, Software: 100, Other: 45 },
  { year: "2020", Telecom: 20, Ecommerce: 420, AI: 55, Software: 110, Other: 50 },
  { year: "2021", Telecom: 18, Ecommerce: 380, AI: 80, Software: 120, Other: 60 },
  { year: "2023", Telecom: 15, Ecommerce: 300, AI: 120, Software: 130, Other: 70 },
  { year: "2025", Telecom: 12, Ecommerce: 280, AI: 180, Software: 140, Other: 80 },
  { year: "2026", Telecom: 10, Ecommerce: 260, AI: 220, Software: 145, Other: 85 },
];

const COLORS = {
  Telecom: "#00204E",
  Ecommerce: "#8B0000",
  AI: "#C9A84C",
  Software: "#3182CE",
  Other: "#A0AEC0",
};

export default function ValueEpochs() {
  return (
    <section id="epochs" className="section">
      <div className="section-header">
        <h2>The Value Epochs</h2>
        <div className="divider" />
        <p>
          Aggregate market capitalization by sector. From the Telecom peak of the
          1990s through the Shopify-led E-commerce wave to the AI expansion.
        </p>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={420}>
          <AreaChart
            data={epochData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              {Object.entries(COLORS).map(([key, color]) => (
                <linearGradient
                  key={key}
                  id={`grad-${key}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={color} stopOpacity={0.02} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border)"
              vertical={false}
            />
            <XAxis
              dataKey="year"
              tick={{
                fontFamily: "'Roboto Mono'",
                fontSize: 11,
                fill: "var(--slate-light)",
              }}
              axisLine={{ stroke: "var(--border)" }}
              tickLine={false}
            />
            <YAxis
              tick={{
                fontFamily: "'Roboto Mono'",
                fontSize: 11,
                fill: "var(--slate-light)",
              }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${v}B`}
            />
            <Tooltip
              contentStyle={{
                fontFamily: "'Roboto Mono'",
                fontSize: 12,
                background: "var(--paper)",
                border: "1px solid var(--border)",
                borderRadius: 2,
              }}
              formatter={(value: any) => [`$${value}B`]}
            />
            <Legend
              wrapperStyle={{
                fontFamily: "'Roboto Mono'",
                fontSize: 11,
                paddingTop: 16,
              }}
            />
            {Object.entries(COLORS).map(([key, color]) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stackId="1"
                stroke={color}
                fill={`url(#grad-${key})`}
                strokeWidth={1.5}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
