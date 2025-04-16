import { Injectable } from '@nestjs/common';
import { Poll } from './poll.entity';
import { CreatePollDto } from './dto/create-poll.dto';
import { PollMapper } from './poll.mapper';
import { UpdatePollDto } from './dto/update-poll.dto';

@Injectable()
export class PollService {
  private polls: Poll[] = [];

  create(dto: CreatePollDto): Poll {
    const poll = PollMapper.fromCreateDto(dto);
    this.polls.push(poll);
    return poll;
  }

  findAll(): Poll[] {
    return this.polls;
  }

  findOne(pollId: string): Poll | undefined {
    return this.polls.find(p => p.pollId === pollId);
  }

  update(pollId: string, dto: UpdatePollDto): Poll | undefined {
    const poll = this.findOne(pollId);
    if (poll) {
      Object.assign(poll, dto);
    }
    return poll;
  }
  
  remove(pollId: string): void {
    this.polls = this.polls.filter(p => p.pollId !== pollId);
  }
}
