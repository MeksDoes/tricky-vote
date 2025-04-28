// tests/unit/api/polls.spec.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import API from '../../polls';
import http from './../../api';

vi.mock('./../../api', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('Polls API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch all polls', async () => {
    const mockPolls = [{ pollId: '1', title: 'Test', question: 'Test?', options: [] }];
    vi.mocked(http.get).mockResolvedValueOnce(mockPolls);

    const result = await API.getPolls();
    expect(http.get).toHaveBeenCalledWith('polls');
    expect(result).toEqual(mockPolls);
  });

  it('should fetch a single poll by id', async () => {
    const mockPoll = { pollId: '1', title: 'Test', question: 'Test?', options: [] };
    vi.mocked(http.get).mockResolvedValueOnce(mockPoll);

    const result = await API.getPoll('1');
    expect(http.get).toHaveBeenCalledWith('polls/1');
    expect(result).toEqual(mockPoll);
  });

  it('should delete a poll by id', async () => {
    vi.mocked(http.delete).mockResolvedValueOnce(true);

    const result = await API.deletePoll('1');
    expect(http.delete).toHaveBeenCalledWith('polls/1');
    expect(result).toBe(true);
  });

  it('should create a new poll', async () => {
    const newPoll = { title: 'New Poll', question: 'New?', options: [] };
    const createdPoll = { ...newPoll, pollId: '2' };
    vi.mocked(http.post).mockResolvedValueOnce(createdPoll);

    const result = await API.createPoll(newPoll);
    expect(http.post).toHaveBeenCalledWith('polls', newPoll);
    expect(result).toEqual(createdPoll);
  });

  it('should update an existing poll', async () => {
    const updatedPoll = { title: 'Updated Poll', question: 'Updated?', options: [] };
    vi.mocked(http.put).mockResolvedValueOnce(true);

    const result = await API.updatePoll(updatedPoll);
    expect(http.put).toHaveBeenCalledWith('polls', updatedPoll);
    expect(result).toBe(true);
  });
});
