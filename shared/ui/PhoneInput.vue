<script lang="ts" setup>
import { formatPhoneDisplay, normalizePhoneDigits, parsePhoneDigits } from "../lib/phoneMask";

const props = defineProps<{
  modelValue: string;
  placeholder?: string;
  class?: string;
  error?: boolean;
}>();

const emit = defineEmits<{ "update:modelValue": [value: string] }>();

const displayValue = computed(() => formatPhoneDisplay(props.modelValue));

function onInput(e: Event) {
  const target = e.target as HTMLInputElement;
  const raw = target.value;
  const digits = parsePhoneDigits(raw);
  const normalized = normalizePhoneDigits(digits);
  emit("update:modelValue", normalized);
}
</script>

<template>
  <input
    :value="displayValue"
    type="tel"
    autocomplete="tel"
    :placeholder="placeholder ?? '+7 (999) 123-45-67'"
    :class="[props.class, error ? '!border-red-500 focus:!ring-red-500/20' : '']"
    @input="onInput"
  />
</template>
