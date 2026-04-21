const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Categorias
  const categories = [
    { name: 'reutilizar', label: 'Reutilizar', icon: '♻️' },
    { name: 'reducir', label: 'Reducir', icon: '📉' },
    { name: 'reciclar', label: 'Reciclar', icon: '🗑️' },
    { name: 'reparar', label: 'Reparar', icon: '🔧' },
    { name: 'intercambiar', label: 'Intercambiar', icon: '🔄' },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { name: cat.name },
      update: {},
      create: cat,
    });
  }

  const reutilizar = await prisma.category.findUnique({ where: { name: 'reutilizar' } });
  const reducir = await prisma.category.findUnique({ where: { name: 'reducir' } });
  const reciclar = await prisma.category.findUnique({ where: { name: 'reciclar' } });
  const reparar = await prisma.category.findUnique({ where: { name: 'reparar' } });

  // Tareas iniciales
  const tasks = [
    { name: 'Llevar bolsa reutilizable al supermercado', xp: 50, categoryId: reutilizar.id },
    { name: 'Reducir tiempo de ducha a 5 minutos', xp: 30, categoryId: reducir.id },
    { name: 'Separar residuos orgánicos e inorgánicos', xp: 40, categoryId: reciclar.id },
    { name: 'Reparar prenda de ropa en lugar de comprar nueva', xp: 60, categoryId: reparar.id },
  ];

  for (const t of tasks) {
    await prisma.task.create({ data: t });
  }

  // Reto Semanal
  await prisma.challenge.create({
    data: {
      title: 'Reduce el Consumo de Plástico',
      description: 'Evita usar bolsas, botellas o cualquier objeto plástico que no necesites en tu día a día.',
      xpReward: 500,
    }
  });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
