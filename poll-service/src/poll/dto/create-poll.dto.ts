import {
  IsString,
  MinLength,
  IsArray,
  ValidateNested,
  ArrayUnique,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { OptionDto } from '../../options/dto/option.dto';

export class CreatePollDto {
  @ApiProperty()
  @IsString()
  @MinLength(2)
  title: string;

  @ApiProperty()
  @IsString()
  @MinLength(5)
  question: string;

  @ApiProperty({ type: [OptionDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OptionDto)
  @ArrayUnique((o: OptionDto) => o.text, {
    message: 'Each option text must be unique within a poll',
  })
  options: OptionDto[];

  constructor(title: string, question: string, options: OptionDto[]) {
    this.title = title;
    this.question = question;
    this.options = options;
  }
}
