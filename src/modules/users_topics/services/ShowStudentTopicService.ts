import { injectable, inject } from 'tsyringe';
import { UserTopic } from '@prisma/client';
import AppError from '@shared/errors/AppError';
import IUsersTopicsRepository from '../repositories/IUsersTopicsRepository';

interface IRequest {
  student_id: string;
  topic_id: string;
}

@injectable()
class ShowStudentTopicService {
  constructor(
    @inject('UsersTopicsRepository')
    private usersTopicsRepository: IUsersTopicsRepository,
  ) {}

  public async execute({ student_id, topic_id }: IRequest): Promise<UserTopic> {
    const users_topic = await this.usersTopicsRepository.findByUserIdAndTopicId(
      student_id,
      topic_id,
    );

    if (!users_topic) {
      throw new AppError('Student topic not found.');
    }

    return users_topic;
  }
}

export default ShowStudentTopicService;
