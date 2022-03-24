import { inject, injectable } from 'tsyringe';

import { Technology } from '@prisma/client';

import ITechnologiesRepository from '@modules/technologies/repositories/ITechnologiesRepository';
import AppError from '@shared/errors/AppError';
import IUsersTechnologiesRepository from '../repositories/IUsersTechnologiesRepository';

interface IRequest {
  technology_id: string;
  name: string;
  content_creators_ids: [];
}

@injectable()
class UpdateContentCreatorTechnologyService {
  constructor(
    @inject('UsersTechnologiesRepository')
    private usersTechnologiesRepository: IUsersTechnologiesRepository,

    @inject('TechnologiesRepository')
    private technologiesRepository: ITechnologiesRepository,
  ) {}

  public async execute({
    technology_id,
    name,
    content_creators_ids,
  }: IRequest): Promise<Technology> {
    const technology = await this.technologiesRepository.findById(
      technology_id,
    );

    if (!technology) {
      throw new AppError('Technology not found');
    }

    technology.name = name;

    await this.technologiesRepository.update(technology);

    await this.usersTechnologiesRepository.deleteAllContentCreatorTechnology(
      technology_id,
    );

    await this.usersTechnologiesRepository.createContentCreatorTechnology({
      technology_id,
      content_creators_ids,
    });

    return technology;
  }
}

export default UpdateContentCreatorTechnologyService;
