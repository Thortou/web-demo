<script setup lang="ts">
const props = defineProps<{
  modelValue: string;
  type?: string;
  placeholder?: string;
  label?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

function onInput(e: Event) {
  const target = e.target as HTMLInputElement;
  emit('update:modelValue', target.value);
}
</script>

<template>
  <div class="w-full flex items-center gap-2">
    <label
      v-if="label"
      class="text-md font-medium text-gray-700 whitespace-nowrap"
    >
      {{ label }} :
    </label>

    <input
      :type="type ?? 'text'"
      :value="modelValue"
      @input="onInput"
      :placeholder="placeholder"
      class="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
    />
  </div>
</template>
