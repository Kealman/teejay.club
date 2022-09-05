import { Prisma } from "@teejay/prisma-client";

export const select = () =>
  Prisma.validator<Prisma.CommentVoteSelect>()({
    id: true,
    sign: true,
  });
