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
    const topic = await prisma.topic.findUnique({
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
    await prisma.topic.updateMany({
      where: {
        technology_id,
        layer: {
          gt: layer,
        },
      },
      data: {
        layer: {
          decrement: 1,
        },
      },
    });
  }

  public async updateLayerByZeroPointOne(
    layer: number,
    technology_id: string,
  ): Promise<void> {
    await prisma.topic.updateMany({
      where: {
        technology_id,
        layer: {
          gt: layer,
          lt: Math.round(layer + 1),
        },
      },
      data: {
        layer: {
          decrement: 0.1,
        },
      },
    });
  }

  public async update(topic: Topic): Promise<Topic> {
    const updatedTopic = await prisma.topic.update({
      where: {
        id: topic.id,
      },
      data: {
        name: topic.name,
        explanation: topic.explanation,
        layer: topic.layer,
      },
    });

    return updatedTopic;
  }
}

export default TopicsRepository;
