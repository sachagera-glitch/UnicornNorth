import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UnicornNorth — The Definitive Canadian Tech Ecosystem Ledger",
  description:
    "Explore the 99 companies that define the Canadian tech ecosystem. From Toronto's AI surge to Ottawa's telecom legacy and Vancouver's biotech hubs, track $2.14 Trillion in aggregate peak value creation.",
  keywords: [
    "Canadian unicorns",
    "Toronto tech ecosystem",
    "Ottawa tech hubs",
    "Vancouver biotech",
    "Montreal AI",
    "Waterloo tech corridor",
    "venture capital Canada",
    "Canadian startup valuations",
    "Narwhal list Canada",
    "tech economic data Canada",
  ],
  authors: [{ name: "UnicornNorth Research" }],
  openGraph: {
    title: "UnicornNorth — The Canadian Tech Ecosystem Ledger",
    description:
      "99 companies. $2.14T CAD. The definitive chronicle of Canadian value creation across Toronto, Ottawa, Vancouver, and Montreal.",
    url: "https://unicornnorth.ca",
    siteName: "UnicornNorth",
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UnicornNorth — Canadian Tech Ledger",
    description: "Tracking the $2.14T evolution of the Canadian tech ecosystem.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,700&family=Roboto+Mono:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Dataset",
              "name": "UnicornNorth Canadian Tech Ecosystem Ledger",
              "description": "A comprehensive dataset of 99 Canadian unicorn companies representing $2.14T in aggregate peak valuation.",
              "url": "https://unicornnorth.ca",
              "keywords": "Canadian tech, Unicorns, Venture Capital, Toronto, Ottawa, Vancouver, Montreal",
              "creator": {
                "@type": "Organization",
                "name": "UnicornNorth"
              },
              "spatialCoverage": "Canada",
              "variableMeasured": ["Peak Valuation", "Industry", "HQ City", "Founding Year"]
            }),
          }}
        />
      </body>
    </html>
  );
}
