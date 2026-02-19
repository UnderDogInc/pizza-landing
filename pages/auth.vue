<script lang="ts" setup>
import { useAuthModal } from "#features/auth";

definePageMeta({
  layout: "default",
});

const { open } = useAuthModal();

// Ссылка /auth — открываем модалку входа и уходим на главную
open("login");
await navigateTo("/", { replace: true });
</script>

<template>
  <div />
</template>
