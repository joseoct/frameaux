import { injectable, inject } from 'tsyringe';
import { Topic } from '@prisma/client';
import ITopicsRepository from '../repositories/ITopicsRepository';

interface IRequest {
  topic_id: string;
}

@injectable()
class ListTopicsService {
  constructor(
    @inject('TopicsRepository')
    private topicsRepository: ITopicsRepository,
  ) {}

  public async execute({ topic_id }: IRequest): Promise<Topic> {
    const topicToBeDeleted = await this.topicsRepository.findById(topic_id);

    const maxLayer = await this.topicsRepository.findMaxLayerByTechnologyId(
      topicToBeDeleted.technology_id,
    );

    const topics = await this.topicsRepository.findAllByTechnologyId(
      topicToBeDeleted.technology_id,
    );

    const layerTopics = topics.reduce<Topic[][]>((acc, topic) => {
      const floor = Math.floor(topic.layer);

      acc[floor] = [...acc[floor], topic];

      return acc;
    }, new Array(maxLayer + 1).fill([]));

    if (layerTopics[Math.floor(topicToBeDeleted.layer)].length === 1) {
      await this.topicsRepository.updateLayerByOne(
        topicToBeDeleted.layer,
        topicToBeDeleted.technology_id,
      );
    } else {
      await this.topicsRepository.updateLayerByZeroPointOne(
        topicToBeDeleted.layer,
        topicToBeDeleted.technology_id,
      );
    }

    const deletedTopic = await this.topicsRepository.deleteById(
      topicToBeDeleted.id,
    );

    return deletedTopic;
  }
}

export default ListTopicsService;
