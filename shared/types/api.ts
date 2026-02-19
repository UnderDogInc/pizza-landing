/** Ответ API с опциональной обёрткой { data: T } */
export interface ApiDataResponse<T> {
  data?: T;
}

/** Структура ошибки в ответе API */
export interface ApiErrorBody {
  error?: { message?: string };
}

/** Ошибка fetch/HTTP с возможными полями */
export interface FetchError extends Error {
  statusCode?: number;
  status?: number;
  data?: ApiErrorBody;
}

export function getFetchStatus(error: unknown): number | undefined {
  const e = error as FetchError;
  return e?.statusCode ?? e?.status;
}

export function getApiErrorMessage(error: unknown, fallback: string): string {
  const e = error as FetchError;
  return e?.data?.error?.message ?? e?.message ?? fallback;
}
