import { z } from "zod/v3";

export const registerSchema = z
  .object({
    phone: z
      .string()
      .min(1, "Введите номер телефона")
      .transform((s) => s.replace(/\D/g, ""))
      .refine((s) => s.length >= 10 && s.length <= 11, "Некорректный номер телефона"),
    name: z.string().optional(),
    password: z
      .string()
      .min(1, "Введите пароль")
      .min(6, "Пароль не менее 6 символов"),
    confirmPassword: z.string().min(1, "Повторите пароль"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
