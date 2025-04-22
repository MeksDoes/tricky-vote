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

  @Prop({
    type: [{ text: String }],
    validate: {
      validator: (arr: { text: string }[]) => {
        const texts = arr.map((o) => o.text);
        return new Set(texts).size === texts.length;
      },
      message: 'Each option text must be unique within a poll',
    },
  })
  options: Array<Option>;
}

export const PollSchema = SchemaFactory.createForClass(Poll);
