import { TRPCError } from "@trpc/server";

import { t } from "@/trpc";

export const authGuard = t.middleware(async ({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Вы не авторизованы.",
    });
  }
  return next({ ctx: { user: ctx.user } });
});
