import ICreateTecnologyDTO from '@modules/tecnologies/dtos/ICreateTecnologyDTO';
import ITecnologiesRepository from '@modules/tecnologies/repositories/ITecnologiesRepository';
import { PrismaClient, Tecnology } from '@prisma/client';

const prisma = new PrismaClient();

class TecnologiesRepository implements ITecnologiesRepository {
  public async create(tecnologyData: ICreateTecnologyDTO): Promise<Tecnology> {
    const tecnology = await prisma.tecnology.create({
      data: tecnologyData,
    });

    return tecnology;
  }

  public async update(tecnologyData: Tecnology): Promise<Tecnology> {
    const tecnology = await prisma.tecnology.update({
      where: {
        id: tecnologyData.id,
      },
      data: tecnologyData,
    });

    return tecnology;
  }

  public async findById(id: string): Promise<Tecnology> {
    const tecnology = await prisma.tecnology.findUnique({
      where: {
        id,
      },
    });

    return tecnology;
  }

  public async findByName(name: string): Promise<Tecnology> {
    const tecnology = await prisma.tecnology.findUnique({
      where: {
        name,
      },
    });

    return tecnology;
  }
}

export default TecnologiesRepository;
