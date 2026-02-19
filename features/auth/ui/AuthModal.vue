<script lang="ts" setup>
import { PhoneInput } from "#shared/ui";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import { useAuthModal } from "../model/useAuthModal";
import { useAuthForm } from "../model/useAuthForm";
import { useCurrentUser } from "../model/useCurrentUser";
import { useRegisterForm } from "../model/useRegisterForm";
import type { AuthMode } from "../model/useAuthModal";

const { isOpen, mode, close, setMode } = useAuthModal();

const { load: loadCurrentUser } = useCurrentUser();
const { phone: loginPhone, password: loginPassword, formError: loginError, isLoading: loginLoading, loginHandler } = useAuthForm({
  onSuccess: async () => {
    await loadCurrentUser();
    close();
  },
});

const {
  phone: regPhone,
  name: regName,
  password: regPassword,
  confirmPassword: regConfirmPassword,
  formError: regError,
  isLoading: regLoading,
  registerHandler,
  clearFieldErrors: clearRegisterErrors,
} = useRegisterForm({
  onSuccess: async () => {
    await loadCurrentUser();
    close();
  },
});

function switchMode(value: AuthMode) {
  setMode(value);
  loginError.value = "";
  regError.value = "";
  clearRegisterErrors();
}

function onHide() {
  close();
}

const inputClass = "w-full rounded-xl border border-dark-200 bg-white px-4 py-3 text-dark-900 placeholder:text-dark-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";
const inputErrorClass = "border-red-500 focus:ring-red-500/20";
</script>

<template>
  <Dialog
    :visible="isOpen"
    modal
    :closable="true"
    :show-header="false"
    :dismissable-mask="true"
    :style="{ width: 'min(96vw, 420px)', borderRadius: '1rem' }"
    :content-style="{ padding: 0, overflow: 'hidden', borderRadius: '1rem' }"
    class="auth-modal"
    @update:visible="(v: boolean) => !v && onHide()"
  >
    <div class="p-6 sm:p-8">
      <div class="mb-6 flex rounded-xl bg-dark-100 p-1">
        <button
          type="button"
          class="flex-1 rounded-lg py-2.5 text-sm font-semibold transition-colors"
          :class="mode === 'register' ? 'bg-primary text-white' : 'text-dark-600 hover:text-dark-900'"
          @click="switchMode('register')"
        >
          Регистрация
        </button>
        <button
          type="button"
          class="flex-1 rounded-lg py-2.5 text-sm font-semibold transition-colors"
          :class="mode === 'login' ? 'bg-primary text-white' : 'text-dark-600 hover:text-dark-900'"
          @click="switchMode('login')"
        >
          Вход
        </button>
      </div>

      <!-- Регистрация -->
      <form v-if="mode === 'register'" class="space-y-4" @submit.prevent="registerHandler">
        <p v-if="regError" class="rounded-lg bg-red-500/15 px-3 py-2 text-sm text-red-600">
          {{ regError }}
        </p>
        <label class="block">
          <span class="mb-1 block text-sm font-medium text-dark-700">Телефон</span>
          <PhoneInput
            :model-value="regPhone.value"
            :class="inputClass"
            :error="!!regPhone.error"
            @update:model-value="(v) => (regPhone.value = v)"
          />
          <span v-if="regPhone.error" class="mt-1 block text-xs text-red-500">{{ regPhone.error }}</span>
        </label>
        <label class="block">
          <span class="mb-1 block text-sm font-medium text-dark-700">Имя (необязательно)</span>
          <input
            v-model="regName.value"
            type="text"
            placeholder="Иван"
            autocomplete="name"
            :class="inputClass"
          />
        </label>
        <label class="block">
          <span class="mb-1 block text-sm font-medium text-dark-700">Пароль</span>
          <input
            v-model="regPassword.value"
            type="password"
            placeholder="••••••••"
            autocomplete="new-password"
            :class="[inputClass, regPassword.error ? inputErrorClass : '']"
          />
          <span v-if="regPassword.error" class="mt-1 block text-xs text-red-500">{{ regPassword.error }}</span>
        </label>
        <label class="block">
          <span class="mb-1 block text-sm font-medium text-dark-700">Повторите пароль</span>
          <input
            v-model="regConfirmPassword.value"
            type="password"
            placeholder="••••••••"
            autocomplete="new-password"
            :class="[inputClass, regConfirmPassword.error ? inputErrorClass : '']"
          />
          <span v-if="regConfirmPassword.error" class="mt-1 block text-xs text-red-500">{{ regConfirmPassword.error }}</span>
        </label>
        <Button
          type="submit"
          label="Зарегистрироваться"
          :loading="regLoading"
          :disabled="regLoading"
          class="!w-full !rounded-xl !border-0 !bg-primary !py-3 !font-semibold !text-white hover:!bg-primary-600"
        />
      </form>

      <!-- Вход -->
      <form v-else class="space-y-4" @submit.prevent="loginHandler">
        <p v-if="loginError" class="rounded-lg bg-red-500/15 px-3 py-2 text-sm text-red-600">
          {{ loginError }}
        </p>
        <label class="block">
          <span class="mb-1 block text-sm font-medium text-dark-700">Телефон</span>
          <PhoneInput
            :model-value="loginPhone.value"
            :class="inputClass"
            :error="!!loginPhone.error"
            @update:model-value="(v) => (loginPhone.value = v)"
          />
          <span v-if="loginPhone.error" class="mt-1 block text-xs text-red-500">{{ loginPhone.error }}</span>
        </label>
        <label class="block">
          <span class="mb-1 block text-sm font-medium text-dark-700">Пароль</span>
          <input
            v-model="loginPassword.value"
            type="password"
            placeholder="••••••••"
            autocomplete="current-password"
            :class="[inputClass, loginPassword.error ? inputErrorClass : '']"
          />
          <span v-if="loginPassword.error" class="mt-1 block text-xs text-red-500">{{ loginPassword.error }}</span>
        </label>
        <Button
          type="submit"
          label="Войти"
          :loading="loginLoading"
          :disabled="loginLoading"
          class="!w-full !rounded-xl !border-0 !bg-primary !py-3 !font-semibold !text-white hover:!bg-primary-600"
        />
      </form>
    </div>
  </Dialog>
</template>
