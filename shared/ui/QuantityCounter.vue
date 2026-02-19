<script lang="ts" setup>
import Button from "primevue/button";

const props = withDefaults(
  defineProps<{
    value: number;
    full?: boolean;
    loading?: boolean;
  }>(),
  {
    full: false,
    loading: false,
  }
);

const emit = defineEmits<{
  increment: [];
  decrement: [];
}>();
</script>

<template>
  <div
    class="flex items-center gap-1"
    :class="props.full ? 'w-full justify-between' : ''"
  >
    <Button
      icon="pi pi-minus"
      aria-label="Убрать один"
      severity="secondary"
      text
      :loading="props.loading"
      :disabled="props.loading"
      class="!h-7 !w-7 !min-w-0 !shrink-0 !rounded-full !border-0 !p-0 !text-dark-700 hover:!bg-dark-100"
      @click="emit('decrement')"
    />
    <span class="min-w-6 text-center text-ms font-semibold text-dark-800">
      {{ value }}
    </span>
    <Button
      icon="pi pi-plus"
      aria-label="Добавить один"
      :loading="props.loading"
      :disabled="props.loading"
      class="!h-7 !w-7 !min-w-0 !shrink-0 !rounded-full !border-0 !bg-primary !p-0 !text-white hover:!bg-primary-600"
      @click="emit('increment')"
    />
  </div>
</template>
