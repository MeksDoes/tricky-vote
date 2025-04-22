<template>
  <h1 v-text="$t('title')" />

  <button @click="goToCreatePoll" v-text="$t('poll.create.newPoll')" />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useFetch } from '../composables/getPolls';

// const { getPolls, polls, isLoading, error } = useFetch();
// await getPolls();
// console.log(polls);
// console.log(isLoading);
// console.log(error);

// debugger;

const router = useRouter();

const goToCreatePoll = (): void => {
  router.push('/create-poll');
};
</script>
