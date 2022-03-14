import IUsersTecnologiesRepository from '@modules/users_tecnologies/repositories/IUsersTecnologiesRepository';
import ICreateUserTecnologyDTO from '@modules/users_tecnologies/dtos/ICreateUserTecnologyDTO';

import { PrismaClient, UserTecnology } from '@prisma/client';

class UsersTecnologiesRepository implements IUsersTecnologiesRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async create(
    userTecnologyData: ICreateUserTecnologyDTO,
  ): Promise<UserTecnology> {
    const userTecnology = this.prisma.userTecnology.create({
      data: {
        ...userTecnologyData,
        current_layer: 1,
      },
    });

    return userTecnology;
  }

  public async findByUserIdTecnologyId(
    user_id: string,
    tecnology_id: string,
  ): Promise<UserTecnology> {
    const userTecnology = await this.prisma.userTecnology.findFirst({
      where: {
        user_id,
        tecnology_id,
      },
    });

    return userTecnology;
  }

  public async update(userTecnology: UserTecnology): Promise<UserTecnology> {
    const updatedUserTecnology = await this.prisma.userTecnology.update({
      where: {
        id: userTecnology.id,
      },
      data: {
        current_layer: userTecnology.current_layer + 1,
      },
    });

    return updatedUserTecnology;
  }
}

export default UsersTecnologiesRepository;
