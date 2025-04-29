<template>
  <h1 v-text="t('title')" />

  <button @click="goToCreatePoll" v-text="t('poll.create.newPoll')" />

  <div class="polls">
    <div v-for="(poll, index) in polls" :key="index" class="polls__item">
      <h2 v-text="poll.title" />
      <a @click="showPoll(poll.pollId)" v-text="poll.pollId" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

import { type Poll } from '../api/polls/types';
import { fetchPolls } from '../composables/getPolls';

const { t } = useI18n();
const { getPolls, isLoading, error } = fetchPolls();
const polls = ref<Poll[]>();
const router = useRouter();

onMounted(async () => {
  const { content, success, status } = await getPolls();
  if (!success || !content) {
    console.error('Error fetching poll:', status);
    return;
  }
  polls.value = content;
});

const showPoll = (pollId: string): void => {
  router.push({ name: 'show-poll', params: { pollId } });
};
const goToCreatePoll = (): void => {
  router.push('/create-poll');
};
</script>

<style scoped>
.polls {
  padding-top: var(--padding-l);
}

.polls__item {
  padding-top: var(--padding-m);
}
</style>
