import { injectable, inject } from 'tsyringe';
// import AppError from '@shared/errors/AppError';
import { Alternative, Sequency } from '@prisma/client';
import ITopicsRepository from '@modules/topics/repositories/ITopicsRepository';
import ILevelsRepository from '@modules/levels/repositories/ILevelsRepository';
import IExercisesRepository from '../repositories/IExercisesRepository';

interface IRequest {
  technology_id: string | null;
}

@injectable()
class ListExercisesTestByTechnologyService {
  constructor(
    @inject('ExercisesRepository')
    private exercisesRepository: IExercisesRepository,

    @inject('TopicsRepository')
    private topicsRepository: ITopicsRepository,

    @inject('LevelsRepository')
    private levelsRepository: ILevelsRepository,
  ) {}

  public async execute({
    technology_id,
  }: IRequest): Promise<(Alternative | Sequency)[]> {
    const topicIds = await this.topicsRepository.findFirstFiveByTechnologyId(
      technology_id,
    );

    const lastLevelsOfTopics = await this.levelsRepository.findLastLevelsByTopicId(
      topicIds,
    );

    const exercises = await lastLevelsOfTopics.reduce(
      async (acc, level, index) => {
        const alternativeExercises = await this.exercisesRepository.listAlternativeExercisesByLevel(
          level.id,
        );

        const alternativeExercisesWithLayer = alternativeExercises.map(
          alternative => {
            return {
              ...alternative,
              layer: index + 1,
            };
          },
        );

        const sequencyExercises = await this.exercisesRepository.listSequencyExercisesByLevel(
          level.id,
        );

        const sequencyExercisesWithLayer = sequencyExercises.map(
          alternative => {
            return {
              ...alternative,
              layer: index + 1,
            };
          },
        );

        return [
          ...(await acc),
          ...alternativeExercisesWithLayer,
          ...sequencyExercisesWithLayer,
        ];
      },
      Promise.resolve([] as (Alternative | Sequency)[]),
    );

    return exercises;
  }
}

export default ListExercisesTestByTechnologyService;
