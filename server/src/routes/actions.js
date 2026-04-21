const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const auth = require('../middleware/auth');

router.post('/toggle-task', auth, async (req, res) => {
  const { taskId, xp } = req.body;
  const userId = req.user.userId;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  try {
    const existing = await prisma.userTask.findUnique({
      where: { userId_taskId_date: { userId, taskId, date: today } }
    });

    if (existing) {
      await prisma.userTask.delete({ where: { id: existing.id } });
      // In this system we don't subtract XP to keep it positive
      return res.json({ completed: false });
    }

    await prisma.userTask.create({
      data: { userId, taskId, completed: true, date: today }
    });

    // Subir de nivel logic
    const user = await prisma.user.findUnique({ where: { id: userId } });
    let newXp = user.xp + xp;
    let newLevel = user.level;
    let newMaxXp = user.maxXp;

    while (newXp >= newMaxXp) {
      newLevel += 1;
      newXp -= newMaxXp;
      newMaxXp = Math.floor(newMaxXp * 1.2);
    }

    await prisma.user.update({
      where: { id: userId },
      data: { xp: newXp, level: newLevel, maxXp: newMaxXp }
    });

    // Log the action for history
    const task = await prisma.task.findUnique({ where: { id: taskId }, include: { category: true } });
    await prisma.action.create({
      data: {
        userId,
        categoryId: task.categoryId,
        xpEarned: xp,
        description: task.name
      }
    });

    res.json({ completed: true, user: { xp: newXp, level: newLevel, maxXp: newMaxXp } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/log-manual', auth, async (req, res) => {
  const { categoryName, description, xp } = req.body;
  const userId = req.user.userId;

  try {
    const category = await prisma.category.findUnique({ where: { name: categoryName } });
    
    await prisma.action.create({
      data: {
        userId,
        categoryId: category.id,
        description,
        xpEarned: xp
      }
    });

    const user = await prisma.user.findUnique({ where: { id: userId } });
    let newXp = user.xp + xp;
    let newLevel = user.level;
    let newMaxXp = user.maxXp;

    while (newXp >= newMaxXp) {
      newLevel += 1;
      newXp -= newMaxXp;
      newMaxXp = Math.floor(newMaxXp * 1.2);
    }

    await prisma.user.update({
      where: { id: userId },
      data: { xp: newXp, level: newLevel, maxXp: newMaxXp }
    });

    res.json({ success: true, user: { xp: newXp, level: newLevel, maxXp: newMaxXp } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
