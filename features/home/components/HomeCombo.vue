<script lang="ts" setup>
import { ComboCard, ScrollReveal } from "#shared/ui";

const combos = [
  {
    id: 1,
    title: "3 пиццы 30 см",
    description:
      "Мне реально доставляет это удовольствие 3 пиццы по цене кружки кофе?",
    price: 1479,
    oldPrice: 1887,
    image:
      "https://media.dodostatic.net/image/r:292x292/0195f0ff3ee0726a8389bda7e4d9062a.jpg",
  },
  {
    id: 2,
    title: "2 пиццы 30 см",
    description: "Пепперони и Маргарита",
    price: 1490,
    oldPrice: 1890,
    image:
      "https://media.dodostatic.net/image/r:292x292/0195f0ff3ee0726a8389bda7e4d9062a.jpg",
  },
  {
    id: 3,
    title: "2 пиццы 30 см",
    description: "Пепперони и Маргарита",
    price: 1490,
    oldPrice: 1890,
    image:
      "https://media.dodostatic.net/image/r:292x292/0195f0ff3ee0726a8389bda7e4d9062a.jpg",
  },
];
</script>

<template>
  <section class="px-0">
    <ScrollReveal animation="fade-up">
      <ul class="combo-scroll flex gap-3 overflow-x-auto pb-2 sm:gap-4">
        <li v-for="(combo, index) in combos" :key="index" class="shrink-0">
          <ComboCard
            :id="combo.id"
            :title="combo.title"
            :description="combo.description"
            :price="combo.price"
            :old-price="combo.oldPrice"
            :image="combo.image"
          />
        </li>
      </ul>
    </ScrollReveal>
  </section>
</template>

<style scoped>
.combo-scroll {
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;
}

.combo-scroll::-webkit-scrollbar {
  display: none;
}
</style>
