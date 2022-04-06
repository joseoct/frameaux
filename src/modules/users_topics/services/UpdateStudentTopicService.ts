import { injectable, inject } from 'tsyringe';
// import AppError from '@shared/errors/AppError';
import { UserTopic } from '@prisma/client';
import IUsersTechnologiesRepository from '@modules/users_technologies/repositories/IUsersTechnologiesRepository';
import ITopicsRepository from '@modules/topics/repositories/ITopicsRepository';
import ITechnologiesRepository from '@modules/technologies/repositories/ITechnologiesRepository';
import IUsersTopicsRepository from '../repositories/IUsersTopicsRepository';

interface IRequest {
  student_id: string;
  topic_id: string;
  attention?: boolean;
}

@injectable()
class UpdateStudentTopicService {
  constructor(
    @inject('UsersTopicsRepository')
    private usersTopicsRepository: IUsersTopicsRepository,

    @inject('UsersTechnologiesRepository')
    private usersTechnologiesRepository: IUsersTechnologiesRepository,

    @inject('TopicsRepository')
    private topicsRepository: ITopicsRepository,

    @inject('TechnologiesRepository')
    private technologiesRepository: ITechnologiesRepository,
  ) {}

  public async execute({
    student_id,
    topic_id,
    attention,
  }: IRequest): Promise<UserTopic> {
    const userTopic = await this.usersTopicsRepository.findByUserIdAndTopicId(
      student_id,
      topic_id,
    );

    const users_topic = await this.usersTopicsRepository.update(
      userTopic.id,
      attention,
    );

    const technology = await this.technologiesRepository.findByTopicId(
      topic_id,
    );

    const UserTechnology = await this.usersTechnologiesRepository.findByUserIdTechnologyId(
      student_id,
      technology.id,
    );

    const topicsByLayer = await this.topicsRepository.findByLayer(
      topic_id,
      UserTechnology.current_layer,
    );

    const goToNextLayer = topicsByLayer.reduce((acc, topic) => {
      if (topic.UserTopic[0]?.current_difficulty < 4) {
        acc = false;
      }

      return acc;
    }, true);

    if (goToNextLayer) {
      await this.usersTechnologiesRepository.updateCurrentLayer(
        UserTechnology.id,
      );
    }

    return users_topic;
  }
}

export default UpdateStudentTopicService;
