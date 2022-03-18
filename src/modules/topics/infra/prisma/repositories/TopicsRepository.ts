import ITopicsRepository from '@modules/topics/repositories/ITopicsRepository';
import ICreateTopicDTO from '@modules/topics/dtos/ICreateTopicDTO';
import { PrismaClient, Topic } from '@prisma/client';

const prisma = new PrismaClient();

class TopicsRepository implements ITopicsRepository {
  /*
  public async findByName(name: string): Promise<Topic | undefined> {
    const topic = await prisma.topic.findFirst({
      where: {
        name,
      },
    });

    return topic;
  }
  */

  public async create(topicData: ICreateTopicDTO): Promise<Topic> {
    const result = await prisma.topic.create({ data: topicData });

    return result;
  }
}

export default TopicsRepository;
