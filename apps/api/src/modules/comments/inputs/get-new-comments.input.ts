import { z } from "zod";

import { paginationInput } from "@/modules/common";

export const getNewCommentsInput = paginationInput.merge(
  z
    .object({
      postId: z.number().int().min(1),
      authorId: z.number().int().min(1),
    })
    .partial()
    .strict()
);
