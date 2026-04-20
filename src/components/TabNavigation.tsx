"use client";

export type TabKey = "overview" | "ledger" | "regions" | "radar" | "vitality" | "founders";

interface TabNavigationProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
}

const TABS: { key: TabKey; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "ledger", label: "Leadership Board" },
  { key: "regions", label: "Regions" },
  { key: "radar", label: "Radar" },
  { key: "vitality", label: "Vitality" },
  { key: "founders", label: "GOAT Founders" },
];

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div style={{ background: "var(--cream-light)", borderBottom: "2px solid var(--border)" }}>
      <nav className="tab-bar">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className={`tab-item ${activeTab === tab.key ? "active" : ""}`}
            onClick={() => onTabChange(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
