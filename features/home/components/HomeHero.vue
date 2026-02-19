<script lang="ts" setup>
import { ComboCard } from "#shared/ui";

import HomePizzaImg from "/images/home/home-pizza.png";

const combos = [
  {
    id: 1,
    title: "3 пиццы 30 см",
    description:
      "Мега реально доставляет это удовольствие: 3 пиццы на выбор",
    price: 1479,
    oldPrice: 1987,
    image:
      "https://media.dodostatic.net/image/r:292x292/0195f0ff3ee0726a8389bda7e4d9062a.jpg",
  },
  {
    id: 2,
    title: "2 пиццы 30 см",
    description: "Пепперони и Маргарита для компании",
    price: 1490,
    oldPrice: 1800,
    image:
      "https://media.dodostatic.net/image/r:292x292/0195f0ff3ee0726a8389bda7e4d9062a.jpg",
  },
  {
    id: 3,
    title: "2 бургера + кола",
    description: "Сочные бургеры с газировкой в подарок",
    price: 899,
    oldPrice: 1200,
    image:
      "https://media.dodostatic.net/image/r:292x292/0195f0ff3ee0726a8389bda7e4d9062a.jpg",
  },
];
</script>

<template>
  <section class="hero mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8">
    <h2 class="section-title mb-6 flex items-center gap-3 text-2xl font-bold">
      Комбо и акции
      <span
        class="ml-4 flex-1"
        style="
          height: 1px;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0.3),
            transparent
          );
        "
      />
    </h2>

    <div
      class="combos-grid mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
    >
      <div
        v-for="(combo, index) in combos"
        :key="combo.id"
        class="animate-fade-in-up"
        :style="{ animationDelay: `${index * 0.1}s` }"
      >
        <ComboCard
          :id="combo.id"
          :title="combo.title"
          :description="combo.description"
          :price="combo.price"
          :old-price="combo.oldPrice"
          :image="combo.image"
          :featured="index === 0"
        />
      </div>

      <div
        class="pizza-showcase relative hidden items-center justify-center lg:flex"
      >
        <div
          class="pizza-glow absolute -z-10 h-[300px] w-[300px] rounded-full"
          style="
            background: radial-gradient(
              circle,
              rgba(255, 107, 53, 0.3) 0%,
              transparent 70%
            );
            filter: blur(40px);
          "
        />
        <NuxtImg
          :src="HomePizzaImg"
          width="350"
          height="350"
          class="max-w-[350px] animate-float drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
          fetchpriority="high"
          loading="eager"
          alt="Пицца"
        />
        <div
          class="absolute right-0 top-10 rounded-2xl border border-white/20 bg-white/10 p-4 shadow-xl backdrop-blur-md"
        >
          <div class="flex items-center gap-3">
            <div
              class="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20"
            >
              <span class="text-2xl">🥬</span>
            </div>
            <div>
              <div class="text-sm font-bold">Свежие ингредиенты</div>
              <div class="text-xs text-white/50">Каждый день</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
}

@media (min-width: 1024px) {
  .combos-grid {
    grid-template-columns: 1fr 1fr 1fr 1.2fr;
  }
}
</style>
