import { UserTopic } from '@prisma/client';
import ICreateStudentTopicDTO from '../dtos/ICreateStudentTopicDTO';

export default interface IUsersTopicsRepository {
  update(userTopic_id: string, attention: boolean): Promise<UserTopic>;
  create(data: ICreateStudentTopicDTO): Promise<UserTopic>;
  findByUserIdAndTopicId(
    user_id: string,
    topic_id: string,
  ): Promise<UserTopic | undefined>;
}
