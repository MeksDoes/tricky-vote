import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreatePollDto } from './dto/create-poll.dto';
import { UpdatePollDto } from './dto/update-poll.dto';
import { Poll, PollDocument } from './poll.schema';

@Injectable()
export class PollService {
  @InjectModel(Poll.name) private pollModel: Model<PollDocument>;

  async create(dto: CreatePollDto): Promise<PollDocument> {
    const createdPoll = new this.pollModel(dto);
    return createdPoll.save();
  }

  async findAll(): Promise<PollDocument[]> {
    return this.pollModel.find().exec();
  }

  async findOne(pollId: string): Promise<PollDocument | null> {
    return this.pollModel.findById(pollId).exec();
  }

  async update(
    pollId: string,
    dto: UpdatePollDto,
  ): Promise<PollDocument | null> {
    return this.pollModel.findByIdAndUpdate(pollId, dto, { new: true }).exec();
  }

  async remove(pollId: string): Promise<void> {
    await this.pollModel.findByIdAndDelete(pollId).exec();
  }
}
