import IRolesRepository from '@modules/roles/repositories/IRolesRepository';
import ICreateRoleDTO from '@modules/roles/dtos/ICreateRoleDTO';
import { prisma } from '@shared/infra/database/prisma';

import { Role } from '@prisma/client';

class RoleRepository implements IRolesRepository {
  public async findByName(name: string): Promise<Role | undefined> {
    const role = await prisma.role.findUnique({
      where: { name },
    });

    return role;
  }

  public async create(roleData: ICreateRoleDTO): Promise<Role> {
    const role = prisma.role.create({ data: roleData });

    return role;
  }
}

export default RoleRepository;
