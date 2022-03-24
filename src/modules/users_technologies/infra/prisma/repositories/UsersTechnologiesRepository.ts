import IUsersTechnologiesRepository from '@modules/users_technologies/repositories/IUsersTechnologiesRepository';
import ICreateContentCreatorTechnologyDTO from '@modules/users_technologies/dtos/ICreateContentCreatorTechnologyDTO';
import ICreateStudentTechnologyDTO from '@modules/users_technologies/dtos/ICreateStudentTechnologyDTO';

import { prisma } from '@shared/infra/database/prisma';

import { UserTechnology } from '@prisma/client';

class UsersTechnologiesRepository implements IUsersTechnologiesRepository {
  public async createContentCreatorTechnology(
    contentCreatorTechnologyData: ICreateContentCreatorTechnologyDTO,
  ): Promise<void> {
    const data = contentCreatorTechnologyData.content_creators_ids.map(id => {
      return {
        user_id: id,
        technology_id: contentCreatorTechnologyData.technology_id,
      };
    });

    await prisma.userTechnology.createMany({
      data,
    });
  }

  public async createStudentTechnology(
    userTechnologyData: ICreateStudentTechnologyDTO,
  ): Promise<UserTechnology> {
    const userTechnology = await prisma.userTechnology.create({
      data: {
        ...userTechnologyData,
        current_layer: 1,
      },
    });

    return userTechnology;
  }

  public async findByUserIdTechnologyId(
    user_id: string,
    technology_id: string,
  ): Promise<UserTechnology> {
    const userTechnology = await prisma.userTechnology.findFirst({
      where: {
        user_id,
        technology_id,
      },
    });

    return userTechnology;
  }

  public async updateCurrentLayer(
    userTechnology_id: string,
  ): Promise<UserTechnology> {
    const updatedUserTechnology = await prisma.userTechnology.update({
      where: {
        id: userTechnology_id,
      },
      data: {
        current_layer: {
          increment: 1,
        },
      },
    });

    return updatedUserTechnology;
  }

  public async delete(userTechnology: UserTechnology): Promise<UserTechnology> {
    const deletedUserTechnology = await prisma.userTechnology.delete({
      where: {
        id: userTechnology.id,
      },
    });

    return deletedUserTechnology;
  }

  public async deleteAllContentCreatorTechnology(
    technology_id: string,
  ): Promise<void> {
    await prisma.userTechnology.deleteMany({
      where: {
        technology_id,
        current_layer: null,
      },
    });
  }
}

export default UsersTechnologiesRepository;
