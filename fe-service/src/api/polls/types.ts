export type Option = {
  text: string;
};

export type Poll = {
  pollId?: string;
  title: string;
  question: string;
  options: Array<Option>;
};

export type InputCreatePoll = {
  title: string;
  question: string;
  options: Array<Option>;
};
