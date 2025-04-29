<template>
  <div class="poll-view">
    <div v-if="isLoading">{{ t('common.loading.message') }}</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else-if="poll">
      <h1 class="poll-view__title">{{ poll.title }}</h1>
      <h2 class="poll-view__question">{{ poll.question }}</h2>

      <div class="poll-view__options">
        <h3>{{ t('poll.option.title') }}</h3>
        <ul>
          <li v-for="(option, index) in poll.options" :key="index">
            {{ option.text }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';

import { type Poll } from '@/api/polls/types';
import { fetchPoll } from '@/composables/getPoll';

const { t } = useI18n();
const { pollId } = useRoute().params as { pollId: string };
const { getPoll, isLoading, error } = fetchPoll();
const poll = ref<Poll>();

onMounted(async () => {
  const { content, success, status } = await getPoll(pollId);
  if (!success || !content) {
    console.error('Error fetching poll:', status);
    return;
  }
  poll.value = content;
});
</script>

<style scoped>
.poll-view {
  padding-top: var(--padding-l);
}

.poll-view__title {
  margin-bottom: var(--margin-l);
}

.poll-view__question {
  margin-bottom: var(--margin-m);
}

.poll-view__options {
  margin-top: var(--margin-m);
}

.poll-view__options h3::after {
  content: ':';
}

.poll-view__options ul {
  margin-top: var(--margin-s);
}

.poll-view__options li {
  background-color: var(--color-gray-light);
  margin-bottom: var(--margin-s);
  padding: var(--padding-s);
  border-radius: var(--radius-s);
}
</style>
