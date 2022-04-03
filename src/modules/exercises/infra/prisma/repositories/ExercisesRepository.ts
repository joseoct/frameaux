import IExercisesRepository from '@modules/exercises/repositories/IExercisesRepository';
import ICreateAlternativeExerciseDTO from '@modules/exercises/dtos/ICreateAlternativeExerciseDTO';
import { PrismaClient, Alternative } from '@prisma/client';

const prisma = new PrismaClient();

class ExercisesRepository implements IExercisesRepository {
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
    exerciseData: ICreateAlternativeExerciseDTO,
  ): Promise<Alternative> {
    const result = await prisma.alternative.create({ data: exerciseData });

    return result;
  }
}

export default ExercisesRepository;
