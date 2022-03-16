import IRolesRepository from '@modules/roles/repositories/IRolesRepository';
import ICreateRoleDTO from '@modules/roles/dtos/ICreateRoleDTO';

import { PrismaClient, Role } from '@prisma/client';

class RoleRepository implements IRolesRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async findByName(name: string): Promise<Role | undefined> {
    const role = await this.prisma.role.findUnique({
      where: { name },
    });

    return role;
  }

  public async create(roleData: ICreateRoleDTO): Promise<Role> {
    const role = this.prisma.role.create({ data: roleData });

    return role;
  }
}

export default RoleRepository;
