import { Exercise } from '@prisma/client';
import ICreateExerciseDTO from '../dtos/ICreateAlternativeExerciseDTO';

export default interface IExercisesRepository {
  // All exercises

  // Alternative exercises
  createAlternative(data: ICreateExerciseDTO): Promise<Exercise>;

  // Complete exercises
}
