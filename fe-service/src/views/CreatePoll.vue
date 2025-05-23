<template>
  <div class="create-poll">
    <div v-if="isLoading">{{ t('common.loading.message') }}</div>
    <BaseInput
      :label="t('poll.create.input.title.title')"
      :placeholder="t('poll.create.input.title.placeholder')"
      v-model="title"
    />
    <BaseInput
      :label="t('poll.create.input.question.title')"
      :placeholder="t('poll.create.input.question.placeholder')"
      v-model="question"
    />

    <div class="add-option">
      <BaseInput
        class="add-option--base-input"
        :label="t('poll.create.input.option.title')"
        :placeholder="t('poll.create.input.option.placeholder')"
        v-model="newOption"
      />
      <button
        :disabled="newOption.trim().length === 0"
        @click="addOption"
        v-text="t('poll.create.input.option.addOption')"
      />
    </div>

    <div class="create-poll__preview" v-if="options.length > 0">
      <h3 v-text="t('poll.create.preview.options')" />
      <ul>
        <li v-for="(option, index) in options" :key="index">
          {{ option.text }}
        </li>
      </ul>
    </div>
    <button :disabled="!pollIsValid" @click="submitPoll" v-text="t('poll.create.submit')" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

import BaseInput from '@/components/BaseInput.vue';
import { addPoll } from '@/composables/addPoll';
import { type Option, type CreatePollDTO } from '@/api/polls/types';

const { t } = useI18n();
const router = useRouter();
const { postPoll, isLoading } = addPoll();

const title = ref('');
const question = ref('');
const newOption = ref('');
const options = ref<Option[]>([]);

// Todo: validate inputs
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

  const { success, content } = await postPoll(newPoll);

  if (success && content?.pollId) {
    await router.push({ name: 'show-poll', params: { pollId: content.pollId } });
  }
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
