import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { Tecnology } from '@prisma/client';
import ITecnologiesRepository from '../repositories/ITecnologiesRepository';

interface IRequest {
  tecnology_id: string;
  name: string;
}

@injectable()
class UpdateTecnologyServicd {
  constructor(
    @inject('TecnologiesRepository')
    private tecnologiesRepository: ITecnologiesRepository,
  ) {}

  public async execute({ tecnology_id, name }: IRequest): Promise<Tecnology> {
    const tecnology = await this.tecnologiesRepository.findById(tecnology_id);

    tecnology.name = name;

    await this.tecnologiesRepository.update(tecnology);

    return tecnology;
  }
}

export default UpdateTecnologyServicd;
