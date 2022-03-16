import ITecnologiesRepository from '@modules/tecnologies/repositories/ITecnologiesRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';
// import AppError from '@shared/errors/AppError';

interface IResponse {
  totalContentCreators: number;
  totalStudents: number;
  totalTecnologies: number;
}

@injectable()
class CreateDashboardService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('TecnologiesRepository')
    private tecnologiesRepository: ITecnologiesRepository,
  ) {}

  public async execute(): Promise<IResponse> {
    const totalContentCreators = await this.usersRepository.findTotalNumberContentCreators();

    const totalStudents = await this.usersRepository.findTotalNumberStudents();

    const totalTecnologies = await this.tecnologiesRepository.findTotalNumberTecnologies();

    return {
      totalContentCreators,
      totalStudents,
      totalTecnologies,
    };
  }
}

export default CreateDashboardService;
