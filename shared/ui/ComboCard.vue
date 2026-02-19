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
  featured?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  featured: false,
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
    class="combo-card group relative flex flex-col overflow-hidden rounded-[20px] border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/[0.08] hover:shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
    :class="{ 'combo-card--featured': featured }"
  >
    <div
      class="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100"
      aria-hidden
    />
    <div
      class="relative mb-4 flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white/10"
    >
      <NuxtImg
        :src="image"
        alt=""
        class="absolute inset-0 h-full w-full object-cover"
      />
    </div>

    <h3 class="mb-1 text-lg font-bold text-white">
      {{ title }}
    </h3>
    <p
      v-if="description"
      class="mb-4 flex-1 text-sm text-white/70 line-clamp-2"
    >
      {{ description }}
    </p>
    <div class="mb-4 flex items-baseline gap-2">
      <span class="text-2xl font-bold text-primary">
        {{ formatPrice(price) }} ₽
      </span>
      <span v-if="oldPrice" class="text-sm text-white/50 line-through">
        {{ formatPrice(oldPrice) }} ₽
      </span>
    </div>

    <div v-if="quantity > 0" class="flex justify-end">
      <QuantityCounter
        :value="quantity"
        :loading="pending"
        @increment="addPromo(cartPromo)"
        @decrement="decrementPromo(cartPromo)"
      />
    </div>
    <Button
      v-else
      icon="pi pi-plus"
      aria-label="В корзину"
      :loading="pending"
      :disabled="pending"
      class="!absolute !bottom-6 !right-6 !h-9 !w-9 !min-w-0 !shrink-0 !rounded-full !border-0 !bg-primary !p-0 !text-white transition-all hover:!scale-110 hover:!bg-primary-600 hover:!shadow-[0_4px_15px_rgba(255,107,53,0.4)]"
      @click="addPromo(cartPromo)"
    />
  </article>
</template>

<style scoped>
.combo-card--featured {
  background: linear-gradient(
    135deg,
    rgba(255, 107, 53, 0.2) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
  border-color: rgba(255, 107, 53, 0.3);
}
</style>
