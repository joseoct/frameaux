import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import { UserTechnology } from '@prisma/client';

import IUsersTechnologiesRepository from '../repositories/IUsersTechnologiesRepository';

interface IRequest {
  user_id: string;
  technology_id: string;
}

@injectable()
class CreateStudentTechnologyService {
  constructor(
    @inject('UsersTechnologiesRepository')
    private usersTechnologiesRepository: IUsersTechnologiesRepository,
  ) {}

  public async execute({
    user_id,
    technology_id,
  }: IRequest): Promise<UserTechnology> {
    const checkUserTechnologyExists = await this.usersTechnologiesRepository.findByUserIdTechnologyId(
      user_id,
      technology_id,
    );

    if (checkUserTechnologyExists) {
      throw new AppError(
        'The student is already registred of this technology',
        400,
      );
    }

    const userTechnology = await this.usersTechnologiesRepository.createStudentTechnology(
      {
        user_id,
        technology_id,
      },
    );

    return userTechnology;
  }
}

export default CreateStudentTechnologyService;
