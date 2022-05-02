import ITechnologiesRepository from '@modules/technologies/repositories/ITechnologiesRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';
// import AppError from '@shared/errors/AppError';

interface IResponse {
  totals: {
    label: string;
    total: number;
  }[];
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

    const contentCreators = {
      label: 'Criadores de Conteúdo',
      total: totalContentCreators,
    };

    // const totalStudents = await this.usersRepository.findTotalNumberStudents();

    const students = {
      label: 'Estudantes',
      total: 9,
    };

    const totalTechnologies = await this.technologiesRepository.findTotalNumberTechnologies();

    const technologies = {
      label: 'Technologias',
      total: totalTechnologies,
    };

    const totals = [contentCreators, students, technologies];

    return {
      totals,
    };
  }
}

export default CreateDashboardService;
