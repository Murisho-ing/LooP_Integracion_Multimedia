const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({
    select: { name: true, email: true, xp: true }
  });
  console.log('--- USUARIOS EN DB ---');
  console.table(users);
}

main().finally(() => prisma.$disconnect());
