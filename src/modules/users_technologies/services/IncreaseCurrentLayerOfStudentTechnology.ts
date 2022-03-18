import { inject, injectable } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
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
    const userTechnology = await this.usersTechnologiesRepository.findByUserIdTechnologyId(
      user_id,
      technology_id,
    );

    const userTechnologyWithCurrentLayerIncreased = await this.usersTechnologiesRepository.update(
      userTechnology,
    );

    return userTechnologyWithCurrentLayerIncreased;
  }
}

export default CreateStudentTechnologyService;
