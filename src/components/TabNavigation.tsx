"use client";

import { useState, useEffect, useCallback } from "react";

export type TabKey = "overview" | "ledger" | "regions" | "lineage" | "radar" | "vitality" | "founders" | "about";

export const TAB_ROUTES: Record<TabKey, { label: string; href: string; title: string }> = {
  overview: {
    label: "Overview",
    href: "/overview",
    title: "Canadian Tech Ecosystem Overview | UnicornNorth",
  },
  ledger: {
    label: "Leadership Board",
    href: "/leadership-board",
    title: "Canadian Unicorn Leadership Board & Master Ledger | UnicornNorth",
  },
  regions: {
    label: "Tech Hubs",
    href: "/tech-hubs",
    title: "Canadian Tech Hubs & Ecosystems | UnicornNorth",
  },
  lineage: {
    label: "Compounding Effect",
    href: "/compounding-effect",
    title: "The Compounding Effect — Canadian Tech Lineage Trees | UnicornNorth",
  },
  radar: {
    label: "Radar",
    href: "/radar",
    title: "The Successor Radar — Canadian Tech Companies On The Cusp | UnicornNorth",
  },
  vitality: {
    label: "Vitality",
    href: "/vitality",
    title: "Canadian Tech Ecosystem Vitality & Survival Analysis | UnicornNorth",
  },
  founders: {
    label: "GOAT Founders",
    href: "/goat-founders",
    title: "GOAT Canadian Tech Founders | UnicornNorth",
  },
  about: {
    label: "About",
    href: "/about",
    title: "About UnicornNorth — Honoring Canada's Tech Builders | UnicornNorth",
  },
};

interface TabNavigationProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
}

const TABS: { key: TabKey; label: string; href: string }[] = [
  { key: "overview", label: "Overview", href: "/overview" },
  { key: "ledger", label: "Leadership Board", href: "/leadership-board" },
  { key: "regions", label: "Tech Hubs", href: "/tech-hubs" },
  { key: "lineage", label: "Compounding Effect", href: "/compounding-effect" },
  { key: "radar", label: "Radar", href: "/radar" },
  { key: "vitality", label: "Vitality", href: "/vitality" },
  { key: "founders", label: "GOAT Founders", href: "/goat-founders" },
  { key: "about", label: "About", href: "/about" },
];

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const activeTabLabel = TABS.find((t) => t.key === activeTab)?.label || "Menu";

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleSelect = useCallback((key: TabKey) => {
    onTabChange(key);
    setIsOpen(false);
  }, [onTabChange]);

  return (
    <>
      <div style={{ background: "var(--cream-light)", borderBottom: "2px solid var(--border)", position: "relative", zIndex: 20 }}>
        {/* Desktop Navigation — hidden on mobile via existing CSS class */}
        <nav className="tab-bar hidden-mobile">
          {TABS.map((tab) => (
            <a
              key={tab.key}
              href={tab.href}
              className={`tab-item ${activeTab === tab.key ? "active" : ""}`}
              style={{ textDecoration: "none" }}
              onClick={(e) => {
                if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && e.button === 0) {
                  e.preventDefault();
                  onTabChange(tab.key);
                }
              }}
            >
              {tab.label}
            </a>
          ))}
        </nav>

        {/* Mobile Navigation Trigger — hidden on desktop via existing CSS class */}
        <div className="hidden-desktop" style={{ display: undefined }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            padding: "0.75rem 1rem",
            gap: "0.75rem",
          }}>
            <button
              onClick={() => setIsOpen(true)}
              aria-label="Open navigation menu"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00204E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" x2="21" y1="6" y2="6" />
                <line x1="3" x2="21" y1="12" y2="12" />
                <line x1="3" x2="21" y1="18" y2="18" />
              </svg>
            </button>
            <span style={{
              fontFamily: "'Roboto Mono', monospace",
              fontSize: "0.8rem",
              fontWeight: 600,
              textTransform: "uppercase" as const,
              letterSpacing: "0.06em",
              color: "#00204E",
            }}>
              {activeTabLabel}
            </span>
          </div>
        </div>
      </div>

      {/* ── Full-screen Slide-out Drawer (portal-like, outside flow) ── */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 9999,
            display: "flex",
            animation: "mobileNavFadeIn 0.25s ease forwards",
          }}
        >
          {/* Scrim / backdrop */}
          <div
            onClick={() => setIsOpen(false)}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.45)",
            }}
          />

          {/* Drawer panel */}
          <div
            style={{
              position: "relative",
              width: "280px",
              maxWidth: "80vw",
              height: "100%",
              backgroundColor: "#FFFFFF",
              display: "flex",
              flexDirection: "column",
              boxShadow: "4px 0 30px rgba(0,0,0,0.15)",
              animation: "mobileNavSlideIn 0.3s cubic-bezier(0.16,1,0.3,1) forwards",
            }}
          >
            {/* Drawer header */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "1.25rem 1.25rem",
              borderBottom: "1px solid #EDE8DE",
              backgroundColor: "#FAF8F4",
              flexShrink: 0,
            }}>
              <span style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700,
                fontSize: "1.15rem",
                color: "#00204E",
              }}>
                Unicorn<span style={{ color: "#C41E3A" }}>North</span>
              </span>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close navigation menu"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#00204E",
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Tab list */}
            <nav style={{
              flex: 1,
              overflowY: "auto",
              padding: "0.5rem 0",
            }}>
              {TABS.map((tab) => {
                const isActive = activeTab === tab.key;
                return (
                  <a
                    key={tab.key}
                    href={tab.href}
                    onClick={(e) => {
                      if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && e.button === 0) {
                        e.preventDefault();
                        handleSelect(tab.key);
                      }
                    }}
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      textDecoration: "none",
                      padding: "0.9rem 1.25rem",
                      paddingLeft: isActive ? "calc(1.25rem - 4px)" : "1.25rem",
                      fontFamily: "'Roboto Mono', monospace",
                      fontSize: "0.82rem",
                      fontWeight: isActive ? 700 : 500,
                      textTransform: "uppercase" as const,
                      letterSpacing: "0.06em",
                      color: isActive ? "#C41E3A" : "#4A5568",
                      backgroundColor: isActive ? "#F5F0E8" : "transparent",
                      border: "none",
                      borderLeft: isActive ? "4px solid #C41E3A" : "4px solid transparent",
                      cursor: "pointer",
                      transition: "background-color 0.15s, color 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = "#FAF8F4";
                        e.currentTarget.style.color = "#00204E";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "#4A5568";
                      }
                    }}
                  >
                    {tab.label}
                  </a>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Keyframe animations (inline to avoid CSS compilation issues) */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes mobileNavSlideIn {
          from { transform: translateX(-100%); }
          to   { transform: translateX(0); }
        }
        @keyframes mobileNavFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}} />
    </>
  );
}
