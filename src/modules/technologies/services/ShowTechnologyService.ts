import { injectable, inject } from 'tsyringe';
import { Technology } from '@prisma/client';
import ITechnologiesRepository from '../repositories/ITechnologiesRepository';

interface IRequest {
  technology_id: string;
}

@injectable()
class ListAllTechnologiesService {
  constructor(
    @inject('TechnologiesRepository')
    private technologiesRepository: ITechnologiesRepository,
  ) {}

  public async execute({ technology_id }: IRequest): Promise<Technology> {
    const technology = await this.technologiesRepository.findById(
      technology_id,
    );

    technology.technology_image = `${process.env.APP_URL}/files/${technology.technology_image}`;

    return technology;
  }
}

export default ListAllTechnologiesService;
