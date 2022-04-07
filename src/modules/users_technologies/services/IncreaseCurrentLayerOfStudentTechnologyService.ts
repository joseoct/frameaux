import { inject, injectable } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
import { UserTechnology } from '@prisma/client';

import IUsersTechnologiesRepository from '../repositories/IUsersTechnologiesRepository';

interface IRequest {
  user_id: string;
  technology_id: string;
  result: number;
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
    result,
  }: IRequest): Promise<UserTechnology> {
    const userTechnology = await this.usersTechnologiesRepository.findByUserIdTechnologyId(
      user_id,
      technology_id,
    );

    const userTechnologyWithCurrentLayerIncreased = await this.usersTechnologiesRepository.incrementByTestCurrentLayer(
      userTechnology.id,
      result,
    );

    return userTechnologyWithCurrentLayerIncreased;
  }
}

export default CreateStudentTechnologyService;
