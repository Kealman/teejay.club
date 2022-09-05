import { z } from "zod";

import { select } from "../selector";

import { authGuard } from "@/guards";
import { prisma } from "@/prisma";
import { t } from "@/trpc";

export const getMe = t.procedure
  .use(authGuard)
  .input(z.void())
  .query(({ ctx }) => {
    return prisma.user.findUnique({
      where: { id: ctx.user.id },
      select: select(),
    });
  });
