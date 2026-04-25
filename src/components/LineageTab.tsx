"use client";

import React, { useState, useMemo } from "react";
import LineageTree from "./charts/LineageTree";
import { LINEAGE_ROOTS, type LineageNode } from "@/data/lineageData";

export default function LineageTab() {
  const [activeRootKey, setActiveRootKey] = useState<keyof typeof LINEAGE_ROOTS>("nortel");
  const [selectedNode, setSelectedNode] = useState<LineageNode | null>(null);

  const activeRoot = LINEAGE_ROOTS[activeRootKey];

  const stats = useMemo(() => {
    const d = activeRoot.data || [];
    const companies = d.filter(n => n.type === 'company').length;
    const unicorns = d.filter(n => n.isUnicorn).length;
    return { total: d.length, companies, unicorns };
  }, [activeRoot]);

  return (
    <section className="section animate-in">
      <div className="section-header">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1.5rem" }}>
          <div>
            <h2 style={{ margin: 0 }}>The Compounding Effect</h2>
            <div className="divider" style={{ marginTop: "0.5rem" }} />
            <p style={{ marginBottom: "1rem" }}>{activeRoot.description}</p>
          </div>
          
          <div style={{ display: "flex", gap: "0.5rem", background: "var(--border-light)", padding: "0.25rem", borderRadius: "6px" }}>
            {(Object.keys(LINEAGE_ROOTS) as Array<keyof typeof LINEAGE_ROOTS>).map((key) => (
              <button
                key={key}
                onClick={() => {
                  setActiveRootKey(key);
                  setSelectedNode(null);
                }}
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "4px",
                  border: "none",
                  background: activeRootKey === key ? "var(--white)" : "transparent",
                  color: activeRootKey === key ? "var(--navy)" : "var(--slate)",
                  fontFamily: "'Roboto Mono'",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  boxShadow: activeRootKey === key ? "0 2px 4px rgba(0,0,0,0.05)" : "none",
                  transition: "all 0.2s"
                }}
              >
                {LINEAGE_ROOTS[key].name}
              </button>
            ))}
          </div>
        </div>

        {/* ── Prominent Stats Bar ── */}
        <div style={{
          display: "flex",
          gap: "2rem",
          marginTop: "0.5rem",
          padding: "1rem 1.5rem",
          background: "var(--navy)",
          borderRadius: "8px",
          color: "white"
        }}>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: (activeRoot as any).isComingSoon ? "1.2rem" : "2rem", fontWeight: 700, lineHeight: 1, textTransform: (activeRoot as any).isComingSoon ? "uppercase" : "none" }}>
              {(activeRoot as any).isComingSoon ? "Coming Soon" : stats.total}
            </div>
            <div style={{ fontFamily: "'Roboto Mono'", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.7, marginTop: "0.25rem" }}>Total Entities in Tree</div>
          </div>
          <div style={{ borderLeft: "1px solid rgba(255,255,255,0.15)", paddingLeft: "2rem" }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: (activeRoot as any).isComingSoon ? "1.2rem" : "2rem", fontWeight: 700, lineHeight: 1, textTransform: (activeRoot as any).isComingSoon ? "uppercase" : "none" }}>
              {(activeRoot as any).isComingSoon ? "—" : stats.companies}
            </div>
            <div style={{ fontFamily: "'Roboto Mono'", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.7, marginTop: "0.25rem" }}>Companies</div>
          </div>
          <div style={{ borderLeft: "1px solid rgba(255,255,255,0.15)", paddingLeft: "2rem" }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: (activeRoot as any).isComingSoon ? "1.2rem" : "2rem", fontWeight: 700, lineHeight: 1, color: "var(--gold)", textTransform: (activeRoot as any).isComingSoon ? "uppercase" : "none" }}>
              {(activeRoot as any).isComingSoon ? "—" : stats.unicorns}
            </div>
            <div style={{ fontFamily: "'Roboto Mono'", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.7, marginTop: "0.25rem" }}>Unicorn-Class</div>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: selectedNode ? "1fr 320px" : "1fr", gap: "1.5rem", transition: "all 0.3s ease" }}>
        <div className="card" style={{ padding: "1rem", minHeight: "650px", display: "flex", flexDirection: "column" }}>
          {(activeRoot as any).isComingSoon ? (
            <div style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              color: "var(--slate)",
              padding: "2rem"
            }}>
              <div style={{ fontSize: "4rem", marginBottom: "1.5rem", filter: "grayscale(1)", opacity: 0.5 }}>🏗️</div>
              <h3 style={{ 
                fontFamily: "'Playfair Display', serif", 
                fontSize: "1.75rem", 
                color: "var(--navy)",
                marginBottom: "0.5rem" 
              }}>Mapping in Progress</h3>
              <div className="divider" style={{ width: "40px", margin: "1rem auto" }} />
              <p style={{ 
                maxWidth: "420px", 
                fontSize: "0.95rem", 
                lineHeight: 1.6,
                opacity: 0.8 
              }}>
                We are currently transcribing the family tree and ecosystem linkages for <strong>{activeRoot.name}</strong>. 
                Check back soon for the full interactive visualization.
              </p>
              <p style={{ 
                marginTop: "1.5rem", 
                fontSize: "0.85rem", 
                color: "var(--navy)",
                fontFamily: "'Roboto Mono'",
                fontWeight: 600,
                opacity: 0.7 
              }}>
                Help us research & build the tree — contact <a href="mailto:admin@unicornnorth.com" style={{ color: "var(--red)", textDecoration: "underline" }}>admin@unicornnorth.com</a> if you are interested.
              </p>
            </div>
          ) : (
            <LineageTree 
              data={activeRoot.data} 
              onNodeClick={(node) => setSelectedNode(node)} 
            />
          )}
        </div>

        {selectedNode && (
          <div className="animate-in" style={{ position: "sticky", top: "2rem", height: "fit-content" }}>
            <div className="card" style={{ 
              background: "var(--navy)", 
              color: "white", 
              border: selectedNode.isUnicorn ? "2px solid var(--gold)" : "none" 
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                <span className="badge badge-public" style={{ background: "rgba(255,255,255,0.1)", color: "white" }}>
                  {selectedNode.type}
                </span>
                <button 
                  onClick={() => setSelectedNode(null)}
                  style={{ background: "none", border: "none", color: "white", cursor: "pointer", opacity: 0.6 }}
                >
                  ✕
                </button>
              </div>
              
              <h3 style={{ color: "white", marginBottom: "0.5rem" }}>{selectedNode.name}</h3>
              
              <div style={{ fontFamily: "'Roboto Mono'", fontSize: "0.8rem", color: "var(--gold)", marginBottom: "1rem" }}>
                Est. {selectedNode.year || "Foundational"}
              </div>

              <div style={{ fontSize: "0.9rem", lineHeight: 1.6, opacity: 0.9, marginBottom: "1.5rem" }}>
                {selectedNode.description}
              </div>

              {selectedNode.relationship && (
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1rem" }}>
                  <div className="data-label" style={{ color: "rgba(255,255,255,0.5)", marginBottom: "0.25rem" }}>Relationship</div>
                  <div style={{ fontSize: "0.85rem" }}>{selectedNode.relationship}</div>
                </div>
              )}

              {selectedNode.isUnicorn && (
                <div style={{ marginTop: "1rem", padding: "0.75rem", background: "rgba(201, 168, 76, 0.1)", borderRadius: "4px", border: "1px solid var(--gold)" }}>
                  <div style={{ fontSize: "0.75rem", color: "var(--gold)", fontWeight: 700 }}>UNICORN STATUS</div>
                  <div style={{ fontSize: "0.8rem", opacity: 0.8 }}>This entity reached or significantly contributed to a $1B+ CAD valuation peak.</div>
                </div>
              )}
            </div>
            
            <div style={{ marginTop: "1rem", fontSize: "0.75rem", color: "var(--slate-light)", textAlign: "center" }}>
              Click another node to compare or ✕ to close
            </div>
          </div>
        )}
      </div>

      <div style={{ marginTop: "2rem", color: "var(--slate-light)", fontSize: "0.85rem", maxWidth: "800px" }}>
        <h4 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>How this map works</h4>
        <p>
          Each node represents a major institutional anchor or a significant commercial entity. 
          Connections indicate direct spinoffs (founders leaving to start the new company), 
          asset acquisitions, or major intellectual property transfers. 
          This visualization tracks the <strong>Compounding Effect</strong>—how a single hub of talent 
          can seed an entire regional ecosystem over decades.
        </p>
        <div style={{ 
          marginTop: "1.5rem", 
          paddingTop: "1rem", 
          borderTop: "1px solid var(--border-light)", 
          fontSize: "0.75rem", 
          fontStyle: "italic",
          opacity: 0.8,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <span>Source: Lineage data inspired by the research and family tree mapping provided by Doyletech Corporation.</span>
          <span style={{ fontFamily: "'Roboto Mono'", fontWeight: 600 }}>
            Help us research & build the tree — contact <a href="mailto:admin@unicornnorth.com" style={{ color: "var(--red)" }}>admin@unicornnorth.com</a>
          </span>
        </div>
      </div>
    </section>
  );
}
