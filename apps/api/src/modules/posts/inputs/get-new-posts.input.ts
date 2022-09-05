import { z } from "zod";

import { paginationInput } from "@/modules/common";

export const getNewPostsInput = paginationInput.merge(
  z
    .object({ authorId: z.number().int().min(1) })
    .partial()
    .strict()
);
