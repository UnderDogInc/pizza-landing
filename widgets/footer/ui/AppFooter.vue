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
  <footer class="border-t border-white/10 bg-brand-green-500">
    <div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div class="sm:col-span-2 lg:col-span-1">
          <NuxtLink
            to="/"
            class="inline-block text-xl font-semibold tracking-tight text-white transition-opacity hover:opacity-90"
          >
            Куп и боб
          </NuxtLink>
          <p class="mt-3 max-w-xs text-sm leading-relaxed text-white/70">
            Пицца и бургеры. Каталог, доставка и поддержка.
          </p>
        </div>

        <div>
          <h3
            class="text-sm font-semibold uppercase tracking-wider text-white/90"
          >
            Каталог
          </h3>
          <ul class="mt-4 space-y-2.5">
            <li v-for="link in footerLinks.catalog" :key="link.to">
              <NuxtLink
                :to="link.to"
                class="text-sm text-white/70 transition-colors hover:text-white"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h3
            class="text-sm font-semibold uppercase tracking-wider text-white/90"
          >
            Компания
          </h3>
          <ul class="mt-4 space-y-2.5">
            <li v-for="link in footerLinks.company" :key="link.to">
              <NuxtLink
                :to="link.to"
                class="text-sm text-white/70 transition-colors hover:text-white"
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
        <ul class="flex flex-wrap justify-center gap-6">
          <li v-for="link in footerLinks.legal" :key="link.to">
            <NuxtLink
              :to="link.to"
              class="text-sm text-white/60 transition-colors hover:text-white/80"
            >
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>
