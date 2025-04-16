import { Module } from '@nestjs/common';

import { PollController } from './poll.controller';
import { PollService } from './poll.service';

@Module({
  imports: [],
  controllers: [ PollController ],
  providers: [ PollService ],
})
export class PollModule {}
