import IUsersTecnologiesRepository from '@modules/users_tecnologies/repositories/IUsersTecnologiesRepository';
import ICreateStudentTecnologyDTO from '@modules/users_tecnologies/dtos/ICreateStudentTecnologyDTO';

import { PrismaClient, UserTecnology } from '@prisma/client';
import ICreateContentCreatorTecnologyDTO from '@modules/users_tecnologies/dtos/ICreateContentCreatorTecnologyDTO';

class UsersTecnologiesRepository implements IUsersTecnologiesRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async createContentCreatorTecnology(
    userTecnologyData: ICreateContentCreatorTecnologyDTO,
  ): Promise<void> {
    const data = userTecnologyData.content_creators_ids.map(id => {
      return {
        user_id: id,
        tecnology_id: userTecnologyData.tecnology_id,
        role_id: userTecnologyData.role_id,
      };
    });

    await this.prisma.userTecnology.createMany({
      data,
    });
  }

  public async createStudentTecnology(
    userTecnologyData: ICreateStudentTecnologyDTO,
  ): Promise<UserTecnology> {
    const userTecnology = await this.prisma.userTecnology.create({
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

  public async delete(userTecnology: UserTecnology): Promise<UserTecnology> {
    const deletedUserTecnology = await this.prisma.userTecnology.delete({
      where: {
        id: userTecnology.id,
      },
    });

    return deletedUserTecnology;
  }
}

export default UsersTecnologiesRepository;
