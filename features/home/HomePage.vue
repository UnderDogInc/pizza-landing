<script setup lang="ts">
import type { CategoryItem } from "./composables/useCategoryQuery";
import CategoriesList from "./components/CategoriesList.vue";
import HomeHero from "./components/HomeHero.vue";
import ProductSection from "./components/ProductSection.vue";
import { useHomeCatalogQuery } from "./model/useHomeCatalogQuery";

const { data: catalogData, pending } = await useHomeCatalogQuery();

const categorySections = computed<CategoryItem[]>(() =>
  (catalogData.value?.categories ?? []).filter(
    (category, index, source) =>
      source.findIndex((item) => item.slug === category.slug) === index
  )
);

const categorySectionsWithoutPizza = computed<CategoryItem[]>(
  () => categorySections.value
);
</script>

<template>
  <div class="pt-6 sm:pt-11">
    <HomeHero />
    <CategoriesList :categories="categorySections" />
    <div v-if="pending" class="px-4 py-4 text-sm text-white/70 sm:px-6">
      Загружаем каталог...
    </div>
    <ProductSection
      v-for="{ slug, label } in categorySectionsWithoutPizza"
      :key="slug"
      :slug="slug"
      :label="label"
      :products="catalogData?.productsBySlug?.[slug] ?? []"
    />
  </div>
</template>
