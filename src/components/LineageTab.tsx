"use client";

import React, { useState, useMemo } from "react";
import LineageTree from "./charts/LineageTree";
import { LINEAGE_ROOTS, type LineageNode } from "@/data/lineageData";

export default function LineageTab() {
  const [activeRootKey, setActiveRootKey] = useState<keyof typeof LINEAGE_ROOTS>("shopify");
  const [selectedNode, setSelectedNode] = useState<LineageNode | null>(null);
  const [shopifyCategoryFilter, setShopifyCategoryFilter] = useState<'all' | 'alumni' | 'strategic_partner' | 'lead_investment' | 'canadian_unicorns' | 'us_global_unicorns' | 'acquired'>('all');

  const activeRoot = LINEAGE_ROOTS[activeRootKey];

  // Shopify specific filtered dataset
  const currentTreeData = useMemo(() => {
    const rawData = activeRoot.data || [];
    if (activeRootKey !== "shopify") return rawData;

    return rawData.filter(node => {
      if (node.id === 'shopify') return true; // Always display root entity

      // Alumni tenure default cutoff (2+ years)
      if (node.category === 'alumni' && node.alumniTenureYears !== undefined) {
        if (node.alumniTenureYears < 2) return false;
      }

      if (shopifyCategoryFilter === 'all') return true;
      if (shopifyCategoryFilter === 'alumni') return node.category === 'alumni';
      if (shopifyCategoryFilter === 'strategic_partner') return node.category === 'strategic_partner';
      if (shopifyCategoryFilter === 'lead_investment') return node.category === 'lead_investment';
      if (shopifyCategoryFilter === 'canadian_unicorns') return node.isUnicorn && node.unicornRegion === 'Canadian';
      if (shopifyCategoryFilter === 'us_global_unicorns') return node.isUnicorn && node.unicornRegion === 'US / Global';
      if (shopifyCategoryFilter === 'acquired') return node.status === 'acquired';

      return true;
    });
  }, [activeRoot, activeRootKey, shopifyCategoryFilter]);

  const shopifyStats = useMemo(() => {
    const d = LINEAGE_ROOTS.shopify.data || [];
    const companies = d.filter(n => n.id !== 'shopify');
    const alumniCount = companies.filter(n => n.category === 'alumni' && (n.alumniTenureYears || 0) >= 2).length;
    const partnerCount = companies.filter(n => n.category === 'strategic_partner').length;
    const leadCount = companies.filter(n => n.category === 'lead_investment').length;
    const canadianUnicornCount = d.filter(n => n.isUnicorn && n.unicornRegion === 'Canadian').length;
    const usGlobalUnicornCount = d.filter(n => n.isUnicorn && n.unicornRegion === 'US / Global').length;
    const acquiredCount = companies.filter(n => n.status === 'acquired').length;
    return {
      total: companies.length + 1,
      spinoffs: companies.length,
      alumni: alumniCount,
      partners: partnerCount,
      lead: leadCount,
      canadianUnicorns: canadianUnicornCount,
      usGlobalUnicorns: usGlobalUnicornCount,
      totalUnicorns: canadianUnicornCount + usGlobalUnicornCount,
      acquired: acquiredCount
    };
  }, []);

  const stats = useMemo(() => {
    if (activeRootKey === "shopify") {
      return {
        total: currentTreeData.length,
        companies: currentTreeData.filter(n => n.type === 'company' && n.id !== 'shopify').length,
        unicorns: currentTreeData.filter(n => n.isUnicorn).length
      };
    }
    const d = activeRoot.data || [];
    const companies = d.filter(n => n.type === 'company').length;
    const unicorns = d.filter(n => n.isUnicorn).length;
    return { total: d.length, companies, unicorns };
  }, [activeRoot, activeRootKey, currentTreeData]);

  return (
    <section className="section animate-in">
      <div className="section-header">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1.5rem" }}>
          <div>
            <h2 style={{ margin: 0 }}>The Shopify Compounding Tree</h2>
            <div className="divider" style={{ marginTop: "0.5rem" }} />
            <p style={{ marginBottom: "1rem" }}>
              {activeRootKey === "shopify"
                ? "Mapping 81 high-impact spinoffs, strategic investments, and alumni-founded ventures seeding the global e-commerce ecosystem."
                : activeRoot.description}
            </p>
          </div>
          
          <div style={{ display: "flex", gap: "0.5rem", background: "var(--border-light)", padding: "0.25rem", borderRadius: "6px" }}>
            {(Object.keys(LINEAGE_ROOTS) as Array<keyof typeof LINEAGE_ROOTS>).map((key) => (
              <button
                key={key}
                onClick={() => {
                  setActiveRootKey(key);
                  setSelectedNode(null);
                  setShopifyCategoryFilter('all');
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
          gap: "1.75rem",
          marginTop: "0.5rem",
          padding: "1rem 1.5rem",
          background: "var(--navy)",
          borderRadius: "8px",
          color: "white",
          flexWrap: "wrap"
        }}>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, lineHeight: 1 }}>
              {stats.total}
            </div>
            <div style={{ fontFamily: "'Roboto Mono'", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.7, marginTop: "0.25rem" }}>Total Entities Displayed</div>
          </div>

          {activeRootKey === "shopify" ? (
            <>
              <div style={{ borderLeft: "1px solid rgba(255,255,255,0.15)", paddingLeft: "1.5rem" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, lineHeight: 1, color: "#FB923C" }}>
                  {shopifyStats.alumni}
                </div>
                <div style={{ fontFamily: "'Roboto Mono'", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.7, marginTop: "0.25rem" }}>Alumni Founded (2+ Yrs)</div>
              </div>
              <div style={{ borderLeft: "1px solid rgba(255,255,255,0.15)", paddingLeft: "1.5rem" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, lineHeight: 1, color: "#60A5FA" }}>
                  {shopifyStats.partners}
                </div>
                <div style={{ fontFamily: "'Roboto Mono'", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.7, marginTop: "0.25rem" }}>Ventures Partners</div>
              </div>
              <div style={{ borderLeft: "1px solid rgba(255,255,255,0.15)", paddingLeft: "1.5rem" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, lineHeight: 1, color: "#34D399" }}>
                  {shopifyStats.lead}
                </div>
                <div style={{ fontFamily: "'Roboto Mono'", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.7, marginTop: "0.25rem" }}>Lead Investments</div>
              </div>
              <div style={{ borderLeft: "1px solid rgba(255,255,255,0.15)", paddingLeft: "1.5rem" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, lineHeight: 1, color: "var(--gold)" }}>
                  {shopifyStats.canadianUnicorns} <span style={{ fontSize: "1rem", fontWeight: 400 }}>🇨🇦</span>
                </div>
                <div style={{ fontFamily: "'Roboto Mono'", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.7, marginTop: "0.25rem" }}>Canadian Unicorns</div>
              </div>
              <div style={{ borderLeft: "1px solid rgba(255,255,255,0.15)", paddingLeft: "1.5rem" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, lineHeight: 1, color: "#93C5FD" }}>
                  {shopifyStats.usGlobalUnicorns} <span style={{ fontSize: "1rem", fontWeight: 400 }}>🇺🇸</span>
                </div>
                <div style={{ fontFamily: "'Roboto Mono'", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.7, marginTop: "0.25rem" }}>US / Global Unicorns</div>
              </div>
            </>
          ) : (
            <>
              <div style={{ borderLeft: "1px solid rgba(255,255,255,0.15)", paddingLeft: "2rem" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, lineHeight: 1 }}>
                  {stats.companies}
                </div>
                <div style={{ fontFamily: "'Roboto Mono'", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.7, marginTop: "0.25rem" }}>Companies</div>
              </div>
              <div style={{ borderLeft: "1px solid rgba(255,255,255,0.15)", paddingLeft: "2rem" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, lineHeight: 1, color: "var(--gold)" }}>
                  {stats.unicorns}
                </div>
                <div style={{ fontFamily: "'Roboto Mono'", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.7, marginTop: "0.25rem" }}>Unicorn-Class</div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── Shopify Inclusion & Exclusion Criteria Box ── */}
      {activeRootKey === "shopify" && (
        <div style={{
          margin: "1rem 0 1.25rem 0",
          padding: "1.25rem 1.5rem",
          background: "var(--paper-warm)",
          border: "1px solid var(--border)",
          borderRadius: "8px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1.5rem"
        }}>
          <div>
            <h4 style={{ margin: "0 0 0.5rem 0", fontSize: "0.95rem", color: "#065F46", display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <span>✅</span> <strong>Inclusion Criteria</strong>
            </h4>
            <ul style={{ margin: 0, paddingLeft: "1.2rem", fontSize: "0.82rem", lineHeight: 1.55, color: "var(--slate)" }}>
              <li>
                <strong>Alumni Founded:</strong> Companies founded by former Shopify employees who worked at Shopify for <strong>2+ years</strong> (standard baseline).
              </li>
              <li>
                <strong>Ventures Partners & Preferred Suppliers:</strong> Companies scaling substantially from receiving <em>both</em> significant Shopify Ventures investment and official preferred supplier status for merchants.
              </li>
              <li>
                <strong>Alumni/Exec Lead Investments:</strong> Companies where Shopify personnel or executives served as lead investors in funding rounds (5 documented cases).
              </li>
              <li>
                <strong>Acquired Alumni Startups:</strong> Companies founded by alumni that were acquired remain fully documented in the tree.
              </li>
            </ul>
          </div>

          <div style={{ borderLeft: "1px solid var(--border-light)", paddingLeft: "1.5rem" }}>
            <h4 style={{ margin: "0 0 0.5rem 0", fontSize: "0.95rem", color: "#991B1B", display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <span>🚫</span> <strong>Exclusion Criteria</strong>
            </h4>
            <ul style={{ margin: 0, paddingLeft: "1.2rem", fontSize: "0.82rem", lineHeight: 1.55, color: "var(--slate)" }}>
              <li>
                <strong>Wound Down Ventures:</strong> Companies founded by alumni that were wound down or liquidated are excluded from this dataset.
              </li>
              <li>
                <strong>Generic 3rd-Party App Store Tools:</strong> Unaffiliated App Store developers without strategic equity investment, alumni leadership, or official preferred supplier status.
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* ── Interactive Category Filters ── */}
      {activeRootKey === "shopify" && (
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "1rem",
          padding: "0.75rem 1rem",
          background: "#F8FAFC",
          borderRadius: "6px",
          border: "1px solid var(--border)"
        }}>
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
            <button
              onClick={() => setShopifyCategoryFilter('all')}
              style={filterBtnStyle(shopifyCategoryFilter === 'all', '#0F172A')}
            >
              All Entities ({shopifyStats.spinoffs})
            </button>
            <button
              onClick={() => setShopifyCategoryFilter('alumni')}
              style={filterBtnStyle(shopifyCategoryFilter === 'alumni', '#EA580C')}
            >
              🟠 Alumni Founded ({shopifyStats.alumni})
            </button>
            <button
              onClick={() => setShopifyCategoryFilter('strategic_partner')}
              style={filterBtnStyle(shopifyCategoryFilter === 'strategic_partner', '#2563EB')}
            >
              🔵 Ventures Partners ({shopifyStats.partners})
            </button>
            <button
              onClick={() => setShopifyCategoryFilter('lead_investment')}
              style={filterBtnStyle(shopifyCategoryFilter === 'lead_investment', '#059669')}
            >
              🟢 Lead Investments (5)
            </button>
            <button
              onClick={() => setShopifyCategoryFilter('canadian_unicorns')}
              style={filterBtnStyle(shopifyCategoryFilter === 'canadian_unicorns', '#F59E0B')}
            >
              ★ 🇨🇦 Canadian Unicorns ({shopifyStats.canadianUnicorns})
            </button>
            <button
              onClick={() => setShopifyCategoryFilter('us_global_unicorns')}
              style={filterBtnStyle(shopifyCategoryFilter === 'us_global_unicorns', '#3B82F6')}
            >
              ★ 🇺🇸 US/Global Unicorns ({shopifyStats.usGlobalUnicorns})
            </button>
            <button
              onClick={() => setShopifyCategoryFilter('acquired')}
              style={filterBtnStyle(shopifyCategoryFilter === 'acquired', '#7C3AED')}
            >
              📦 Acquired ({shopifyStats.acquired})
            </button>
          </div>
        </div>
      )}

      {/* ── Tree & Side Panel Drawer ── */}
      <div style={{ display: "grid", gridTemplateColumns: selectedNode ? "1fr 340px" : "1fr", gap: "1.5rem", transition: "all 0.3s ease" }}>
        <div className="card" style={{ padding: "1rem", minHeight: "650px", display: "flex", flexDirection: "column" }}>
          <LineageTree 
            data={currentTreeData} 
            onNodeClick={(node) => setSelectedNode(node)} 
          />
        </div>

        {selectedNode && (
          <div className="animate-in" style={{ position: "sticky", top: "2rem", height: "fit-content" }}>
            <div className="card" style={{ 
              background: selectedNode.isUnicorn ? "#0F172A" : "var(--navy)", 
              color: "white", 
              border: selectedNode.isUnicorn ? (selectedNode.unicornRegion === 'Canadian' ? "2px solid #F59E0B" : "2px solid #3B82F6") : "1px solid var(--border)",
              boxShadow: selectedNode.isUnicorn ? "0 4px 20px rgba(0, 0, 0, 0.4)" : "none"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem", alignItems: "center" }}>
                <span className="badge" style={{
                  background: selectedNode.category === 'alumni' ? "rgba(234, 88, 12, 0.25)" : (selectedNode.category === 'strategic_partner' ? "rgba(37, 99, 235, 0.25)" : (selectedNode.category === 'lead_investment' ? "rgba(5, 150, 105, 0.25)" : "rgba(255,255,255,0.15)")),
                  color: selectedNode.category === 'alumni' ? "#FFEDD5" : (selectedNode.category === 'strategic_partner' ? "#BFDBFE" : (selectedNode.category === 'lead_investment' ? "#A7F3D0" : "white")),
                  fontSize: "0.7rem",
                  padding: "0.25rem 0.6rem",
                  borderRadius: "4px",
                  fontWeight: 600
                }}>
                  {selectedNode.category === 'alumni' ? 'ALUMNI STARTUP' : (selectedNode.category === 'strategic_partner' ? 'VENTURES PARTNER' : (selectedNode.category === 'lead_investment' ? 'LEAD INVESTMENT' : selectedNode.type.toUpperCase()))}
                </span>
                <button 
                  onClick={() => setSelectedNode(null)}
                  style={{ background: "none", border: "none", color: "white", cursor: "pointer", opacity: 0.6, fontSize: "1.2rem" }}
                >
                  ✕
                </button>
              </div>
              
              <h3 style={{ color: "white", marginBottom: "0.25rem", fontSize: "1.35rem" }}>{selectedNode.name}</h3>
              
              <div style={{ fontFamily: "'Roboto Mono'", fontSize: "0.8rem", color: selectedNode.isUnicorn ? "#F59E0B" : "var(--gold)", marginBottom: "1rem" }}>
                Est. {selectedNode.year || "Foundational"} {selectedNode.status ? `· [${selectedNode.status.toUpperCase()}]` : ''}
              </div>

              <div style={{ fontSize: "0.88rem", lineHeight: 1.6, opacity: 0.9, marginBottom: "1.25rem" }}>
                {selectedNode.description}
              </div>

              {selectedNode.shopifyConnection && (
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: "0.75rem", marginBottom: "0.75rem" }}>
                  <div className="data-label" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.2rem" }}>
                    Shopify Connection
                  </div>
                  <div style={{ fontSize: "0.82rem", color: "#E2E8F0" }}>{selectedNode.shopifyConnection}</div>
                </div>
              )}

              {selectedNode.capitalRaised && (
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: "0.75rem", marginBottom: "0.75rem" }}>
                  <div className="data-label" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.2rem" }}>
                    Capital Raised / Funding
                  </div>
                  <div style={{ fontSize: "0.82rem", color: "#E2E8F0" }}>{selectedNode.capitalRaised}</div>
                </div>
              )}

              {selectedNode.industryFocus && (
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: "0.75rem", marginBottom: "0.75rem" }}>
                  <div className="data-label" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.2rem" }}>
                    Industry Focus
                  </div>
                  <div style={{ fontSize: "0.82rem", color: "#E2E8F0" }}>{selectedNode.industryFocus}</div>
                </div>
              )}

              {selectedNode.isUnicorn && (
                <div style={{ marginTop: "1rem", padding: "0.75rem", background: selectedNode.unicornRegion === 'Canadian' ? "rgba(245, 158, 11, 0.12)" : "rgba(59, 130, 246, 0.12)", borderRadius: "6px", border: selectedNode.unicornRegion === 'Canadian' ? "1px solid #F59E0B" : "1px solid #3B82F6" }}>
                  <div style={{ fontSize: "0.75rem", color: selectedNode.unicornRegion === 'Canadian' ? "#F59E0B" : "#60A5FA", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.3rem" }}>
                    <span>★</span> {selectedNode.unicornRegion === 'Canadian' ? '🇨🇦 CANADIAN UNICORN' : '🇺🇸 US / GLOBAL STRATEGIC UNICORN'} ($1B+ Valuation)
                  </div>
                  <div style={{ fontSize: "0.78rem", opacity: 0.85, marginTop: "0.25rem" }}>
                    {selectedNode.unicornRegion === 'Canadian'
                      ? 'Confirmed Canadian Unicorn listed on the national leadership ledger.'
                      : 'International portfolio unicorn backed by Shopify Ventures / partner integration.'}
                  </div>
                </div>
              )}
            </div>
            
            <div style={{ marginTop: "0.75rem", fontSize: "0.75rem", color: "var(--slate-light)", textAlign: "center" }}>
              Click another node to inspect or ✕ to close
            </div>
          </div>
        )}
      </div>

      <div style={{ marginTop: "2rem", color: "var(--slate-light)", fontSize: "0.85rem", maxWidth: "850px" }}>
        <h4 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>How this map works</h4>
        <p>
          Each node represents a major institutional anchor or a significant commercial entity. 
          Connections indicate direct spinoffs (founders leaving to start the new company), 
          strategic equity investments by Shopify Ventures, or executive angel lead positions. 
          This visualization tracks the <strong>Shopify Compounding Effect</strong>—how a single commerce hub 
          seeds dozens of high-value ventures across global markets.
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
          {activeRootKey === "shopify" ? (
            <span style={{ lineHeight: "1.5" }}>
              Shopify compounding tree dataset curated courtesy of Larry MacDonald (working copy of 81 companies, mid-2026). If any corrections are needed, send them to{" "}
              <a href="mailto:admin@unicornnorth.com" style={{ color: "var(--red)", textDecoration: "underline" }}>
                admin@unicornnorth.com
              </a>
              . Learn more in Larry MacDonald’s book,{" "}
              <a
                href="https://www.amazon.ca/Shopify-Story-commerce-Empowering-Entrepreneurs/dp/1770417494"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--red)", textDecoration: "underline" }}
              >
                The Shopify Story
              </a>
              .
            </span>
          ) : (
            <span>Source: Lineage data inspired by research from Doyletech Corporation.</span>
          )}
        </div>
      </div>
    </section>
  );
}

function filterBtnStyle(active: boolean, color: string): React.CSSProperties {
  return {
    padding: "0.35rem 0.75rem",
    borderRadius: "4px",
    border: active ? `1px solid ${color}` : "1px solid var(--border)",
    background: active ? color : "white",
    color: active ? "white" : "var(--navy)",
    fontFamily: "'Roboto Mono'",
    fontSize: "0.72rem",
    fontWeight: active ? 700 : 500,
    cursor: "pointer",
    transition: "all 0.15s ease"
  };
}
