import { Prisma } from "@teejay/prisma-client";

export const select = () =>
  Prisma.validator<Prisma.UserSelect>()({
    id: true,
    name: true,
    avatar: true,
    isVerified: true,
    updatedAt: true,
    createdAt: true,
  });
