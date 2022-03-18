import { injectable, inject } from 'tsyringe';
import { Topic } from '@prisma/client';
import ITopicsRepository from '../repositories/ITopicsRepository';

interface IRequest {
  tecnology_id: string;
}

@injectable()
class ListTopicsService {
  constructor(
    @inject('TopicsRepository')
    private topicsRepository: ITopicsRepository,
  ) {}

  public async execute({ tecnology_id }: IRequest): Promise<Topic[]> {
    const topics = await this.topicsRepository.findAllByTecnologyId(
      tecnology_id,
    );

    return topics;
  }
}

export default ListTopicsService;
