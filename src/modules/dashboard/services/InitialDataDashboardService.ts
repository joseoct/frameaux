import ITechnologiesRepository from '@modules/technologies/repositories/ITechnologiesRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';
// import AppError from '@shared/errors/AppError';

interface IResponse {
  totalContentCreators: number;
  totalStudents: number;
  totalTechnologies: number;
}

@injectable()
class CreateDashboardService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('TechnologiesRepository')
    private technologiesRepository: ITechnologiesRepository,
  ) {}

  public async execute(): Promise<IResponse> {
    const totalContentCreators = await this.usersRepository.findTotalNumberContentCreators();

    const totalStudents = await this.usersRepository.findTotalNumberStudents();

    const totalTechnologies = await this.technologiesRepository.findTotalNumberTechnologies();

    return {
      totalContentCreators,
      totalStudents,
      totalTechnologies,
    };
  }
}

export default CreateDashboardService;
