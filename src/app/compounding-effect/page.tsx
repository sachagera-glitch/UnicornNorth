import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import ClientPage from "../ClientPage";
import { Unicorn, CmaDecadeStat } from "@prisma/client";

export const metadata: Metadata = {
  title: "The Compounding Effect — Canadian Tech Lineage Trees | UnicornNorth",
  description:
    "Explore the Compounding Effect across Canadian tech history: interactive lineage trees mapping hundreds of spinoffs, alumni startups, and unicorn ventures seeded by Shopify, Nortel & BNR, Cognos, and the NRC.",
  openGraph: {
    title: "The Compounding Effect — Canadian Tech Lineage Trees | UnicornNorth",
    description:
      "Explore the Compounding Effect across Canadian tech history: interactive lineage trees mapping hundreds of spinoffs, alumni startups, and unicorn ventures seeded by Shopify, Nortel & BNR, Cognos, and the NRC.",
    url: "https://www.unicornnorth.com/compounding-effect",
    siteName: "UnicornNorth",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Compounding Effect — Canadian Tech Lineage Trees",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  alternates: {
    canonical: "https://www.unicornnorth.com/compounding-effect",
  },
};

export default async function CompoundingEffectPage() {
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
      initialRootKey="shopify"
    />
  );
}
