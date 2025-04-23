// the axios instance and types
import http from '../api';
import { type APIResponse } from '../types';
import { type Poll, type CreatePollDTO } from './types';

async function getPolls() {
  return await http.get<APIResponse<Poll[]>>('polls');
}

async function deletePoll(id: string) {
  return await http.delete<APIResponse<boolean>>(`polls/${id}`);
}

async function createPoll(input: CreatePollDTO) {
  return await http.post<APIResponse<Poll>>('polls', input);
}

async function updatePoll(input: CreatePollDTO) {
  return await http.put<APIResponse<boolean>>('polls', input);
}

export default {
  getPolls,
  createPoll,
  updatePoll,
  deletePoll,
};
