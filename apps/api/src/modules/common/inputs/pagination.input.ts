import { z } from "zod";

export const paginationInput = z
  .object({
    take: z.number().int().min(1).max(20).default(20),
    skip: z.number().int().min(0).default(0),
    cursor: z.object({ id: z.number().int().min(1) }).optional(),
  })
  .strict();
