<script lang="ts" setup>
import { AppHeader } from "#widgets/header";
import { AppFooter } from "#widgets/footer";
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
