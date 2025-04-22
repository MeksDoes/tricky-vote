import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OptionDto {
  @ApiProperty()
  @IsString()
  text: string;

  constructor(text: string) {
    this.text = text;
  }
}
