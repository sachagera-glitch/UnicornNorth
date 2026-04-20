"use client";

import { useCurrency } from "./CurrencyContext";

export default function Header() {
  const { currency, toggleCurrency } = useCurrency();

  return (
    <header
      style={{
        background: "var(--navy)",
        color: "var(--white)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 52,
        }}
      >
        {/* Wordmark */}
        <a
          href="/"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 800,
            fontSize: "1.15rem",
            color: "var(--white)",
            textDecoration: "none",
            letterSpacing: "-0.01em",
          }}
        >
          Unicorn<span style={{ color: "var(--red)" }}>North</span>
        </a>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
          <span
            style={{
              fontFamily: "'Roboto Mono'",
              fontSize: "0.6rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              opacity: 0.5,
            }}
          >
            Canadian Tech Ecosystem · 1990–2026
          </span>

          {/* Currency Toggle */}
          <button
            onClick={toggleCurrency}
            style={{
              fontFamily: "'Roboto Mono'",
              fontSize: "0.6rem",
              fontWeight: 600,
              letterSpacing: "0.06em",
              padding: "0.3rem 0.65rem",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: 4,
              background: currency === "USD" ? "var(--red)" : "transparent",
              color: "var(--white)",
              cursor: "pointer",
              transition: "all 0.2s",
              textTransform: "uppercase",
            }}
          >
            {currency}
          </button>
        </div>
      </div>
    </header>
  );
}
