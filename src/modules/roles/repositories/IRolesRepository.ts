import { Role } from '@prisma/client';
import ICreateRoleDTO from '../dtos/ICreateRoleDTO';

export default interface IUsersRepository {
  findById(roleId: string): Promise<Role | undefined>;
  findByName(name: string): Promise<Role | undefined>;
  create(data: ICreateRoleDTO): Promise<Role>;
}
