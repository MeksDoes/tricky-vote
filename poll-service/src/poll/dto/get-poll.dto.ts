import { IsString, MinLength, IsArray } from 'class-validator';
import { Option } from '../../options/option.entity';

class PollDto {
    @IsString()
    pollId?: string;

    @IsString()
    @MinLength(2)
    title: string;

    @IsString()
    question: string;

    @IsArray()
    options: Array<Option>;
}
export default PollDto;