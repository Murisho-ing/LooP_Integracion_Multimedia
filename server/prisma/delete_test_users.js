const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Eliminando usuarios de prueba...');

  const deleted = await prisma.user.deleteMany({
    where: {
      email: {
        endsWith: '@test.com'
      }
    }
  });

  console.log(`✅ Se eliminaron ${deleted.count} usuarios de prueba.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
