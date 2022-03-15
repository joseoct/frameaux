import { inject, injectable } from 'tsyringe';

import { User } from '@prisma/client';

import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  page: number;
}

@injectable()
class ListContentCreatorsService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ page }: IRequest): Promise<User[]> {
    const contentCreators = await this.usersRepository.findAllContentCreators(
      page,
    );

    return contentCreators;
  }
}

export default ListContentCreatorsService;
