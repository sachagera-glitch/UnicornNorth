import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import ClientPage from "../ClientPage";
import { Unicorn, CmaDecadeStat } from "@prisma/client";

export const metadata: Metadata = {
  title: "NRC Compounding Effect | UnicornNorth",
  description: "Explore the NRC Compounding Effect: how the National Research Council seeded deep-tech spinoffs in defence, aerospace, and computing.",
  openGraph: {
    title: "NRC Compounding Effect | UnicornNorth",
    description: "Explore the NRC Compounding Effect: how the National Research Council seeded deep-tech spinoffs in defence, aerospace, and computing.",
    url: "https://www.unicornnorth.com/nrc-compounding",
    siteName: "UnicornNorth",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NRC Compounding Effect",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  alternates: {
    canonical: "https://www.unicornnorth.com/nrc-compounding",
  },
};

export default async function NrcCompoundingPage() {
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
      initialTab="lineage"
      initialRootKey="nrc_gov"
    />
  );
}
