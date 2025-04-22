<template>
  <h1 v-text="$t('title')" />

  <button @click="goToCreatePoll" v-text="$t('poll.create.newPoll')" />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goToCreatePoll = (): void => {
  router.push('/create-poll')
}
</script>
