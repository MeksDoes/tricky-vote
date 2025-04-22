import {
  IsString,
  MinLength,
  IsArray,
  ValidateNested,
  ArrayUnique,
  ArrayMinSize,
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
  @ArrayMinSize(2, { message: 'A poll must have at least two options' })
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
