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
  <footer class="border-t border-slate-200 bg-slate-50">
    <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div class="sm:col-span-2 lg:col-span-1">
          <NuxtLink
            to="/public"
            class="inline-block text-xl font-semibold tracking-tight text-slate-800 transition-colors hover:text-slate-600"
          >
            Pepe
          </NuxtLink>
          <p class="mt-3 max-w-xs text-sm leading-relaxed text-slate-500">
            Удобный сервис для вас. Каталог, доставка и поддержка.
          </p>
        </div>

        <div>
          <h3 class="text-sm font-semibold uppercase tracking-wider text-slate-700">
            Каталог
          </h3>
          <ul class="mt-4 space-y-2">
            <li v-for="link in footerLinks.catalog" :key="link.to">
              <NuxtLink
                :to="link.to"
                class="text-sm text-slate-500 transition-colors hover:text-slate-800"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-sm font-semibold uppercase tracking-wider text-slate-700">
            Компания
          </h3>
          <ul class="mt-4 space-y-2">
            <li v-for="link in footerLinks.company" :key="link.to">
              <NuxtLink
                :to="link.to"
                class="text-sm text-slate-500 transition-colors hover:text-slate-800"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <div
        class="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 sm:flex-row"
      >
        <p class="text-sm text-slate-500">
          © {{ currentYear }} Pepe. Все права защищены.
        </p>
        <ul class="flex flex-wrap justify-center gap-6">
          <li v-for="link in footerLinks.legal" :key="link.to">
            <NuxtLink
              :to="link.to"
              class="text-sm text-slate-500 transition-colors hover:text-slate-800"
            >
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>
