import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import { UserTechnology } from '@prisma/client';
import IUsersTechnologiesRepository from '../repositories/IUsersTechnologiesRepository';

interface IRequest {
  user_id: string;
  technology_id: string;
}

@injectable()
class DeleteStudentTechnologyService {
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

    if (!checkUserTechnologyExists) {
      throw new AppError('The student does not take this technology', 400);
    }

    const deletedUserTechnology = await this.usersTechnologiesRepository.delete(
      checkUserTechnologyExists,
    );

    return deletedUserTechnology;
  }
}

export default DeleteStudentTechnologyService;
