const { PrismaClient } = require('@prisma/client');
const path = require('path');
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({ select: { name: true, email: true } });
  console.log('--- VERIFICACIÓN DE DB ---');
  console.log('Ruta del script:', __filename);
  console.log('Directorio actual:', process.cwd());
  console.log('Total usuarios encontrados:', users.length);
  console.table(users);
}

main().finally(() => prisma.$disconnect());
