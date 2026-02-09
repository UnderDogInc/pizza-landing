<script lang="ts" setup>
interface Props {
  title: string;
}

defineProps<Props>();
</script>

<template>
  <h4 class="text-lg font-semibold text-gray-800 mb-3 line-clamp-2">
    {{ title }}
  </h4>
</template>
