import IExercisesRepository from '@modules/exercises/repositories/IExercisesRepository';
import ICreateAlternativeExerciseDTO from '@modules/exercises/dtos/ICreateAlternativeExerciseDTO';
import { PrismaClient, Alternative, Sequency } from '@prisma/client';
import ICreateSequencyExerciseDTO from '@modules/exercises/dtos/ICreateSequencyExerciseDTO';

const prisma = new PrismaClient();

class ExercisesRepository implements IExercisesRepository {
  public async createSequency(
    data: ICreateSequencyExerciseDTO,
  ): Promise<Sequency> {
    const result = await prisma.sequency.create({ data });

    return result;
  }

  public async listAlternativeExercisesByLevel(
    level_id: string,
  ): Promise<Alternative[]> {
    const result = await prisma.alternative.findMany({
      where: {
        level_id,
      },
    });

    return result;
  }

  public async createAlternative(
    data: ICreateAlternativeExerciseDTO,
  ): Promise<Alternative> {
    const result = await prisma.alternative.create({ data });

    return result;
  }
}

export default ExercisesRepository;
