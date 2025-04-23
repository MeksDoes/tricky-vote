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

export class BasePollDto {
  @ApiProperty({
    description: 'The title of the poll',
    minLength: 2,
    example: 'Favorite food',
  })
  @IsString()
  @MinLength(2)
  title: string;

  @ApiProperty({
    description: 'The question of the poll',
    minLength: 5,
    example: 'What is your favorite food?',
  })
  @IsString()
  @MinLength(5)
  question: string;

  @ApiProperty({
    description: 'The options for the poll',
    type: [OptionDto],
    minItems: 2,
    example: [{ text: 'Pizza' }, { text: 'Lasange' }],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OptionDto)
  @ArrayMinSize(2, { message: 'A poll must have at least two options' })
  @ArrayUnique((o: OptionDto) => o.text, {
    message: 'Each option text must be unique within a poll',
  })
  options: OptionDto[];
}
