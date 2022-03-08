import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Role from '@modules/roles/infra/typeorm/entities/Role';
import IRolesRepository from '../repositories/IRolesRepository';

interface IRequest {
  name: string;
}

@injectable()
class CreateRoleService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}

  public async execute({ name }: IRequest): Promise<Role> {
    const checkRoleExists = await this.rolesRepository.findRoleByName(name);

    if (checkRoleExists) {
      throw new AppError('Role already exists');
    }

    const role = await this.rolesRepository.create({ name });

    return role;
  }
}

export default CreateRoleService;
