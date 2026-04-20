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
import ValueConcentration from "@/components/charts/ValueConcentration";

interface UnicornRow {
  id: number;
  companyName: string;
  hqCma: string | null;
  industry: string | null;
  firstUnicornDecade: string | null;
  peakValuationCad2025: string | null;
  companyStatus: string | null;
  isRevenueMultiplier: boolean;
  lastUpdated: Date;
}

interface CmaStatRow {
  cma: string;
  decade: string;
  unicornCount: number;
  unicornsPerMillionRes: string | null;
}

interface CuspRow {
  id: number;
  companyName: string;
  hqCma: string | null;
  sectorFocus: string | null;
  identifiedDate: Date;
}

interface Props {
  unicorns: UnicornRow[];
  cmaStats: CmaStatRow[];
  onCusp: CuspRow[];
}

export default function ClientPage({ unicorns, cmaStats, onCusp }: Props) {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");

  return (
    <CurrencyProvider>
      <Header />
      <HeroSection />
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      <main style={{ minHeight: "60vh" }}>
        {/* ── Overview Tab ─────────────────────────────────────────── */}
        {activeTab === "overview" && (
          <div className="animate-in">
            <LifetimeSummary
              totalUnicorns={101}
              aggregatePeak={2_150_700_000_000}
              dominantHub="Toronto CMA"
              dominantHubCount={34}
              highestPerCapita="Ottawa-Gatineau"
              highestPerCapitaRate="15.46"
              historicalPowerhouse="Ottawa-Gatineau CMA"
              historicalPowerhouseCount={23}
              highestIndividualPeak={768_600_000_000}
              highestIndividualName="Nortel / BNR"
            />
            <TechEras />
            <ValueEpochs />
            <IndustryLandscape data={unicorns} />
            <CmaRegionalSplit data={unicorns} />
          </div>
        )}

        {/* ── Vitality Tab ────────────────────────────────────────── */}
        {activeTab === "vitality" && (
          <VitalityTab />
        )}

        {/* ── Ledger Tab ──────────────────────────────────────────── */}
        {activeTab === "ledger" && (
          <div className="animate-in">
            <MasterLedger data={unicorns} />
            <ValueConcentration data={unicorns} />
          </div>
        )}

        {/* ── Regions Tab ─────────────────────────────────────────── */}
        {activeTab === "regions" && (
          <div className="animate-in">
            <CmaAggregates />
            <UnicornIntensity unicorns={unicorns} />
            <NarwhalFlow />
          </div>
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
          }}
        >
          The Canadian Technology Ecosystem Ledger · 1990–2026
        </div>
      </footer>
    </CurrencyProvider>
  );
}
