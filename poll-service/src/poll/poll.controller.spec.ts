import { Test, TestingModule } from '@nestjs/testing';

import { PollService } from './poll.service';
import { CreatePollDto } from './dto/create-poll.dto';
import { GetPollDto } from './dto/get-poll.dto';
import { PollController } from './poll.controller';
import { OptionDto } from '../options/dto/option.dto';
import NotFoundError from '../exceptions/not-found.exception';

describe('PollController', () => {
  let controller: PollController;

  const mockPollService = {
    create: jest.fn().mockImplementation(() => {}),
    update: jest.fn().mockImplementation(() => {}),
    remove: jest.fn().mockImplementation(() => {}),
    findOne: jest.fn().mockImplementation(() => {}),
    findAll: jest.fn().mockImplementation(() => {}),
  };

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

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('success', async () => {
      const stubPollDto: CreatePollDto = {
        title: 'any title',
        question: 'any question',
        options: [new OptionDto('Option 1'), new OptionDto('Option 2')],
      };

      expect(mockPollService.create).not.toHaveBeenCalled();
      await controller.create(stubPollDto);

      expect(mockPollService.create).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('success', async () => {
      const stubPollId = 'anyPollId';
      const stubPollDto: GetPollDto = {
        pollId: stubPollId,
        title: 'any title',
        question: 'any question',
        options: [new OptionDto('Option 1'), new OptionDto('Option 2')],
      };

      expect(mockPollService.update).not.toHaveBeenCalled();
      await controller.update(stubPollId, stubPollDto);

      expect(mockPollService.update).toHaveBeenCalled();
    });

    it('if pollId is not found an NotFoundError should be thrown', async () => {
      const stubPollId = 'anyPollId';
      mockPollService.findOne.mockResolvedValueOnce(null);

      expect(mockPollService.findOne).not.toHaveBeenCalled();
      try {
        await controller.findOne(stubPollId);
        fail('Expected NotFoundError to be thrown');
      } catch (error: unknown) {
        expect(error).toBeInstanceOf(NotFoundError);
      }

      expect(mockPollService.findOne).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('success', async () => {
      expect(mockPollService.remove).not.toHaveBeenCalled();
      await controller.remove('anyPollId');

      expect(mockPollService.remove).toHaveBeenCalled();
    });

    it('if pollId is not found an NotFoundError should be thrown', async () => {
      const stubPollId = 'anyPollId';
      mockPollService.remove.mockResolvedValueOnce(null);

      expect(mockPollService.remove).not.toHaveBeenCalled();
      try {
        await controller.remove(stubPollId);
        fail('Expected NotFoundError to be thrown');
      } catch (error: unknown) {
        expect(error).toBeInstanceOf(NotFoundError);
      }

      expect(mockPollService.remove).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('success', async () => {
      expect(mockPollService.findOne).not.toHaveBeenCalled();
      await controller.findOne('anyPollId');

      expect(mockPollService.findOne).toHaveBeenCalled();
    });

    it('if pollId is not found an NotFoundError should be thrown', async () => {
      const stubPollId = 'anyPollId';
      mockPollService.findOne.mockResolvedValueOnce(null);

      expect(mockPollService.findOne).not.toHaveBeenCalled();
      try {
        await controller.findOne(stubPollId);
        fail('Expected NotFoundError to be thrown');
      } catch (error: unknown) {
        expect(error).toBeInstanceOf(NotFoundError);
      }

      expect(mockPollService.findOne).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('success', async () => {
      expect(mockPollService.findAll).not.toHaveBeenCalled();
      await controller.findAll();

      expect(mockPollService.findAll).toHaveBeenCalled();
    });
  });
});
