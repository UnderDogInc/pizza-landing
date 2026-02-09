<script lang="ts" setup>
import type { Product } from "#entities/product";
import { ProductCard } from "#entities/product";
import { ProductModal, useProductModal } from "#features/product-details";
import { ScrollReveal } from "#shared/ui";

interface Props {
  slug: string;
  label: string;
  products: Array<Product>;
}

const props = defineProps<Props>();

const route = useRoute();
const { isOpen, product, open, close, openFromRoute } = useProductModal();

function handleProductClick(clickedProduct: Product, index: number) {
  open(clickedProduct, props.slug, index);
}

function handleAddToCart(_product: Product) {
  // TODO: integrate with cart
}

watch(
  () => route.query,
  (query) => {
    if (query.category === props.slug && query.product !== undefined) {
      const index = parseInt(query.product, 10);
      if (!Number.isNaN(index)) {
        openFromRoute(props.slug, index, props.products);
      }
    } else if ((!query.category && !query.product) && isOpen.value) {
      close();
    }
  },
  { immediate: true },
);
</script>

<template>
  <section
    :id="`category-${slug}`"
    class="scroll-mt-[4.5rem] py-6 px-4 sm:scroll-mt-20 sm:py-10 sm:px-6"
  >
    <ScrollReveal animation="fade-up">
      <h2 class="mb-3 text-lg font-bold text-white sm:mb-4 sm:text-xl">
        {{ label }}
      </h2>
      <ul class="products-scroll flex items-stretch gap-2 overflow-x-auto pb-2 sm:gap-3">
        <li
          v-for="(productItem, index) in products"
          :key="index"
          class="flex shrink-0"
        >
          <ProductCard
            :title="productItem.title"
            :description="productItem.description"
            :price="productItem.price"
            :image="productItem.image"
            :image-alt="productItem.imageAlt"
            @click="(p) => handleProductClick(p, index)"
          />
        </li>
      </ul>
    </ScrollReveal>

    <ProductModal
      :product="product"
      :visible="isOpen"
      @update:visible="close"
      @add-to-cart="handleAddToCart"
    />
  </section>
</template>

<style scoped>
.products-scroll {
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;
}

.products-scroll::-webkit-scrollbar {
  display: none;
}
</style>