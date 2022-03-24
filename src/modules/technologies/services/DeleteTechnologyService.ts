import { injectable, inject } from 'tsyringe';
import { Technology } from '@prisma/client';
import ITechnologiesRepository from '../repositories/ITechnologiesRepository';

interface IRequest {
  technology_id: string;
}

@injectable()
class DeleteTechnologyService {
  constructor(
    @inject('TechnologiesRepository')
    private technologiesRepository: ITechnologiesRepository,
  ) {}

  public async execute({ technology_id }: IRequest): Promise<Technology> {
    const technology = await this.technologiesRepository.deleteById(
      technology_id,
    );

    return technology;
  }
}

export default DeleteTechnologyService;
