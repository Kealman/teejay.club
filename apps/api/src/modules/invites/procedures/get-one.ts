import { z } from "zod";

import { select } from "../selector";

import { prisma } from "@/prisma";
import { t } from "@/trpc";

export const getOne = t.procedure
  .input(z.object({ code: z.string().length(64) }))
  .query(async ({ input: { code } }) => {
    return prisma.invite.findFirstOrThrow({
      where: { code, inviteeId: null },
      select: select(),
    });
  });
