import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

import { CreatePollDto } from './dto/create-poll.dto';
import { GetPollDto } from './dto/get-poll.dto';
import { PollService } from './poll.service';
import NotFoundError from './../exceptions/not-found.exception';

@Controller('polls')
export class PollController {
  constructor(private readonly pollService: PollService) {}

  @Post()
  @ApiCreatedResponse({ type: GetPollDto })
  async create(@Body() createPollDto: CreatePollDto) {
    return await this.pollService.create(createPollDto);
  }

  @Get()
  @ApiOkResponse({ type: GetPollDto, isArray: true })
  async findAll() {
    return await this.pollService.findAll();
  }

  @Get(':pollId')
  @ApiOkResponse({ type: GetPollDto })
  async findOne(@Param('pollId') pollId: string) {
    const poll = await this.pollService.findOne(pollId);

    if (poll === null) {
      throw new NotFoundError('Poll', pollId);
    }
    return poll;
  }

  @Patch(':pollId')
  @ApiOkResponse({ type: GetPollDto })
  async update(@Param('pollId') pollId: string, @Body() dto: GetPollDto) {
    const poll = await this.pollService.update(pollId, dto);

    if (poll === null) {
      throw new NotFoundError('Poll', pollId);
    }
    return poll;
  }

  @Delete(':pollId')
  @ApiOkResponse()
  async remove(@Param('pollId') pollId: string) {
    const poll = await this.pollService.remove(pollId);

    if (poll === null) {
      throw new NotFoundError('Poll', pollId);
    }
  }
}
