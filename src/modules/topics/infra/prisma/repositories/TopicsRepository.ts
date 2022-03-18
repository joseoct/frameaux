import ITopicsRepository from '@modules/topics/repositories/ITopicsRepository';
import ICreateTopicDTO from '@modules/topics/dtos/ICreateTopicDTO';
import { PrismaClient, Topic } from '@prisma/client';

class TopicsRepository implements ITopicsRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async findMaxLayerByTechnologyId(
    technology_id: string,
  ): Promise<number> {
    const maxLayer = await this.prisma.$queryRaw<
      number
    >`SELECT MAX(layer) FROM topics WHERE technology_id = ${technology_id}`;

    return maxLayer[0].max;
  }

  public async findByTecnologIdAndName(
    technology_id: string,
    name: string,
  ): Promise<Topic> {
    const topic = await this.prisma.topic.findFirst({
      where: {
        technology_id,
        name,
      },
    });

    return topic;
  }

  public async findAllByTechnologyId(
    technology_id: string,
  ): Promise<Topic[] | undefined> {
    const topics = await this.prisma.topic.findMany({
      where: {
        technology_id,
      },
    });

    return topics;
  }

  public async create(topicData: ICreateTopicDTO): Promise<Topic> {
    const result = await this.prisma.topic.create({ data: topicData });

    return result;
  }
}

export default TopicsRepository;
