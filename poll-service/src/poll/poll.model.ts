import { UUID } from 'crypto';
import { Option } from '../options/option.model';

export class Poll {
  pollId?: UUID;
  title: string;
  question: string;
  options: Array<Option>;
}
