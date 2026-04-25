"use client";

import { useState, useMemo } from "react";
import { useCurrency } from "./CurrencyContext";

import { type UnicornRow } from "@/types";

type SortField = "companyName" | "hqCma" | "peakValuationCad2025" | "companyStatus" | "founders" | "foundedYear" | "companyAgeYears";

function statusBadge(status: string | null) {
  const s = (status || "").toLowerCase();
  const cls =
    s === "public"
      ? "badge badge-public"
      : s === "private"
        ? "badge badge-private"
        : s === "acquired"
          ? "badge badge-acquired"
          : "badge badge-defunct";
  return <span className={cls}>{status}</span>;
}

export default function MasterLedger({ data }: { data: UnicornRow[] }) {
  const { formatValueShort, currency } = useCurrency();
  const [sortField, setSortField] = useState<SortField>("peakValuationCad2025");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterDecade, setFilterDecade] = useState<string>("all");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir(field === "peakValuationCad2025" ? "desc" : "asc");
    }
  };

  const sorted = useMemo(() => {
    let filtered = [...data];
    if (filterStatus !== "all") {
      filtered = filtered.filter(
        (u) => (u.companyStatus || "").toLowerCase() === filterStatus
      );
    }
    if (filterDecade !== "all") {
      filtered = filtered.filter((u) => u.firstUnicornDecade === filterDecade);
    }

    filtered.sort((a, b) => {
      let av: string | number = "";
      let bv: string | number = "";
      if (sortField === "peakValuationCad2025") {
        av = parseFloat(a.peakValuationCad2025 || "0");
        bv = parseFloat(b.peakValuationCad2025 || "0");
      } else if (sortField === "foundedYear" || sortField === "companyAgeYears") {
        av = a[sortField] || 0;
        bv = b[sortField] || 0;
      } else {
        av = (a[sortField] as string || "").toLowerCase();
        bv = (b[sortField] as string || "").toLowerCase();
      }
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [data, sortField, sortDir, filterStatus, filterDecade]);

  const sortIndicator = (field: SortField) =>
    sortField === field ? (sortDir === "asc" ? " ↑" : " ↓") : "";

  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="section-header">
        <h2>Leadership Board</h2>
        <div className="divider" />
        <p>
          The definitive ranking of Canadian companies by inflation-adjusted peak valuation.
        </p>
      </div>

      {/* Filters */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          marginBottom: "1.5rem",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <div className="data-label" style={{ marginRight: "0.5rem" }}>
          Filter:
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{
            fontFamily: "'Roboto Mono', monospace",
            fontSize: "0.7rem",
            padding: "0.4rem 0.75rem",
            border: "1px solid var(--border)",
            borderRadius: 2,
            background: "var(--paper)",
            color: "var(--navy)",
            cursor: "pointer",
          }}
        >
          <option value="all">All Status</option>
          <option value="public">Public</option>
          <option value="private">Private</option>
          <option value="acquired">Acquired</option>
          <option value="defunct">Defunct</option>
        </select>
        <select
          value={filterDecade}
          onChange={(e) => setFilterDecade(e.target.value)}
          title="Filter by decade of peak valuation"
          style={{
            fontFamily: "'Roboto Mono', monospace",
            fontSize: "0.7rem",
            padding: "0.4rem 0.75rem",
            border: "1px solid var(--border)",
            borderRadius: 2,
            background: "var(--paper)",
            color: "var(--navy)",
            cursor: "pointer",
          }}
        >
          <option value="all">All Peak Decades**</option>
          <option value="1980s">1980s Peak</option>
          <option value="1990s">1990s Peak</option>
          <option value="2000s">2000s Peak</option>
          <option value="2010s">2010s Peak</option>
          <option value="2020s">2020s Peak</option>
        </select>
        <div
          className="data-label"
          style={{ marginLeft: "auto" }}
        >
          {sorted.length} of {data.length} companies
        </div>
      </div>

      <div style={{
        marginBottom: "1rem",
        fontSize: "0.65rem",
        fontFamily: "'Roboto Mono'",
        color: "var(--text-secondary)",
        opacity: 0.8,
        letterSpacing: "0.02em",
        textAlign: "left"
      }}>
        * Inflation adjusted to 2025 CAD based on peak market cap.<br/>
        ** Decades indicate when this peak was achieved.<br/>
        *** For private companies, valuations are estimated based on ecosystem research.
      </div>

      {/* Table */}
      <div className="scroll-x" style={{ background: "var(--white)", borderRadius: 8, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: "40px" }}>#</th>
              <th onClick={() => handleSort("companyName")}>
                Company{sortIndicator("companyName")}
              </th>
              <th onClick={() => handleSort("founders")}>
                Founders{sortIndicator("founders")}
              </th>
              <th onClick={() => handleSort("hqCma")}>
                HQ or Founded City{sortIndicator("hqCma")}
              </th>
              <th onClick={() => handleSort("foundedYear")} style={{ textAlign: "center" }}>
                Founded{sortIndicator("foundedYear")}
              </th>
              <th onClick={() => handleSort("companyAgeYears")} style={{ textAlign: "center" }}>
                Age{sortIndicator("companyAgeYears")}
              </th>
              <th onClick={() => handleSort("peakValuationCad2025")} style={{ textAlign: "right" }}>
                Adj. Peak ($B)*{sortIndicator("peakValuationCad2025")}
              </th>
              <th onClick={() => handleSort("companyStatus")}>
                Status***{sortIndicator("companyStatus")}
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((u, i) => (
              <tr key={u.id}>
                <td style={{ 
                  fontFamily: "'Roboto Mono'", 
                  fontSize: "0.75rem", 
                  color: "var(--slate-light)",
                  fontWeight: 600 
                }}>
                  {i + 1}
                </td>
                <td>
                  <span className="company-name">{u.companyName}</span>
                  {u.isRevenueMultiplier && (
                    <span className="revenue-flag" title="5x revenue multiplier">
                      ★
                    </span>
                  )}
                </td>
                <td style={{ 
                  color: "var(--slate)", 
                  fontSize: "0.75rem",
                  fontFamily: "'Inter', sans-serif"
                }}>
                  {u.founders}
                </td>
                <td style={{ color: "var(--slate)" }}>{u.hqCma}</td>
                <td style={{ textAlign: "center", color: "var(--slate-light)", fontSize: "0.75rem", fontFamily: "'Roboto Mono'" }}>
                  {u.foundedYear}
                </td>
                <td style={{ textAlign: "center", fontWeight: 600, color: "var(--navy)", fontSize: "0.75rem", fontFamily: "'Roboto Mono'" }}>
                  {u.companyAgeYears}
                </td>
                <td
                  className="data-value"
                  style={{ textAlign: "right", fontSize: "0.85rem" }}
                >
                  {formatValueShort(parseFloat(u.peakValuationCad2025 || "0"))}
                </td>
                <td>{statusBadge(u.companyStatus)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        className="data-label"
        style={{ marginTop: "1rem", textAlign: "right" }}
      >
        ★ = 5x revenue multiplier estimate
      </div>
    </section>
  );
}
