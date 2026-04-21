"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

type Currency = "CAD" | "USD";

const USD_RATE = 0.72;

interface CurrencyContextType {
  currency: Currency;
  toggleCurrency: () => void;
  formatValue: (cadValue: number) => string;
  formatValueShort: (cadValue: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: "CAD",
  toggleCurrency: () => {},
  formatValue: () => "",
  formatValueShort: () => "",
});

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("CAD");

  const toggleCurrency = useCallback(() => {
    setCurrency((c) => (c === "CAD" ? "USD" : "CAD"));
  }, []);

  const formatValue = useCallback(
    (cadValue: number) => {
      const val = currency === "USD" ? cadValue * USD_RATE : cadValue;
      const prefix = currency === "USD" ? "$" : "$";
      const suffix = currency === "USD" ? " USD" : " CAD";

      if (val >= 1_000_000_000_000) {
        return `${prefix}${(val / 1_000_000_000_000).toFixed(2)}T${suffix}`;
      }
      if (val >= 1_000_000_000) {
        return `${prefix}${(val / 1_000_000_000).toFixed(1)}B${suffix}`;
      }
      if (val >= 1_000_000) {
        return `${prefix}${(val / 1_000_000).toFixed(1)}M${suffix}`;
      }
      return `${prefix}${val.toLocaleString()}B${suffix}`;
    },
    [currency]
  );

  const formatValueShort = useCallback(
    (cadValue: number) => {
      const val = currency === "USD" ? cadValue * USD_RATE : cadValue;
      const prefix = "$";

      if (val >= 1_000_000_000_000) {
        return `${prefix}${(val / 1_000_000_000_000).toFixed(1)}T`;
      }
      if (val >= 1_000_000_000) {
        return `${prefix}${(val / 1_000_000_000).toFixed(1)}B`;
      }
      if (val >= 1_000_000) {
        return `${prefix}${(val / 1_000_000).toFixed(0)}M`;
      }
      return `${prefix}${val.toLocaleString()}B`;
    },
    [currency]
  );

  return (
    <CurrencyContext.Provider
      value={{ currency, toggleCurrency, formatValue, formatValueShort }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
