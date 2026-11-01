import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import ClientPage from "../ClientPage";
import { Unicorn, CmaDecadeStat } from "@prisma/client";

export const metadata: Metadata = {
  title: "About UnicornNorth — Honoring Canada's Tech Builders | UnicornNorth",
  description:
    "Learn about UnicornNorth's mission to document, recognize, and celebrate the founders and companies that shaped Canada's $2.22 Trillion technology ecosystem from 1990 to 2026.",
  openGraph: {
    title: "About UnicornNorth — Honoring Canada's Tech Builders | UnicornNorth",
    description:
      "Learn about UnicornNorth's mission to document, recognize, and celebrate the founders and companies that shaped Canada's $2.22 Trillion technology ecosystem from 1990 to 2026.",
    url: "https://www.unicornnorth.com/about",
    siteName: "UnicornNorth",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "About UnicornNorth",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  alternates: {
    canonical: "https://www.unicornnorth.com/about",
  },
};

export default async function AboutPage() {
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
      initialTab="about"
    />
  );
}
