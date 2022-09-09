import { TRPCError } from "@trpc/server";

import { prisma } from "@/prisma";
import { t } from "@/trpc";

export const blockGuard = t.middleware(async ({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Вы не авторизованы.",
    });
  }

  const user = await prisma.user.findUnique({
    where: { id: ctx.user.id },
    select: { blockedAt: true },
  });

  if (!user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Вы не авторизованы.",
    });
  }

  if (user.blockedAt) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Ваш аккаунт заблокирован.",
    });
  }

  return next({ ctx: { user: ctx.user } });
});
