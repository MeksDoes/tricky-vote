import { ref } from 'vue';
import { AxiosError } from 'axios';

import { API } from '../api';
import { type ComposableAPIResponse } from './types.ts';
import type { Poll } from '../api/polls/types.ts';

export function fetchPoll() {
  const isLoading = ref(false);
  const error = ref<AxiosError<string> | null>(null);

  async function dispatchGetPollById(pollId: string): Promise<ComposableAPIResponse<Poll | null>> {
    isLoading.value = true;

    try {
      const { status, data } = await API.polls.getPoll(pollId);

      if (status === 200) {
        return {
          success: true,
          content: data,
        };
      }
    } catch (err) {
      error.value = err as AxiosError<string>;
      return {
        success: false,
        status: error.value.response?.status,
        content: null,
      };
    } finally {
      isLoading.value = false;
    }

    return {
      success: false,
      content: null,
      status: 400,
    };
  }

  return {
    getPoll: dispatchGetPollById,
    isLoading,
    error,
  };
}
