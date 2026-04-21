const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('test1234', 10);

  const usersData = [
    { name: 'Mariana', lastName: 'Rodríguez', email: 'mariana@test.com', xp: 4850, level: 24, streak: 12 },
    { name: 'Carlos', lastName: 'Mendoza', email: 'carlos@test.com', xp: 3200, level: 16, streak: 8 },
    { name: 'Laura', lastName: 'García', email: 'laura@test.com', xp: 2150, level: 11, streak: 5 },
    { name: 'Diego', lastName: 'Sánchez', email: 'diego@test.com', xp: 1800, level: 9, streak: 3 },
    { name: 'Ana', lastName: 'Pérez', email: 'ana@test.com', xp: 950, level: 5, streak: 0 },
    { name: 'Jorge', lastName: 'López', email: 'jorge@test.com', xp: 450, level: 3, streak: 2 },
    { name: 'Sofía', lastName: 'Vargas', email: 'sofia@test.com', xp: 150, level: 1, streak: 1 },
  ];

  console.log('Creando usuarios de prueba...');

  for (const data of usersData) {
    await prisma.user.upsert({
      where: { email: data.email },
      update: data,
      create: {
        ...data,
        password: password,
      },
    });
  }

  console.log('✅ Usuarios creados con éxito.');
  console.log('🔑 Contraseña para todos los usuarios: test1234');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
