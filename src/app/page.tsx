import { prisma } from "@/lib/prisma";
import ClientPage from "./ClientPage";

export default async function Home() {
  const unicorns = await prisma.unicorn.findMany({
    orderBy: { peakValuationCad2025: "desc" },
  });

  const cmaStats = await prisma.cmaDecadeStat.findMany();

  const onCusp = await prisma.companyOnCusp.findMany();

  // Serialize Decimal to string for client components
  const serializedUnicorns = unicorns.map((u) => ({
    ...u,
    peakValuationCad2025: u.peakValuationCad2025?.toString() || null,
  }));

  const serializedCmaStats = cmaStats.map((s) => ({
    ...s,
    unicornsPerMillionRes: s.unicornsPerMillionRes?.toString() || null,
  }));

  return (
    <ClientPage
      unicorns={serializedUnicorns}
      cmaStats={serializedCmaStats}
      onCusp={onCusp}
    />
  );
}
