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
    class="product-card group flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-[20px] bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)]"
    @click="handleCardClick"
  >
    <div
      class="relative h-[220px] w-full shrink-0 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200"
    >
      <NuxtImg
        :src="image"
        :alt="imageAlt || title"
        class="absolute inset-0 h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
      />
      <div
        class="absolute inset-0 bg-gradient-to-b from-transparent to-black/5"
        aria-hidden
      />
    </div>

    <div
      class="relative flex min-h-0 flex-1 flex-col gap-2 px-6 py-4 text-[#1a3c2a]"
    >
      <h3
        class="shrink-0 text-lg font-bold tracking-tight text-[#0f2818] line-clamp-2"
      >
        {{ title }}
      </h3>
      <p class="overflow-hidden text-sm text-[#6b7280] line-clamp-2 leading-relaxed">
        {{ description }}
      </p>
      <div class="mt-auto flex shrink-0 items-center justify-between gap-2">
        <span class="text-xl font-bold text-primary">
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
          class="!h-10 !w-10 !min-w-0 !shrink-0 !rounded-[10px] !border-0 !border-primary !bg-primary !p-0 !text-white transition-all hover:!scale-105 hover:!bg-primary-600"
          @click.stop="addProduct(cartProduct)"
        />
      </div>
    </div>
  </article>
</template>
