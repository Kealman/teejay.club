import { z } from "zod";

export const getOnePostInput = z.object({
  id: z.number().int().min(1),
});
