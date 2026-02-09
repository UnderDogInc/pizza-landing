<script lang="ts" setup>
const goHome = () => {
  navigateTo("/");
};
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
        <button
          type="button"
          class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
          @click="goHome"
        >
          Go back home
        </button>
      </div>
    </div>
  </div>
</template>
