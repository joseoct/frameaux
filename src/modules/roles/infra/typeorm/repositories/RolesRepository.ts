import { getRepository, Repository } from 'typeorm';

import IRolesRepository from '@modules/roles/repositories/IRolesRepository';
import ICreateRoleDTO from '@modules/roles/dtos/ICreateRoleDTO';

import Role from '@modules/roles/infra/typeorm/entities/Role';

class RoleRepository implements IRolesRepository {
  private ormRepository: Repository<Role>;

  constructor() {
    this.ormRepository = getRepository(Role);
  }

  public async findRoleByName(name: string): Promise<Role | undefined> {
    const role = await this.ormRepository.findOne({
      where: { name },
    });

    return role;
  }

  public async create(roleData: ICreateRoleDTO): Promise<Role> {
    const role = this.ormRepository.create(roleData);

    await this.ormRepository.save(role);

    return role;
  }

  public async save(role: Role): Promise<Role> {
    return this.ormRepository.save(role);
  }
}

export default RoleRepository;
