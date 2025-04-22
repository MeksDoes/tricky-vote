<template>
  <div class="labeled-input">
    <label>{{ label }}</label>
    <input type="text" :placeholder="placeholder" :value="modelValue" @input="onInput" />
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';

defineProps<{
  label: string;
  placeholder: string;
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

function onInput({ target }: Event) {
  if (!(target instanceof HTMLInputElement)) {
    return;
  }
  emit('update:modelValue', target.value);
}
</script>

<style scoped>
.labeled-input {
  display: flex;
  flex-direction: column;
  margin-bottom: var(--margin-m);
}

.labeled-input label {
  font-weight: bold;
  color: var(--color-white);

  &:after {
    content: ':';
  }
}

.labeled-input input {
  background-color: var(--color-gray);
  color: var(--color-dark);
  font-style: italic;
  border: none;
  border-radius: var(--radius-m);
  padding: var(--padding-s) var(--padding-s);
  outline: none;
}
</style>
