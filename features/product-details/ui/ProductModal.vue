<script lang="ts" setup>
import type { Product } from "#entities/product";
import Dialog from "primevue/dialog";

interface Props {
  product: Product | null;
  visible: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  "update:visible": [value: boolean];
  "add-to-cart": [product: Product];
}>();

function formatPrice(value: number): string {
  return value.toLocaleString("ru-RU", { minimumFractionDigits: 2 });
}

function close() {
  emit("update:visible", false);
}

function addToCart() {
  if (props.product) {
    emit("add-to-cart", props.product);
    close();
  }
}
</script>

<template>
  <Dialog
    :visible="visible"
    modal
    :closable="false"
    :show-header="false"
    :style="{ borderRadius: 40 }"
    :dismissable-mask="true"
    :content-style="{ padding: 0, overflow: 'hidden' }"
    class="product-modal product-modal--large"
    @update:visible="(v) => emit('update:visible', v)"
  >
    <template v-if="product" #default>
      <div class="flex flex-col overflow-hidden sm:flex-row">
        <!-- Левая часть: круглое фото -->
        <div
          class="flex shrink-0 items-center justify-center bg-white p-8 sm:w-[45%]"
        >
          <div class="relative inline-block">
            <div
              class="product-modal__image-ring absolute rounded-full border-2 border-dashed border-gray-200"
              aria-hidden
            />
            <NuxtImg
              :src="product.image"
              :alt="product.imageAlt || product.title"
              class="relative z-10 h-[220px] w-[220px] rounded-full object-cover shadow-lg sm:h-[280px] sm:w-[280px]"
            />
          </div>
        </div>

        <!-- Правая часть: описание -->
        <div class="flex flex-1 flex-col bg-white p-6 sm:p-8">
          <div class="flex flex-1 flex-col gap-4">
            <h2 class="text-2xl font-bold text-gray-900 sm:text-3xl">
              {{ product.title }}
            </h2>
            <p class="text-sm leading-relaxed text-gray-600">
              {{ product.description }}
            </p>
          </div>

          <div class="mt-6 flex flex-col gap-4 sm:mt-8">
            <button
              type="button"
              class="w-full rounded-xl bg-primary py-4 text-lg font-semibold text-white transition-colors hover:bg-primary/90"
              @click="addToCart"
            >
              В корзину за {{ formatPrice(product.price) }} ₽
            </button>
          </div>
        </div>
      </div>
    </template>
  </Dialog>
</template>

<style scoped>
.product-modal__image-ring {
  top: 50%;
  left: 50%;
  width: calc(100% + 20px);
  height: calc(100% + 20px);
  transform: translate(-50%, -50%);
}
</style>
