// the axios instance and types
import http from '../api';
import { type Poll, type CreatePollDTO } from './types';

async function getPolls() {
  return await http.get<Poll[]>('polls');
}

async function getPoll(id: string) {
  return await http.get<Poll>(`polls/${id}`);
}

async function deletePoll(id: string) {
  return await http.delete<boolean>(`polls/${id}`);
}

async function createPoll(input: CreatePollDTO) {
  return await http.post<Poll>('polls', input);
}

async function updatePoll(input: CreatePollDTO) {
  return await http.put<boolean>('polls', input);
}

export default {
  getPolls,
  getPoll,
  createPoll,
  updatePoll,
  deletePoll,
};
