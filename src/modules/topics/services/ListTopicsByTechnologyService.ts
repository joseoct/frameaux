import { injectable, inject } from 'tsyringe';
import { Topic } from '@prisma/client';
import ITopicsRepository from '../repositories/ITopicsRepository';

interface IRequest {
  technology_id: string;
}

interface IResponse {
  layerTopics: Topic[][];
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

    const layerTopics = topics.reduce<Topic[][]>((acc, topic) => {
      const floor = Math.floor(topic.layer);

      acc[floor] = [...acc[floor], topic];

      return acc;
    }, new Array(maxLayer + 1).fill([]));

    return { layerTopics };
  }
}

export default ListTopicsService;
