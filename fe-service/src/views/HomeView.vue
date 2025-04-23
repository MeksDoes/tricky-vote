<template>
  <h1 v-text="$t('title')" />

  <button @click="goToCreatePoll" v-text="$t('poll.create.newPoll')" />

  <div class="polls">
    <div v-for="(poll, index) in polls" :key="index" class="polls__item">
      <h2 v-text="poll.title" />
      <p v-text="poll.pollId" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { fetchPolls } from '../composables/getPolls';
const { getPolls, polls, isLoading, error } = fetchPolls();

onMounted(async () => {
  const { success, status } = await getPolls();
  console.log({ polls });
  console.log(isLoading);
  console.log(error);

  if (!success) {
    console.log('Api status ->', status);
  }
});

// debugger;

const router = useRouter();

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
