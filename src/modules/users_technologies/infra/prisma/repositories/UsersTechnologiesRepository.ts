import IUsersTechnologiesRepository from '@modules/users_technologies/repositories/IUsersTechnologiesRepository';
import ICreateStudentTechnologyDTO from '@modules/users_technologies/dtos/ICreateStudentTechnologyDTO';

import { PrismaClient, UserTechnology } from '@prisma/client';
import ICreateContentCreatorTechnologyDTO from '@modules/users_technologies/dtos/ICreateContentCreatorTechnologyDTO';

class UsersTechnologiesRepository implements IUsersTechnologiesRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async createContentCreatorTechnology(
    userTechnologyData: ICreateContentCreatorTechnologyDTO,
  ): Promise<void> {
    const data = userTechnologyData.content_creators_ids.map(id => {
      return {
        user_id: id,
        technology_id: userTechnologyData.technology_id,
      };
    });

    await this.prisma.userTechnology.createMany({
      data,
    });
  }

  public async createStudentTechnology(
    userTechnologyData: ICreateStudentTechnologyDTO,
  ): Promise<UserTechnology> {
    const userTechnology = await this.prisma.userTechnology.create({
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
    const userTechnology = await this.prisma.userTechnology.findFirst({
      where: {
        user_id,
        technology_id,
      },
    });

    return userTechnology;
  }

  public async update(userTechnology: UserTechnology): Promise<UserTechnology> {
    const updatedUserTechnology = await this.prisma.userTechnology.update({
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
    const deletedUserTechnology = await this.prisma.userTechnology.delete({
      where: {
        id: userTechnology.id,
      },
    });

    return deletedUserTechnology;
  }
}

export default UsersTechnologiesRepository;
