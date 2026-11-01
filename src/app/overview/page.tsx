import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import ClientPage from "../ClientPage";
import { Unicorn, CmaDecadeStat } from "@prisma/client";

export const metadata: Metadata = {
  title: "Canadian Tech Ecosystem Overview | UnicornNorth",
  description:
    "Explore the macro overview of the Canadian technology ecosystem: 118 unicorn companies, $2.23 Trillion in aggregate peak value, four eras of Canadian tech, value epochs, and regional industry landscapes.",
  openGraph: {
    title: "Canadian Tech Ecosystem Overview | UnicornNorth",
    description:
      "Explore the macro overview of the Canadian technology ecosystem: 118 unicorn companies, $2.23 Trillion in aggregate peak value, four eras of Canadian tech, value epochs, and regional industry landscapes.",
    url: "https://www.unicornnorth.com/overview",
    siteName: "UnicornNorth",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Canadian Tech Ecosystem Overview",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  alternates: {
    canonical: "https://www.unicornnorth.com/overview",
  },
};

export default async function OverviewPage() {
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
      initialTab="overview"
    />
  );
}
