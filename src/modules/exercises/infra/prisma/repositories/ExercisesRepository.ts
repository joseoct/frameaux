import IExercisesRepository from '@modules/exercises/repositories/IExercisesRepository';
import ICreateAlternativeExerciseDTO from '@modules/exercises/dtos/ICreateAlternativeExerciseDTO';
import { PrismaClient, Exercise } from '@prisma/client';

const prisma = new PrismaClient();

class ExercisesRepository implements IExercisesRepository {
  public async createAlternative(
    exerciseData: ICreateAlternativeExerciseDTO,
  ): Promise<Exercise> {
    const result = await prisma.alternative.create({ data: exerciseData });

    return result;
  }
}

export default ExercisesRepository;
