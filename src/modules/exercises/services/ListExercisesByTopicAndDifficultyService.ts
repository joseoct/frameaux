import { injectable, inject } from 'tsyringe';
// import AppError from '@shared/errors/AppError';
import { Alternative, Sequency } from '@prisma/client';
import ILevelsRepository from '@modules/levels/repositories/ILevelsRepository';
import ITopicsRepository from '@modules/topics/repositories/ITopicsRepository';
import IUsersTopicsRepository from '@modules/users_topics/repositories/IUsersTopicsRepository';
import IExercisesRepository from '../repositories/IExercisesRepository';

interface IRequest {
  topic_id: string | null;
  difficulty: number;
  student_id: string;
}

@injectable()
class ListExercisesByTopicAndDifficulty {
  constructor(
    @inject('ExercisesRepository')
    private exercisesRepository: IExercisesRepository,

    @inject('LevelsRepository')
    private levelsRepository: ILevelsRepository,

    @inject('TopicsRepository')
    private topicsRepository: ITopicsRepository,

    @inject('UsersTopicsRepository')
    private usersTopicsRepository: IUsersTopicsRepository,
  ) {}

  public async execute({
    topic_id,
    difficulty,
    student_id,
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

    const topic = await this.topicsRepository.findById(topic_id);

    const topicsTwoLayersBehind = await this.topicsRepository.findTwoLayersBehindByTechnologyId(
      topic.layer,
      topic.technology_id,
    );

    const randomExercisesTwoLayersBehindIfAttention = await topicsTwoLayersBehind.reduce(
      async (acc, topicBehind) => {
        const userTopic = await this.usersTopicsRepository.findByUserIdAndTopicId(
          student_id,
          topicBehind.id,
        );

        if (userTopic.attention === 1) {
          const randomLevel = await this.levelsRepository.findByTopicIdAndDifficulty(
            topicBehind.id,
            Math.floor(Math.random() * 3) + 1,
          );

          const randomExercise = await this.exercisesRepository.showRandomByLevelId(
            randomLevel.id,
          );

          return [...(await acc), randomExercise];
        }

        return acc;
      },
      Promise.resolve([] as (Alternative | Sequency)[]),
    );

    const topicsFourLayersBehind = await this.topicsRepository.findFourLayersBehindByTechnologyId(
      topic.layer,
      topic.technology_id,
    );

    const randomExercisesFourLayersBehindIfAttention = await topicsFourLayersBehind.reduce(
      async (acc, topicBehind) => {
        const randomLevel = await this.levelsRepository.findByTopicIdAndDifficulty(
          topicBehind.id,
          Math.floor(Math.random() * 3) + 1,
        );

        const randomExercise = await this.exercisesRepository.showRandomByLevelId(
          randomLevel.id,
        );

        return [...(await acc), randomExercise];
      },
      Promise.resolve([] as (Alternative | Sequency)[]),
    );

    // Exercicios de alternativas e sequência
    const exercises = [
      ...sequencyExercises,
      ...alternativeExercises,
      ...randomExercisesTwoLayersBehindIfAttention,
      ...randomExercisesFourLayersBehindIfAttention,
    ];

    // Embaralha os exercícios
    const shuffledExercises = exercises.sort(() => Math.random() - 0.5);

    return shuffledExercises;
  }
}

export default ListExercisesByTopicAndDifficulty;
