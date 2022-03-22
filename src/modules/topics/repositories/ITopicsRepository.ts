import { Topic } from '@prisma/client';
import ICreateTopicDTO from '../dtos/ICreateTopicDTO';

export default interface ITopicsRepository {
  create(topicData: ICreateTopicDTO): Promise<Topic>;
  findAllByTechnologyId(technology_id: string): Promise<Topic[] | undefined>;
  findByTechnologyIdAndName(
    technology_id: string,
    name: string,
  ): Promise<Topic | undefined>;
  findMaxLayerByTechnologyId(technology_id: string): Promise<number>;
  findLayersByLayer(
    technology_id: string,
    layer: number,
  ): Promise<{ layer: number }[]>;
  findById(topic_id: string): Promise<Topic | undefined>;
}
