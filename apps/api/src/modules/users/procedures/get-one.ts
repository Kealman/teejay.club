import { z } from "zod";

import { select } from "../selector";

import { prisma } from "@/prisma";
import { t } from "@/trpc";

export const getOne = t.procedure
  .input(z.object({ id: z.number().int().min(1) }).strict())
  .query(async ({ input: { id } }) => {
    return prisma.user.findFirstOrThrow({
      where: { id },
      select: select(),
    });
  });
