import { UUID } from "crypto";
import { Option } from "../../options/option.entity";

export class Poll {
    pollId?: UUID;
    title: string;
    question: string;
    options: Array<Option>;
}