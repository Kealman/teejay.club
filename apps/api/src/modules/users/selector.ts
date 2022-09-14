import { Prisma } from "@teejay/prisma-client";

export const select = () =>
  Prisma.validator<Prisma.UserSelect>()({
    id: true,
    name: true,
    avatarId: true,
    isVerified: true,
    blockedAt: true,
    updatedAt: true,
    createdAt: true,
  });
