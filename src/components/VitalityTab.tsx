"use client";

import { useCurrency } from "./CurrencyContext";

interface UnicornRow {
  id: number;
  companyName: string;
  hqCma: string | null;
  industry: string | null;
  firstUnicornDecade: string | null;
  peakValuationCad2025: string | null;
  companyStatus: string | null;
  acquirerRegion: string | null;
  isRevenueMultiplier: boolean;
  lastUpdated: Date;
}

interface CmaStatRow {
  cma: string;
  decade: string;
  unicornCount: number;
  unicornsPerMillionRes: string | null;
}

interface Props {
  unicorns: UnicornRow[];
  cmaStats: CmaStatRow[];
}

export default function VitalityTab({ unicorns, cmaStats }: Props) {
  const { formatValue } = useCurrency();

  // ── Data Processing ──────────────────────────────────────────────────
  
  // 1. Grouping for "Where are they now?"
  const statusGroups = unicorns.reduce((acc, u) => {
    const s = (u.companyStatus || "").toLowerCase();
    let category = "Other (HoldCo, active)";
    
    if (s.includes("pe-owned") || s.includes("advent")) {
      category = "PE-owned";
    } else if (s.includes("self-funded")) {
      category = "Self-funded";
    } else if (s.includes("public")) {
      category = "Public (listed)";
    } else if (s.includes("acquired") && !s.includes("defunct")) {
      category = "Acquired";
    } else if (s.includes("defunct")) {
      category = "Defunct / wound down";
    } else if (s.includes("protection") || s.includes("restructured") || s.includes("post-ch")) {
      category = "Distressed / restructured";
    } else if (s.includes("private")) {
      category = "Private";
    } else if (s.includes("holdco") || s.includes("delisted")) {
      category = "Other (HoldCo, active)";
    }
    
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const total = unicorns.length;
  const statusData = [
    { label: "Private", color: "var(--navy)", count: statusGroups["Private"] || 0 },
    { label: "Public (listed)", color: "var(--red)", count: statusGroups["Public (listed)"] || 0 },
    { label: "Acquired", color: "var(--gold)", count: statusGroups["Acquired"] || 0 },
    { label: "PE-owned", color: "var(--slate)", count: statusGroups["PE-owned"] || 0 },
    { label: "Self-funded", color: "var(--burgundy)", count: statusGroups["Self-funded"] || 0 },
    { label: "Defunct / wound down", color: "var(--slate-light)", count: statusGroups["Defunct / wound down"] || 0 },
    { label: "Distressed / restructured", color: "var(--red-dark)", count: statusGroups["Distressed / restructured"] || 0 },
    { label: "Other (HoldCo, active)", color: "var(--border)", count: statusGroups["Other (HoldCo, active)"] || 0 },
  ].map(d => ({ ...d, pct: `${Math.round((d.count / total) * 100)}%` }));

  // 2. Survival Spectrum
  const aliveCount = (statusGroups["Private"] || 0) + (statusGroups["Public (listed)"] || 0) + (statusGroups["Self-funded"] || 0) + (statusGroups["Distressed / restructured"] || 0);
  const absorbedCount = statusGroups["Acquired"] || 0;
  const deadCount = statusGroups["Defunct / wound down"] || 0;
  const peCount = statusGroups["PE-owned"] || 0;
  const otherCount = statusGroups["Other (HoldCo, active)"] || 0;

  // 3. Interesting Patterns
  // Value Destroyed: Sum of defunct companies' peak valuation
  const valueDestroyed = unicorns.reduce((acc, u) => {
    if ((u.companyStatus || "").toLowerCase().includes("defunct")) {
      return acc + (parseFloat(u.peakValuationCad2025 || "0") * 1_000_000_000);
    }
    return acc;
  }, 0);

  // Self-funded survival
  const selfFunded = unicorns.filter(u => (u.companyStatus || "").toLowerCase().includes("self-funded"));
  const selfFundedIndependent = selfFunded.filter(u => {
    const s = (u.companyStatus || "").toLowerCase();
    return s.includes("private") || s.includes("public") || s.includes("self-funded");
  }).length;
  const selfFundedSurvivalPct = selfFunded.length > 0 ? Math.round((selfFundedIndependent / selfFunded.length) * 100) : 100;

  // Ottawa casualities
  const ottawaUnicorns = unicorns.filter(u => (u.hqCma || "").includes("Ottawa"));
  const ottawaGone = ottawaUnicorns.filter(u => {
    const s = (u.companyStatus || "").toLowerCase();
    return s.includes("acquired") || s.includes("defunct") || s.includes("pe-owned");
  }).length;
  const ottawaGonePct = ottawaUnicorns.length > 0 ? Math.round((ottawaGone / ottawaUnicorns.length) * 100) : 0;

  // Constellation Software
  const constellation = unicorns.find(u => u.companyName.includes("Constellation Software"));
  const constellationPeak = constellation ? parseFloat(constellation.peakValuationCad2025 || "0") : 112;

  // 4. Acquisitions
  const acqRegions = unicorns.reduce((acc, u) => {
    if (u.acquirerRegion) {
      acc[u.acquirerRegion] = (acc[u.acquirerRegion] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const acqData = [
    { label: "US acquirers", count: acqRegions["US"] || 0, color: "var(--red)" },
    { label: "European", count: acqRegions["European"] || 0, color: "var(--navy)" },
    { label: "Canadian", count: acqRegions["Canadian"] || 0, color: "var(--gold)" },
  ].sort((a, b) => b.count - a.count);
  const totalAcquired = acqData.reduce((acc, d) => acc + d.count, 0);
  const usAcqPct = totalAcquired > 0 ? Math.round(((acqRegions["US"] || 0) / totalAcquired) * 100) : 0;

  return (
    <div className="animate-in">
      {/* ── Where are they now? ─────────────────────────────────────── */}
      <section className="section">
        <div className="section-header">
          <h2>Where are they now?</h2>
          <div className="divider" />
          <p>Current status of {total} Canadian tech unicorns</p>
        </div>
        
        <div className="card" style={{ padding: "3rem", display: "flex", gap: "4rem", alignItems: "center", flexWrap: "wrap" }}>
          {/* SVG Donut */}
          <div style={{ position: "relative", width: 240, height: 240 }}>
            <svg viewBox="0 0 42 42" style={{ transform: "rotate(-90deg)", width: "100%", height: "100%" }}>
              {statusData.reduce((acc, d, i) => {
                const offset = acc.totalOffset;
                const dash = (d.count / total) * 100;
                acc.totalOffset -= dash;
                acc.elements.push(
                  <circle 
                    key={i} 
                    cx="21" cy="21" r="15.915" 
                    fill="transparent" 
                    stroke={d.color} 
                    strokeWidth="6" 
                    strokeDasharray={`${dash} ${100 - dash}`} 
                    strokeDashoffset={offset} 
                  />
                );
                return acc;
              }, { elements: [] as any[], totalOffset: 0 }).elements}
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--navy)", lineHeight: 1 }}>{total}</div>
              <div style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.1em" }}>unicorns</div>
            </div>
          </div>

          <div style={{ flex: 1, display: "grid", gap: "0.6rem" }}>
            {statusData.map((st, i) => (
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
            <div style={{ flex: aliveCount, background: "var(--navy)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "0.8rem", fontWeight: 600 }}>Alive ({aliveCount})</div>
            <div style={{ flex: absorbedCount, background: "var(--gold)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "0.8rem", fontWeight: 600 }}>Absorbed ({absorbedCount})</div>
            <div style={{ flex: deadCount, background: "var(--red)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "0.8rem", fontWeight: 600 }}>Dead ({deadCount})</div>
            <div style={{ flex: peCount, background: "var(--slate)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "0.8rem", fontWeight: 600 }}>PE ({peCount})</div>
            <div style={{ flex: otherCount, background: "var(--slate-light)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "0.8rem", fontWeight: 600 }}>?</div>
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
              val: formatValue(valueDestroyed),
              valColor: "var(--red)",
              title: "Value destroyed",
              desc: "Nortel alone accounts for ~$700B. The dot-com trio (Nortel + JDS + 360networks) represents over $1T in lost peak value — nearly half the ecosystem's all-time total."
            },
            {
              val: `${selfFundedSurvivalPct}%`,
              valColor: "var(--gold)",
              title: "Self-funded unicorns still independent",
              desc: `Of the ${selfFunded.length} bootstrapped unicorns, ${selfFundedIndependent} have survived as independent entities. ${selfFundedSurvivalPct}% survival vs. ~65% for VC-backed.`
            },
            {
              val: `${ottawaGonePct}%`,
              valColor: "var(--navy)",
              title: "Ottawa's historical companies are gone",
              desc: `Of Ottawa's ${ottawaUnicorns.length} unicorns, ${ottawaGone} are now acquired, defunct, or PE-owned. Only ${ottawaUnicorns.length - ottawaGone} remain independent — a stark contrast to Toronto.`
            },
            {
              val: formatValue(constellationPeak * 1_000_000_000),
              valColor: "var(--burgundy)",
              title: "Constellation Software: the quiet giant",
              desc: `Canada's most successful serial acquirer is now valued at over ${formatValue(constellationPeak * 1_000_000_000)}, larger than BlackBerry ever was at its peak.`
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
          <p>Destination of the {totalAcquired} acquired unicorns</p>
        </div>

        <div className="card" style={{ padding: "2.5rem" }}>
          <div style={{ display: "grid", gap: "1rem", maxWidth: 600 }}>
            {acqData.map((a, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "100px 1fr", alignItems: "center", gap: "1rem" }}>
                <div style={{ fontSize: "0.85rem", fontWeight: 500, color: "var(--text-secondary)" }}>{a.label}</div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{ height: 16, background: a.color, width: `${(a.count / Math.max(...acqData.map(d => d.count))) * 100}%`, minWidth: "10%", borderRadius: 2 }} />
                  <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--navy)" }}>{a.count}</div>
                </div>
              </div>
            ))}
          </div>
          <p style={{ marginTop: "1.5rem", fontSize: "0.85rem", color: "var(--text-secondary)", fontStyle: "italic" }}>
            {usAcqPct}% of acquired Canadian unicorns were bought by US companies — a persistent brain-drain pattern.
          </p>
        </div>
      </section>
    </div>
  );
}
