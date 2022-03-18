import { injectable, inject } from 'tsyringe';
import { Topic } from '@prisma/client';
import AppError from '@shared/errors/AppError';
import ITopicsRepository from '../repositories/ITopicsRepository';

interface IRequest {
  name: string;
  explanation: string;
  layer: number;
  tecnology_id: string;
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
    tecnology_id,
  }: IRequest): Promise<Topic> {
    const topicExists = await this.topicsRepository.findTopicByTecnologIdAndName(
      tecnology_id,
      name,
    );

    if (topicExists) {
      throw new AppError('Topic already exists');
    }

    const topic = await this.topicsRepository.create({
      name,
      explanation,
      layer,
      tecnology_id,
    });

    return topic;
  }
}

export default CreateTopicService;
