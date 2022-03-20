import { inject, injectable } from 'tsyringe';

import { TechnologiesByContentCreator } from '../infra/prisma/repositories/UsersTechnologiesRepository';

import IUsersTechnologiesRepository from '../repositories/IUsersTechnologiesRepository';

interface IRequest {
  content_creator_id: string;
}

@injectable()
class ListTechnologiesByContentProvider {
  constructor(
    @inject('UsersTechnologiesRepository')
    private usersTechnologiesRepository: IUsersTechnologiesRepository,
  ) {}

  public async execute({
    content_creator_id,
  }: IRequest): Promise<TechnologiesByContentCreator[]> {
    const technologiesByContentCreator = await this.usersTechnologiesRepository.findAllTechnologiesByContentCreatorId(
      content_creator_id,
    );

    const technologiesWithImageUrl = technologiesByContentCreator.map(
      technologies => {
        return {
          ...technologies,
          technology: {
            ...technologies.technology,
            technology_image: `${process.env.APP_URL}/files/${technologies.technology.technology_image}`,
          },
        };
      },
    );

    return technologiesWithImageUrl;
  }
}

export default ListTechnologiesByContentProvider;
