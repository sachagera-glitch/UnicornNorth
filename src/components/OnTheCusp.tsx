"use client";

import { type CuspRow } from "@/types";

const CUSP_LENSES: Record<string, { title: string; lens: string }> = {
  "Ottawa-Gatineau": { title: "Ottawa-Gatineau", lens: "Deep-Tech Reload" },
  "Toronto": { title: "Toronto", lens: "Horizontal Power" },
  "Vancouver": { title: "Vancouver", lens: "Vertical Disruptors" },
  "Montréal": { title: "Montréal", lens: "Care Scale" },
  "Edmonton": { title: "Edmonton", lens: "New Node Hub" },
  "Saskatoon": { title: "Saskatoon", lens: "Prairie SaaS" },
  "Waterloo-Kitchener-C": { title: "Waterloo-Kitchener-C", lens: "Engagement Tech" },
  "Calgary": { title: "Calgary", lens: "Energy-Tech" },
  "Victoria": { title: "Victoria", lens: "Island SaaS" },
  "St. John's": { title: "St. John's", lens: "Fintech Outpost" },
};

export default function OnTheCusp({ data }: { data: CuspRow[] }) {
  const grouped = data.reduce((acc, c) => {
    const cma = c.hqCma || "Other";
    if (!acc[cma]) acc[cma] = [];
    acc[cma].push(c);
    return acc;
  }, {} as Record<string, CuspRow[]>);

  return (
    <section className="section">
      <div className="section-header">
        <h2>Poised for Tomorrow</h2>
        <div className="divider" />
        <p>Companies on the cusp ($500M–$1B CAD). The predictive radar for future Narwhals.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
        {Object.entries(grouped).map(([cma, companies]) => {
          const info = CUSP_LENSES[cma] || { title: cma, lens: "" };
          return (
            <div key={cma} className="card">
              <div style={{ fontFamily: "'Roboto Mono'", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--red)", marginBottom: 4 }}>
                {info.lens}
              </div>
              <div style={{ fontWeight: 700, fontSize: "1rem", color: "var(--navy)", marginBottom: "0.75rem" }}>
                {info.title}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {companies.map((c, i) => (
                  <span key={i} style={{
                    fontFamily: "'Roboto Mono'", fontSize: "0.65rem", fontWeight: 500,
                    padding: "0.2rem 0.5rem", background: "var(--cream)", borderRadius: 4,
                    color: "var(--navy)",
                  }}>
                    {c.companyName}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
