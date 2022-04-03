import { Alternative } from '@prisma/client';
import ICreateExerciseDTO from '../dtos/ICreateAlternativeExerciseDTO';

export default interface IExercisesRepository {
  // All exercises

  // Alternative exercises
  listAlternativeExercisesByLevel(
    level_id: string,
  ): Promise<Alternative[] | undefined>;
  createAlternative(data: ICreateExerciseDTO): Promise<Alternative>;

  // Complete exercises
}
