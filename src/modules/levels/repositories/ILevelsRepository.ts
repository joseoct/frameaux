import { Level } from '@prisma/client';
import ICreateLevelDTO from '../dtos/ICreateLevelDTO';

export default interface ILevelsRepository {
  findMaxDifficultyByTopicId(topic_id: string): Promise<number>;
  create(data: ICreateLevelDTO): Promise<Level>;
  findAllByTopic(topic_id: string): Promise<Level[] | undefined>;
}
