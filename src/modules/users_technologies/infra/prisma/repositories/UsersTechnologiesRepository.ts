import IUsersTechnologiesRepository from '@modules/users_technologies/repositories/IUsersTechnologiesRepository';
import ICreateContentCreatorTechnologyDTO from '@modules/users_technologies/dtos/ICreateContentCreatorTechnologyDTO';
import ICreateStudentTechnologyDTO from '@modules/users_technologies/dtos/ICreateStudentTechnologyDTO';

import { prisma } from '@shared/infra/database/prisma';

import { UserTechnology } from '@prisma/client';

class UsersTechnologiesRepository implements IUsersTechnologiesRepository {
  public async createContentCreatorTechnology(
    userTechnologyData: ICreateContentCreatorTechnologyDTO,
  ): Promise<void> {
    const data = userTechnologyData.content_creators_ids.map(id => {
      return {
        user_id: id,
        technology_id: userTechnologyData.technology_id,
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

  public async update(userTechnology: UserTechnology): Promise<UserTechnology> {
    const updatedUserTechnology = await prisma.userTechnology.update({
      where: {
        id: userTechnology.id,
      },
      data: {
        current_layer: userTechnology.current_layer + 1,
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
}

export default UsersTechnologiesRepository;
