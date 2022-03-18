import { Topic } from '@prisma/client';
import ICreateTopicDTO from '../dtos/ICreateTopicDTO';

export default interface ITopicsRepository {
  create(topicData: ICreateTopicDTO): Promise<Topic>;
  findAllByTecnologyId(tecnology_id: string): Promise<Topic[] | undefined>;
  findTopicByTecnologIdAndName(
    tecnology_id: string,
    name: string,
  ): Promise<Topic | undefined>;
}
