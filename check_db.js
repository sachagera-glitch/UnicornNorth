const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  try {
    const industries = await prisma.unicorn.groupBy({
      by: ['industry'],
      _count: { industry: true }
    });
    console.log(JSON.stringify(industries, null, 2));
    
    const totalStats = await prisma.unicorn.aggregate({
      _count: true,
      _sum: { peakValuationCad2025: true }
    });
    console.log('TOTAL STATS:');
    console.log(JSON.stringify(totalStats, null, 2));

    const topTelecom = await prisma.unicorn.findMany({
      where: { OR: [{ industry: 'Telecom' }, { industry: 'Mobile' }] },
      orderBy: { peakValuationCad2025: 'desc' },
      take: 6
    });
    console.log('TOP TELECOM:');
    console.log(JSON.stringify(topTelecom, null, 2));

  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
    process.exit(0);
  }
}

run();
