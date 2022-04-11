import { injectable, inject } from 'tsyringe';
// import AppError from '@shared/errors/AppError';
import { Exercise } from '@prisma/client';
import IExercisesRepository from '../repositories/IExercisesRepository';

interface IRequest {
  exercise_id: string;
}

@injectable()
class DeleteExerciseService {
  constructor(
    @inject('ExercisesRepository')
    private exercisesRepository: IExercisesRepository,
  ) {}

  public async execute({ exercise_id }: IRequest): Promise<Exercise> {
    const exerciseDeleted = await this.exercisesRepository.delete(exercise_id);

    return exerciseDeleted;
  }
}

export default DeleteExerciseService;
