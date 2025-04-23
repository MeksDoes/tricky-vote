import { ref } from 'vue';
import { AxiosError } from 'axios';

import { API } from '../api';
import { type APIResponse } from '../api/types';

import { type Poll } from '../api/polls/types';

export function fetchPolls() {
  const polls = ref<Poll[]>([]);
  const isLoading = ref(false);
  const error = ref<AxiosError<string> | null>(null);

  function initPolls(data: Poll[]) {
    polls.value = data;
  }

  async function dispatchGetPolls(): Promise<APIResponse<null>> {
    isLoading.value = true;

    try {
      const { status, data } = await API.polls.getPolls();

      if (!Array.isArray(data)) {
        throw new Error('Unexpected response format at getPolls()');
      }

      if (status === 200) {
        initPolls(data);

        return {
          success: true,
          content: null,
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
    getPolls: dispatchGetPolls,
    polls,
    isLoading,
    error,
  };
}
