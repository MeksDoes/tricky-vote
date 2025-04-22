import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

import { Option } from '../options/option.model';

export type PollDocument = Poll & Document;

@Schema()
export class Poll extends Document {
  @Prop({ type: String, default: () => uuidv4(), unique: true })
  pollId?: string;

  @Prop({ required: true, minlength: 2 })
  title: string;

  @Prop({ required: true, minlength: 5 })
  question: string;

  @Prop({
    type: [{ text: String }],
    validate: [
      {
        validator: (arr: { text: string }[]) => {
          return arr.length >= 2;
        },
        message: 'A poll must have at least two options.',
      },
      {
        validator: (arr: { text: string }[]) => {
          const texts = arr.map((o) => o.text);
          return new Set(texts).size === texts.length;
        },
        message: 'Each option text must be unique within a poll.',
      },
    ],
  })
  options: Array<Option>;
}

export const PollSchema = SchemaFactory.createForClass(Poll);

PollSchema.set('toJSON', {
  transform: function (_doc, ret) {
    delete ret._id;
    delete ret.__v;

    if (Array.isArray(ret.options)) {
      ret.options = ret.options.map((option: Record<string, any>) => {
        delete option._id;
        return option;
      });
    }
    return ret;
  },
});
