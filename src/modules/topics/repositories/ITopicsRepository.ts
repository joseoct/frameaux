import { Topic } from '@prisma/client';
import ICreateTopicDTO from '../dtos/ICreateTopicDTO';

export default interface ITopicsRepository {
  findTwoLayersBehindByTechnologyId(
    layer: number,
    technology_id: string,
  ): Promise<Topic[]>;
  findFourLayersBehindByTechnologyId(
    layer: number,
    technology_id: string,
  ): Promise<Topic[]>;
  findFirstFiveByTechnologyId(technology_id: string): Promise<string[]>;
  findByLayer(
    technology_id: string,
    user_id: string,
    layer: number,
  ): Promise<(Topic & { UserTopic: { current_difficulty: number }[] })[]>;
  create(topicData: ICreateTopicDTO): Promise<Topic>;
  findAllByTechnologyId(
    technology_id: string,
    user_id?: string,
  ): Promise<(Topic & { UserTopic: { current_difficulty: number }[] })[]>;
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
  deleteById(topic_id: string): Promise<Topic | undefined>;
  updateLayerByOne(layer: number, technology_id: string): Promise<void>;
  updateLayerByZeroPointOne(
    layer: number,
    technology_id: string,
  ): Promise<void>;
  update(topic: Topic): Promise<Topic | undefined>;
}
