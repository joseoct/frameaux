import ICreateTechnologyDTO from '@modules/technologies/dtos/ICreateTechnologyDTO';
import ITechnologiesRepository from '@modules/technologies/repositories/ITechnologiesRepository';
import { PrismaClient, Technology } from '@prisma/client';

class TechnologiesRepository implements ITechnologiesRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async findAllTechnologies(): Promise<Technology[]> {
    const technologies = await this.prisma.technology.findMany({
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
    const total = await this.prisma.technology.count();

    return total;
  }

  public async create(
    technologyData: ICreateTechnologyDTO,
  ): Promise<Technology> {
    const technology = await this.prisma.technology.create({
      data: technologyData,
    });

    return technology;
  }

  public async update(technologyData: Technology): Promise<Technology> {
    const technology = await this.prisma.technology.update({
      where: {
        id: technologyData.id,
      },
      data: technologyData,
    });

    return technology;
  }

  public async findById(id: string): Promise<Technology> {
    const technology = await this.prisma.technology.findUnique({
      where: {
        id,
      },
    });

    return technology;
  }

  public async findByName(name: string): Promise<Technology> {
    const technology = await this.prisma.technology.findUnique({
      where: {
        name,
      },
    });

    return technology;
  }
}

export default TechnologiesRepository;
