import { Technology } from '@prisma/client';
import ICreateTechnologyDTO from '../dtos/ICreateTechnologyDTO';

export default interface ITechnologiesRepository {
  findByTopicId(topicId: string): Promise<Technology>;
  create(data: ICreateTechnologyDTO): Promise<Technology>;
  update(data: Technology): Promise<Technology>;
  findById(technology_id: string): Promise<Technology>;
  findAll(): Promise<Technology[]>;
  findAllByUserId(userId: string): Promise<Technology[]>;
  findByName(name: string): Promise<Technology>;
  findTotalNumberTechnologies(): Promise<number>;
  deleteById(technology_id: string): Promise<Technology>;
}
