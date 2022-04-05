import { injectable, inject } from 'tsyringe';
import { Exercise } from '@prisma/client';
import IExercisesRepository from '../repositories/IExercisesRepository';

interface IRequest {
  level_id: string;
  question: string;
  type: string;
  correct_answer: string[];
}

@injectable()
class CreateSequencyExerciseService {
  constructor(
    @inject('ExercisesRepository')
    private exercisesRepository: IExercisesRepository,
  ) {}

  public async execute({
    level_id,
    question,
    type,
    correct_answer,
  }: IRequest): Promise<Exercise> {
    const sequencyExercise = await this.exercisesRepository.createSequency({
      level_id,
      question,
      type,
      correct_answer,
    });

    return sequencyExercise;
  }
}

export default CreateSequencyExerciseService;
