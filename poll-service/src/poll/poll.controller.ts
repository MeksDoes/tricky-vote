import { Controller, Get, Param } from '@nestjs/common';
import PollDto from './dto/get-poll.dto';
import { PollService } from 'src/poll/poll.service';


@Controller('polls')
export class PollController {
  constructor(private readonly pollService: PollService) {}

  @Get(':pollId')
  getPoll(@Param('pollId') pollId: string): PollDto {
    return this.pollService.getPoll(pollId);
  }
}
