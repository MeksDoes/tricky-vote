import type { Option } from '../options/option.entity';

class Poll {
    pollId?: string;
    title: string;
    question: string;
    options: Array<Option>;

    constructor() {}
}
export default Poll;