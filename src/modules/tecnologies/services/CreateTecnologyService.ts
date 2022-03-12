import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { Tecnology } from '@prisma/client';
import ITecnologiesRepository from '../repositories/ITecnologiesRepository';

interface IRequest {
  name: string;
}

@injectable()
class CreateTecnologyService {
  constructor(
    @inject('TecnologiesRepository')
    private tecnologiesRepository: ITecnologiesRepository,
  ) {}

  public async execute({ name }: IRequest): Promise<Tecnology> {
    const tecnologyExists = await this.tecnologiesRepository.findByName(name);

    if (tecnologyExists) {
      throw new AppError('tecnology already exis');
    }

    const tecnology = await this.tecnologiesRepository.create({
      name,
    });

    return tecnology;
  }
}

export default CreateTecnologyService;
