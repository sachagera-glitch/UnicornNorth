import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import ClientPage from "../ClientPage";
import { Unicorn, CmaDecadeStat } from "@prisma/client";

export const metadata: Metadata = {
  title: "Canadian Tech Ecosystem Vitality & Survival Analysis | UnicornNorth",
  description:
    "Analyze the vitality, survival spectrum, retention, and current status of Canada's 118 historical unicorns—from active public champions and private scale-ups to acquisitions and restructuring.",
  openGraph: {
    title: "Canadian Tech Ecosystem Vitality & Survival Analysis | UnicornNorth",
    description:
      "Analyze the vitality, survival spectrum, retention, and current status of Canada's 118 historical unicorns—from active public champions and private scale-ups to acquisitions and restructuring.",
    url: "https://www.unicornnorth.com/vitality",
    siteName: "UnicornNorth",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Canadian Tech Ecosystem Vitality & Survival Analysis",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  alternates: {
    canonical: "https://www.unicornnorth.com/vitality",
  },
};

export default async function VitalityPage() {
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
      initialTab="vitality"
    />
  );
}
