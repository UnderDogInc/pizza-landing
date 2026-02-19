import type { ApiDataResponse } from "~/shared/types/api";

export interface LoginDTO {
  phone: string;
  password: string;
}

export interface RegisterDTO {
  phone: string;
  password: string;
  name?: string;
}

export interface User {
  id: number;
  phone?: string;
  name?: string;
  email?: string;
  [key: string]: unknown;
}

export interface SessionResponse {
  [key: string]: unknown;
}

/** Ответ текущего пользователя: либо { data: User }, либо сам User */
export type CurrentUserResponse = ApiDataResponse<User> | User;
