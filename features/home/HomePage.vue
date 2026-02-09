<script setup lang="ts">
import Skeleton from "primevue/skeleton";
import { DEFAULT_CATEGORIES } from "./composables/useCategories";
import CategoriesList from "./components/CategoriesList.vue";
import HomeHero from "./components/HomeHero.vue";
import ProductSection from "./components/ProductSection.vue";

const categorySections = DEFAULT_CATEGORIES;

const categoryProducts: Record<
  string,
  Array<{ title: string; description: string; price: number; image: string }>
> = {
  burgery: [
    {
      title: "Чизбургер",
      description: "Говядина, сыр чеддер, маринованные огурчики, лук, соус",
      price: 159,
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop",
    },
    {
      title: "Дабл Бургер",
      description: "Двойная говядина, сыр, салат, соус",
      price: 249,
      image:
        "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&h=400&fit=crop",
    },
    {
      title: "Биг Мак",
      description: "Сочная котлета, сыр, салат, огурцы, фирменный соус",
      price: 199,
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop",
    },
    {
      title: "Чизбургер",
      description: "Говядина, сыр чеддер, маринованные огурчики, лук, соус",
      price: 159,
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop",
    },
    {
      title: "Дабл Бургер",
      description: "Двойная говядина, сыр, салат, соус",
      price: 249,
      image:
        "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&h=400&fit=crop",
    },
    {
      title: "Биг Мак",
      description: "Сочная котлета, сыр, салат, огурцы, фирменный соус",
      price: 199,
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop",
    },
    {
      title: "Чизбургер",
      description: "Говядина, сыр чеддер, маринованные огурчики, лук, соус",
      price: 159,
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop",
    },
    {
      title: "Дабл Бургер",
      description: "Двойная говядина, сыр, салат, соус",
      price: 249,
      image:
        "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&h=400&fit=crop",
    },
    {
      title: "Биг Мак",
      description: "Сочная котлета, сыр, салат, огурцы, фирменный соус",
      price: 199,
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop",
    },
    {
      title: "Чизбургер",
      description: "Говядина, сыр чеддер, маринованные огурчики, лук, соус",
      price: 159,
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop",
    },
    {
      title: "Дабл Бургер",
      description: "Двойная говядина, сыр, салат, соус",
      price: 249,
      image:
        "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&h=400&fit=crop",
    },
    {
      title: "Биг Мак",
      description: "Сочная котлета, сыр, салат, огурцы, фирменный соус",
      price: 199,
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop",
    },
  ],
  zakuski: [
    {
      title: "Картофель фри",
      description: "Хрустящий картофель с солью и специями",
      price: 99,
      image:
        "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=400&fit=crop",
    },
    {
      title: "Наггетсы",
      description: "Куриные наггетсы с соусом на выбор",
      price: 149,
      image:
        "https://images.unsplash.com/photo-1562967916-eb82221dfb92?w=400&h=400&fit=crop",
    },
    {
      title: "Чесночные гренки",
      description: "Хрустящие гренки с душистым чесноком",
      price: 79,
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop",
    },
  ],
  gorachee: [
    {
      title: "Куриные крылья",
      description: "Хрустящие крылышки в остром соусе",
      price: 229,
      image:
        "https://images.unsplash.com/photo-1567620832903-0fc676de3066?w=400&h=400&fit=crop",
    },
    {
      title: "Стейк из курицы",
      description: "Нежное филе курицы с овощами гриль",
      price: 279,
      image:
        "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=400&fit=crop",
    },
    {
      title: "Рёбрышки BBQ",
      description: "Свиные рёбрышки в соусе барбекю",
      price: 349,
      image:
        "https://images.unsplash.com/photo-1529694157872-4e0c0f3b238b?w=400&h=400&fit=crop",
    },
  ],
  napitki: [
    {
      title: "Кола",
      description: "Классическая Coca-Cola 0,5 л",
      price: 79,
      image:
        "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&h=400&fit=crop",
    },
    {
      title: "Свежевыжатый сок",
      description: "Апельсиновый или яблочный сок",
      price: 149,
      image:
        "https://images.unsplash.com/photo-1600279466892-3b7cbb852826?w=400&h=400&fit=crop",
    },
    {
      title: "Молочный коктейль",
      description: "Ванильный или шоколадный",
      price: 129,
      image:
        "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=400&fit=crop",
    },
  ],
  deserty: [
    {
      title: "Чизкейк",
      description: "Нежный нью-йоркский чизкейк",
      price: 179,
      image:
        "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=400&fit=crop",
    },
    {
      title: "Брауни",
      description: "Шоколадный брауни с орехами",
      price: 129,
      image:
        "https://images.unsplash.com/photo-1607920591413-7ecf85bc5ad1?w=400&h=400&fit=crop",
    },
    {
      title: "Тирамису",
      description: "Классический итальянский десерт",
      price: 199,
      image:
        "https://images.unsplash.com/photo-1571877227200-a0d5ea36146c?w=400&h=400&fit=crop",
    },
  ],
};
</script>

<template>
  <div class="pt-6 sm:pt-11">
    <HomeHero />

    <ClientOnly>
      <CategoriesList />
      <template #fallback>
        <div class="mt-6 flex gap-2 px-4 py-3 md:px-6">
          <Skeleton
            v-for="i in 6"
            :key="i"
            width="5rem"
            height="2.25rem"
            border-radius="1rem"
          />
        </div>
      </template>
    </ClientOnly>

    <ProductSection
      v-for="{ slug, label } in categorySections.filter(
        (s) => s.slug !== 'pizza'
      )"
      :key="slug"
      :slug="slug"
      :label="label"
      :products="categoryProducts[slug]"
    />
  </div>
</template>

