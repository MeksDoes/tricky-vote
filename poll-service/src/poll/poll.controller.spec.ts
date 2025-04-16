import { Test, TestingModule } from '@nestjs/testing';

import { PollService } from './poll.service';
import { CreatePollDto } from './dto/create-poll.dto';
import { PollController } from './poll.controller';
import { OptionDto } from '../options/dto/option.dto';

describe('PollController', () => {
    let controller: PollController;

    const mockPollService = {
        create: jest.fn().mockImplementation((dto): any => {
            return {
                pollId: stubPollId,
                ...dto,
            };
        }),
        update: jest.fn().mockImplementation((pollId: string, dto): any => {
            return {
                pollId,
                ...dto,
            };
        }),
        remove: jest.fn().mockImplementation((pollId: string): any => {
            return {
                pollId,
            };
        }),
        findOne: jest.fn().mockImplementation((pollId: string): any => {
            return pollId;
        }),
        findAll: jest.fn().mockImplementation(() => {
            return [];
        }),
    };

    // Stubs
    const stubPollId = 'A-UUID';
    const stubPollDto = new CreatePollDto('any title', 'any question', [
        new OptionDto('Option 1'),
        new OptionDto('Option 2'),
    ]);

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PollController],
            providers: [PollService],
        })
            .overrideProvider(PollService)
            .useValue(mockPollService)
            .compile();

        controller = module.get<PollController>(PollController);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('polls', () => {
        it('should be defined', () => {
            expect(controller).toBeDefined();
        });

        it('should create a poll', () => {
            expect(mockPollService.create).not.toHaveBeenCalled();
            expect(controller.create(stubPollDto)).toEqual({
                pollId: stubPollId,
                ...stubPollDto,
            });

            expect(mockPollService.create).toHaveBeenCalledWith({
                ...stubPollDto,
            });
        });

        it('should update a poll', () => {
            const questionStub = 'new Question';

            expect(mockPollService.update).not.toHaveBeenCalled();
            expect(
                controller.update(stubPollId, { question: questionStub }),
            ).toEqual({
                pollId: stubPollId,
                question: questionStub,
            });

            expect(mockPollService.update).toHaveBeenCalledWith(stubPollId, {
                question: questionStub,
            });
        });

        it('should remove a poll', () => {
            expect(mockPollService.remove).not.toHaveBeenCalled();
            expect(controller.remove(stubPollId)).toBe(undefined);

            expect(mockPollService.remove).toHaveBeenCalledWith(stubPollId);
        });

        it('should findOne poll', () => {
            expect(mockPollService.findOne).not.toHaveBeenCalled();
            expect(controller.findOne(stubPollId)).toBe(stubPollId);

            expect(mockPollService.findOne).toHaveBeenCalledWith(stubPollId);
        });

        it('should findAll polls', () => {
            expect(mockPollService.findAll).not.toHaveBeenCalled();
            expect(controller.findAll()).toEqual([]);

            expect(mockPollService.findAll).toHaveBeenCalledWith();
        });
    });
});
