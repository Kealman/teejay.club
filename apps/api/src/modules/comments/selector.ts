import { Prisma } from "@teejay/prisma-client";

export const select = (userId: number) =>
  Prisma.validator<Prisma.CommentSelect>()({
    id: true,
    content: true,
    score: true,
    postId: true,
    parentId: true,
    createdAt: true,
    path: true,
    post: {
      select: {
        id: true,
        title: true,
      },
    },
    author: {
      select: {
        id: true,
        name: true,
        avatarId: true,
        isVerified: true,
      },
    },
    votes: {
      where: { userId },
      select: {
        id: true,
        sign: true,
      },
    },
    children: {
      include: {
        children: {
          include: {
            _count: { select: { children: true } },
            post: { select: { id: true, title: true } },
            author: { select: { id: true, name: true, isVerified: true } },
            votes: {
              where: { userId },
              select: { id: true, sign: true },
            },
          },
        },
        _count: { select: { children: true } },
        post: { select: { id: true, title: true } },
        author: { select: { id: true, name: true, isVerified: true } },
        votes: {
          where: { userId },
          select: { id: true, sign: true },
        },
      },
    },
    _count: { select: { children: true } },
  });
