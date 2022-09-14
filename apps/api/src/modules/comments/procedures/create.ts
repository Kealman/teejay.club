import { createCommentInput } from "../inputs";

import { blockGuard } from "@/guards";
import { prisma } from "@/prisma";
import { t } from "@/trpc";

export const create = t.procedure
  .use(blockGuard)
  .input(createCommentInput)
  .mutation(async ({ input, ctx: { user } }) => {
    let path = null;
    if (input.parentId) {
      const parent = await prisma.comment.findUnique({
        where: { id: input.parentId },
        select: { id: true, path: true },
      });
      if (!parent) {
        throw new Error("Parent comment not found");
      }

      if (parent.path) {
        path = parent.path + "." + parent.id;
      } else {
        path = parent.id.toString();
      }
    }
    return prisma.comment.create({
      data: {
        ...input,
        path,
        authorId: user.id,
      },
    });
  });
