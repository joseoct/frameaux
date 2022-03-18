import { injectable, inject } from 'tsyringe';
import { Topic } from '@prisma/client';
import ITopicsRepository from '../repositories/ITopicsRepository';

interface IRequest {
  technology_id: string;
}

interface IResponse {
  topics: Topic[];
  maxLayer: number;
}

@injectable()
class ListTopicsService {
  constructor(
    @inject('TopicsRepository')
    private topicsRepository: ITopicsRepository,
  ) {}

  public async execute({ technology_id }: IRequest): Promise<IResponse> {
    const maxLayer = await this.topicsRepository.findMaxLayerByTechnologyId(
      technology_id,
    );

    const topics = await this.topicsRepository.findAllByTechnologyId(
      technology_id,
    );

    return { topics, maxLayer };
  }
}

export default ListTopicsService;
