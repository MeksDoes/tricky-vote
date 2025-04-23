export type Option = {
  text: string;
};

export type Poll = {
  pollId: string;
  title: string;
  question: string;
  options: Array<Option>;
};

export type CreatePollDTO = {
  title: string;
  question: string;
  options: Array<Option>;
};
