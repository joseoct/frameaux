import { inject, injectable } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
import { UserTecnology } from '@prisma/client';

import IUsersTecnologiesRepository from '../repositories/IUsersTecnologiesRepository';

interface IRequest {
  user_id: string;
  tecnology_id: string;
}

@injectable()
class CreateStudentTecnologyService {
  constructor(
    @inject('UsersTecnologiesRepository')
    private usersTecnologiesRepository: IUsersTecnologiesRepository,
  ) {}

  public async execute({
    user_id,
    tecnology_id,
  }: IRequest): Promise<UserTecnology> {
    const userTecnology = await this.usersTecnologiesRepository.findByUserIdTecnologyId(
      user_id,
      tecnology_id,
    );

    const userTecnologyWithCurrentLayerIncreased = await this.usersTecnologiesRepository.update(
      userTecnology,
    );

    return userTecnologyWithCurrentLayerIncreased;
  }
}

export default CreateStudentTecnologyService;
