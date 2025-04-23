<template>
  <div class="create-poll">
    <BaseInput
      :label="$t('poll.create.input.title.title')"
      :placeholder="$t('poll.create.input.title.placeholder')"
      v-model="title"
    />
    <BaseInput
      :label="$t('poll.create.input.question.title')"
      :placeholder="$t('poll.create.input.question.placeholder')"
      v-model="question"
    />

    <div class="add-option">
      <BaseInput
        class="add-option--base-input"
        :label="$t('poll.create.input.option.title')"
        :placeholder="$t('poll.create.input.option.placeholder')"
        v-model="newOption"
      />
      <button
        :disabled="newOption.trim().length === 0"
        @click="addOption"
        v-text="$t('poll.create.input.option.addOption')"
      />
    </div>

    <div class="create-poll__preview" v-if="options.length > 0">
      <h3 v-text="$t('poll.create.preview.options')" />
      <ul>
        <li v-for="(option, index) in options" :key="index">
          {{ option.text }}
        </li>
      </ul>
    </div>
    <!-- :disabled="!pollIsValid" -->
    <button @click="submitPoll" v-text="$t('poll.create.submit')" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

import BaseInput from '@/components/BaseInput.vue';
import { addPoll } from '../composables/addPoll';
import { type Options, type CreatePollDTO } from '../api/polls/types';
const { postPoll, poll, isLoading, error } = addPoll();

const title = ref('');
const question = ref('');
const newOption = ref('');
const options = ref<Options[]>([]);

const pollIsValid = computed(() => {
  return true;
});

function addOption() {
  if (newOption.value.trim().length === 0) return;
  options.value.push({ text: newOption.value.trim() });
  newOption.value = '';
}

async function submitPoll() {
  const newPoll: CreatePollDTO = {
    title: title.value,
    question: question.value,
    options: options.value,
  };

  await postPoll(newPoll);
}
</script>

<style scoped>
.add-option {
  margin-top: var(--margin-m);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.add-option button {
  align-self: flex-end;
}

.add-option--base-input {
  width: 100%;
}

.create-poll__preview {
  margin-top: var(--margin-l);
}
</style>
