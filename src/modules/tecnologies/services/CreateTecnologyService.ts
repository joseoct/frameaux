import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { Tecnology } from '@prisma/client';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import ITecnologiesRepository from '../repositories/ITecnologiesRepository';

interface IRequest {
  name: string;
  tecnology_image: string;
}

@injectable()
class CreateTecnologyService {
  constructor(
    @inject('TecnologiesRepository')
    private tecnologiesRepository: ITecnologiesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    name,
    tecnology_image,
  }: IRequest): Promise<Tecnology> {
    const tecnologyExists = await this.tecnologiesRepository.findByName(name);

    if (tecnologyExists) {
      throw new AppError('Tecnology already exists');
    }

    const fileName = await this.storageProvider.saveFile(tecnology_image);

    const tecnology = await this.tecnologiesRepository.create({
      name,
      tecnology_image: fileName,
    });

    tecnology.tecnology_image = `${process.env.APP_URL}/files/${tecnology.tecnology_image}`;

    return tecnology;
  }
}

export default CreateTecnologyService;
