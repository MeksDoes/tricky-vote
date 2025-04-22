import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PollModule } from './poll/poll.module';

const MONGODB_URI =
  `mongodb://` +
  `${process.env.MONGODB_USERNAME}:` +
  `${process.env.MONGODB_PASSWORD}@` +
  `${process.env.MONGODB_ENVIROMENT}:` +
  `${process.env.MONGODB_PORT}/` +
  `${process.env.MONGODB_DATABASE}`;

@Module({
  imports: [MongooseModule.forRoot(MONGODB_URI), PollModule],
})
export class AppModule {}
