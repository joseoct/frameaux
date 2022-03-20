import { injectable, inject } from 'tsyringe';
import { Technology } from '@prisma/client';
import ITechnologiesRepository from '../repositories/ITechnologiesRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class ListAllTechnologiesByUserService {
  constructor(
    @inject('TechnologiesRepository')
    private technologiesRepository: ITechnologiesRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Technology[]> {
    const technologies = await this.technologiesRepository.findAllByUserId(
      user_id,
    );

    const technologiesWithImageUrl = technologies.map(technology => {
      return {
        ...technology,
        technology_image: `${process.env.APP_URL}/files/${technology.technology_image}`,
      };
    });

    return technologiesWithImageUrl;
  }
}

export default ListAllTechnologiesByUserService;
