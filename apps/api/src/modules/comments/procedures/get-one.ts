import { getOneCommentInput } from "../inputs";
import { select } from "../selector";

import { t } from "@/trpc";
import { paginateComments } from "@/utilities";

export const getOne = t.procedure
  .input(getOneCommentInput)
  .query(({ input: { id, ...pagination }, ctx: { user } }) => {
    return paginateComments({
      select: select(user?.id ?? -1),
      where: {
        id,
      },
      orderBy: [{ createdAt: "desc" }],
      ...pagination,
    });
  });
