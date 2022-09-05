import { createCommentInput } from "../inputs";

import { authGuard } from "@/guards";
import { prisma } from "@/prisma";
import { t } from "@/trpc";

export const create = t.procedure
  .input(createCommentInput)
  .use(authGuard)
  .mutation(async ({ input, ctx: { user } }) => {
    return prisma.comment.create({
      data: {
        ...input,
        authorId: user.id,
      },
    });
  });
