import { injectable, inject } from 'tsyringe';
import { Topic } from '@prisma/client';
import AppError from '@shared/errors/AppError';
import ILevelsRepository from '@modules/levels/repositories/ILevelsRepository';
import ITopicsRepository from '../repositories/ITopicsRepository';

interface IRequest {
  name: string;
  explanation: string;
  layer: number;
  technology_id: string;
}

@injectable()
class CreateTopicService {
  constructor(
    @inject('TopicsRepository')
    private topicsRepository: ITopicsRepository,

    @inject('LevelsRepository')
    private levelsRepository: ILevelsRepository,
  ) {}

  public async execute({
    name,
    explanation,
    layer,
    technology_id,
  }: IRequest): Promise<Topic> {
    const topicExists = await this.topicsRepository.findByTechnologyIdAndName(
      technology_id,
      name,
    );

    if (topicExists) {
      throw new AppError('Topic already exists on this technology');
    }

    const maxLayer = await this.topicsRepository.findMaxLayerByTechnologyId(
      technology_id,
    );

    if (layer > maxLayer + 1 || layer < 1) {
      throw new AppError(`Layer must be between 1 and ${maxLayer + 1}`);
    }

    const layersByLayer = await this.topicsRepository.findLayersByLayer(
      technology_id,
      layer,
    );

    const maxLayerByLayer =
      layersByLayer.length === 0
        ? layer
        : layersByLayer.reduce(
            (max, current_layer) =>
              current_layer.layer > max ? current_layer.layer : max,
            0,
          );

    if (
      parseFloat((maxLayerByLayer - Math.floor(maxLayerByLayer)).toFixed(1)) ===
      0.3
    ) {
      throw new AppError('O máximo de tópicos por camada é 3');
    }

    const topic = await this.topicsRepository.create({
      name,
      explanation,
      layer: parseFloat((maxLayerByLayer + 0.1).toFixed(2)),
      technology_id,
    });

    await this.levelsRepository.create({ topic_id: topic.id });
    await this.levelsRepository.create({ topic_id: topic.id });
    await this.levelsRepository.create({ topic_id: topic.id });

    return topic;
  }
}

export default CreateTopicService;
