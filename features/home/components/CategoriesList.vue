<script lang="ts" setup>
import { AppLogo } from "#shared/ui";
import Button from "primevue/button";
import type { CategoryItem } from "../composables/useCategoryQuery";
import {
  CATEGORY_BAR_INITIAL_HEIGHT,
  CATEGORY_STICKY_OBSERVER_THRESHOLD,
} from "../model/constants";
import { useCategories } from "../composables/useCategories";

interface Props {
  categories: CategoryItem[];
}

const props = defineProps<Props>();

const { categories, selectedSlug, selectCategory, init } = useCategories(
  props.categories,
);

const sentinel = ref<Maybe<HTMLElement>>(null);
const barRef = ref<Maybe<HTMLElement>>(null);
const isStuck = ref(false);
const barHeight = ref(CATEGORY_BAR_INITIAL_HEIGHT);
let observerInstance: Maybe<IntersectionObserver> = null;

onMounted(() => {
  init();

  if (sentinel.value) {
    observerInstance = new IntersectionObserver(
      ([entry]) => {
        const stuck = !entry?.isIntersecting;
        if (stuck && barRef.value) {
          barHeight.value = barRef.value.offsetHeight;
        }
        isStuck.value = stuck;
      },
      { threshold: CATEGORY_STICKY_OBSERVER_THRESHOLD }
    );
    observerInstance.observe(sentinel.value);
  }
});

onUnmounted(() => {
  observerInstance?.disconnect();
});

function isCategorySelected(slug: string): boolean {
  return selectedSlug.value === slug;
}
</script>

<template>
  <div>
    <div ref="sentinel" class="h-px" aria-hidden="true" />
    <div
      ref="barRef"
      class="z-20 flex items-center gap-4 px-4 py-1 transition-all duration-300 md:px-6"
      :class="[
        isStuck
          ? 'fixed inset-x-0 top-0 rounded-b-2xl bg-brand-green/95 backdrop-blur-md'
          : 'sticky top-0 mt-4  sm:mt-6',
      ]"
    >
      <div
        class="flex w-full items-center gap-4"
        :class="isStuck ? 'mx-auto max-w-7xl' : ''"
      >
        <div v-if="isStuck" class="hidden shrink-0 md:block">
          <AppLogo />
        </div>
        <ul
          class="categories-scroll flex min-w-0 flex-1 gap-2 overflow-x-auto py-1"
        >
          <li
            v-for="category in categories"
            :key="category.slug"
            class="shrink-0"
          >
            <Button
              :label="category.label"
              text
              class="!rounded-full !px-4 !py-2 !text-sm font-semibold transition-all sm:px-5"
              :class="
                isCategorySelected(category.slug)
                  ? '!bg-primary !text-white'
                  : '!bg-transparent !text-white/90 hover:!bg-white/15 hover:!text-white'
              "
              size="small"
              @click="selectCategory(category.slug)"
            />
          </li>
        </ul>
        <div v-if="isStuck" class="hidden shrink-0 md:block">
          <Button
            class="!rounded-full !border-0 !bg-primary !px-4 !py-2 !text-sm !font-medium !text-white hover:!bg-primary-600"
            label="Войти"
            icon="pi pi-user"
            size="small"
            aria-label="Профиль"
          />
        </div>
      </div>
    </div>
    <div
      v-if="isStuck"
      class="bg-brand-green/95"
      :style="{ height: barHeight + 'px' }"
      aria-hidden="true"
    />
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
