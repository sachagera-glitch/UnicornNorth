import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://unicornnorth.ca"),
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
  category: "Business & Finance",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "UnicornNorth — The Canadian Tech Ecosystem Ledger",
    description:
      "99 companies. $2.14T CAD. The definitive chronicle of Canadian value creation across Toronto, Ottawa, Vancouver, and Montreal.",
    url: "https://unicornnorth.ca",
    siteName: "UnicornNorth",
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: "/favicon.svg",
        width: 1200,
        height: 630,
        alt: "UnicornNorth Canadian Tech Ledger",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UnicornNorth — Canadian Tech Ledger",
    description: "Tracking the $2.14T evolution of the Canadian tech ecosystem.",
    images: ["/favicon.svg"],
  },
  other: {
    "geo.region": "CA",
    "geo.placename": "Canada",
    "dcterms.rightsHolder": "UnicornNorth",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-CA" className="h-full antialiased">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-6BSDZ1Y1E8"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-6BSDZ1Y1E8');
          `}
        </Script>
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
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "UnicornNorth",
                "url": "https://unicornnorth.ca",
                "description": "The Definitive Canadian Tech Ecosystem Ledger",
                "publisher": {
                  "@type": "Organization",
                  "name": "UnicornNorth",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://unicornnorth.ca/favicon.svg"
                  }
                }
              },
              {
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
                "spatialCoverage": {
                  "@type": "Place",
                  "name": "Canada"
                },
                "variableMeasured": ["Peak Valuation", "Industry", "HQ City", "Founding Year"]
              }
            ]),
          }}
        />
      </body>
    </html>
  );
}

