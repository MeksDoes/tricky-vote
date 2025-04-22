import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

import { Poll } from './poll.model';
import { CreatePollDto } from './dto/create-poll.dto';
import { UpdatePollDto } from './dto/update-poll.dto';
import { PollService } from './poll.service';

@Controller('polls')
export class PollController {
  constructor(private readonly pollService: PollService) {}

  @Post()
  @ApiCreatedResponse({ type: Poll })
  create(@Body() createPollDto: CreatePollDto) {
    return this.pollService.create(createPollDto);
  }

  @Get()
  @ApiOkResponse({ type: Poll, isArray: true })
  findAll() {
    return this.pollService.findAll();
  }

  @Get(':pollId')
  @ApiOkResponse({ type: Poll })
  findOne(@Param('pollId') pollId: string) {
    return this.pollService.findOne(pollId);
  }

  @Patch(':pollId')
  update(@Param('pollId') pollId: string, @Body() dto: UpdatePollDto) {
    return this.pollService.update(pollId, dto);
  }

  @Delete(':pollId')
  @ApiOkResponse()
  remove(@Param('pollId') pollId: string) {
    this.pollService.remove(pollId);
  }
}
