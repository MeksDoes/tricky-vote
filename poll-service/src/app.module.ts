import { Module } from '@nestjs/common';

import { PollController } from './poll/poll.controller';
import { PollService } from './poll/poll.service';

@Module({
  imports: [],
  controllers: [
    PollController
  ],
  providers: [
    PollService
  ],
})
export class AppModule {}
