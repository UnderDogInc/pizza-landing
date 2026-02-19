<script lang="ts" setup>
import { useAuthModal } from "#features/auth";
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

const { open: openAuthModal } = useAuthModal();
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
          ? 'fixed inset-x-0 top-0 rounded-b-2xl bg-[rgba(15,40,24,0.95)] backdrop-blur-md'
          : 'sticky top-0 mt-4 sm:mt-6',
      ]"
    >
      <div
        class="flex w-full items-center gap-4"
        :class="isStuck ? 'mx-auto max-w-7xl' : ''"
      >
        <NuxtLink
          v-if="isStuck"
          to="/"
          class="hidden shrink-0 items-center gap-2 md:flex"
        >
          <div
            class="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-base"
          >
            🍕
          </div>
        </NuxtLink>
        <ul
          class="categories-scroll flex min-w-0 flex-1 gap-2 overflow-x-auto py-1"
        >
          <li
            v-for="category in categories"
            :key="category.slug"
            class="shrink-0"
          >
            <button
              type="button"
              class="rounded-full px-6 py-3 text-sm font-medium transition-all sm:px-6"
              :class="
                isCategorySelected(category.slug)
                  ? 'bg-primary text-white border border-primary'
                  : 'border border-white/10 bg-white/5 text-white/80 hover:bg-white/10'
              "
              @click="selectCategory(category.slug)"
            >
              {{ category.label }}
            </button>
          </li>
        </ul>
        <div v-if="isStuck" class="hidden shrink-0 md:block">
          <Button
            class="!rounded-[10px] !border-0 !bg-primary !px-4 !py-2 !text-sm !font-medium !text-white hover:!bg-primary-600"
            label="Войти"
            icon="pi pi-user"
            size="small"
            aria-label="Войти"
            @click="openAuthModal('login')"
          />
        </div>
      </div>
    </div>
    <div
      v-if="isStuck"
      class="bg-[rgba(15,40,24,0.95)]"
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
