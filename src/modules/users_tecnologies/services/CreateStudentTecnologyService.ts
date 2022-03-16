import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import { UserTecnology } from '@prisma/client';

import IRolesRepository from '@modules/roles/repositories/IRolesRepository';
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

    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
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

    const studentRole = await this.rolesRepository.findByName('student');

    const userTecnology = await this.usersTecnologiesRepository.createStudentTecnology(
      {
        user_id,
        tecnology_id,
        role_id: studentRole.id,
      },
    );

    return userTecnology;
  }
}

export default CreateStudentTecnologyService;
