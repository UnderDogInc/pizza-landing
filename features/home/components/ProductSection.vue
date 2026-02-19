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
    } else if (!query.category && !query.product && isOpen.value) {
      close();
    }
  },
  { immediate: true }
);
</script>

<template>
  <section
    :id="`category-${slug}`"
    class="scroll-mt-[4.5rem] px-4 pb-16 sm:scroll-mt-20 sm:px-6 lg:px-8"
  >
    <ScrollReveal animation="fade-up">
      <div class="category-header mb-6 flex items-center justify-between">
        <h2 class="category-name flex items-center gap-3 text-2xl font-bold text-white">
          {{ label }}
          <span class="rounded-full bg-white/10 px-3 py-1 text-sm text-white/70">
            {{ products.length }} товаров
          </span>
        </h2>
        <NuxtLink
          :to="`/catalog?category=${slug}`"
          class="rounded-[10px] bg-primary px-4 py-2 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-primary-600 hover:shadow-[0_4px_15px_rgba(255,107,53,0.4)]"
        >
          Смотреть все
        </NuxtLink>
      </div>
      <ul
        class="products-grid grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(280px,1fr))]"
      >
        <li v-for="(productItem, index) in products" :key="index">
          <ProductCard
            :id="productItem.id"
            :title="productItem.title"
            :description="productItem.description"
            :price="productItem.price"
            :image="productItem.image"
            :image-alt="productItem.imageAlt"
            :weight="productItem.weight"
            :calories="productItem.calories"
            :proteins="productItem.proteins"
            :fats="productItem.fats"
            :carbs="productItem.carbs"
            @click="() => handleProductClick(productItem, index)"
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
</style>
