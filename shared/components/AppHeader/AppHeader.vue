<script lang="ts" setup>
import { AppLogo } from "#shared/ui";
import Button from "primevue/button";
</script>

<template>
  <header class="w-full">
    <div
      class="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6 lg:px-8"
    >
      <AppLogo />

      <div class="flex w-full items-center gap-2 sm:gap-4">
        <div class="w-full">
          <button
            type="button"
            class="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm text-white transition-colors sm:gap-2 sm:px-3"
            aria-haspopup="listbox"
          >
            <i class="pi pi-map-marker text-white" aria-hidden="true" />
            <span class="truncate"> Всеволожский проспект 29 </span>
          </button>

          <ul>
            <li>
              <a href="/">
                <i class="pi pi-telegram text-white" aria-hidden="true" />
              </a>
            </li>

            <li>
              <a href="/">
                <i class="pi pi-whatsapp text-white" aria-hidden="true" />
              </a>
            </li>

            <li>
              <a href="tel:+78005553535"> +7 (800) 555 35-35 </a>
            </li>
          </ul>
        </div>

        <Button
          class="!border !border-primary !bg-primary !text-white hover:!bg-primary/90 px-4"
          label="Войти"
          icon="pi pi-user"
          size="small"
          aria-label="Профиль"
        />
      </div>
    </div>
  </header>
</template>
