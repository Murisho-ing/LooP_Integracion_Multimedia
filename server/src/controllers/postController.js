const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: {
          select: { id: true, name: true, lastName: true }
        },
        _count: {
          select: { likes: true, comments: true }
        },
        likes: {
          where: { userId: req.user.userId },
          select: { id: true }
        },
        comments: {
          include: {
            user: {
              select: { name: true, lastName: true }
            }
          },
          orderBy: { createdAt: 'asc' }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    const formattedPosts = posts.map(p => ({
      ...p,
      likesCount: p._count.likes,
      commentsCount: p._count.comments,
      isLiked: p.likes.length > 0
    }));

    res.json(formattedPosts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createPost = async (req, res) => {
  const { content } = req.body;
  const userId = req.user.userId;

  if (!content || content.trim() === '') {
    return res.status(400).json({ error: 'El contenido no puede estar vacío' });
  }

  try {
    const newPost = await prisma.post.create({
      data: {
        content,
        userId
      },
      include: {
        user: {
          select: { id: true, name: true, lastName: true }
        }
      }
    });
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.toggleLike = async (req, res) => {
  const postId = parseInt(req.params.id);
  const userId = req.user.userId;

  try {
    const existingLike = await prisma.like.findUnique({
      where: {
        postId_userId: { postId, userId }
      }
    });

    if (existingLike) {
      await prisma.like.delete({
        where: { id: existingLike.id }
      });
      return res.json({ liked: false });
    } else {
      await prisma.like.create({
        data: { postId, userId }
      });
      return res.json({ liked: true });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.addComment = async (req, res) => {
  const postId = parseInt(req.params.id);
  const userId = req.user.userId;
  const { content } = req.body;

  if (!content || content.trim() === '') {
    return res.status(400).json({ error: 'El comentario no puede estar vacío' });
  }

  try {
    const comment = await prisma.comment.create({
      data: {
        content,
        postId,
        userId
      },
      include: {
        user: {
          select: { name: true, lastName: true }
        }
      }
    });
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
