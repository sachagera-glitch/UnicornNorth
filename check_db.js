const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const count = await prisma.unicorn.count();
  console.log('Total unicorns in DB:', count);
  
  const cusp = await prisma.companyOnCusp.count();
  console.log('Total cusp companies in DB:', cusp);
  
  const ottawaUnicornsCount = await prisma.unicorn.count({
    where: { hqCma: 'Ottawa-Gatineau' }
  });
  console.log('Ottawa-Gatineau unicorns in DB:', ottawaUnicornsCount);

  const ottawaCuspCount = await prisma.companyOnCusp.count({
    where: { hqCma: 'Ottawa-Gatineau' }
  });
  console.log('Ottawa-Gatineau cusp in DB:', ottawaCuspCount);
  
  const allUnicorns = await prisma.unicorn.findMany({
    orderBy: { peakValuationCad2025: 'desc' }
  });
  console.log('Unicorn peaks sum:', allUnicorns.reduce((acc, u) => acc + Number(u.peakValuationCad2025 || 0), 0));
  
  const tpUnicorn = await prisma.unicorn.findFirst({
    where: { companyName: { contains: 'turbopuffer', mode: 'insensitive' } }
  });
  console.log('Is Turbopuffer in unicorn table?', !!tpUnicorn);
  
  const tpCusp = await prisma.companyOnCusp.findFirst({
    where: { companyName: { contains: 'turbopuffer', mode: 'insensitive' } }
  });
  console.log('Is Turbopuffer in cusp table?', !!tpCusp);
}

main().catch(console.error).finally(() => prisma.$disconnect());
