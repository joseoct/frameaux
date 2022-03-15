import { inject, injectable } from 'tsyringe';

import { User } from '@prisma/client';

import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  page: number;
}

interface IResponse {
  contentCreatorsPaginatedByTen: User[];
  totalOfContentCreators: number;
}

@injectable()
class ListContentCreatorsService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ page }: IRequest): Promise<IResponse> {
    const totalOfContentCreators = await this.usersRepository.findTotalNumberContentCreators();

    const contentCreatorsPaginatedByTen = await this.usersRepository.findAllContentCreatorsPaginated(
      page,
    );

    return {
      contentCreatorsPaginatedByTen,
      totalOfContentCreators,
    };
  }
}

export default ListContentCreatorsService;
