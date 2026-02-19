<script lang="ts" setup>
import { AuthModal } from "#features/auth";
import { AppHeader } from "#widgets/header";
import { AppFooter } from "#widgets/footer";
import { CartFloatingDrawer } from "#widgets/cart";
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <AppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
    <CartFloatingDrawer />
    <AuthModal />
  </div>
</template>
