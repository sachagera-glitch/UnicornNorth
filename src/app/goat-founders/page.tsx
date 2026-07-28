import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import ClientPage from "../ClientPage";
import { Unicorn, CmaDecadeStat } from "@prisma/client";

export const metadata: Metadata = {
  title: "GOAT Canadian Tech Founders | UnicornNorth",
  description: "Discover the top 20 Greatest Of All Time (GOAT) Canadian tech founders who built the $2.17 Trillion Canadian tech ecosystem.",
  openGraph: {
    title: "GOAT Canadian Tech Founders | UnicornNorth",
    description: "Discover the top 20 Greatest Of All Time (GOAT) Canadian tech founders who built the $2.17 Trillion Canadian tech ecosystem.",
    url: "https://www.unicornnorth.com/goat-founders",
    siteName: "UnicornNorth",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GOAT Canadian Tech Founders",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  alternates: {
    canonical: "https://www.unicornnorth.com/goat-founders",
  },
};

export default async function GoatFoundersPage() {
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
      initialTab="founders"
    />
  );
}
