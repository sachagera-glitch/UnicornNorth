const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const unicorns = await prisma.unicorn.findMany();
  
  const cmaCounts = {};
  unicorns.forEach(u => {
    const cma = u.hqCma || 'Unknown';
    cmaCounts[cma] = (cmaCounts[cma] || 0) + 1;
  });

  console.log('CMA Counts:', JSON.stringify(cmaCounts, null, 2));
}

main();
