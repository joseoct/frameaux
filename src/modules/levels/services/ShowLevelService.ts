import { injectable, inject } from 'tsyringe';
// import AppError from '@shared/errors/AppError';
import { Level } from '@prisma/client';
import ILevelsRepository from '../repositories/ILevelsRepository';

interface IRequest {
  level_id: string;
}

@injectable()
class ShowLevelService {
  constructor(
    @inject('LevelsRepository')
    private levelsRepository: ILevelsRepository,
  ) {}

  public async execute({ level_id }: IRequest): Promise<Level> {
    const level = await this.levelsRepository.findById(level_id);

    return level;
  }
}

export default ShowLevelService;
