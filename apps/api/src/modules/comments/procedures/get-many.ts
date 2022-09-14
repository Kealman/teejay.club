import { getManyCommentsInput } from "../inputs";
import { select } from "../selector";

import { t } from "@/trpc";
import { paginateComments } from "@/utilities";

export const getMany = t.procedure
  .input(getManyCommentsInput)
  .query(
    ({ input: { postId, authorId, sort, ...pagination }, ctx: { user } }) => {
      return paginateComments({
        select: select(user?.id ?? -1),
        where: {
          post: {
            id: postId,
            isPublished: true,
          },
          parentId: null,
          authorId,
        },
        orderBy: [{ createdAt: sort === "new" ? "desc" : "asc" }],
        ...pagination,
      });
    }
  );
