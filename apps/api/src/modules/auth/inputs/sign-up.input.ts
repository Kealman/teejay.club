import { z } from "zod";

export const signUpInput = z.object({
  code: z
    .string({ required_error: "Это обязательное поле" })
    .trim()
    .length(64, "Неверный код"),
  login: z
    .string({ required_error: "Это обязательное поле" })
    .trim()
    .min(5, "Логин должен быть не короче 5 символов")
    .regex(
      /^[a-z0-9_]{5,}$/,
      "Логин может состоять только из латинских букв, цифр, и нижних подчеркиваний"
    ),
  name: z
    .string({ required_error: "Это обязательное поле" })
    .trim()
    .min(2, "Имя должно быть не короче 2 символов"),
  email: z
    .string({ required_error: "Это обязательное поле" })
    .trim()
    .email("Неверный эл. адрес")
    .optional(),
  password: z
    .string({ required_error: "Это обязательное поле" })
    .trim()
    .min(8, "Пароль должен быть не короче 8 символов"),
});
