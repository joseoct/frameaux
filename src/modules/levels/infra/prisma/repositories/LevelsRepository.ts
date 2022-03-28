import ILevelsRepository from '@modules/levels/repositories/ILevelsRepository';
import ICreateLevelDTO from '@modules/levels/dtos/ICreateLevelDTO';
import { Level } from '@prisma/client';
import { prisma } from '@shared/infra/database/prisma';

class LevelsRepository implements ILevelsRepository {
  public async findAllByTopic(topic_id: string): Promise<Level[] | undefined> {
    const level = await prisma.level.findMany({
      where: {
        topic_id,
      },
      include: {
        Exercise: true,
      },
    });

    return level;
  }

  public async findMaxDifficultyByTopicId(topic_id: string): Promise<number> {
    const maxDifficulty = await prisma.$queryRaw<number>`
      SELECT MAX(difficulty)
      FROM levels
      WHERE topic_id = ${topic_id}
    `;

    if (maxDifficulty[0].max === null) {
      return 0;
    }

    return maxDifficulty[0].max;
  }

  public async create(levelData: ICreateLevelDTO): Promise<Level> {
    const maxDifficulty = await this.findMaxDifficultyByTopicId(
      levelData.topic_id,
    );

    const result = await prisma.level.create({
      data: {
        topic_id: levelData.topic_id,
        difficulty: maxDifficulty + 1,
      },
    });

    return result;
  }

  public async findById(level_id: string): Promise<Level> {
    const result = await prisma.level.findUnique({
      where: {
        id: level_id,
      },
    });

    return result;
  }
}

export default LevelsRepository;
