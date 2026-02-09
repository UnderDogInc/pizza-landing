<script lang="ts" setup>
import { AppLogo } from "#shared/ui";
import Button from "primevue/button";
import { useCategories } from "../composables/useCategories";

const { categories, selectedSlug, selectCategory, init } = useCategories();

const sentinel = ref<HTMLElement | null>(null);
const barRef = ref<HTMLElement | null>(null);
const isStuck = ref(false);
const barHeight = ref(56);
let observerInstance: IntersectionObserver | null = null;

onMounted(() => {
  init();

  nextTick(() => {
    if (sentinel.value) {
      observerInstance = new IntersectionObserver(
        ([entry]) => {
          const stuck = !entry?.isIntersecting;
          if (stuck && barRef.value) {
            barHeight.value = barRef.value.offsetHeight;
          }
          isStuck.value = stuck;
        },
        { threshold: 0 },
      );
      observerInstance.observe(sentinel.value);
    }
  });
});

onUnmounted(() => {
  observerInstance?.disconnect();
});
</script>

<template>
  <div>
    <div ref="sentinel" class="h-px" aria-hidden="true" />
    <div
      ref="barRef"
      class="z-20 flex items-center gap-4 px-4 py-3 transition-all duration-300 md:px-6"
      :class="[
        isStuck
          ? 'fixed inset-x-0 top-0 rounded-b-xl bg-[#2F4A38]/80 backdrop-blur-md'
          : 'sticky top-0 mt-4 bg-transparent sm:mt-6',
      ]"
    >
      <div
        class="flex w-full items-center gap-4"
        :class="isStuck ? 'mx-auto max-w-7xl' : ''"
      >
        <div v-if="isStuck" class="hidden shrink-0 md:block">
          <AppLogo />
        </div>
        <ul class="categories-scroll flex min-w-0 flex-1 gap-2 overflow-x-auto">
          <li v-for="category in categories" :key="category.slug" class="shrink-0">
            <button
              type="button"
              class="rounded-full px-3 py-1.5 text-xs font-medium text-white transition-colors sm:px-4 sm:py-2 sm:text-sm"
              :class="
                selectedSlug === category.slug ? 'bg-[#FB5E08]' : 'hover:bg-white/10'
              "
              @click="selectCategory(category.slug)"
            >
              {{ category.label }}
            </button>
          </li>
        </ul>
        <div v-if="isStuck" class="hidden shrink-0 md:block">
          <Button
            class="!border !border-primary !bg-primary !text-white hover:!bg-primary/90 px-4"
            label="Войти"
            icon="pi pi-user"
            size="small"
            aria-label="Профиль"
          />
        </div>
      </div>
    </div>
    <div v-if="isStuck" :style="{ height: barHeight + 'px' }" aria-hidden="true" />
  </div>
</template>

<style scoped>
.categories-scroll {
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;
}

.categories-scroll::-webkit-scrollbar {
  display: none;
}
</style>
