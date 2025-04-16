import { Controller, Get, Param } from '@nestjs/common';
import PollDto from './dto/get-poll.dto';
import { PollService } from 'src/poll/poll.service';
import { ApiOkResponse } from '@nestjs/swagger';


@Controller('polls')
export class PollController {
  constructor(private readonly pollService: PollService) {}

  @Get(':pollId')
  @ApiOkResponse({type: PollDto})
  getPoll(@Param('pollId') pollId: string): PollDto {
    return this.pollService.getPoll(pollId);
  }
}
