import { z } from "zod";

export const createPostInput = z.object({
  title: z.string(),
  content: z.object({
    // TODO: add validation for every block
    blocks: z.array(z.any()),
  }),
  subsiteId: z.number().int().min(1).optional(),
});
