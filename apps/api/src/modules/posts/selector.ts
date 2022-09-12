import { Prisma } from "@teejay/prisma-client";

import { users, postVotes } from "@/modules";

export const select = (userId: number) =>
  Prisma.validator<Prisma.PostSelect>()({
    id: true,
    title: true,
    contentV1: true,
    contentV2: true,
    score: true,
    viewCount: true,
    isPinned: true,
    createdAt: true,
    updatedAt: true,
    subsite: true,
    author: { select: users.select() },
    votes: {
      where: { userId },
      select: postVotes.select(),
    },
    _count: { select: { comments: true } },
  });
