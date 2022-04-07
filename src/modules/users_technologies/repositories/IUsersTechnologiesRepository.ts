import { UserTechnology } from '@prisma/client';
import ICreateStudentTechnologyDTO from '../dtos/ICreateStudentTechnologyDTO';
import ICreateContentCreatorTechnologyDTO from '../dtos/ICreateContentCreatorTechnologyDTO';

export default interface IUsersTechnologiesRepository {
  createStudentTechnology(
    studentTechnologyData: ICreateStudentTechnologyDTO,
  ): Promise<UserTechnology>;
  createContentCreatorTechnology(
    contentCreatorTechnologyData: ICreateContentCreatorTechnologyDTO,
  ): Promise<void>;
  findByUserIdTechnologyId(
    user_id: string,
    technology_id: string,
  ): Promise<UserTechnology>;
  incrementByOneCurrentLayer(
    userTechnology_id: string,
  ): Promise<UserTechnology>;
  incrementByTestCurrentLayer(
    userTechnology_id: string,
    result: number,
  ): Promise<UserTechnology>;
  deleteAllContentCreatorTechnology(technology_id: string): Promise<void>;
  delete(userTechnologyId: UserTechnology): Promise<UserTechnology>;
}
