import { Alternative, Sequency } from '@prisma/client';
import ICreateAlternativeExerciseDTO from '../dtos/ICreateAlternativeExerciseDTO';
import ICreateSequencyExerciseDTO from '../dtos/ICreateSequencyExerciseDTO';

export default interface IExercisesRepository {
  // All exercises
  showRandomByLevelId(level_id: string): Promise<Alternative | Sequency>;

  // Alternative exercises
  listAlternativeExercisesByLevel(
    level_id: string,
  ): Promise<Alternative[] | undefined>;
  createAlternative(data: ICreateAlternativeExerciseDTO): Promise<Alternative>;

  // Sequency exercises
  listSequencyExercisesByLevel(
    level_id: string,
  ): Promise<Sequency[] | undefined>;
  createSequency(data: ICreateSequencyExerciseDTO): Promise<Sequency>;
}
