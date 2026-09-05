import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import ClientPage from "../ClientPage";
import { Unicorn, CmaDecadeStat } from "@prisma/client";

export const metadata: Metadata = {
  title: "Shopify Compounding Effect | UnicornNorth",
  description: "Explore the Shopify Compounding Effect: a definitive mapping of the 81 high-value spin-offs, strategic investments, and alumni-founded ventures seeding the global tech ecosystem.",
  openGraph: {
    title: "Shopify Compounding Effect | UnicornNorth",
    description: "Explore the Shopify Compounding Effect: a definitive mapping of the 81 high-value spin-offs, strategic investments, and alumni-founded ventures seeding the global tech ecosystem.",
    url: "https://www.unicornnorth.com/shopify-compounding",
    siteName: "UnicornNorth",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Shopify Compounding Effect",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  alternates: {
    canonical: "https://www.unicornnorth.com/shopify-compounding",
  },
};

export default async function ShopifyCompoundingPage() {
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
