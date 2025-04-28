import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  AxiosError,
  type AxiosRequestHeaders,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
} from 'axios';

import { fetchPolls } from '../getPolls.ts';
import { API } from '../../api';
import { type ComposableAPIResponse } from '../types.ts';
import { type Poll } from '../../api/polls/types.ts';

vi.mock('../../../src/api', () => ({
  API: {
    polls: {
      getPolls: vi.fn<() => Promise<AxiosResponse<ComposableAPIResponse<null>>>>(),
    },
  },
}));

describe('fetchPolls composable', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return the fetched polls', async () => {
    const pollDataMock = [
      {
        pollId: 'anyId1',
        title: 'Test Poll 1',
        options: [{ text: 'Option 1' }, { text: 'Option 2' }],
        question: 'Any question 1',
      },
      {
        pollId: 'anyId2',
        title: 'Test Poll 2',
        options: [{ text: 'Option 3' }, { text: 'Option 4' }],
        question: 'Any question 2',
      },
    ];

    const axiosResponse: AxiosResponse<Poll[]> = {
      data: pollDataMock,
      status: 200,
      statusText: 'OK',
      headers: {} as AxiosRequestHeaders,
      config: {} as InternalAxiosRequestConfig,
    };

    vi.mocked(API.polls.getPolls).mockResolvedValueOnce(axiosResponse);

    const { getPolls, isLoading, error } = fetchPolls();
    const promise = getPolls();

    expect(isLoading.value).toBe(true);
    const result = await promise;

    expect(result.success).toBe(true);
    expect(result.content).toEqual(pollDataMock);
    expect(isLoading.value).toBe(false);
    expect(error.value).toBeNull();
  });

  it('should handle API errors with AxiosError', async () => {
    const anyStatusCode = 500;

    const axiosError = new AxiosError('Internal Server Error', undefined, undefined, undefined, {
      status: anyStatusCode,
      statusText: 'Internal Server Error',
      data: 'Server error',
      headers: {} as AxiosRequestHeaders,
      config: {} as InternalAxiosRequestConfig,
    });

    vi.mocked(API.polls.getPolls).mockRejectedValueOnce(axiosError);

    const { getPolls, isLoading, error } = fetchPolls();
    const promise = getPolls();

    expect(isLoading.value).toBe(true);
    const result = await promise;

    expect(result.success).toBe(false);
    expect(result.status).toBe(anyStatusCode);
    expect(result.content).toBeNull();
    expect(isLoading.value).toBe(false);
    expect(error.value).toBeInstanceOf(Error);
    expect(error.value).toBeInstanceOf(AxiosError);
    expect(error.value?.response?.status).toBe(anyStatusCode);
  });

  it('Unknown errors should be available in error.value', async () => {
    const mockError = new Error('Unknown error');

    vi.mocked(API.polls.getPolls).mockRejectedValueOnce(mockError);

    const { getPolls, isLoading, error } = fetchPolls();
    const promise = getPolls();

    expect(isLoading.value).toBe(true);
    const result = await promise;

    expect(result.success).toBe(false);
    expect(result.status).toBeUndefined();
    expect(result.content).toBeNull();
    expect(isLoading.value).toBe(false);
    expect(error.value).not.toBeNull();
    expect(error.value).toBeInstanceOf(Error);
  });

  it('Unexpected status code should return null', async () => {
    const unexpectedStatusCode = 999;

    const pollDataMock = [
      {
        pollId: 'anyId1',
        title: 'Test Poll 1',
        options: [{ text: 'Option 1' }, { text: 'Option 2' }],
        question: 'Any question 1',
      },
      {
        pollId: 'anyId2',
        title: 'Test Poll 2',
        options: [{ text: 'Option 3' }, { text: 'Option 4' }],
        question: 'Any question 2',
      },
    ];

    const axiosResponse: AxiosResponse<Poll[]> = {
      data: pollDataMock,
      status: unexpectedStatusCode,
      statusText: 'Unexpected Status',
      headers: {} as AxiosRequestHeaders,
      config: {} as InternalAxiosRequestConfig,
    };

    vi.mocked(API.polls.getPolls).mockResolvedValueOnce(axiosResponse);

    const { getPolls, isLoading, error } = fetchPolls();
    const promise = getPolls();

    expect(isLoading.value).toBe(true);
    const result = await promise;

    expect(result.success).toBe(false);
    expect(result.content).toBeNull();
    expect(result.status).toBe(400); // Expected fallback status
    expect(isLoading.value).toBe(false);
    expect(error.value).toBeNull();
  });
});
