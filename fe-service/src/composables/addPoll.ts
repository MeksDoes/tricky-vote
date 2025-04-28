import { ref } from 'vue';
import { AxiosError } from 'axios';

import { API } from '../api';
import { type ComposableAPIResponse } from './types.ts';
import { type CreatePollDTO, type Poll } from '../api/polls/types';

export function addPoll() {
  const isLoading = ref(false);
  const error = ref<AxiosError<string> | null>(null);

  async function dispatchCreatePoll(input: CreatePollDTO): Promise<ComposableAPIResponse<Poll | null>> {
    isLoading.value = true;

    try {
      const { status, data } = await API.polls.createPoll(input);

      if (status === 201) {
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
    postPoll: dispatchCreatePoll,
    isLoading,
    error,
  };
}
