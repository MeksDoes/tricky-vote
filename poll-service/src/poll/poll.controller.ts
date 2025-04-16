import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

import { PollDto } from './dto/get-poll.dto';
import { PollService } from 'src/poll/poll.service';
import { CreatePollDto } from './dto/create-poll.dto';
import { UpdatePollDto } from './dto/update-poll.dto';


@Controller('polls')
export class PollController {
  constructor(private readonly pollService: PollService) {}

  @Post()
  @ApiCreatedResponse({type: PollDto})
  create(@Body() createPollDto: CreatePollDto) {
    return this.pollService.create(createPollDto);
  }

  @Get()
  @ApiOkResponse({type: PollDto, isArray: true})
  findAll() {
    return this.pollService.findAll();
  }

  @Get(':pollId')
  @ApiOkResponse({type: PollDto })
  findOne(@Param('pollId') pollId: string) {
    return this.pollService.findOne(pollId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePollDto) {
    return this.pollService.update(id, dto);
  }

  @Delete(':pollId')
  @ApiOkResponse()
  remove(@Param('pollId') pollId: string) {
    return this.pollService.remove(pollId);
  }
}
