<script lang="ts" setup>
import type { Product } from "#entities/product";
import { useCart } from "#features/cart";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import { QuantityCounter } from "#shared/ui";

interface Props {
  product: Product | null;
  visible: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  "update:visible": [value: boolean];
  "add-to-cart": [product: Product];
}>();

const { addProduct, decrementProduct, getProductQuantity, pending } = useCart();

const cartProduct = computed(() =>
  props.product
    ? {
        id: props.product.id,
        name: props.product.title,
        price: props.product.price,
        description: props.product.description,
        imageUrl: props.product.image,
        grams: props.product.weight ?? null,
        proteins: props.product.proteins ?? null,
        fats: props.product.fats ?? null,
        carbohydrates: props.product.carbs ?? null,
        calories: props.product.calories ?? null,
      }
    : null
);

const quantity = computed(() =>
  cartProduct.value ? getProductQuantity(cartProduct.value) : 0
);

function formatPrice(value: number): string {
  return value.toLocaleString("ru-RU", { minimumFractionDigits: 0 });
}

function handleAddToCart() {
  if (props.product && cartProduct.value) {
    addProduct(cartProduct.value);
    emit("add-to-cart", props.product);
  }
}

function handleDecrement() {
  if (cartProduct.value) {
    decrementProduct(cartProduct.value);
  }
}
</script>

<template>
  <Dialog
    :visible="visible"
    modal
    :closable="false"
    :show-header="false"
    :style="{
      width: 'min(96vw, 980px)',
      maxHeight: '92vh',
      borderRadius: '1.25rem',
    }"
    :dismissable-mask="true"
    :content-style="{ padding: 0, overflow: 'hidden', borderRadius: '1.25rem' }"
    class="product-modal product-modal--light"
    @update:visible="(v) => emit('update:visible', v)"
  >
    <template v-if="product" #default>
      <div
        class="flex flex-col overflow-hidden rounded-2xl bg-white font-sans sm:flex-row"
      >
        <div
          class="min-h-[280px] overflow-hidden bg-secondary sm:min-h-[560px] sm:w-[52%]"
        >
          <NuxtImg
            :src="product.image"
            :alt="product.imageAlt || product.title"
            class="h-full w-full object-cover"
          />
        </div>

        <div class="flex flex-1 flex-col p-6 sm:p-8">
          <h2
            class="text-2xl font-bold tracking-tight text-dark-900 sm:text-3xl"
          >
            {{ product.title }}
          </h2>
          <p class="mt-1 text-sm font-semibold text-dark-500">
            {{ product.weight ?? 0 }} г
          </p>

          <div class="mt-5">
            <h3
              class="text-xs font-semibold uppercase tracking-wider text-dark-500"
            >
              Начинка
            </h3>
            <p class="mt-1 text-sm leading-relaxed text-dark-700">
              {{ product.description }}
            </p>
          </div>

          <section class="mt-6">
            <p
              class="text-xs font-semibold uppercase tracking-wider text-dark-500"
            >
              Энергетическая ценность за порцию
            </p>
            <div class="mt-2 grid grid-cols-4 gap-2">
              <div>
                <p class="text-2xl font-bold text-dark-900">
                  {{ product.calories ?? 0 }}
                </p>
                <p class="text-xs text-dark-500">ккал</p>
              </div>
              <div>
                <p class="text-2xl font-bold text-dark-900">
                  {{ product.fats ?? 0 }}
                </p>
                <p class="text-xs text-dark-500">жиры</p>
              </div>
              <div>
                <p class="text-2xl font-bold text-dark-900">
                  {{ product.proteins ?? 0 }}
                </p>
                <p class="text-xs text-dark-500">белки</p>
              </div>
              <div>
                <p class="text-2xl font-bold text-dark-900">
                  {{ product.carbs ?? 0 }}
                </p>
                <p class="text-xs text-dark-500">углеводы</p>
              </div>
            </div>
          </section>

          <div class="mt-auto pt-6">
            <div class="w-full rounded-xl border border-dark-100 p-1">
              <QuantityCounter
                v-if="quantity > 0"
                :value="quantity"
                full
                :loading="pending"
                @increment="handleAddToCart"
                @decrement="handleDecrement"
              />
              <Button
                v-else
                :label="`Добавить в корзину · ${formatPrice(product.price)} ₽`"
                :loading="pending"
                :disabled="pending"
                class="!w-full !rounded-xl !border-0 !bg-primary !py-3 !text-base !font-semibold !text-white hover:!bg-primary-600"
                @click="handleAddToCart"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
  </Dialog>
</template>
