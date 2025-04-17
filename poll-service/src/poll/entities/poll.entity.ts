import { UUID } from 'crypto';
import { Option } from '../../options/entities/option.entity';

export class Poll {
  pollId?: UUID;
  title: string;
  question: string;
  options: Array<Option>;
}
