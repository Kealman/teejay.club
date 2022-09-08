import { z } from "zod";

export const createPostInput = z.object({
  title: z.string(),
  content: z
    .string({ required_error: "Это поле обязательное" })
    .min(3, "Текст должен быть не короче 3 символов"),
  subsiteId: z.number().int().min(1).optional(),
});
