import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import { UserTechnology } from '@prisma/client';

import ITopicsRepository from '@modules/topics/repositories/ITopicsRepository';
import IUsersTechnologiesRepository from '../repositories/IUsersTechnologiesRepository';

interface IRequest {
  user_id: string;
  technology_id: string;
}

interface IResponse {
  userTechnology: UserTechnology;
  userCrowns: number;
  totalCrowns: number;
}

@injectable()
class ShowStudentTechnologyService {
  constructor(
    @inject('UsersTechnologiesRepository')
    private usersTechnologiesRepository: IUsersTechnologiesRepository,

    @inject('TopicsRepository')
    private topicsRepository: ITopicsRepository,
  ) {}

  public async execute({
    user_id,
    technology_id,
  }: IRequest): Promise<IResponse> {
    const studentTechnology = await this.usersTechnologiesRepository.findByUserIdTechnologyId(
      user_id,
      technology_id,
    );

    const topics = await this.topicsRepository.findAllByTechnologyId(
      technology_id,
      user_id,
    );

    const totalCrowns = topics.length * 3;

    const userCrowns = topics.reduce((acc, topic) => {
      if (topic.UserTopic.length > 0)
        return acc + topic.UserTopic[0]?.current_difficulty - 1;

      return acc;
    }, 0);

    if (!studentTechnology) {
      throw new AppError('Student Technology not found');
    }

    return {
      userTechnology: studentTechnology,
      userCrowns,
      totalCrowns,
    };
  }
}

export default ShowStudentTechnologyService;
