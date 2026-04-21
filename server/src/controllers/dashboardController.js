const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getSummary = async (req, res) => {
  const userId = req.user.userId;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { name: true, lastName: true, email: true, level: true, xp: true, maxXp: true, streak: true }
    });

    // Tareas diarias
    const allTasks = await prisma.task.findMany({
      include: { category: true }
    });

    const completedTasksToday = await prisma.userTask.findMany({
      where: {
        userId,
        completed: true,
        date: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
          lt: new Date(new Date().setHours(23, 59, 59, 999))
        }
      },
      select: { taskId: true }
    });

    const completedTaskIds = completedTasksToday.map(ut => ut.taskId);

    // Actividad semanal (agrupada por da)
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      last7Days.push(d.toISOString().split('T')[0]);
    }

    const weeklyActions = await prisma.action.findMany({
      where: {
        userId,
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 7))
        }
      }
    });

    // Resumen de impacto
    const categories = await prisma.category.findMany();
    const impactSummary = {};
    for (const cat of categories) {
      const count = await prisma.action.count({
        where: { userId, categoryId: cat.id }
      });
      impactSummary[cat.name] = { count, label: cat.label };
    }

    // Todos los retos activos para la sección de comunidad
    const allChallenges = await prisma.challenge.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
      include: {
        userChallenges: {
          where: { userId }
        }
      }
    });

    const activeChallenge = allChallenges[0] || null;
    const userChallenge = activeChallenge && activeChallenge.userChallenges[0] ? activeChallenge.userChallenges[0] : null;

    res.json({
      user,
      tasks: allTasks.map(t => ({
        id: t.id,
        name: t.name,
        xp: t.xp,
        category: t.category.name,
        categoryIcon: t.category.icon,
        categoryName: t.category.label
      })),
      completedTaskIds,
      weeklyActivity: last7Days.map(dateStr => {
        const actionsForDay = weeklyActions.filter(a => a.createdAt.toISOString().split('T')[0] === dateStr);
        return {
          date: dateStr,
          xp: actionsForDay.reduce((sum, a) => sum + a.xpEarned, 0)
        };
      }),
      impactSummary,
      activeChallenge: activeChallenge ? {
        ...activeChallenge,
        isJoined: !!userChallenge?.isJoined,
        progress: userChallenge?.progress || 0
      } : null,
      allChallenges: allChallenges.map(c => ({
        ...c,
        isJoined: !!c.userChallenges[0]?.isJoined,
        progress: c.userChallenges[0]?.progress || 0
      }))
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRanking = async (req, res) => {
  try {
    const topUsers = await prisma.user.findMany({
      take: 10,
      orderBy: [
        { level: 'desc' },
        { xp: 'desc' }
      ],
      select: { 
        id: true,
        name: true,
        lastName: true,
        xp: true,
        level: true
      }
    });

    res.json(topUsers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
