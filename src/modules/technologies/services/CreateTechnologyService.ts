import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { Technology } from '@prisma/client';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import ITechnologiesRepository from '../repositories/ITechnologiesRepository';

interface IRequest {
  name: string;
  technology_image: string;
}

@injectable()
class CreateTechnologyService {
  constructor(
    @inject('TechnologiesRepository')
    private technologiesRepository: ITechnologiesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    name,
    technology_image,
  }: IRequest): Promise<Technology> {
    const technologyExists = await this.technologiesRepository.findByName(name);

    if (technologyExists) {
      throw new AppError('Technology already exists');
    }

    const fileName = await this.storageProvider.saveFile(technology_image);

    const technology = await this.technologiesRepository.create({
      name,
      technology_image: fileName,
    });

    technology.technology_image = `${process.env.APP_URL}/files/${technology.technology_image}`;

    return technology;
  }
}

export default CreateTechnologyService;
