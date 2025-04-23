import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { BasePollDto } from './base-poll.dto';

export class GetPollDto extends BasePollDto {
  @ApiProperty({
    description: 'The unique identifier of the poll',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  pollId: string;
}
