import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

import { Option } from '../options/option.model';

export type PollDocument = Poll & Document;

@Schema({ timestamps: true })
export class Poll extends Document {
  @Prop({ type: String, default: () => uuidv4(), unique: true })
  pollId?: string;

  @Prop({ required: true, minlength: 2 })
  title: string;

  @Prop({ required: true, minlength: 5 })
  question: string;

  @Prop({ type: [{ text: String }], default: [] })
  options: Array<Option>;
}

export const PollSchema = SchemaFactory.createForClass(Poll);
