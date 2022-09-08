import { z } from "zod";

export const createCommentInput = z.object({
  postId: z.number().int().min(1),
  parentId: z.number().int().min(1).nullish(),
  content: z.string().min(3),
});
