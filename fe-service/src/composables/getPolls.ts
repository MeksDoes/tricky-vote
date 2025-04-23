import { ref } from 'vue';
import { AxiosError } from 'axios';

import { API } from '../api';
import { type APIResponse } from '../api/types';

export function fetchPolls() {
  const isLoading = ref(false);
  const error = ref<AxiosError<string> | null>(null);

  async function dispatchGetPolls(): Promise<APIResponse<null>> {
    isLoading.value = true;

    try {
      const { status, data } = await API.polls.getPolls();

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
    getPolls: dispatchGetPolls,
    isLoading,
    error,
  };
}
