import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { Technology } from '@prisma/client';
import ITechnologiesRepository from '../repositories/ITechnologiesRepository';

interface IRequest {
  technology_id: string;
  name: string;
}

@injectable()
class UpdateTechnologyService {
  constructor(
    @inject('TechnologiesRepository')
    private technologiesRepository: ITechnologiesRepository,
  ) {}

  public async execute({ technology_id, name }: IRequest): Promise<Technology> {
    const technology = await this.technologiesRepository.findById(
      technology_id,
    );

    if (!technology) {
      throw new AppError('Technology not found');
    }

    technology.name = name;

    await this.technologiesRepository.update(technology);

    return technology;
  }
}

export default UpdateTechnologyService;
