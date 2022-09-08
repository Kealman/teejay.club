import { z } from "zod";

import { paginationInput } from "@/modules/common";

export const getOneCommentInput = paginationInput.merge(
  z
    .object({
      id: z.number().int().min(1),
    })
    .partial()
    .strict()
);
