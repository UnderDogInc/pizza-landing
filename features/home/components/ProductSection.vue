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
    class="scroll-mt-[4.5rem] py-8 px-4 sm:scroll-mt-20 sm:py-12 sm:px-6"
  >
    <ScrollReveal animation="fade-up">
      <h2
        class="mb-4 text-xl font-bold tracking-tight text-white sm:mb-5 sm:text-2xl"
      >
        {{ label }}
      </h2>
      <ul
        class="products-scroll flex items-stretch gap-3 overflow-x-auto pb-2 sm:gap-4"
      >
        <li
          v-for="(productItem, index) in products"
          :key="index"
          class="w-[172px] shrink-0 sm:w-[220px]"
        >
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
.products-scroll {
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;
}

.products-scroll::-webkit-scrollbar {
  display: none;
}
</style>
