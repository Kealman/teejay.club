import { createPostInput } from "../inputs";
import { select } from "../selector";

import { authGuard } from "@/guards";
import { prisma } from "@/prisma";
import { t } from "@/trpc";

export const create = t.procedure
  .use(authGuard)
  .input(createPostInput)
  .mutation(({ input: { title, content, subsiteId }, ctx: { user } }) => {
    return prisma.post.create({
      data: {
        title,
        content,
        authorId: user.id,
        subsiteId,
      },
      select: select(user.id),
    });
  });
