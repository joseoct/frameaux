import IRolesRepository from '@modules/roles/repositories/IRolesRepository';
import ICreateRoleDTO from '@modules/roles/dtos/ICreateRoleDTO';
import { prisma } from '@shared/infra/database/prisma';

import { Role } from '@prisma/client';

class RoleRepository implements IRolesRepository {
  public async findById(roleId: string): Promise<Role> {
    const role = await prisma.role.findUnique({
      where: { id: roleId },
    });

    return role;
  }

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
