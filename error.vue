<script lang="ts" setup>
import Button from "primevue/button";
import type { NuxtError } from "#app";

defineProps<{
  error: NuxtError;
}>();

function goHome() {
  clearError({ redirect: "/" });
}
</script>

<template>
  <div
    class="min-h-screen bg-green w-full flex items-center justify-center px-4"
  >
    <div class="max-w-md m-auto w-full text-center">
      <div class="mb-8">
        <h1 class="text-8xl font-bold text-white mb-4 leading-none">404</h1>
        <div class="w-16 h-px bg-white mx-auto mb-6"></div>
        <h2 class="text-xl font-normal text-white-600">
          This page could not be found.
        </h2>
      </div>
      <div class="flex justify-center">
        <Button label="Go back home" @click="goHome" />
      </div>
    </div>
  </div>
</template>
