import { Alternative, Sequency } from '@prisma/client';
import ICreateAlternativeExerciseDTO from '../dtos/ICreateAlternativeExerciseDTO';
import ICreateSequencyExerciseDTO from '../dtos/ICreateSequencyExerciseDTO';

export default interface IExercisesRepository {
  // All exercises

  // Alternative exercises
  listAlternativeExercisesByLevel(
    level_id: string,
  ): Promise<Alternative[] | undefined>;
  createAlternative(data: ICreateAlternativeExerciseDTO): Promise<Alternative>;

  // Sequency exercises
  createSequency(data: ICreateSequencyExerciseDTO): Promise<Sequency>;
}
