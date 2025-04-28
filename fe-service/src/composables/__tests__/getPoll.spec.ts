import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  AxiosError,
  type AxiosRequestHeaders,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
} from 'axios';

import { fetchPoll } from '../getPoll.ts';
import { API } from '../../api';
import { type ComposableAPIResponse } from '../types.ts';
import { type Poll } from '../../api/polls/types.ts';

vi.mock('../../../src/api', () => ({
  API: {
    polls: {
      getPoll: vi.fn<() => Promise<AxiosResponse<ComposableAPIResponse<null>>>>(),
    },
  },
}));

describe('fetchPoll composable', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return the fetched poll', async () => {
    const pollId = '12345';
    const pollDataMock = {
      title: 'Test Poll',
      options: [{ text: 'Option 1' }, { text: 'Option 2' }],
      question: 'Any question',
      pollId,
    };

    const axiosResponse: AxiosResponse<Poll> = {
      data: pollDataMock,
      status: 200,
      statusText: 'OK',
      headers: {} as AxiosRequestHeaders,
      config: {} as InternalAxiosRequestConfig,
    };
    vi.mocked(API.polls.getPoll).mockResolvedValueOnce(axiosResponse);

    const { getPoll, isLoading, error } = fetchPoll();
    const promise = getPoll(pollId);

    expect(isLoading.value).toBe(true);
    const result = await promise;

    expect(result.success).toBe(true);
    expect(result.content).toEqual(pollDataMock);
    expect(isLoading.value).toBe(false);
    expect(error.value).toBeNull();
  });

  it('should handle API errors with AxiosError', async () => {
    const pollId = '12345';
    const anyStatusCode = 999;

    const axiosError = new AxiosError('Internal Server Error', undefined, undefined, undefined, {
      status: anyStatusCode,
      statusText: 'Internal Server Error',
      data: 'Server error',
      headers: {} as AxiosRequestHeaders,
      config: {} as InternalAxiosRequestConfig,
    });

    vi.mocked(API.polls.getPoll).mockRejectedValueOnce(axiosError);

    const { getPoll, isLoading, error } = fetchPoll();
    const promise = getPoll(pollId);

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
    const pollId = '12345';
    const mockError = new Error('Unknown error');

    vi.mocked(API.polls.getPoll).mockRejectedValueOnce(mockError);

    const { getPoll, isLoading, error } = fetchPoll();
    const promise = getPoll(pollId);

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
    const pollId = '12345';
    const unexpectedStatusCode = 999;
    const pollDataMock = {
      title: 'Test Poll',
      options: [{ text: 'Option 1' }, { text: 'Option 2' }],
      question: 'Any question',
      pollId,
    };

    const axiosResponse: AxiosResponse<Poll> = {
      data: pollDataMock,
      status: unexpectedStatusCode,
      statusText: 'Unexpected Status',
      headers: {} as AxiosRequestHeaders,
      config: {} as InternalAxiosRequestConfig,
    };
    vi.mocked(API.polls.getPoll).mockResolvedValueOnce(axiosResponse);

    const { getPoll, isLoading, error } = fetchPoll();
    const promise = getPoll(pollId);

    expect(isLoading.value).toBe(true);
    const result = await promise;

    expect(result.success).toBe(false);
    expect(result.content).toBeNull();
    expect(result.status).toBe(400);
    expect(isLoading.value).toBe(false);
    expect(error.value).toBeNull();
  });
});
