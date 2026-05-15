"use client";

import React, { useMemo } from "react";
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
import { type UnicornRow } from "@/types";

interface ValueEpochsProps {
  unicorns: UnicornRow[];
}

const SECTOR_MAPPING: Record<string, string> = {
  "Telecom": "Telecom",
  "Mobile": "Telecom",
  "Telecom/IP": "Telecom",
  "Satellite Tech": "Telecom",
  "Tech Services": "Telecom",
  "E-commerce": "Ecommerce",
  "POS Software": "Ecommerce",
  "SaaS": "Ecommerce",
  "Travel Tech": "Ecommerce",
  "Supply Chain": "Ecommerce",
  "Legal Tech": "Ecommerce",
  "Legal Tech SaaS": "Ecommerce",
  "Vertical SaaS": "Ecommerce",
  "Finance SaaS": "Ecommerce",
  "D2C Furniture": "Ecommerce",
  "Home Services": "Ecommerce",
  "Martech": "Ecommerce",
  "Ancillary Rev": "Ecommerce",
  "Adtech": "Ecommerce",
  "Software": "Software",
  "IT Consulting": "Software",
  "IT Services": "Software",
  "Edtech": "Software",
  "Edtech/LMS": "Software",
  "Cybersecurity": "Cybersecurity",
  "Identity/Risk": "Cybersecurity",
  "BI Software": "Software",
  "IT Software": "Software",
  "Audit/Tax": "Software",
  "Identity": "Software",
  "Compliance": "Software",
  "EHSQ": "Software",
  "DDI SaaS": "Software",
  "Mobility": "Software",
  "HR Tech": "Software",
  "Enterprise SW": "Software",
  "Hardware": "Hardware",
  "Semiconductors": "Hardware",
  "Broadcast": "Hardware",
  "Auto Tech": "Hardware",
  "Telematics": "Hardware",
  "Space Tech": "Hardware",
  "Quantum": "Quantum",
  "AI": "AI",
  "AI Hardware": "AI",
  "Industrial AI": "AI",
  "AI/Search": "AI",
  "Web3": "Web3",
  "Social/Web3": "Web3",
  "Fintech": "Fintech",
  "Challenger Bank": "Fintech",
  "Cleantech": "Clean",
  "Agtech": "Clean",
  "AgTech": "Clean",
};

const COLORS = {
  Telecom: "#00204E",
  Ecommerce: "#C9A84C",
  Software: "#C41E3A",
  Hardware: "#4A5568",
  Cybersecurity: "#0A1628",
  AI: "#94A3B8",
  Web3: "#1A3A5C",
  Fintech: "#8B1A1A",
  Quantum: "#6B46C1",
  Other: "#DDD6CA",
};

const YEARS = [
  1990, 1995, 1998, 2000, 2002, 2005, 2008, 2010, 2013, 2015, 2017, 2019, 2020, 2021, 2023, 2025, 2026
];

export default function ValueEpochs({ unicorns }: ValueEpochsProps) {
  const epochData = useMemo(() => {
    return YEARS.map(year => {
      const dataPoint: any = { year: year.toString() };
      
      // Initialize buckets
      Object.keys(COLORS).forEach(key => dataPoint[key] = 0);

      unicorns.forEach(u => {
        const sector = SECTOR_MAPPING[u.industry || ""] || "Other";
        const peakVal = parseFloat(u.peakValuationCad2025 || "0");
        const founded = u.foundedYear || 1990;
        
        let currentContrib = 0;

        if (sector === "Telecom") {
          // Legacy Telecom Bubble Logic
          if (year <= 2000) {
            // Ramp up to peak in 2000
            const ramp = Math.max(0, (year - founded) / (2000 - founded + 1));
            currentContrib = peakVal * Math.min(1, ramp);
          } else {
            // Exponential decay after 2000
            const yearsSincePeak = year - 2000;
            const decay = Math.pow(0.5, yearsSincePeak / 2); // Half every 2 years
            currentContrib = peakVal * decay;
          }
        } else {
          // Modern Sector Logic
          // Ramp up from founded to peak (assuming peak is near now/2025)
          const peakYear = 2025;
          if (year < founded) {
            currentContrib = 0;
          } else if (year <= peakYear) {
            const ramp = (year - founded) / (peakYear - founded + 1);
            currentContrib = peakVal * ramp;
          } else {
            // Stable after peak
            currentContrib = peakVal;
          }
        }

        dataPoint[sector] += currentContrib;
      });

      // Round for cleaner chart
      Object.keys(COLORS).forEach(key => {
        dataPoint[key] = Math.round(dataPoint[key]);
      });

      return dataPoint;
    });
  }, [unicorns]);

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
