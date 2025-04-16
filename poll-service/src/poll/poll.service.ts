import { Injectable } from '@nestjs/common';
import Poll from 'src/poll/poll.entity';
import { Option } from 'src/options/option.entity';

@Injectable()
export class PollService {
  getPoll(pollId: string): Poll {
    const optionOne = new Option('Do more');
    const optionTwo = new Option('Do less');
    const optionThree = new Option('Do nothing');

    const poll: Poll = {
      title: 'My first Poll',
      question: 'What are the next steps?',
      options: [
        optionOne,
        optionTwo,
        optionThree
      ]
    };
    
    return poll;
  }
}
