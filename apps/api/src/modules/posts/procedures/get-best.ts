import { Prisma } from "@teejay/prisma-client";
import { startOfToday, subDays, subMonths, subWeeks, subYears } from "date-fns";

import { getBestPostsInput } from "../inputs";
import { select } from "../selector";

import { t } from "@/trpc";
import { paginatePosts } from "@/utilities";

export const getBest = t.procedure
  .input(getBestPostsInput)
  .query(({ input: { of, authorId, ...pagination }, ctx: { user } }) => {
    const where: Prisma.PostWhereInput = {
      authorId,
      isPublished: true,
      createdAt: {
        gte: {
          today: startOfToday(),
          day: subDays(new Date(), 1),
          week: subWeeks(new Date(), 1),
          month: subMonths(new Date(), 1),
          year: subYears(new Date(), 1),
        }[of],
      },
    };
    return paginatePosts({
      select: select(user?.id ?? -1),
      where: { OR: [{ isPinned: true, isPublished: true }, where] },
      orderBy: [{ isPinned: "desc" }, { score: "desc" }, { createdAt: "desc" }],
      ...pagination,
    });
  });
