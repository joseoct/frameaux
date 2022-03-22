import { injectable, inject } from 'tsyringe';
// import AppError from '@shared/errors/AppError';
import { Level } from '@prisma/client';
import ILevelsRepository from '../repositories/ILevelsRepository';

interface IRequest {
  topic_id: string;
}

@injectable()
class CreateLevelService {
  constructor(
    @inject('LevelsRepository')
    private levelsRepository: ILevelsRepository,
  ) {}

  public async execute({ topic_id }: IRequest): Promise<Level> {
    /*
      Check if level already exists
      if (levelExists) {
        throw new AppError('level already exists');
      }
    */

    const maxDifficulty = await this.levelsRepository.findMaxDifficultyByTopicId(
      topic_id,
    );

    if (maxDifficulty === 3) {
      throw new Error('Maximum level reached');
    }

    const level = await this.levelsRepository.create({
      difficulty: maxDifficulty + 1,
      topic_id,
    });

    return level;
  }
}

export default CreateLevelService;
