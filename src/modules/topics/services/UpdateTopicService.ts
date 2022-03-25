import { injectable, inject } from 'tsyringe';
import { Topic } from '@prisma/client';
import AppError from '@shared/errors/AppError';
import ITopicsRepository from '../repositories/ITopicsRepository';

interface IRequest {
  topic_id: string;
  name: string;
  explanation: string;
  layer: number;
}

@injectable()
class ListTopicsService {
  constructor(
    @inject('TopicsRepository')
    private topicsRepository: ITopicsRepository,
  ) {}

  public async execute({
    topic_id,
    name,
    layer,
    explanation,
  }: IRequest): Promise<Topic> {
    const topicToBeUpdated = await this.topicsRepository.findById(topic_id);

    if (Math.floor(topicToBeUpdated.layer) !== layer) {
      const maxLayer = await this.topicsRepository.findMaxLayerByTechnologyId(
        topicToBeUpdated.technology_id,
      );

      if (layer > maxLayer + 1 || layer < 1) {
        throw new AppError(`Layer must be between 1 and ${maxLayer + 1}`);
      }

      const layersByLayer = await this.topicsRepository.findLayersByLayer(
        topicToBeUpdated.technology_id,
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
        parseFloat(
          (maxLayerByLayer - Math.floor(maxLayerByLayer)).toFixed(1),
        ) === 0.3
      ) {
        throw new AppError('O máximo de tópicos por camada é 3');
      }

      const topics = await this.topicsRepository.findAllByTechnologyId(
        topicToBeUpdated.technology_id,
      );

      const layerTopics = topics.reduce<Topic[][]>((acc, topic) => {
        const floor = Math.floor(topic.layer);

        acc[floor] = [...acc[floor], topic];

        return acc;
      }, new Array(maxLayer + 1).fill([]));

      if (layerTopics[Math.floor(topicToBeUpdated.layer)].length === 1) {
        if (layer > topicToBeUpdated.layer) {
          throw new AppError(
            `A camada ${Math.floor(
              topicToBeUpdated.layer,
            )} não pode ficar vazia`,
          );
        }
        await this.topicsRepository.updateLayerByOne(
          topicToBeUpdated.layer,
          topicToBeUpdated.technology_id,
        );
      } else {
        await this.topicsRepository.updateLayerByZeroPointOne(
          topicToBeUpdated.layer,
          topicToBeUpdated.technology_id,
        );
      }

      topicToBeUpdated.layer = parseFloat((maxLayerByLayer + 0.1).toFixed(2));
    }

    topicToBeUpdated.name = name;
    topicToBeUpdated.explanation = explanation;

    const updatedTopic = await this.topicsRepository.update(topicToBeUpdated);

    return updatedTopic;
  }
}

export default ListTopicsService;
