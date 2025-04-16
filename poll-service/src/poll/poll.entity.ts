import { Option } from "src/options/option.entity";

export class Poll {
    pollId?: string;
    title: string;
    question: string;
    options: Array<Option>;
}