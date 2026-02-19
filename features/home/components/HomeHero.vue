<script lang="ts" setup>
import HomeCombo from "./HomeCombo.vue";

import HomePizzaImg from "/images/home/home-pizza.png";
</script>

<template>
  <section
    class="hero flex flex-col-reverse items-center gap-8 px-4 sm:flex-row sm:justify-between sm:items-start sm:px-6 sm:gap-10 md:gap-12 lg:px-8"
  >
    <div class="w-full shrink-0 sm:flex-1 sm:min-w-0">
      <h2
        class="mb-4 text-xl font-bold tracking-tight text-white sm:mb-5 sm:text-2xl"
      >
        Комбо и акции
      </h2>
      <HomeCombo />
    </div>
    <div class="flex shrink-0 justify-center sm:justify-end relative">
      <NuxtImg
        :src="HomePizzaImg"
        width="400"
        height="400"
        class="w-52 h-52 drop-shadow-2xl sm:w-72 sm:h-72 md:w-96 md:h-96 lg:w-[400px] lg:h-[400px]"
        fetchpriority="high"
        loading="eager"
        alt="Пицца"
      />

      <div
        class="absolute top-10 right-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 animate-bounce-slight shadow-xl"
      >
        <div class="flex items-center space-x-3">
          <div
            class="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center"
          >
            <span class="text-2xl">🥬</span>
          </div>
          <div>
            <div class="font-bold text-sm">Свежие ингредиенты</div>
            <div class="text-xs text-gray-400">Каждый день</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="css" scoped>
.hero {
  background:
    radial-gradient(
      ellipse at top right,
      rgba(36, 56, 48, 0.15) 0%,
      transparent 50%
    ),
    radial-gradient(
      ellipse at bottom left,
      rgba(36, 56, 48, 0.1) 0%,
      transparent 50%
    );
}
</style>
