const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const unicorns = await prisma.unicorn.findMany({
    orderBy: { peakValuationCad2025: 'desc' },
  });
  console.log(JSON.stringify(unicorns, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
