import ITopicsRepository from '@modules/topics/repositories/ITopicsRepository';
import ICreateTopicDTO from '@modules/topics/dtos/ICreateTopicDTO';
import { Topic } from '@prisma/client';
import { prisma } from '@shared/infra/database/prisma';

class TopicsRepository implements ITopicsRepository {
  public async findLayersByLayer(
    technology_id: string,
    layer: number,
  ): Promise<{ layer: number }[]> {
    const layersBylayer = await prisma.topic.findMany({
      where: {
        layer: {
          lte: layer + 1,
          gte: layer,
        },
        technology_id,
      },
      select: {
        layer: true,
      },
    });

    return layersBylayer;
  }

  public async findMaxLayerByTechnologyId(
    technology_id: string,
  ): Promise<number> {
    const maxLayer = await prisma.$queryRaw<
      number
    >`SELECT MAX(layer) FROM topics WHERE technology_id = ${technology_id}`;

    if (maxLayer[0].max === null) {
      return 0;
    }

    return Math.floor(maxLayer[0].max);
  }

  public async findByTechnologyIdAndName(
    technology_id: string,
    name: string,
  ): Promise<Topic> {
    const topic = await prisma.topic.findFirst({
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
    const topics = await prisma.topic.findMany({
      where: {
        technology_id,
      },
      orderBy: {
        layer: 'asc',
      },
    });

    return topics;
  }

  public async create(topicData: ICreateTopicDTO): Promise<Topic> {
    const result = await prisma.topic.create({ data: topicData });

    return result;
  }

  public async findById(topic_id: string): Promise<Topic | undefined> {
    const topic = await prisma.topic.findFirst({
      where: {
        id: topic_id,
      },
    });

    return topic;
  }

  public async deleteById(topic_id: string): Promise<Topic> {
    const deletedTopic = await prisma.topic.delete({
      where: {
        id: topic_id,
      },
    });

    return deletedTopic;
  }

  public async updateLayerByOne(
    layer: number,
    technology_id: string,
  ): Promise<void> {
    await prisma.$queryRaw`
      UPDATE topics
      SET layer = layer - 1
      WHERE technology_id = ${technology_id}
      AND layer > ${layer}
    `;
  }

  public async updateLayerByZeroPointOne(topic_id: string): Promise<void> {
    await prisma.$queryRaw`
      UPDATE topics
      SET layer = layer - 0.1
      WHERE id = ${topic_id} 
    `;
  }

  public async topicsGrater(
    technology_id: string,
    layer: number,
  ): Promise<Topic[]> {
    const topics = await prisma.topic.findMany({
      where: {
        layer: {
          gte: layer,
          lte: Math.round(layer + 1),
        },
        technology_id,
      },
    });

    return topics;
  }
}

export default TopicsRepository;
