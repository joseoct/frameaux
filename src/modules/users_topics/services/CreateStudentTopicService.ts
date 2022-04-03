import { injectable, inject } from 'tsyringe';
// import AppError from '@shared/errors/AppError';
import { UserTopic } from '@prisma/client';
import IUsersTopicsRepository from '../repositories/IUsersTopicsRepository';

interface IRequest {
  student_id: string;
  topic_id: string;
}

@injectable()
class CreateStudentTopicService {
  constructor(
    @inject('UsersTopicsRepository')
    private usersTopicsRepository: IUsersTopicsRepository,
  ) {}

  public async execute({ student_id, topic_id }: IRequest): Promise<UserTopic> {
    /*
      Check if users_topic already exists
      if (users_topicExists) {
        throw new AppError('users_topic already exists');
      }
    */

    const users_topic = await this.usersTopicsRepository.create({
      user_id: student_id,
      topic_id,
    });

    return users_topic;
  }
}

export default CreateStudentTopicService;
