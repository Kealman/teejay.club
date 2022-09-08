import { z } from "zod";

import { paginationInput } from "@/modules/common";

export const getTopPostsInput = paginationInput.merge(
  z
    .object({
      interval: z.union([
        z.literal("today"),
        z.literal("day"),
        z.literal("week"),
        z.literal("month"),
        z.literal("year"),
      ]),
      authorId: z.number().int().min(1).optional(),
      subsiteId: z.number().int().min(1).optional(),
    })
    .strict()
);
