"use client";

const ERAS = [
  {
    years: "1990s–2000s",
    title: "The telecom boom",
    desc: "Nearly all value in Ottawa-Gatineau. Telecom/hardware dominated. 13 of 15 unicorns were infrastructure companies.",
    trait: "Massive scale, concentrated geography, catastrophic bust",
    color: "var(--red)",
  },
  {
    years: "2010s",
    title: "The pivot",
    desc: "Software eating hardware. Shopify proved Canadian SaaS could go global. Toronto and Montréal started catching Ottawa.",
    trait: "SaaS emergence, geographic diversification begins",
    color: "#D97706", // Amber-600
  },
  {
    years: "2020s",
    title: "The bloom",
    desc: "60+ new unicorns across AI, fintech, web3, cleantech. Toronto leads volume, Vancouver diversity, Calgary emerges.",
    trait: "Multi-hub, multi-sector, but valuations largely unproven",
    color: "#059669", // Emerald-600
  },
];

export default function TechEras() {
  return (
    <section className="section">
      <div className="section-header">
        <h2>Three eras of Canadian tech</h2>
        <div className="divider" />
        <p>How the ecosystem character has shifted decade by decade</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1rem" }}>
        {ERAS.map((era, i) => (
          <div key={i} className="card" style={{ padding: "2rem" }}>
            <div style={{ fontFamily: "'Roboto Mono'", fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>
              {era.years}
            </div>
            <h3 style={{
              fontSize: "2rem",
              fontWeight: 800,
              color: era.color,
              lineHeight: 1.1,
              marginBottom: "1rem",
              fontFamily: "'Playfair Display', serif"
            }}>
              {era.title}
            </h3>
            <p style={{ fontSize: "0.9rem", lineHeight: 1.6, color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
              {era.desc}
            </p>
            <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1rem" }}>
              <div style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--navy)", marginBottom: "0.25rem" }}>
                Defining trait:
              </div>
              <div style={{ fontSize: "0.9rem", fontWeight: 500, color: "var(--navy)", lineHeight: 1.4 }}>
                {era.trait}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
