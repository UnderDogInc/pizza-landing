import type { FetchOptions } from "ofetch";
import { getFetchStatus } from "~/shared/types/api";

function normalizeHeaders(
  defaultHeaders: Record<string, string>,
  incoming?: FetchOptions["headers"]
): Record<string, string> {
  const result: Record<string, string> = { ...defaultHeaders };
  if (!incoming) {
    return result;
  }

  if (incoming instanceof Headers) {
    incoming.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }

  if (Array.isArray(incoming)) {
    for (const [key, value] of incoming) {
      result[key] = value;
    }
    return result;
  }

  for (const [key, value] of Object.entries(incoming)) {
    result[key] = value;
  }

  return result;
}

export function useBackendRequest() {
  const config = useRuntimeConfig();
  const baseUrl = (config.public.catalogApiUrl ?? "") as string;

  const baseHeaders = computed<Record<string, string>>(() => {
    if (import.meta.server) {
      const forwarded = useRequestHeaders(["x-real-ip"]);
      if (forwarded["x-real-ip"]) {
        return { "x-real-ip": forwarded["x-real-ip"] };
      }
      return {};
    }

    return { "x-real-ip": "127.0.0.1" };
  });

  async function request<T>(
    path: string,
    options: FetchOptions = {}
  ): Promise<T> {
    try {
      return await $fetch<T>(`${baseUrl}${path}`, {
        credentials: "include",
        ...options,
        headers: normalizeHeaders(baseHeaders.value, options.headers),
      });
    } catch (error) {
      const statusCode = getFetchStatus(error);

      if (typeof statusCode === "number" && statusCode >= 500) {
        throw createError({
          statusCode: 404,
          statusMessage: "Страница не найдена",
          fatal: true,
        });
      }

      throw error;
    }
  }

  return {
    request,
  };
}
