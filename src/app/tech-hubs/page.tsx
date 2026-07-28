import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import ClientPage from "../ClientPage";
import { Unicorn, CmaDecadeStat } from "@prisma/client";

export const metadata: Metadata = {
  title: "Canadian Tech Hubs & Ecosystems | UnicornNorth",
  description: "Explore the intensity, flow, and density of Canadian tech hubs. View detailed ecosystem aggregates for Toronto, Montreal, Vancouver, Ottawa, Waterloo, and more.",
  openGraph: {
    title: "Canadian Tech Hubs & Ecosystems | UnicornNorth",
    description: "Explore the intensity, flow, and density of Canadian tech hubs. View detailed ecosystem aggregates for Toronto, Montreal, Vancouver, Ottawa, Waterloo, and more.",
    url: "https://www.unicornnorth.com/tech-hubs",
    siteName: "UnicornNorth",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Canadian Tech Hubs",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  alternates: {
    canonical: "https://www.unicornnorth.com/tech-hubs",
  },
};

export default async function TechHubsPage() {
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
      initialTab="regions"
    />
  );
}
