import { injectable, inject } from 'tsyringe';
// import AppError from '@shared/errors/AppError';
import { Level } from '@prisma/client';
import ILevelsRepository from '../repositories/ILevelsRepository';

interface IRequest {
  topic_id: string;
}

@injectable()
class FindAllLevelsByTopicService {
  constructor(
    @inject('LevelsRepository')
    private levelsRepository: ILevelsRepository,
  ) {}

  public async execute({ topic_id }: IRequest): Promise<Level[]> {
    /*
      Check if level already exists
      if (levelExists) {
        throw new AppError('level already exists');
      }
    */

    const levels = await this.levelsRepository.findAllByTopic(topic_id);

    return levels;
  }
}

export default FindAllLevelsByTopicService;
