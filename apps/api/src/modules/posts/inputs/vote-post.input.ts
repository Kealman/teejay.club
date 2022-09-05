import { z } from "zod";

export const votePostInput = z.object({
  postId: z.number().int().min(1),
  sign: z
    .number()
    .int()
    .min(-1)
    .max(1)
    .refine((value) => value !== 0),
});
