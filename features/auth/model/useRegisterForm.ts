import { ref, reactive } from "vue";
import type { ZodIssue } from "zod/v3";
import { apiRegister } from "../api/authApi";
import { registerSchema } from "./registerSchema";
import { getApiErrorMessage } from "~/shared/types/api";

export interface UseRegisterFormOptions {
  onSuccess?: () => void;
}

export function useRegisterForm(options: UseRegisterFormOptions = {}) {
  const { onSuccess } = options;
  const phone = reactive({ value: "", error: "" });
  const name = reactive({ value: "", error: "" });
  const password = reactive({ value: "", error: "" });
  const confirmPassword = reactive({ value: "", error: "" });
  const formError = ref("");
  const isLoading = ref(false);

  function clearFieldErrors() {
    phone.error = "";
    name.error = "";
    password.error = "";
    confirmPassword.error = "";
    formError.value = "";
  }

  function setErrorsFromZod(issues: ZodIssue[]) {
    phone.error = "";
    name.error = "";
    password.error = "";
    confirmPassword.error = "";
    for (const issue of issues) {
      const path = String(issue.path[0]);
      if (path === "phone") phone.error = issue.message;
      if (path === "name") name.error = issue.message;
      if (path === "password") password.error = issue.message;
      if (path === "confirmPassword") confirmPassword.error = issue.message;
    }
  }

  async function registerHandler() {
    clearFieldErrors();

    const result = registerSchema.safeParse({
      phone: phone.value,
      name: name.value || undefined,
      password: password.value,
      confirmPassword: confirmPassword.value,
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
      await apiRegister({
        phone: phoneNum,
        password: data.password,
        ...(data.name ? { name: data.name } : {}),
      });
      if (onSuccess) onSuccess();
    } catch (err: unknown) {
      formError.value = getApiErrorMessage(err, "Ошибка регистрации. Попробуйте позже.");
    } finally {
      isLoading.value = false;
    }
  }

  return {
    phone,
    name,
    password,
    confirmPassword,
    formError,
    isLoading,
    clearFieldErrors,
    registerHandler,
  };
}
