import { createPostInput } from "../inputs";
import { select } from "../selector";

import { authGuard } from "@/guards";
import { prisma } from "@/prisma";
import { t } from "@/trpc";

export const create = t.procedure
  .input(createPostInput)
  .use(authGuard)
  .mutation(({ input: { title, content }, ctx: { user } }) => {
    return prisma.post.create({
      data: { title, content, authorId: user.id },
      select: select(user.id),
    });
  });
