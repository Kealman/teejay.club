import { createCommentInput } from "../inputs";

import { blockGuard } from "@/guards";
import { prisma } from "@/prisma";
import { t } from "@/trpc";

export const create = t.procedure
  .use(blockGuard)
  .input(createCommentInput)
  .mutation(async ({ input, ctx: { user } }) => {
    return prisma.comment.create({
      data: {
        ...input,
        authorId: user.id,
      },
    });
  });
