import { Prisma } from "@teejay/prisma-client";
import {
  startOfMonth,
  startOfToday,
  startOfWeek,
  startOfYear,
  startOfYesterday,
} from "date-fns";

import { getBestPostsInput } from "../inputs";
import { select } from "../selector";

import { t } from "@/trpc";
import { paginatePosts } from "@/utilities";

export const getBest = t.procedure
  .input(getBestPostsInput)
  .query(({ input: { of, authorId, ...pagination }, ctx: { user } }) => {
    const where: Prisma.PostWhereInput = {
      isPublished: true,
      authorId,
    };

    if (of !== undefined) {
      where.createdAt = {
        gte: {
          today: startOfToday(),
          yesterday: startOfYesterday(),
          week: startOfWeek(new Date()),
          month: startOfMonth(new Date()),
          year: startOfYear(new Date()),
        }[of],
      };
    }

    return paginatePosts({
      select: select(user?.id ?? -1),
      where,
      orderBy: [{ isPinned: "desc" }, { score: "desc" }, { createdAt: "desc" }],
      ...pagination,
    });
  });
