import type { CurrentUserResponse, LoginDTO, RegisterDTO, User } from "../model/types";
import { useBackendRequest } from "~/shared/api/useBackendRequest";

function isUser(value: unknown): value is User {
  return value != null && typeof (value as User).id === "number";
}

function parseCurrentUserResponse(res: CurrentUserResponse): User | null {
  const raw = "data" in res && res.data != null ? res.data : res;
  return isUser(raw) ? raw : null;
}

export async function apiLogin(data: LoginDTO): Promise<unknown> {
  const { request } = useBackendRequest();
  return request<unknown>("/api/session/login", {
    method: "POST",
    body: data,
  });
}

export async function apiRegister(data: RegisterDTO): Promise<unknown> {
  const { request } = useBackendRequest();
  return request<unknown>("/api/account/create", {
    method: "POST",
    body: data,
  });
}

export async function getCurrentUser(): Promise<User | null> {
  const { request } = useBackendRequest();
  try {
    const res = await request<CurrentUserResponse>("/api/session/current-user");
    return parseCurrentUserResponse(res);
  } catch {
    return null;
  }
}

export async function apiLogout(): Promise<unknown> {
  const { request } = useBackendRequest();
  return request<unknown>("/api/session/logout", {
    method: "POST",
  });
}

export async function updateUser(id: number, data: Partial<Pick<User, "name" | "phone">>): Promise<User> {
  const { request } = useBackendRequest();
  return request<User>(`/api/account/${id}`, {
    method: "PATCH",
    body: data,
  });
}
