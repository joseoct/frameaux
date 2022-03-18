import { injectable, inject } from 'tsyringe';
import { Topic } from '@prisma/client';
import ITopicsRepository from '../repositories/ITopicsRepository';

interface IRequest {
  technology_id: string;
}

@injectable()
class ListTopicsService {
  constructor(
    @inject('TopicsRepository')
    private topicsRepository: ITopicsRepository,
  ) {}

  public async execute({ technology_id }: IRequest): Promise<Topic[]> {
    const topics = await this.topicsRepository.findAllByTechnologyId(
      technology_id,
    );

    return topics;
  }
}

export default ListTopicsService;
