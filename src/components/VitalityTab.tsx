"use client";

import { useCurrency } from "./CurrencyContext";

export default function VitalityTab() {
  const { formatValue } = useCurrency();

  return (
    <div className="animate-in">
      {/* ── Where are they now? ─────────────────────────────────────── */}
      <section className="section">
        <div className="section-header">
          <h2>Where are they now?</h2>
          <div className="divider" />
          <p>Current status of 101 Canadian tech unicorns</p>
        </div>
        
        <div className="card" style={{ padding: "3rem", display: "flex", gap: "4rem", alignItems: "center", flexWrap: "wrap" }}>
          {/* Simple SVG Donut */}
          <div style={{ position: "relative", width: 240, height: 240 }}>
            <svg viewBox="0 0 42 42" style={{ transform: "rotate(-90deg)", width: "100%", height: "100%" }}>
              {/* Using stroke-dasharray for segments */}
              <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="var(--navy)" strokeWidth="6" strokeDasharray="42 58" strokeDashoffset="0" />
              <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="var(--red)" strokeWidth="6" strokeDasharray="18 82" strokeDashoffset="-42" />
              <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="var(--gold)" strokeWidth="6" strokeDasharray="16 84" strokeDashoffset="-60" />
              <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="var(--slate)" strokeWidth="6" strokeDasharray="8 92" strokeDashoffset="-76" />
              <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="var(--burgundy)" strokeWidth="6" strokeDasharray="5 95" strokeDashoffset="-84" />
              <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="var(--slate-light)" strokeWidth="6" strokeDasharray="6 94" strokeDashoffset="-89" />
              <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="var(--red-dark)" strokeWidth="6" strokeDasharray="3 97" strokeDashoffset="-95" />
              <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="var(--border)" strokeWidth="6" strokeDasharray="2 98" strokeDashoffset="-98" />
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--navy)", lineHeight: 1 }}>101</div>
              <div style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.1em" }}>unicorns</div>
            </div>
          </div>

          <div style={{ flex: 1, display: "grid", gap: "0.6rem" }}>
            {[
              { color: "var(--navy)", count: 46, pct: "46%", label: "Private" },
              { color: "var(--red)", count: 21, pct: "21%", label: "Public (listed)" },
              { color: "var(--gold)", count: 13, pct: "13%", label: "Acquired" },
              { color: "var(--slate)", count: 6, pct: "6%", label: "PE-owned" },
              { color: "var(--burgundy)", count: 3, pct: "3%", label: "Self-funded" },
              { color: "var(--slate-light)", count: 7, pct: "7%", label: "Defunct / wound down" },
              { color: "var(--red-dark)", count: 3, pct: "3%", label: "Distressed / restructured" },
              { color: "var(--border)", count: 2, pct: "2%", label: "Other (HoldCo, active)" },
            ].map((st, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "1rem", fontSize: "0.9rem" }}>
                <div style={{ width: 12, height: 12, background: st.color, borderRadius: 2 }} />
                <div style={{ fontWeight: 700, width: 25, color: "var(--navy)" }}>{st.count}</div>
                <div style={{ color: "var(--text-secondary)", width: 40 }}>{st.pct}</div>
                <div style={{ color: "var(--navy)", fontWeight: 500 }}>{st.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The survival spectrum ───────────────────────────────────── */}
      <section className="section">
        <div className="section-header">
          <h2>The survival spectrum</h2>
          <div className="divider" />
          <p>What happened to Canadian unicorns — alive, absorbed, or gone</p>
        </div>
        
        <div className="card" style={{ padding: "2rem" }}>
          <div style={{ display: "flex", height: 40, borderRadius: 4, overflow: "hidden", marginBottom: "1rem" }}>
            <div style={{ flex: 73, background: "var(--navy)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "0.8rem", fontWeight: 600 }}>Alive (73)</div>
            <div style={{ flex: 13, background: "var(--gold)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "0.8rem", fontWeight: 600 }}>Absorbed (13)</div>
            <div style={{ flex: 7, background: "var(--red)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "0.8rem", fontWeight: 600 }}>Dead (7)</div>
            <div style={{ flex: 6, background: "var(--slate)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "0.8rem", fontWeight: 600 }}>PE (6)</div>
            <div style={{ flex: 2, background: "var(--slate-light)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "0.8rem", fontWeight: 600 }}>?</div>
          </div>
          <p style={{ fontSize: "0.7rem", color: "var(--text-secondary)", fontStyle: "italic" }}>
            Alive = private + public + self-funded. Absorbed = acquired by larger entity. Dead = defunct, CCAA, or wound down. PE = private equity ownership.
          </p>
          
          <div style={{ marginTop: "2rem" }}>
            <h4 style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--navy)", marginBottom: "0.5rem" }}>Recent casualties & distress signals:</h4>
            <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              <strong>SSENSE</strong> — CCAA creditor protection (Aug 2025) · <strong>Mitel</strong> — Chapter 11 reorganization (Mar–Jun 2025) · <strong>Nexii</strong> — CCAA, assets sold for C$500K (Jun 2024) · <strong>Kik</strong> — sold to US MediaLab, Canadian entity wound down (2019) · <strong>Clearco</strong> — severe restructuring, valuation collapsed from C$2.9B · <strong>ApplyBoard</strong> — down ~74% from peak per Fidelity disclosures
            </p>
          </div>
        </div>
      </section>

      {/* ── Interesting patterns ────────────────────────────────────── */}
      <section className="section">
        <div className="section-header">
          <h2>Interesting patterns</h2>
          <div className="divider" />
          <p>Things that stood out in the data</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "1rem" }}>
          {[
            {
              val: "$1.18T",
              valColor: "var(--red)",
              title: "Value destroyed",
              desc: "Nortel alone accounts for ~$700B. The dot-com trio (Nortel + JDS + 360networks) represents $1.05T in lost peak value — nearly half the ecosystem's all-time total."
            },
            {
              val: "100%",
              valColor: "var(--gold)",
              title: "Self-funded unicorns still independent",
              desc: "Geotab, Ross Video, and Global Relay — every bootstrapped unicorn has survived. 100% survival vs. ~65% for VC-backed."
            },
            {
              val: "52%",
              valColor: "var(--navy)",
              title: "Ottawa's historical companies are gone",
              desc: "Of Ottawa's 23 unicorns, 13 are now acquired, defunct, or PE-owned. Only 10 remain independent — a stark contrast to Toronto (27 of 34 still independent)."
            },
            {
              val: "$112B",
              valColor: "var(--burgundy)",
              title: "Constellation Software: the quiet giant",
              desc: "The stock hit CAD 5,300 in May 2025 giving an actual peak of ~$112B. Canada's most successful serial acquirer is now larger than BlackBerry ever was."
            }
          ].map((p, i) => (
            <div key={i} className="card" style={{ padding: "2rem" }}>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: p.valColor, marginBottom: "0.25rem" }}>{p.val}</div>
              <div style={{ fontWeight: 700, color: "var(--navy)", marginBottom: "0.75rem" }}>{p.title}</div>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Acquisitions: where they went ────────────────────────────── */}
      <section className="section">
        <div className="section-header">
          <h2>Acquisitions: where they went</h2>
          <div className="divider" />
          <p>Destination of the 13 acquired unicorns</p>
        </div>

        <div className="card" style={{ padding: "2.5rem" }}>
          <div style={{ display: "grid", gap: "1rem", maxWidth: 600 }}>
            {[
              { label: "US acquirers", count: 11, flex: 11, color: "var(--red)" },
              { label: "European", count: 3, flex: 3, color: "var(--navy)" },
              { label: "Canadian", count: 2, flex: 2, color: "var(--gold)" },
            ].map((a, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "100px 1fr", alignItems: "center", gap: "1rem" }}>
                <div style={{ fontSize: "0.85rem", fontWeight: 500, color: "var(--text-secondary)" }}>{a.label}</div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{ height: 16, background: a.color, width: `${(a.count / 11) * 100}%`, minWidth: "10%", borderRadius: 2 }} />
                  <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--navy)" }}>{a.count}</div>
                </div>
              </div>
            ))}
          </div>
          <p style={{ marginTop: "1.5rem", fontSize: "0.85rem", color: "var(--text-secondary)", fontStyle: "italic" }}>
            69% of acquired Canadian unicorns were bought by US companies — a persistent brain-drain pattern.
          </p>
        </div>
      </section>
    </div>
  );
}
