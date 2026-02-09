<script lang="ts" setup>
import type { Product } from "../model/types";
import Button from "primevue/button";

interface Props extends Product {}

const props = defineProps<Props>();

const emit = defineEmits<{
  select: [];
  click: [product: Product];
}>();

function formatPrice(value: number): string {
  return value.toLocaleString("ru-RU");
}

function handleCardClick() {
  emit("click", {
    title: props.title,
    description: props.description,
    price: props.price,
    image: props.image,
    imageAlt: props.imageAlt,
  });
}
</script>

<template>
  <article
    class="flex h-full w-full max-w-[160px] cursor-pointer flex-col overflow-hidden rounded-2xl bg-white transition-shadow hover:shadow-lg sm:max-w-[200px]"
    @click="handleCardClick"
  >
    <div class="relative flex shrink-0 justify-center px-2 pt-2 sm:px-3 sm:pt-3">
      <NuxtImg
        :src="image"
        :alt="imageAlt || title"
        class="aspect-square w-full max-w-[100px] rounded-full object-cover drop-shadow-md sm:max-w-[140px]"
      />
    </div>

    <div class="relative flex min-h-0 flex-1 flex-col gap-1 px-2 pb-2 pt-1 sm:gap-2 sm:px-3 sm:pb-3 sm:pt-2">
      <h3 class="shrink-0 text-xs font-bold text-dark sm:text-sm">
        {{ title }}
      </h3>
      <p class="overflow-hidden text-[10px] text-gray-500 line-clamp-3 sm:text-xs">
        {{ description }}
      </p>

      <div class="mt-auto flex shrink-0 items-center justify-between gap-1 pt-1 sm:gap-2 sm:pt-2">
        <span class="text-xs font-bold text-dark sm:text-sm">
          {{ formatPrice(price) }} ₽
        </span>
        <Button
          severity="contrast"
          size="small"
          class="h-fit shrink-0 !min-w-0 !p-1.5 sm:!p-2"
          icon="pi pi-shopping-cart"
          @click.stop="emit('select')"
        />
      </div>
    </div>
  </article>
</template>
