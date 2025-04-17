import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PollController } from './poll.controller';
import { PollService } from './poll.service';
import { PollSchema } from './poll.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Poll', schema: PollSchema }])],
  controllers: [PollController],
  providers: [PollService],
})
export class PollModule {}
