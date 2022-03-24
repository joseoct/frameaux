import ICreateTechnologyDTO from '@modules/technologies/dtos/ICreateTechnologyDTO';
import ITechnologiesRepository from '@modules/technologies/repositories/ITechnologiesRepository';
import { Technology } from '@prisma/client';
import { prisma } from '@shared/infra/database/prisma';

class TechnologiesRepository implements ITechnologiesRepository {
  public async findAllByUserId(userId: string): Promise<Technology[]> {
    const technologies = await prisma.technology.findMany({
      where: {
        UserTechnology: {
          some: {
            user: {
              id: userId,
            },
          },
        },
      },
    });

    return technologies;
  }

  public async findAll(): Promise<Technology[]> {
    const technologies = await prisma.technology.findMany({
      include: {
        UserTechnology: {
          where: {
            user: {
              role: {
                name: 'content_creator',
              },
            },
          },
          select: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return technologies;
  }

  public async findTotalNumberTechnologies(): Promise<number> {
    const total = await prisma.technology.count();

    return total;
  }

  public async create(
    technologyData: ICreateTechnologyDTO,
  ): Promise<Technology> {
    const technology = await prisma.technology.create({
      data: technologyData,
    });

    return technology;
  }

  public async update(technologyData: Technology): Promise<Technology> {
    const technology = await prisma.technology.update({
      where: {
        id: technologyData.id,
      },
      data: {
        name: technologyData.name,
      },
    });

    return technology;
  }

  public async findById(technology_id: string): Promise<Technology> {
    const technology = await prisma.technology.findUnique({
      where: {
        id: technology_id,
      },
      include: {
        UserTechnology: {
          where: {
            current_layer: null,
          },
          select: {
            user: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });

    return technology;
  }

  public async findByName(name: string): Promise<Technology> {
    const technology = await prisma.technology.findUnique({
      where: {
        name,
      },
    });

    return technology;
  }

  public async deleteById(technology_id: string): Promise<Technology> {
    const deletedTechnology = await prisma.technology.delete({
      where: {
        id: technology_id,
      },
    });

    return deletedTechnology;
  }
}

export default TechnologiesRepository;
