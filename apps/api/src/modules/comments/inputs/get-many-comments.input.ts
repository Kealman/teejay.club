import { z } from "zod";

import { paginationInput } from "@/modules/common";

export const getManyCommentsInput = paginationInput.merge(
  z
    .object({
      postId: z.number().int().min(1),
      authorId: z.number().int().min(1),
      sort: z.union([z.literal("new"), z.literal("old")]).default("new"),
    })
    .partial()
    .strict()
);
