import { UserTecnology } from '@prisma/client';
import ICreateStudentTecnologyDTO from '../dtos/ICreateStudentTecnologyDTO';
import ICreateContentCreatorTecnologyDTO from '../dtos/ICreateContentCreatorTecnologyDTO';

export default interface IUsersTecnologiesRepository {
  createStudentTecnology(
    studentTecnologyData: ICreateStudentTecnologyDTO,
  ): Promise<UserTecnology>;
  createContentCreatorTecnology(
    contentCreatorTecnologyData: ICreateContentCreatorTecnologyDTO,
  ): Promise<void>;
  findByUserIdTecnologyId(
    user_id: string,
    tecnology_id: string,
  ): Promise<UserTecnology>;
  update(userTecnology: UserTecnology): Promise<UserTecnology>;
  delete(userTecnologyId: UserTecnology): Promise<UserTecnology>;
}
