import { z } from "zod";

export const voteCommentInput = z.object({
  commentId: z.number().int().min(1),
  sign: z
    .number()
    .int()
    .min(-1)
    .max(1)
    .refine((value) => value !== 0),
});
