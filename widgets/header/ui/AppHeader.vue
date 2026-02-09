<script lang="ts" setup>
import { AppLogo } from "#shared/ui";
import Button from "primevue/button";
</script>

<template>
  <header class="w-full py-3">
    <div
      class="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6 lg:px-8"
    >
      <div class="mr-4 flex flex-nowrap items-center gap-2">
        <div class="h-[60px] w-[60px] shrink-0 [&>svg]:h-full [&>svg]:w-full">
          <AppLogo />
        </div>
        <div class="shrink-0 flex flex-col">
          <span class="font-caveat text-nowrap text-2xl text-white">
            Куп и боб
          </span>
          <span class="whitespace-nowrap text-xs text-white">
            пицца и бургеры
          </span>
        </div>
      </div>

      <div class="flex w-full items-center gap-6 sm:gap-4">
        <div class="w-full flex justify-between">
          <button
            type="button"
            class="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-white transition-colors sm:gap-2 sm:px-3"
            aria-haspopup="listbox"
          >
            <i class="pi pi-map-marker text-white" aria-hidden="true" />
            <span class="truncate"> Всеволожский проспект 29 </span>
          </button>

          <ul class="flex gap-4 items-center">
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
              <a class="text-white text-sm" href="tel:+78005553535">
                +7 (800) 555 35-35
              </a>
            </li>
          </ul>
        </div>

        <Button
          class="!border !border-primary !bg-primary !text-white hover:!bg-primary/90 px-4 ml-4"
          label="Войти"
          icon="pi pi-user"
          size="small"
          aria-label="Профиль"
        />
      </div>
    </div>
  </header>
</template>
