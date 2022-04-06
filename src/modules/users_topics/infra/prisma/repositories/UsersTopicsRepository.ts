import IUsersTopicsRepository from '@modules/users_topics/repositories/IUsersTopicsRepository';
import ICreateStudentTopicDTO from '@modules/users_topics/dtos/ICreateStudentTopicDTO';
import { PrismaClient, UserTopic } from '@prisma/client';

const prisma = new PrismaClient();

class UsersTopicsRepository implements IUsersTopicsRepository {
  /*
  public async findByName(name: string): Promise<Users_topic | undefined> {
    const users_topic = await prisma.users_topic.findFirst({
      where: {
        name,
      },
    });

    return users_topic;
  }
  */

  public async findByUserIdAndTopicId(
    user_id: string,
    topic_id: string,
  ): Promise<UserTopic> {
    const users_topic = await prisma.userTopic.findFirst({
      where: {
        user_id,
        topic_id,
      },
    });

    return users_topic;
  }

  public async create(
    usersTopicData: ICreateStudentTopicDTO,
  ): Promise<UserTopic> {
    const result = await prisma.userTopic.create({
      data: {
        ...usersTopicData,
        current_difficulty: 1,
        attention: 0,
      },
    });

    return result;
  }

  public async update(
    userTopic_id: string,
    attention: boolean,
  ): Promise<UserTopic> {
    const result = await prisma.userTopic.update({
      where: {
        id: userTopic_id,
      },
      data: {
        current_difficulty: {
          increment: 1,
        },
        attention: {
          increment: attention ? 1 : 0,
        },
      },
    });

    return result;
  }
}

export default UsersTopicsRepository;
