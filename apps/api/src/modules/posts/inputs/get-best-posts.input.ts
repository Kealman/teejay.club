import { z } from "zod";

import { paginationInput } from "@/modules/common";

export const getBestPostsInput = paginationInput.merge(
  z
    .object({
      of: z.union([
        z.literal("today"),
        z.literal("yesterday"),
        z.literal("week"),
        z.literal("month"),
        z.literal("year"),
      ]),
      authorId: z.number().int().min(1),
    })
    .partial()
    .strict()
);
