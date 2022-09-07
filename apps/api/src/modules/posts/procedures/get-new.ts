import { getNewPostsInput } from "../inputs";

import { posts } from "@/modules";
import { t } from "@/trpc";
import { paginatePosts } from "@/utilities";

export const getNew = t.procedure
  .input(getNewPostsInput)
  .query(({ input: { authorId, ...pagination }, ctx: { user } }) => {
    return paginatePosts({
      where: { authorId, isPublished: true },
      select: posts.select(user?.id ?? -1),
      orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
      ...pagination,
    });
  });
