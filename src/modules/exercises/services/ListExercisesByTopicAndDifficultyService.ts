import { injectable, inject } from 'tsyringe';
// import AppError from '@shared/errors/AppError';
import { Alternative, Sequency } from '@prisma/client';
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
  }: IRequest): Promise<(Alternative | Sequency)[]> {
    // Revisão dos exercícios
    if (difficulty > 3) {
      const levelThree = await this.levelsRepository.findByTopicIdAndDifficulty(
        topic_id,
        3,
      );

      const alternativeExercises = await this.exercisesRepository.listAlternativeExercisesByLevel(
        levelThree.id,
      );

      const sequencyExercises = await this.exercisesRepository.listSequencyExercisesByLevel(
        levelThree.id,
      );

      const exercises = [...sequencyExercises, ...alternativeExercises];

      const shuffleExercises = exercises.sort(() => Math.random() - 0.5);

      return shuffleExercises;
    }

    const level = await this.levelsRepository.findByTopicIdAndDifficulty(
      topic_id,
      difficulty,
    );

    // Todos os exercícios de alternativas por level
    const alternativeExercises = await this.exercisesRepository.listAlternativeExercisesByLevel(
      level.id,
    );

    // Todos os exercícios de sequência por level
    const sequencyExercises = await this.exercisesRepository.listSequencyExercisesByLevel(
      level.id,
    );

    // Exercicios de alternativas e sequência
    const exercises = [...sequencyExercises, ...alternativeExercises];

    // Embaralha os exercícios
    const shuffleExercises = exercises.sort(() => Math.random() - 0.5);

    return shuffleExercises;
  }
}

export default ListExercisesByTopicAndDifficulty;
