<script lang="ts" setup>
import { PhoneInput } from "#shared/ui";
import Button from "primevue/button";
import { apiLogout, useAuthModal, useCurrentUser, updateUser } from "#features/auth";
import { getApiErrorMessage } from "~/shared/types/api";

useHead({
  title: "Профиль — Pepe",
});

definePageMeta({
  layout: "default",
});

const { user, loading: userLoading, load: loadUser, clear: clearUser } = useCurrentUser();
const { open: openAuthModal } = useAuthModal();

const editForm = ref({ name: "", phone: "" });
const saveLoading = ref(false);
const saveError = ref("");
const logoutLoading = ref(false);

onMounted(() => {
  loadUser();
});

watch(
  user,
  (u) => {
    if (u) {
      editForm.value.name = u.name ?? "";
      editForm.value.phone = (u.phone ?? "").replace(/\D/g, "").replace(/^8/, "7") || "";
    }
  },
  { immediate: true }
);

async function saveProfile() {
  if (!user.value) return;
  saveError.value = "";
  saveLoading.value = true;
  try {
    const phoneDigits = editForm.value.phone.replace(/\D/g, "");
    const phoneNorm = phoneDigits.length === 10 ? "7" + phoneDigits : phoneDigits.startsWith("8") ? "7" + phoneDigits.slice(1) : phoneDigits;
    const updated = await updateUser(user.value.id, {
      name: editForm.value.name || undefined,
      phone: phoneNorm || undefined,
    });
    user.value = updated;
  } catch (err: unknown) {
    saveError.value = getApiErrorMessage(err, "Не удалось сохранить");
  } finally {
    saveLoading.value = false;
  }
}

async function handleLogout() {
  logoutLoading.value = true;
  try {
    await apiLogout();
    clearUser();
  } finally {
    logoutLoading.value = false;
  }
}

const inputClass =
  "w-full rounded-xl border border-dark-200 bg-white px-4 py-3 text-dark-900 placeholder:text-dark-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";
</script>

<template>
  <div class="mx-auto max-w-3xl px-4 py-8">
    <h1 class="mb-8 text-2xl font-bold tracking-tight text-white sm:text-3xl">
      Профиль
    </h1>

    <div v-if="userLoading" class="rounded-xl border border-white/20 bg-white/5 p-8 text-center text-white/80">
      Загрузка…
    </div>

    <template v-else-if="!user">
      <div class="rounded-xl border border-white/20 bg-white/5 p-8 text-center text-white/80">
        <p class="mb-4">Войдите в аккаунт, чтобы видеть профиль и историю заказов.</p>
        <Button
          label="Войти"
          class="!rounded-xl !border-0 !bg-primary !px-6 !py-2.5 !font-semibold !text-white hover:!bg-primary-600"
          @click="openAuthModal('login')"
        />
      </div>
    </template>

    <template v-else>
      <section class="mb-8">
        <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 class="text-xl font-bold tracking-tight text-white sm:text-2xl">
            Данные пользователя
          </h2>
          <Button
            label="Выйти"
            severity="secondary"
            :loading="logoutLoading"
            :disabled="logoutLoading"
            class="!rounded-xl !border-dark-200 !py-2.5"
            @click="handleLogout"
          />
        </div>
        <div class="rounded-xl border border-dark-100 bg-white p-6">
          <form class="space-y-4" @submit.prevent="saveProfile">
            <p v-if="saveError" class="rounded-lg bg-red-500/15 px-3 py-2 text-sm text-red-600">
              {{ saveError }}
            </p>
            <label class="block">
              <span class="mb-1 block text-sm font-medium text-dark-700">Имя</span>
              <input
                v-model="editForm.name"
                type="text"
                placeholder="Иван"
                :class="inputClass"
              />
            </label>
            <label class="block">
              <span class="mb-1 block text-sm font-medium text-dark-700">Телефон</span>
              <PhoneInput
                :model-value="editForm.phone"
                :class="inputClass"
                @update:model-value="(v) => (editForm.phone = v)"
              />
            </label>
            <Button
              type="submit"
              label="Сохранить"
              :loading="saveLoading"
              :disabled="saveLoading"
              class="!rounded-xl !border-0 !bg-primary !px-6 !py-2.5 !font-semibold !text-white hover:!bg-primary-600"
            />
          </form>
        </div>
      </section>

      <section>
        <h2 class="mb-4 text-xl font-bold tracking-tight text-white sm:text-2xl">
          История заказов
        </h2>
        <div class="rounded-xl border border-white/20 bg-white/5 p-8 text-center text-white/80">
          <p>Пока нет заказов.</p>
          <NuxtLink to="/" class="mt-2 inline-block font-medium text-primary hover:underline">
            Перейти в каталог
          </NuxtLink>
        </div>
      </section>
    </template>
  </div>
</template>
