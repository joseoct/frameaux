import { injectable, inject } from 'tsyringe';
import { Topic } from '@prisma/client';
import ITopicsRepository from '../repositories/ITopicsRepository';

interface IRequest {
  topic_id: string;
}

@injectable()
class ListTopicsService {
  constructor(
    @inject('TopicsRepository')
    private topicsRepository: ITopicsRepository,
  ) {}

  public async execute({ topic_id }: IRequest): Promise<Topic> {
    const topic = await this.topicsRepository.findById(topic_id);

    if (!topic) {
      throw new Error('Topic not found');
    }

    return topic;
  }
}

export default ListTopicsService;
