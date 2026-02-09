<script lang="ts" setup>
import HomeCombo from "./HomeCombo.vue";

import HomePizzaImg from "/images/home/home-pizza.png";
</script>

<template>
  <section
    id="category-pizza"
    class="flex flex-col-reverse items-center gap-6 px-4 sm:flex-row sm:justify-between sm:items-start sm:px-6 md:gap-8 lg:px-8"
  >
    <div class="w-full shrink-0 sm:flex-1 sm:min-w-0">
      <HomeCombo />
    </div>
    <div class="flex shrink-0 justify-center sm:justify-end">
      <NuxtImg
        :src="HomePizzaImg"
        width="400"
        height="400"
        class="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px]"
        fetchpriority="high"
        loading="eager"
        alt="Пицца"
      />
    </div>
  </section>
</template>
