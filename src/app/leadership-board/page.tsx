import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import ClientPage from "../ClientPage";
import { Unicorn, CmaDecadeStat } from "@prisma/client";

export const metadata: Metadata = {
  title: "Canadian Unicorn Leadership Board & Master Ledger | UnicornNorth",
  description:
    "Browse the complete master ledger and leadership board of all 118 Canadian $1B+ unicorn companies from 1990 to 2026, ranked by inflation-adjusted peak valuation, founding era, status, and tech hub.",
  openGraph: {
    title: "Canadian Unicorn Leadership Board & Master Ledger | UnicornNorth",
    description:
      "Browse the complete master ledger and leadership board of all 118 Canadian $1B+ unicorn companies from 1990 to 2026, ranked by inflation-adjusted peak valuation, founding era, status, and tech hub.",
    url: "https://www.unicornnorth.com/leadership-board",
    siteName: "UnicornNorth",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Canadian Unicorn Leadership Board",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  alternates: {
    canonical: "https://www.unicornnorth.com/leadership-board",
  },
};

export default async function LeadershipBoardPage() {
  const unicorns = await prisma.unicorn.findMany({
    orderBy: { peakValuationCad2025: "desc" },
  });

  const cmaStats = await prisma.cmaDecadeStat.findMany();
  const onCusp = await prisma.companyOnCusp.findMany();
  const cmaMetadata = await prisma.cmaMetadata.findMany();

  // Serialize Decimal to string for client components
  const serializedUnicorns = unicorns.map((u: Unicorn) => ({
    ...u,
    peakValuationCad2025: u.peakValuationCad2025?.toString() || null,
  }));

  const serializedCmaStats = cmaStats.map((s: CmaDecadeStat) => ({
    ...s,
    unicornsPerMillionRes: s.unicornsPerMillionRes?.toString() || null,
  }));

  return (
    <ClientPage
      unicorns={serializedUnicorns}
      cmaStats={serializedCmaStats}
      onCusp={onCusp}
      cmaMetadata={cmaMetadata}
      initialTab="ledger"
    />
  );
}
