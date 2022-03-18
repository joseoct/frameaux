import { injectable, inject } from 'tsyringe';
import { Topic } from '@prisma/client';
import AppError from '@shared/errors/AppError';
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
  ) {}

  public async execute({
    name,
    explanation,
    layer,
    technology_id,
  }: IRequest): Promise<Topic> {
    const topicExists = await this.topicsRepository.findByTecnologIdAndName(
      technology_id,
      name,
    );

    if (topicExists) {
      throw new AppError('Topic already exists on this technology');
    }

    const maxLayer = await this.topicsRepository.findMaxLayerByTechnologyId(
      technology_id,
    );

    if (layer > maxLayer || layer < 1) {
      throw new AppError(`Layer must be between 1 and ${maxLayer}`);
    }

    const topic = await this.topicsRepository.create({
      name,
      explanation,
      layer,
      technology_id,
    });

    return topic;
  }
}

export default CreateTopicService;
