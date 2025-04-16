import { CreatePollDto } from './dto/create-poll.dto';
import { Poll } from './entities/poll.entity';

export class PollMapper {
  static fromCreateDto(dto: CreatePollDto): Poll {
    return {
      pollId: crypto.randomUUID(),
      title: dto.title,
      question: dto.question,
      options: dto.options.map((opt) => ({ text: opt.text })),
    };
  }
}