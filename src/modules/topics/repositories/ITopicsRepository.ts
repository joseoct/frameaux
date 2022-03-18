import { Topic } from '@prisma/client';
import ICreateTopicDTO from '../dtos/ICreateTopicDTO';

export default interface ITopicsRepository {
  create(topicData: ICreateTopicDTO): Promise<Topic>;
}
