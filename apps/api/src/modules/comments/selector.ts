import { Prisma } from "@teejay/prisma-client";

const additionalSelect = (userId: number) => ({
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
});

export const select = (userId: number) =>
  Prisma.validator<Prisma.CommentSelect>()({
    id: true,
    content: true,
    score: true,
    postId: true,
    parentId: true,
    createdAt: true,
    path: true,
    ...additionalSelect(userId),
    children: {
      include: {
        children: {
          include: {
            _count: { select: { children: true } },
            ...additionalSelect(userId),
            children: false,
          },
        },
        _count: { select: { children: true } },
        ...additionalSelect(userId),
      },
    },
    _count: { select: { children: true } },
  });
