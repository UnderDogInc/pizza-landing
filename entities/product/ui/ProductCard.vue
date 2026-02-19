<script lang="ts" setup>
import Button from "primevue/button";
import { useCart } from "#features/cart";
import { QuantityCounter } from "#shared/ui";
import type { Product } from "../model/types";

interface Props extends Product {}

const props = defineProps<Props>();

const emit = defineEmits<{
  click: [product: Product];
}>();

const { addProduct, decrementProduct, getProductQuantity, pending } = useCart();

const cartProduct = computed(() => ({
  id: props.id,
  name: props.title,
  price: props.price,
  description: props.description,
  imageUrl: props.image,
  grams: props.weight ?? null,
  proteins: props.proteins ?? null,
  fats: props.fats ?? null,
  carbohydrates: props.carbs ?? null,
  calories: props.calories ?? null,
}));

const quantity = computed(() => getProductQuantity(cartProduct.value));

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
    class="group flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-shadow duration-200 hover:shadow-xl"
    @click="handleCardClick"
  >
    <div
      class="relative aspect-square w-full shrink-0 overflow-hidden rounded-t-2xl bg-secondary/50"
    >
      <NuxtImg
        :src="image"
        :alt="imageAlt || title"
        class="absolute inset-0 h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
      />
    </div>

    <div
      class="relative flex min-h-0 flex-1 flex-col gap-1 px-3 pb-3 pt-2 sm:gap-2 sm:px-4 sm:pb-4 sm:pt-3"
    >
      <h3
        class="shrink-0 text-sm font-bold tracking-tight text-dark-800 line-clamp-2 sm:text-base"
      >
        {{ title }}
      </h3>
      <p
        class="overflow-hidden text-[10px] text-dark-400 line-clamp-2 sm:text-xs"
      >
        {{ description }}
      </p>
      <div class="mt-auto flex shrink-0 items-center justify-between gap-2">
        <span class="text-base font-bold text-dark sm:text-lg">
          {{ formatPrice(price) }} ₽
        </span>
        <div v-if="quantity > 0" @click.stop>
          <QuantityCounter
            :value="quantity"
            :loading="pending"
            @increment="addProduct(cartProduct)"
            @decrement="decrementProduct(cartProduct)"
          />
        </div>
        <Button
          v-else
          icon="pi pi-shopping-cart"
          aria-label="В корзину"
          :loading="pending"
          :disabled="pending"
          class="!h-9 !w-9 !min-w-0 !shrink-0 !rounded-full !border-0 !bg-primary !p-0 !text-white hover:!bg-primary-600"
          @click.stop="addProduct(cartProduct)"
        />
      </div>
    </div>
  </article>
</template>
