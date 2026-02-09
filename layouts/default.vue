<script lang="ts" setup>
import AppHeader from "#shared/components/AppHeader/AppHeader.vue";
import AppFooter from "#shared/components/AppFooter.vue";
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <AppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
