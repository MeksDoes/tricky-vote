import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AxiosError, AxiosRequestHeaders, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

import { addPoll } from '../../../src/composables/addPoll';
import { API } from '../../../src/api';
import { type CreatePollDTO, Poll } from '../../../src/api/polls/types';
import type { ComposableAPIResponse } from '../../../src/composables/types';

vi.mock('../../../src/api', () => ({
  API: {
    polls: {
      createPoll: vi.fn<() => Promise<AxiosResponse<ComposableAPIResponse<null>>>>(),
    },
  },
}));

describe('addPoll composable', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return the created poll', async () => {
    const pollId = '12345';
    const pollDataDTOMock: CreatePollDTO = {
      title: 'Test Poll',
      options: [{ text: 'Option 1' }, { text: 'Option 2' }],
      question: 'any question',
    };
    const pollDataMock: Poll = {
      ...pollDataDTOMock,
      pollId,
    };
    const axiosResponse: AxiosResponse<Poll> = {
      data: pollDataMock,
      status: 201,
      statusText: 'Created',
      headers: {} as AxiosRequestHeaders,
      config: {} as InternalAxiosRequestConfig,
    };
    vi.mocked(API.polls.createPoll).mockResolvedValueOnce(axiosResponse);

    const { postPoll, isLoading, error } = addPoll();
    const promise = postPoll(pollDataDTOMock);

    expect(isLoading.value).toBe(true);
    const result = await promise;

    expect(result.success).toBe(true);
    expect(result.content).toEqual(pollDataMock);
    expect(isLoading.value).toBe(false);
    expect(error.value).toBeNull();
  });

  it('should handle API errors with AxiosError', async () => {
    const anyStatusCode = 999;
    const pollDataDTOMock: CreatePollDTO = {
      title: 'Test Poll',
      options: [{ text: 'Option 1' }, { text: 'Option 2' }],
      question: 'any question',
    };

    const axiosError = new AxiosError('Bad Request', undefined, undefined, undefined, {
      status: anyStatusCode,
      statusText: 'Bad Request',
      data: 'Bad request',
      headers: {} as AxiosRequestHeaders,
      config: {} as InternalAxiosRequestConfig,
    });
    vi.mocked(API.polls.createPoll).mockRejectedValueOnce(axiosError);

    const { postPoll, isLoading, error } = addPoll();
    const promise = postPoll(pollDataDTOMock);

    expect(isLoading.value).toBe(true);
    const result = await promise;

    expect(result.success).toBe(false);
    expect(result.status).toBe(anyStatusCode);
    expect(result.content).toBe(null);
    expect(isLoading.value).toBe(false);
    expect(error.value).toBeInstanceOf(Error);
    expect(error.value).toBeInstanceOf(AxiosError);
    expect(error.value?.response?.status).toBe(anyStatusCode);
  });

  it('Unknown errors should be available in error.value', async () => {
    const pollDataDTOMock: CreatePollDTO = {
      title: 'Test Poll',
      options: [{ text: 'Option 1' }, { text: 'Option 2' }],
      question: 'any question',
    };
    vi.mocked(API.polls.createPoll).mockRejectedValueOnce(new Error('Unknown error'));

    const { postPoll, isLoading, error } = addPoll();
    const promise = postPoll(pollDataDTOMock);

    expect(isLoading.value).toBe(true);
    const result = await promise;

    expect(result.success).toBe(false);
    expect(result.status).toBeUndefined();
    expect(isLoading.value).toBe(false);
    expect(error.value).not.toBeNull();
    expect(error.value).toBeInstanceOf(Error);
  });

  it('Unexpected status code should return null', async () => {
    const unexpectedStatusCode = 999;

    const pollId = '12345';
    const pollDataDTOMock: CreatePollDTO = {
      title: 'Test Poll',
      options: [{ text: 'Option 1' }, { text: 'Option 2' }],
      question: 'any question',
    };
    const pollDataMock: Poll = {
      ...pollDataDTOMock,
      pollId,
    };
    const axiosResponse: AxiosResponse<Poll> = {
      data: pollDataMock,
      status: unexpectedStatusCode,
      statusText: 'Any',
      headers: {} as AxiosRequestHeaders,
      config: {} as InternalAxiosRequestConfig,
    };
    vi.mocked(API.polls.createPoll).mockResolvedValueOnce(axiosResponse);

    const { postPoll, isLoading, error } = addPoll();
    const promise = postPoll(pollDataDTOMock);

    expect(isLoading.value).toBe(true);
    const result = await promise;

    expect(result.success).toBe(false);
    expect(result.content).toEqual(null);
    expect(result.status).toEqual(400);
    expect(isLoading.value).toBe(false);
    expect(error.value).toBeNull();
  });
});
