import { injectable, inject } from 'tsyringe';
// import AppError from '@shared/errors/AppError';
import { Alternative } from '@prisma/client';
import ILevelsRepository from '@modules/levels/repositories/ILevelsRepository';
import IExercisesRepository from '../repositories/IExercisesRepository';

interface IRequest {
  topic_id: string;
  difficulty: number;
}

@injectable()
class ListExercisesByTopicAndDifficulty {
  constructor(
    @inject('ExercisesRepository')
    private exercisesRepository: IExercisesRepository,

    @inject('LevelsRepository')
    private levelsRepository: ILevelsRepository,
  ) {}

  public async execute({
    topic_id,
    difficulty,
  }: IRequest): Promise<Alternative[]> {
    const level = await this.levelsRepository.findByTopicIdAndDifficulty(
      topic_id,
      difficulty,
    );

    const alternativeExercises = await this.exercisesRepository.listAlternativeExercisesByLevel(
      level.id,
    );

    return alternativeExercises;
  }
}

export default ListExercisesByTopicAndDifficulty;
