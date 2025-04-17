import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { Option } from '../options/entities/option.entity';

export type PollDocument = Poll & Document;

@Schema({ timestamps: true })
export class Poll extends Document {
  @Prop({ type: String })
  pollId?: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  question: string;

  @Prop({ type: [{ text: String }], default: [] })
  options: Array<Option>;
}

export const PollSchema = SchemaFactory.createForClass(Poll);
