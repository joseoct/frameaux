import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import { UserTechnology } from '@prisma/client';

import IUsersTechnologiesRepository from '../repositories/IUsersTechnologiesRepository';

interface IRequest {
  user_id: string;
  technology_id: string;
}

@injectable()
class ShowStudentTechnologyService {
  constructor(
    @inject('UsersTechnologiesRepository')
    private usersTechnologiesRepository: IUsersTechnologiesRepository,
  ) {}

  public async execute({
    user_id,
    technology_id,
  }: IRequest): Promise<UserTechnology> {
    const studentTechnology = await this.usersTechnologiesRepository.findByUserIdTechnologyId(
      user_id,
      technology_id,
    );

    if (!studentTechnology) {
      throw new AppError('Student Technology not found');
    }

    return studentTechnology;
  }
}

export default ShowStudentTechnologyService;
