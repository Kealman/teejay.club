import { z } from "zod";

import { prisma } from "@/prisma";
import { t } from "@/trpc";

export const getOne = t.procedure
  .input(
    z.union([
      z.object({ id: z.number().int().min(1) }),
      z.object({ slug: z.string().min(3) }),
    ])
  )
  .query(async ({ input }) => {
    return prisma.subsite.findUniqueOrThrow({ where: input });
  });
