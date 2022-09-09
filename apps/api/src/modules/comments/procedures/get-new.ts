import { getNewCommentsInput } from "../inputs";
import { select } from "../selector";

import { t } from "@/trpc";
import { paginateComments } from "@/utilities";

export const getNew = t.procedure
  .input(getNewCommentsInput)
  .query(({ input: { postId, authorId, ...pagination }, ctx: { user } }) => {
    return paginateComments({
      select: select(user?.id ?? -1),
      where: {
        post: {
          id: postId,
          isPublished: true,
        },
        authorId,
      },
      orderBy: [{ createdAt: "asc" }],
      ...pagination,
    });
  });
