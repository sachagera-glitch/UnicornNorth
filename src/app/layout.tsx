import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UnicornNorth — The Canadian Tech Ecosystem Ledger",
  description:
    "An institutional-grade digital ledger chronicling the structural evolution of Canadian technology from the hardware anchors of the 1990s to the AI and DeepTech leaders of 2026. 101 unicorns. $2.15 Trillion CAD in aggregate value.",
  keywords: [
    "Canadian unicorns",
    "tech ecosystem",
    "startup valuations",
    "Canadian technology",
    "Narwhals",
    "venture capital Canada",
  ],
  openGraph: {
    title: "UnicornNorth — The Canadian Tech Ecosystem Ledger",
    description:
      "101 companies. $2.15T CAD. The definitive chronicle of Canadian value creation.",
    siteName: "UnicornNorth",
    type: "website",
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
