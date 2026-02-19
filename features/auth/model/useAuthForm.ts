import { ref, reactive } from "vue";
import type { ZodIssue } from "zod/v3";
import { apiLogin } from "../api/authApi";
import { loginSchema } from "./loginSchema";
import { getApiErrorMessage } from "~/shared/types/api";

export interface UseAuthFormOptions {
  onSuccess?: () => void;
}

export function useAuthForm(options: UseAuthFormOptions = {}) {
  const { onSuccess } = options;
  const phone = reactive({ value: "", error: "" });
  const password = reactive({ value: "", error: "" });
  const formError = ref("");
  const isLoading = ref(false);

  function clearFieldErrors() {
    phone.error = "";
    password.error = "";
    formError.value = "";
  }

  function setErrorsFromZod(issues: ZodIssue[]) {
    phone.error = "";
    password.error = "";
    for (const issue of issues) {
      const path = issue.path[0];
      if (path === "phone") phone.error = issue.message;
      if (path === "password") password.error = issue.message;
    }
  }

  async function loginHandler() {
    clearFieldErrors();

    const result = loginSchema.safeParse({
      phone: phone.value,
      password: password.value,
    });

    if (!result.success) {
      setErrorsFromZod(result.error.issues);
      const firstMessage = result.error.issues[0]?.message;
      if (firstMessage) formError.value = firstMessage;
      return;
    }

    const data = result.data;
    let phoneNum = data.phone.replace(/\D/g, "");
    if (phoneNum.length === 10 && !phoneNum.startsWith("7")) phoneNum = `7${phoneNum}`;
    if (phoneNum.startsWith("8")) phoneNum = `7${phoneNum.slice(1)}`;

    try {
      isLoading.value = true;
      await apiLogin({
        phone: phoneNum,
        password: data.password,
      });
      if (onSuccess) onSuccess();
      else await navigateTo("/");
    } catch (err: unknown) {
      formError.value = getApiErrorMessage(err, "Неверный телефон или пароль");
      phone.error = "";
      password.error = "";
    } finally {
      isLoading.value = false;
    }
  }

  return {
    phone,
    password,
    formError,
    isLoading,
    clearFieldErrors,
    loginHandler,
  };
}
