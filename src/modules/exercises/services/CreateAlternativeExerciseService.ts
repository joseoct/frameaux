import { injectable, inject } from 'tsyringe';
// import AppError from '@shared/errors/AppError';
import { Exercise } from '@prisma/client';
import IExercisesRepository from '../repositories/IExercisesRepository';

interface IRequest {
  level_id: string;
  question: string;
  type: string;
  answer: string[];
  correct_answer: string;
}

@injectable()
class CreateAlternativeExerciseService {
  constructor(
    @inject('ExercisesRepository')
    private exercisesRepository: IExercisesRepository,
  ) {}

  public async execute({
    level_id,
    question,
    type,
    answer,
    correct_answer,
  }: IRequest): Promise<Exercise> {
    const alternativeExercise = await this.exercisesRepository.createAlternative(
      {
        level_id,
        question,
        type,
        answer,
        correct_answer,
      },
    );

    return alternativeExercise;
  }
}

export default CreateAlternativeExerciseService;
