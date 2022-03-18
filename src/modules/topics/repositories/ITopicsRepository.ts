import { Topic } from '@prisma/client';
import ICreateTopicDTO from '../dtos/ICreateTopicDTO';

export default interface ITopicsRepository {
  create(topicData: ICreateTopicDTO): Promise<Topic>;
  findAllByTechnologyId(technology_id: string): Promise<Topic[] | undefined>;
  findTopicByTecnologIdAndName(
    technology_id: string,
    name: string,
  ): Promise<Topic | undefined>;
}
