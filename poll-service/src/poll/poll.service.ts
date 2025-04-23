import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreatePollDto } from './dto/create-poll.dto';
import { GetPollDto } from './dto/get-poll.dto';
import { Poll, PollDocument } from './entities/poll.schema';

@Injectable()
export class PollService {
  constructor(
    @InjectModel(Poll.name)
    private readonly pollModel: Model<PollDocument>,
  ) {}

  async create(dto: CreatePollDto): Promise<PollDocument> {
    const createdPoll = new this.pollModel(dto);
    return createdPoll.save();
  }

  async findAll(): Promise<PollDocument[]> {
    return this.pollModel.find().exec();
  }

  async findOne(pollId: string): Promise<PollDocument | null> {
    return this.pollModel.findOne({ pollId }).exec();
  }

  async update(pollId: string, dto: GetPollDto): Promise<PollDocument | null> {
    return this.pollModel.findOneAndUpdate({ pollId }, dto, { new: true }).exec();
  }

  async remove(pollId: string): Promise<PollDocument | null> {
    return this.pollModel.findOneAndDelete({ pollId }).exec();
  }
}
