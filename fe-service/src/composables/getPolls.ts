import { ref } from 'vue';
import { AxiosError } from 'axios';

import { API } from '../api';
import { type APIResponse } from '../api/types';

import { type Poll } from '../api/polls/types';

export function useFetch() {
  const polls = ref<Poll[]>([]);
  const isLoading = ref(false);
  const error = ref(null);

  function initPolls(data: Poll[]) {
    polls.value = data;
  }

  async function dispatchGetPolls(): Promise<APIResponse<null>> {
    isLoading.value = true;
    error.value = null;

    try {
      const { status, data } = await API.polls.getPolls();
      if (status === 200) {
        initPolls(data.content);

        return {
          success: true,
          content: null,
        };
      }
    } catch (error) {
      const _error = error as AxiosError<string>;
      return {
        success: false,
        status: _error.response?.status,
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
    getPolls: dispatchGetPolls,
    polls,
    isLoading,
    error,
  };
}
