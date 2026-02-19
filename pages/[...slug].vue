<script lang="ts" setup>
import Button from "primevue/button";

function goHome() {
  navigateTo("/");
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-white px-4">
    <div class="max-w-md w-full text-center">
      <div class="mb-8">
        <h1 class="text-8xl font-bold text-gray-900 mb-4 leading-none">404</h1>
        <div class="w-16 h-px bg-gray-300 mx-auto mb-6"></div>
        <div class="space-y-2">
          <h2 class="text-xl font-normal text-gray-600">
            This page could not be found.
          </h2>
        </div>
      </div>
      <div class="flex justify-center">
        <Button label="Go back home" severity="secondary" @click="goHome" />
      </div>
    </div>
  </div>
</template>
