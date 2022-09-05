import { z } from "zod";

export const signInInput = z
  .object({
    login: z
      .string({ required_error: "Это обязательное поле" })
      .min(5, "Логин должен быть не короче 5 символов")
      .trim(),
    password: z
      .string({ required_error: "Это обязательное поле" })
      .min(8, "Пароль должен быть не короче 8 символов")
      .trim(),
  })
  .strict();
