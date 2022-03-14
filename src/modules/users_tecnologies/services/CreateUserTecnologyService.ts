import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import { UserTecnology } from '@prisma/client';

import IUsersTecnologiesRepository from '../repositories/IUsersTecnologiesRepository';

interface IRequest {
  user_id: string;
  tecnology_id: string;
}

@injectable()
class CreateUserTecnologyService {
  constructor(
    @inject('UsersTecnologiesRepository')
    private usersTecnologiesRepository: IUsersTecnologiesRepository,
  ) {}

  public async execute({
    user_id,
    tecnology_id,
  }: IRequest): Promise<UserTecnology> {
    const checkUserTecnologyExists = await this.usersTecnologiesRepository.findByUserIdTecnologyId(
      user_id,
      tecnology_id,
    );

    if (checkUserTecnologyExists) {
      throw new AppError(
        'The student is already registred of this tecnology',
        400,
      );
    }

    const userTecnology = await this.usersTecnologiesRepository.create({
      user_id,
      tecnology_id,
    });

    return userTecnology;
  }
}

export default CreateUserTecnologyService;
