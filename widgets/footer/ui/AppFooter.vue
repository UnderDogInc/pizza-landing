<script lang="ts" setup>
const currentYear = new Date().getFullYear();

const footerLinks = {
  catalog: [
    { to: "/catalog", label: "Каталог" },
    { to: "/catalog/new", label: "Новинки" },
    { to: "/catalog/sale", label: "Распродажа" },
  ],
  company: [
    { to: "/about", label: "О нас" },
    { to: "/contacts", label: "Контакты" },
    { to: "/delivery", label: "Доставка" },
  ],
  legal: [
    { to: "/privacy", label: "Политика конфиденциальности" },
    { to: "/terms", label: "Условия использования" },
  ],
};
</script>

<template>
  <footer class="mt-16 border-t border-white/10 bg-black/30 px-6 pt-16 pb-8">
    <div class="mx-auto max-w-[1400px]">
      <div class="grid gap-12 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]">
        <div class="max-w-[300px] sm:col-span-2 lg:col-span-1">
          <div class="mb-4 flex items-center gap-3">
            <div
              class="flex h-10 w-10 items-center justify-center rounded-[10px] bg-primary text-xl"
            >
              🍕
            </div>
            <span class="text-xl font-bold text-white">Куп и боб</span>
          </div>
          <p class="text-[15px] leading-relaxed text-white/70">
            Пицца и бургеры. Каталог, доставка и поддержка.
          </p>
        </div>

        <div>
          <h3
            class="mb-5 text-base font-bold uppercase tracking-wider text-white"
          >
            Каталог
          </h3>
          <ul class="space-y-3">
            <li v-for="link in footerLinks.catalog" :key="link.to">
              <NuxtLink
                :to="link.to"
                class="inline-flex items-center gap-2 text-[15px] text-white/70 no-underline transition-all hover:translate-x-1 hover:text-primary"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h3
            class="mb-5 text-base font-bold uppercase tracking-wider text-white"
          >
            Компания
          </h3>
          <ul class="space-y-3">
            <li v-for="link in footerLinks.company" :key="link.to">
              <NuxtLink
                :to="link.to"
                class="inline-flex items-center gap-2 text-[15px] text-white/70 no-underline transition-all hover:translate-x-1 hover:text-primary"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <div
        class="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row"
      >
        <p class="text-sm text-white/60">
          © {{ currentYear }} Куп и боб. Все права защищены.
        </p>
        <div class="flex gap-6">
          <NuxtLink
            v-for="link in footerLinks.legal"
            :key="link.to"
            :to="link.to"
            class="text-sm text-white/50 no-underline transition-colors hover:text-white"
          >
            {{ link.label }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>
