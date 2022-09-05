import { Prisma } from "@teejay/prisma-client";

import { prisma } from "@/prisma";

export const paginatePosts = async <T extends Prisma.PostFindManyArgs>(
  args: Prisma.SelectSubset<T, Prisma.PostFindManyArgs>
) => {
  if (args.cursor) {
    args.skip = (args?.skip ?? 0) + 1;
  }

  const data = await prisma.post.findMany<T>(args);
  const { where } = args;
  const total = await prisma.post.count({ where });
  const id = data[data.length - 1]?.id;
  const nextCursor = id ? { id } : undefined;
  const meta = { total, nextCursor };
  return { meta, data };
};

export const paginateComments = async <T extends Prisma.CommentFindManyArgs>(
  args: Prisma.SelectSubset<T, Prisma.CommentFindManyArgs>
) => {
  if (args.cursor) {
    args.skip = (args?.skip ?? 0) + 1;
  }

  const data = await prisma.comment.findMany<T>(args);
  const { where } = args;
  const total = await prisma.comment.count({ where });
  const id = data[data.length - 1]?.id;
  const nextCursor = id ? { id } : undefined;
  const meta = { total, nextCursor };
  return { meta, data };
};
