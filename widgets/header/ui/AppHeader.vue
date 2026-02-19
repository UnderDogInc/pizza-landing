<script lang="ts" setup>
import { useAuthModal, useCurrentUser } from "#features/auth";
import Button from "primevue/button";

const { open: openAuthModal } = useAuthModal();
const { user, load: loadUser } = useCurrentUser();

onMounted(() => {
  loadUser();
});
</script>

<template>
  <header class="sticky top-0 z-[100] w-full border-b border-white/10 bg-[rgba(15,40,24,0.95)] backdrop-blur-md">
    <div
      class="mx-auto flex h-14 max-w-[1400px] items-center justify-between gap-4 px-6 sm:h-16 sm:px-8 lg:px-8"
    >
      <NuxtLink
        to="/"
        class="mr-4 flex flex-nowrap items-center gap-3 shrink-0 text-white no-underline"
      >
        <div
          class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-lg font-bold sm:h-12 sm:w-12"
        >
          <span>🍕</span>
        </div>
        <div class="flex shrink-0 flex-col">
          <span class="text-xl font-bold tracking-tight text-white sm:text-xl">
            Куп и боб
          </span>
          <span class="text-xs text-white/70">
            Пицца и бургеры
          </span>
        </div>
      </NuxtLink>

      <div class="flex min-w-0 flex-1 items-center justify-end gap-3 sm:gap-6">
        <div class="hidden items-center gap-6 sm:flex">
          <div class="flex cursor-pointer items-center gap-2 text-sm text-white/80 transition-colors hover:text-white">
            <i class="pi pi-map-marker" aria-hidden="true" />
            <span>Всеволожский проспект 29</span>
          </div>
        </div>

        <ul class="flex items-center gap-4">
          <li>
            <button
              type="button"
              class="flex h-10 w-10 items-center justify-center rounded-[10px] bg-white/10 text-white transition-all hover:-translate-y-0.5 hover:bg-white/20"
              aria-label="Избранное"
            >
              <i class="pi pi-heart" aria-hidden="true" />
            </button>
          </li>
          <li>
            <button
              type="button"
              class="flex h-10 w-10 items-center justify-center rounded-[10px] bg-white/10 text-white transition-all hover:-translate-y-0.5 hover:bg-white/20"
              aria-label="Поиск"
            >
              <i class="pi pi-search" aria-hidden="true" />
            </button>
          </li>
          <li>
            <a
              class="text-[15px] font-semibold text-white no-underline transition-opacity hover:opacity-90"
              href="tel:+78005553535"
            >
              +7 (800) 555-35-35
            </a>
          </li>
        </ul>

        <NuxtLink
          v-if="user"
          to="/profile"
          class="flex items-center gap-2 rounded-[10px] border-0 bg-primary px-6 py-3 text-sm font-semibold text-white no-underline transition-all hover:-translate-y-0.5 hover:bg-primary-600 hover:shadow-[0_4px_15px_rgba(255,107,53,0.4)]"
          aria-label="Профиль"
        >
          <i class="pi pi-user" aria-hidden="true" />
          <span>Профиль</span>
        </NuxtLink>
        <Button
          v-else
          class="!ml-0 !flex !items-center !gap-2 !rounded-[10px] !border-0 !bg-primary !px-6 !py-3 !text-sm !font-semibold !text-white transition-all hover:!-translate-y-0.5 hover:!bg-primary-600 hover:!shadow-[0_4px_15px_rgba(255,107,53,0.4)]"
          label="Войти"
          icon="pi pi-user"
          size="small"
          aria-label="Войти"
          @click="openAuthModal('login')"
        />
      </div>
    </div>
  </header>
</template>
