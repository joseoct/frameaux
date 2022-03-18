import { injectable, inject } from 'tsyringe';
// import AppError from '@shared/errors/AppError';
import { Topic } from '@prisma/client';
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
    /*
      Check if topic already exists
      if (topicExists) {
        throw new AppError('topic already exists');
      }
    */

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
