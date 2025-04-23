import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

import { CreatePollDto } from './dto/create-poll.dto';
import { GetPollDto } from './dto/get-poll.dto';
import { PollService } from './poll.service';

@Controller('polls')
export class PollController {
  constructor(private readonly pollService: PollService) {}

  @Post()
  @ApiCreatedResponse({ type: GetPollDto })
  create(@Body() createPollDto: CreatePollDto) {
    return this.pollService.create(createPollDto);
  }

  @Get()
  @ApiOkResponse({ type: GetPollDto, isArray: true })
  findAll() {
    return this.pollService.findAll();
  }

  @Get(':pollId')
  @ApiOkResponse({ type: GetPollDto })
  findOne(@Param('pollId') pollId: string) {
    return this.pollService.findOne(pollId);
  }

  @Patch(':pollId')
  @ApiOkResponse({ type: GetPollDto })
  update(@Param('pollId') pollId: string, @Body() dto: GetPollDto) {
    return this.pollService.update(pollId, dto);
  }

  @Delete(':pollId')
  @ApiOkResponse()
  remove(@Param('pollId') pollId: string) {
    this.pollService.remove(pollId);
  }
}
