<script lang="ts" setup>
interface Props {
  title: string;
  description?: string;
  price: number;
  oldPrice?: number;
  image: string;
  backgroundColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
  backgroundColor: "#FFFFFF",
});

defineEmits<{
  addToCart: [];
}>();

function formatPrice(value: number): string {
  return value.toLocaleString("ru-RU");
}
</script>

<template>
  <article
    class="flex h-[120px] w-[260px] shrink-0 overflow-hidden rounded-xl shadow-md px-3 py-2 gap-2 relative sm:h-[128px] sm:w-[280px]"
    :style="{ backgroundColor: props.backgroundColor }"
  >
    <div class="flex h-full w-[80px] shrink-0 overflow-hidden sm:w-[90px]">
      <NuxtImg :src="image" alt="" class="h-full w-full object-cover" />
    </div>

    <div class="flex flex-1 min-w-0 flex-col justify-center gap-0.5 sm:gap-1">
      <h3 class="text-xs font-bold text-dark sm:text-sm">
        {{ title }}
      </h3>
      <p v-if="description" class="line-clamp-2 text-[10px] text-gray-500 sm:text-xs">
        {{ description }}
      </p>
      <div class="mt-1 flex flex-col gap-0.5">
        <span class="text-base font-bold text-dark sm:text-lg">
          {{ formatPrice(price) }} ₽
        </span>
        <span
          v-if="oldPrice"
          class="text-xs text-gray-400 line-through decoration-gray-400"
        >
          {{ formatPrice(oldPrice) }} ₽
        </span>
      </div>
    </div>

    <Button
      severity="contrast"
      size="small"
      class="absolute bottom-1.5 right-1.5 h-fit !min-w-0 !p-1.5 sm:bottom-2 sm:right-2 sm:!p-2"
      icon="pi pi-shopping-cart"
    />
  </article>
</template>
