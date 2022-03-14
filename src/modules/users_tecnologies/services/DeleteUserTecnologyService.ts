import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import { UserTecnology } from '@prisma/client';
import IUsersTecnologiesRepository from '../repositories/IUsersTecnologiesRepository';

interface IRequest {
  user_id: string;
  tecnology_id: string;
}

@injectable()
class DeleteUserTecnologyService {
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

    if (!checkUserTecnologyExists) {
      throw new AppError('The student does not take this tecnology', 400);
    }

    const deletedUserTecnology = await this.usersTecnologiesRepository.delete(
      checkUserTecnologyExists,
    );

    return deletedUserTecnology;
  }
}

export default DeleteUserTecnologyService;
