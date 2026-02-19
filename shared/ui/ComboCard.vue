<script lang="ts" setup>
import Button from "primevue/button";
import { useCart } from "#features/cart";
import QuantityCounter from "./QuantityCounter.vue";

interface Props {
  id?: number;
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

const { addPromo, decrementPromo, getPromoQuantity, pending } = useCart();

const cartPromo = computed(() => ({
  id: props.id,
  name: props.title,
  price: props.price,
  description: props.description,
  oldPrice: props.oldPrice,
  url: props.image,
}));

const quantity = computed(() => getPromoQuantity(cartPromo.value));

function formatPrice(value: number): string {
  return value.toLocaleString("ru-RU");
}
</script>

<template>
  <article
    class="group relative flex h-[130px] w-[280px] shrink-0 gap-3 overflow-hidden rounded-2xl bg-white px-4 py-3 shadow-md transition-all hover:shadow-xl hover:-translate-y-0.5 sm:h-[140px] sm:w-[300px]"
    :style="{ backgroundColor: props.backgroundColor }"
  >
    <div
      class="relative h-[88px] w-[88px] shrink-0 overflow-hidden rounded-xl sm:h-[96px] sm:w-[96px]"
    >
      <NuxtImg
        :src="image"
        alt=""
        class="absolute inset-0 h-full w-full object-cover"
      />
    </div>

    <div class="flex min-w-0 flex-1 flex-col justify-center gap-0.5 sm:gap-1">
      <h3
        class="text-sm font-bold tracking-tight text-dark-800 line-clamp-2 sm:text-base"
      >
        {{ title }}
      </h3>
      <p
        v-if="description"
        class="line-clamp-2 text-[10px] text-dark-400 sm:text-xs"
      >
        {{ description }}
      </p>
      <div class="mt-1 flex flex-col gap-0.5">
        <span class="text-lg font-bold text-dark-800 sm:text-xl">
          {{ formatPrice(price) }} ₽
        </span>
        <span v-if="oldPrice" class="text-xs text-dark-400 line-through">
          {{ formatPrice(oldPrice) }} ₽
        </span>
      </div>
    </div>

    <div v-if="quantity > 0" class="absolute bottom-3 right-3">
      <QuantityCounter
        :value="quantity"
        :loading="pending"
        @increment="addPromo(cartPromo)"
        @decrement="decrementPromo(cartPromo)"
      />
    </div>
    <Button
      v-else
      icon="pi pi-shopping-cart"
      aria-label="В корзину"
      :loading="pending"
      :disabled="pending"
      class="!absolute !bottom-3 !right-3 !h-9 !w-9 !min-w-0 !shrink-0 !rounded-full !border-0 !bg-primary !p-0 !text-white hover:!bg-primary-600"
      @click="addPromo(cartPromo)"
    />
  </article>
</template>
