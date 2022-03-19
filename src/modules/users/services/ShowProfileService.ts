import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import { UserWithRoles } from '../infra/prisma/repositories/UsersRepository';

import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
  }: IRequest): Promise<UserWithRoles | undefined> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    delete user.password;

    return user;
  }
}

export default ShowProfileService;
