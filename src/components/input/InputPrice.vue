<script setup lang="ts">
import { ref, watch } from 'vue';
import { NumberOnly } from '../../utils/number';

const props = defineProps<{
  modelValue: number | string;
  placeholder?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void;
}>();

const displayValue = ref(formatNumber(props.modelValue));

watch(
  () => props.modelValue,
  (val) => {
    displayValue.value = formatNumber(val);
  }
);

// Format number with commas (no decimals)
function formatNumber(value: string | number): string {
  const num = Number(value);
  if (isNaN(num)) return '';
  return num.toLocaleString('en-US', { maximumFractionDigits: 0 });
}

// Parse string to number, stripping non-digit characters
function parseNumber(value: string): number {
  const digits = value.replace(/[^\d]/g, '');
  return Number(digits);
}

function onInput(e: Event) {
  const input = e.target as HTMLInputElement;
  const raw = input.value;
  const num = parseNumber(raw);

  emit('update:modelValue', num);
  displayValue.value = formatNumber(num);
}
</script>

<template>
  <input
    type="text"
    :value="displayValue"
    @input="onInput"
    @keypress="NumberOnly"
    :placeholder="placeholder ?? '0'"
    class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-sky-500"
  />
</template>
