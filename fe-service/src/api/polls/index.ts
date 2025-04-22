// the axios instance and types
import http from '../api';
import { type APIResponse } from '../types';
import { type Poll, type InputCreatePoll } from './types';

async function getPolls() {
  return await http.get<APIResponse<Poll[]>>('polls');
}

async function deletePoll(id: number) {
  return await http.delete<APIResponse<boolean>>(`polls/${id}`);
}

async function createPoll(input: InputCreatePoll) {
  return await http.post<APIResponse<Poll>>('polls', input);
}

async function updatePoll(input: InputCreatePoll) {
  return await http.put<APIResponse<boolean>>('polls', input);
}

export default {
  getPolls,
  createPoll,
  updatePoll,
  deletePoll,
};
