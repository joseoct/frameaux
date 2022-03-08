import Role from '../infra/typeorm/entities/Role';
import ICreateRoleDTO from '../dtos/ICreateRoleDTO';

export default interface IUsersRepository {
  findRoleByName(name: string): Promise<Role | undefined>;
  create(data: ICreateRoleDTO): Promise<Role>;
  save(data: Role): Promise<Role>;
}
