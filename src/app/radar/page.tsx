import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import ClientPage from "../ClientPage";
import { Unicorn, CmaDecadeStat } from "@prisma/client";

export const metadata: Metadata = {
  title: "The Successor Radar — Canadian Tech Companies On The Cusp | UnicornNorth",
  description:
    "Track the next wave of Canadian unicorns on the Successor Radar: high-growth Canadian technology companies valued between $400M and $1B CAD poised to become tomorrow's Narwhals.",
  openGraph: {
    title: "The Successor Radar — Canadian Tech Companies On The Cusp | UnicornNorth",
    description:
      "Track the next wave of Canadian unicorns on the Successor Radar: high-growth Canadian technology companies valued between $400M and $1B CAD poised to become tomorrow's Narwhals.",
    url: "https://www.unicornnorth.com/radar",
    siteName: "UnicornNorth",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Successor Radar — Canadian Tech Companies On The Cusp",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  alternates: {
    canonical: "https://www.unicornnorth.com/radar",
  },
};

export default async function RadarPage() {
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
      initialTab="radar"
    />
  );
}
