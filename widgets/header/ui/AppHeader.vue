<script lang="ts" setup>
import { useAuthModal, useCurrentUser } from "#features/auth";
import { AppLogo } from "#shared/ui";
import Button from "primevue/button";

const { open: openAuthModal } = useAuthModal();
const { user, load: loadUser } = useCurrentUser();

onMounted(() => {
  loadUser();
});
</script>

<template>
  <header class="w-full border-b border-white/10 bg-brand-green">
    <div
      class="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6 lg:px-8"
    >
      <NuxtLink
        to="/"
        class="mr-4 flex flex-nowrap items-center gap-2 shrink-0"
      >
        <div
          class="h-[52px] w-[52px] shrink-0 sm:h-[60px] sm:w-[60px] [&>svg]:h-full [&>svg]:w-full"
        >
          <AppLogo />
        </div>
        <div class="flex shrink-0 flex-col">
          <span class="font-caveat text-nowrap text-xl text-white sm:text-2xl">
            Куп и боб
          </span>
          <span class="whitespace-nowrap text-[10px] text-white/80 sm:text-xs">
            пицца и бургеры
          </span>
        </div>
      </NuxtLink>

      <div class="flex min-w-0 flex-1 items-center justify-end gap-3 sm:gap-6">
        <Button
          icon="pi pi-map-marker"
          label="Всеволожский проспект 29"
          class="!hidden !items-center !gap-1.5 !rounded-full !border !border-white/20 !bg-white/5 !px-3 !py-1.5 !text-xs !text-white/90 hover:!bg-white/10 sm:!flex [&_.p-button-label]:truncate"
          aria-haspopup="listbox"
        />

        <ul class="flex items-center gap-2 sm:gap-4">
          <li>
            <a
              href="/"
              class="rounded-full p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Telegram"
            >
              <i class="pi pi-telegram" aria-hidden="true" />
            </a>
          </li>
          <li>
            <a
              href="/"
              class="rounded-full p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="WhatsApp"
            >
              <i class="pi pi-whatsapp" aria-hidden="true" />
            </a>
          </li>
          <li>
            <a
              class="font-semibold text-white transition-opacity hover:opacity-90 text-sm sm:text-base"
              href="tel:+78005553535"
            >
              +7 (800) 555 35-35
            </a>
          </li>
        </ul>

        <NuxtLink
          v-if="user"
          to="/profile"
          class="flex items-center gap-2 rounded-full border-0 bg-primary px-4 py-2 text-sm font-medium text-white no-underline hover:bg-primary-600"
          aria-label="Профиль"
        >
          <i class="pi pi-user" aria-hidden="true" />
          <span>Профиль</span>
        </NuxtLink>
        <Button
          v-else
          class="!ml-0 !rounded-full !border-0 !bg-primary !px-4 !py-2 !text-sm !font-medium !text-white hover:!bg-primary-600"
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
