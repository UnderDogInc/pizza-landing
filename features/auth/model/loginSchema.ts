import { z } from "zod/v3";

export const loginSchema = z
  .object({
    phone: z
      .string()
      .min(1, "Введите номер телефона")
      .transform((s) => s.replace(/\D/g, ""))
      .refine((s) => s.length >= 10 && s.length <= 11, "Некорректный номер телефона"),
    password: z
      .string()
      .min(1, "Введите пароль")
      .min(6, "Пароль не менее 6 символов"),
  });

export type LoginFormData = z.infer<typeof loginSchema>;
