import { IsString, MinLength, IsArray, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { OptionDto } from 'src/options/option.dto';

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
    options: OptionDto[];
}