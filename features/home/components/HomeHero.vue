<script lang="ts" setup>
import HomeCombo from "./HomeCombo.vue";

import HomePizzaImg from "/images/home/home-pizza.png";
</script>

<template>
  <section
    id="category-pizza"
    class="flex flex-col-reverse items-center gap-8 px-4 sm:flex-row sm:justify-between sm:items-start sm:px-6 sm:gap-10 md:gap-12 lg:px-8"
  >
    <div class="w-full shrink-0 sm:flex-1 sm:min-w-0">
      <h2
        class="mb-4 text-xl font-bold tracking-tight text-white sm:mb-5 sm:text-2xl"
      >
        Комбо и акции
      </h2>
      <HomeCombo />
    </div>
    <div class="flex shrink-0 justify-center sm:justify-end">
      <NuxtImg
        :src="HomePizzaImg"
        width="400"
        height="400"
        class="w-52 h-52 drop-shadow-2xl sm:w-72 sm:h-72 md:w-96 md:h-96 lg:w-[400px] lg:h-[400px]"
        fetchpriority="high"
        loading="eager"
        alt="Пицца"
      />
    </div>
  </section>
</template>
