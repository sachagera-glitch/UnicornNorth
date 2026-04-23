"use client";

import { useState } from "react";
import { CurrencyProvider } from "@/components/CurrencyContext";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TabNavigation, { type TabKey } from "@/components/TabNavigation";
import LifetimeSummary from "@/components/LifetimeSummary";
import MasterLedger from "@/components/MasterLedger";
import ValueEpochs from "@/components/charts/ValueEpochs";
import IntensityHeatmap from "@/components/charts/IntensityHeatmap";
import UnicornIntensity from "@/components/charts/UnicornIntensity";
import NarwhalFlow from "@/components/charts/NarwhalFlow";
import SuccessorRadar from "@/components/charts/SuccessorRadar";
import CmaAggregates from "@/components/CmaAggregates";
import OnTheCusp from "@/components/OnTheCusp";
import TechEras from "@/components/TechEras";
import VitalityTab from "@/components/VitalityTab";
import CmaRegionalSplit from "@/components/charts/CmaRegionalSplit";
import IndustryLandscape from "@/components/charts/IndustryLandscape";
import GoatFounders from "@/components/GoatFounders";
import LineageTab from "@/components/LineageTab";
import ValueConcentration from "@/components/charts/ValueConcentration";
import AboutUs from "@/components/AboutUs";

import { 
  type UnicornRow, 
  type CmaStatRow, 
  type CuspRow, 
  type CmaMetadataRow 
} from "@/types";

interface Props {
  unicorns: UnicornRow[];
  cmaStats: CmaStatRow[];
  onCusp: CuspRow[];
  cmaMetadata: CmaMetadataRow[];
}

export default function ClientPage({ unicorns, cmaStats, onCusp, cmaMetadata }: Props) {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");

  // ── Calculation Logic for Lifetime Summary ───────────────────────────
  
  // 1. Total Unicorns
  const totalUnicorns = unicorns.length;

  // 2. Aggregate Peak Value
  const aggregatePeak = unicorns.reduce((acc, u) => 
    acc + (parseFloat(u.peakValuationCad2025 || "0") * 1_000_000_000), 0
  );

  // 3. Dominant Hub (Total counts)
  const hubCounts = unicorns.reduce((acc, u) => {
    if (u.hqCma) acc[u.hqCma] = (acc[u.hqCma] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  let dominantHub = "Toronto";
  let dominantHubCount = 0;
  for (const [hub, count] of Object.entries(hubCounts)) {
    if (count > dominantHubCount) {
      dominantHub = hub;
      dominantHubCount = count;
    }
  }

  // 4. Highest Per-Capita (Using 2020s stats from DB)
  const stats2020s = cmaStats.filter(s => s.decade === "2020s");
  let highestPerCapita = "Ottawa-Gatineau";
  let highestPerCapitaRate = "0.00";
  for (const s of stats2020s) {
    if (parseFloat(s.unicornsPerMillionRes || "0") > parseFloat(highestPerCapitaRate)) {
      highestPerCapita = s.cma;
      highestPerCapitaRate = s.unicornsPerMillionRes || "0.00";
    }
  }

  // 5. Historical Powerhouse (Ottawa is the historical king)
  const ottawaStats = cmaStats.find(s => s.cma === "Ottawa-Gatineau" && s.decade === "2020s");
  const historicalPowerhouse = "Ottawa-Gatineau";
  const historicalPowerhouseCount = ottawaStats?.unicornCount || 0;

  // 6. Highest Individual Peak
  const highestIndividual = unicorns[0]; // Ordered by peak in page.tsx
  const highestIndividualPeak = parseFloat(highestIndividual?.peakValuationCad2025 || "0") * 1_000_000_000;
  const highestIndividualName = highestIndividual?.companyName || "Nortel / BNR";

  const hubCount = Object.keys(hubCounts).length;

  return (
    <CurrencyProvider>
      <Header />
      <HeroSection 
        totalUnicorns={totalUnicorns}
        aggregatePeak={aggregatePeak}
        hubCount={hubCount}
      />
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      <main style={{ minHeight: "60vh" }}>
        {/* ── Overview Tab ─────────────────────────────────────────── */}
        {activeTab === "overview" && (
          <div className="animate-in">
            <LifetimeSummary
              totalUnicorns={totalUnicorns}
              aggregatePeak={aggregatePeak}
              dominantHub={dominantHub}
              dominantHubCount={dominantHubCount}
              highestPerCapita={highestPerCapita}
              highestPerCapitaRate={highestPerCapitaRate}
              historicalPowerhouse={historicalPowerhouse}
              historicalPowerhouseCount={historicalPowerhouseCount}
              highestIndividualPeak={highestIndividualPeak}
              highestIndividualName={highestIndividualName}
            />
            <TechEras />
            <ValueEpochs />
            <IndustryLandscape data={unicorns} />
            <CmaRegionalSplit data={unicorns} />
          </div>
        )}

        {/* ── Vitality Tab ────────────────────────────────────────── */}
        {activeTab === "vitality" && (
          <VitalityTab unicorns={unicorns} cmaStats={cmaStats} />
        )}

        {/* ── Ledger Tab ──────────────────────────────────────────── */}
        {activeTab === "ledger" && (
          <div className="animate-in">
            <MasterLedger data={unicorns} />
            <ValueConcentration data={unicorns} />
          </div>
        )}

        {/* ── Tech Hubs Tab ─────────────────────────────────────────── */}
        {activeTab === "regions" && (
          <div className="animate-in">
            <CmaAggregates unicorns={unicorns} cmaMetadata={cmaMetadata} />
            <UnicornIntensity unicorns={unicorns} />
            <NarwhalFlow />
          </div>
        )}

        {activeTab === "lineage" && (
          <LineageTab />
        )}

        {activeTab === "founders" && (
          <GoatFounders />
        )}

        {/* ── Radar Tab ──────────────────────────────────────────── */}
        {activeTab === "radar" && (
          <div className="animate-in">
            <SuccessorRadar />
            <OnTheCusp data={onCusp} />
          </div>
        )}

        {activeTab === "about" && (
          <AboutUs />
        )}
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid var(--border)",
          padding: "2rem",
          textAlign: "center",
          background: "var(--navy)",
        }}
      >
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "0.95rem",
            fontWeight: 700,
            color: "var(--white)",
            marginBottom: "0.3rem",
          }}
        >
          Unicorn<span style={{ color: "var(--red)" }}>North</span>
        </div>
        <div
          style={{
            fontFamily: "'Roboto Mono'",
            fontSize: "0.6rem",
            color: "rgba(255,255,255,0.4)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginTop: "1rem",
            display: "flex",
            justifyContent: "center",
            gap: "1.5rem"
          }}
        >
          <span>The Canadian Technology Ecosystem Ledger · 1990–2026</span>
          <button 
            onClick={() => {
              setActiveTab("about");
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{ 
              background: "none", 
              border: "none", 
              color: "var(--white)", 
              cursor: "pointer", 
              textDecoration: "underline",
              fontSize: "0.6rem",
              textTransform: "uppercase",
              letterSpacing: "0.08em"
            }}
          >
            About Us
          </button>
          <a 
            href="mailto:admin@unicornnorth.com"
            style={{ 
              color: "var(--white)", 
              cursor: "pointer", 
              textDecoration: "underline",
              fontSize: "0.6rem",
              textTransform: "uppercase",
              letterSpacing: "0.08em"
            }}
          >
            Submit Feedback
          </a>
        </div>
      </footer>
    </CurrencyProvider>
  );
}
