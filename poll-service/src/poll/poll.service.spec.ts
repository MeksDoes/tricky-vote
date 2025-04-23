import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { PollService } from './poll.service';
import { Poll } from './entities/poll.schema';

describe('PollService', () => {
  let service: PollService;

  const saveMock = jest.fn();
  const findMock = jest.fn();
  const findOneMock = jest.fn();
  const findOneAndUpdateMock = jest.fn();
  const findOneAndDeleteMock = jest.fn();
  const execMock = jest.fn();

  const mockPollModel = jest.fn().mockImplementation(() => ({
    save: saveMock,
  }));

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PollService,
        {
          provide: getModelToken(Poll.name),
          useValue: Object.assign(mockPollModel, {
            find: findMock,
            findOne: findOneMock,
            findOneAndUpdate: findOneAndUpdateMock,
            findOneAndDelete: findOneAndDeleteMock,
          }),
        },
      ],
    }).compile();

    service = module.get<PollService>(PollService);

    execMock.mockResolvedValue([]);
    findMock.mockReturnValue({ exec: execMock });
    findOneMock.mockReturnValue({ exec: execMock });
    findOneAndUpdateMock.mockReturnValue({ exec: execMock });
    findOneAndDeleteMock.mockReturnValue({ exec: execMock });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create:', () => {
    it('pollModel is created', async () => {
      const dto = {
        title: 'Test Title',
        question: 'Test Question',
        options: [{ text: 'Option 1' }, { text: 'Option 2' }],
      };
      saveMock.mockResolvedValueOnce({ ...dto, pollId: 'abc-123' });

      expect(mockPollModel).not.toHaveBeenCalled();
      await service.create(dto);

      expect(mockPollModel).toHaveBeenCalledWith(dto);
    });

    it('should call save()', async () => {
      const dto = {
        title: 'Test Title',
        question: 'Test Question',
        options: [{ text: 'Option 1' }, { text: 'Option 2' }],
      };
      saveMock.mockResolvedValueOnce({ ...dto, pollId: 'abc-123' });

      expect(saveMock).not.toHaveBeenCalled();
      await service.create(dto);

      expect(saveMock).toHaveBeenCalled();
    });
  });

  describe('findAll:', () => {
    it('polls are fetched out of database', async () => {
      const mockPolls = [
        { pollId: '1', title: 'Title 1', question: 'Question 1', options: [] },
        { pollId: '2', title: 'Title 2', question: 'Question 2', options: [] },
      ];
      execMock.mockResolvedValueOnce(mockPolls);

      expect(findMock).not.toHaveBeenCalled();
      expect(execMock).not.toHaveBeenCalled();
      const result = await service.findAll();

      expect(findMock).toHaveBeenCalled();
      expect(execMock).toHaveBeenCalled();
      expect(result).toEqual(mockPolls);
    });
  });

  describe('findOne:', () => {
    it('poll is fetched out of database', async () => {
      const mockPoll = { pollId: 'abc-123', title: 'Test', question: 'Q?', options: [] };
      execMock.mockResolvedValueOnce(mockPoll);

      expect(findOneMock).not.toHaveBeenCalled();
      expect(execMock).not.toHaveBeenCalled();
      const result = await service.findOne('abc-123');

      expect(findOneMock).toHaveBeenCalledWith({ pollId: 'abc-123' });
      expect(execMock).toHaveBeenCalled();
      expect(result).toEqual(mockPoll);
    });
  });

  describe('update:', () => {
    it('poll is updated in database', async () => {
      const dto = {
        pollId: 'abc-123',
        title: 'Updated Title',
        question: 'Updated Question',
        options: [{ text: 'Updated Option' }],
      };
      const updatedPoll = { ...dto };
      execMock.mockResolvedValueOnce(updatedPoll);

      expect(findOneAndUpdateMock).not.toHaveBeenCalled();
      expect(execMock).not.toHaveBeenCalled();
      const result = await service.update('abc-123', dto);

      expect(findOneAndUpdateMock).toHaveBeenCalledWith({ pollId: 'abc-123' }, dto, { new: true });
      expect(execMock).toHaveBeenCalled();
      expect(result).toEqual(updatedPoll);
    });
  });

  describe('remove:', () => {
    it('poll is removed from database', async () => {
      const removedPoll = { pollId: 'abc-123' };
      execMock.mockResolvedValueOnce(removedPoll);

      expect(findOneAndDeleteMock).not.toHaveBeenCalled();
      expect(execMock).not.toHaveBeenCalled();
      const result = await service.remove('abc-123');

      expect(findOneAndDeleteMock).toHaveBeenCalledWith({ pollId: 'abc-123' });
      expect(execMock).toHaveBeenCalled();
      expect(result).toEqual(removedPoll);
    });
  });
});
