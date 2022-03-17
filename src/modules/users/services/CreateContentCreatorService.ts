import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import { User } from '@prisma/client';

import IRolesRepository from '@modules/roles/repositories/IRolesRepository';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}

  public async execute({ email, name, password }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already used.', 400);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const contentCreatorRole = await this.rolesRepository.findByName(
      'content_creator',
    );

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      role_id: contentCreatorRole.id,
    });

    delete user.password;

    return user;
  }
}

export default CreateUserService;
