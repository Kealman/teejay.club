import { Prisma } from "@teejay/prisma-client";

export const select = () =>
  Prisma.validator<Prisma.PostVoteSelect>()({
    id: true,
    sign: true,
  });
