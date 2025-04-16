import { IsString, MinLength, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Option } from '../../options/option.entity';

export class PollDto {
    @ApiProperty()
    @IsString()
    pollId?: string;

    @ApiProperty()
    @IsString()
    @MinLength(2)
    title: string;

    @ApiProperty()
    @IsString()
    question: string;

    @ApiProperty()
    @IsArray()
    options: Array<Option>;
}